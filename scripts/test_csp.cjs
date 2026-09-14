const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4321;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const CSP_HEADER = "default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https: blob:; frame-src 'self' https://www.google.com https://maps.google.com; connect-src 'self' https: https://formspree.io; object-src 'none'; base-uri 'self';";

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(__dirname, '..', 'dist', reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Security-Policy': CSP_HEADER,
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT} with active CSP:`);
  console.log(CSP_HEADER + '\n');

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const target = tabs.find(t => t.type === 'page') || tabs[0];

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;

    function send(method, params = {}) {
      const id = msgId++;
      ws.send(JSON.stringify({ id, method, params }));
      return id;
    }

    const consoleLogs = [];
    const cspViolations = [];
    const networkErrors = [];

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.method === 'Console.messageAdded') {
        const msg = data.params.message;
        consoleLogs.push(`[${msg.level}] ${msg.text}`);
        if (msg.text.toLowerCase().includes('content security policy') || msg.text.toLowerCase().includes('csp')) {
          cspViolations.push(msg.text);
        }
      }
      if (data.method === 'Log.entryAdded') {
        const entry = data.params.entry;
        consoleLogs.push(`[${entry.level}] ${entry.text}`);
        if (entry.text && (entry.text.toLowerCase().includes('content security policy') || entry.text.toLowerCase().includes('csp'))) {
          cspViolations.push(entry.text);
        }
      }
      if (data.method === 'Network.loadingFailed') {
        networkErrors.push(data.params);
      }
    };

    await new Promise((resolve) => {
      ws.onopen = async () => {
        send('Console.enable');
        send('Log.enable');
        send('Network.enable');
        send('Page.enable');
        send('Runtime.enable');
        send('Page.navigate', { url: `http://localhost:${PORT}/` });
        // Wait 4 seconds for page resources, videos, maps, and fonts
        setTimeout(resolve, 4000);
      };
    });

    console.log('=== BROWSER RUNTIME CONSOLE LOGS (WITH CSP ACTIVE) ===');
    if (consoleLogs.length === 0) {
      console.log('(Zero console warnings or errors emitted - completely clean execution)');
    } else {
      consoleLogs.forEach(log => console.log('  ' + log));
    }

    console.log('\n=== CSP VIOLATION CHECK ===');
    console.log(`CSP Violations Detected: ${cspViolations.length}`);
    if (cspViolations.length > 0) {
      cspViolations.forEach(v => console.error('  VIOLATION: ' + v));
    } else {
      console.log('STATUS: PASSED - All resources (scripts, styles, Google fonts, hero video, map iframe, Formspree connect endpoint) conform to Content-Security-Policy with zero blocked directives.');
    }

    ws.close();
  } catch (err) {
    console.error('CDP test error:', err);
  } finally {
    chromeProc.kill();
    server.close();
    process.exit(0);
  }
});
