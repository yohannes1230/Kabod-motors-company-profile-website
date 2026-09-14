const fs = require('fs');
const html = fs.readFileSync('localhost_2026-09-14_16-52-53.report.html', 'utf8');
const match = html.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*(\{.+?\});<\/script>/s);
if (!match) {
  console.log('No JSON match found, length:', html.length);
  process.exit(1);
}
const lh = JSON.parse(match[1]);
console.log('=== CATEGORIES ===');
for (const [k, v] of Object.entries(lh.categories)) {
  console.log(v.title + ': ' + Math.round(v.score * 100));
}

console.log('\n=== METRICS ===');
const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive'];
for (const m of metrics) {
  const a = lh.audits[m];
  if (a) console.log(`${a.title}: ${a.displayValue} (score: ${a.score})`);
}

console.log('\n=== FAILING / WARNING PERFORMANCE AUDITS ===');
const perfAuditRefs = lh.categories.performance.auditRefs.map(r => r.id);
for (const id of perfAuditRefs) {
  const a = lh.audits[id];
  if (!a) continue;
  if (a.score !== null && a.score < 1) {
    console.log(`\n[${id}] Score: ${a.score} — ${a.title}`);
    if (a.displayValue) console.log(`  DisplayValue: ${a.displayValue}`);
    if (a.details && a.details.items && a.details.items.length) {
      console.log(`  Items count: ${a.details.items.length}`);
      for (const item of a.details.items.slice(0, 5)) {
        console.log('   -', JSON.stringify(item));
      }
    }
  }
}

console.log('\n=== ACCESSIBILITY AUDITS (Failed or Inapplicable) ===');
const a11yRefs = lh.categories.accessibility.auditRefs.map(r => r.id);
let a11yFailed = 0;
for (const id of a11yRefs) {
  const a = lh.audits[id];
  if (!a) continue;
  if (a.score !== null && a.score < 1) {
    a11yFailed++;
    console.log(`FAIL [${id}] Score: ${a.score} — ${a.title}`);
    if (a.details?.items) console.log('  Items:', a.details.items);
  }
}
if (a11yFailed === 0) {
  console.log('ZERO accessibility failures. Score is 100/100.');
}
