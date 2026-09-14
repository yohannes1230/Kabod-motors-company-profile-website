const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== 1. GIT LOG (LAST 15) ===');
console.log(execSync('git log --oneline -15').toString().trim());

console.log('\n=== 2. GIT STATUS (SHORT) ===');
console.log(execSync('git status --short').toString().trim());

console.log('\n=== 3. IMAGES (N) IN public/images ===');
const publicImages = fs.readdirSync('public/images');
const genericImages = publicImages.filter(f => f.includes('images ('));
console.log(genericImages.length > 0 ? genericImages.join('\n') : 'NONE (No generic images (N) in public/images)');

console.log('\n=== 4. GETTYIMAGES FILES ===');
function findFiles(dir, filter) {
  let results = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== 'node_modules' && item.name !== 'dist' && item.name !== '.git') {
        results = results.concat(findFiles(fullPath, filter));
      }
    } else if (filter(item.name)) {
      results.push(fullPath);
    }
  }
  return results;
}
const gettyFiles = findFiles('.', name => name.toLowerCase().includes('gettyimages'));
console.log(gettyFiles.length > 0 ? gettyFiles.join('\n') : 'NONE (No GettyImages files exist in repository tree)');

console.log('\n=== 5. MP4 FILES ===');
const mp4Files = findFiles('.', name => name.toLowerCase().endsWith('.mp4'));
console.log(mp4Files.length > 0 ? mp4Files.join('\n') : 'NONE');

console.log('\n=== 6. BROKEN REFERENCE CHECK ===');
const srcFiles = [
  ...findFiles('src/data', name => name.endsWith('.js')),
  ...findFiles('src/js', name => name.endsWith('.js')),
  'index.html'
];
const referenced = new Set();
const refRegex = /['"](\/images\/[^'"]+)['"]/g;
for (const file of srcFiles) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = refRegex.exec(content)) !== null) {
      referenced.add(match[1].replace(/^\/images\//, ''));
    }
  }
}

const actual = new Set(fs.readdirSync('public/images'));
const missing = [];
for (const ref of referenced) {
  if (!actual.has(ref)) {
    missing.push(ref);
  }
}
console.log('Referenced asset count:', referenced.size);
console.log('Actual assets in public/images:', actual.size);
console.log('Missing/Broken references:', missing.length === 0 ? 'EMPTY (0 broken references)' : missing.join('\n'));

console.log('\n=== 7. CSS IMAGES CHECK ===');
const cssFiles = findFiles('src/styles', name => name.endsWith('.css'));
let cssMatches = [];
for (const f of cssFiles) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('images (')) {
    cssMatches.push(f);
  }
}
console.log('CSS files containing "images (":', cssMatches.length > 0 ? cssMatches.join('\n') : 'NONE');

console.log('\n=== 8. SITEMAP FRAGMENTS CHECK ===');
if (fs.existsSync('public/sitemap.xml')) {
  const sm = fs.readFileSync('public/sitemap.xml', 'utf8');
  const fragLines = sm.split('\n').filter(line => line.includes('#'));
  console.log('Sitemap fragment entries:', fragLines.length > 0 ? fragLines.join('\n') : 'NONE (Zero #fragment entries)');
} else {
  console.log('public/sitemap.xml does not exist yet!');
}

console.log('\n=== 9. MALFORMED ASSET PATH STRINGS ===');
const malformedPatterns = [
  /['"]\/images\.[a-z]*['"]/g,
  /images\/\//g,
  /['"]\/(?!images\/)[a-zA-Z0-9_\-\.]+\.(webp|jfif|jpg|png|svg|mp4)['"]/g
];
let malformedFound = [];
for (const file of srcFiles) {
  if (fs.existsSync(file)) {
    const c = fs.readFileSync(file, 'utf8');
    for (const pat of malformedPatterns) {
      const matches = c.match(pat);
      if (matches) {
        malformedFound.push(`${file} matched ${matches.join(', ')}`);
      }
    }
  }
}
console.log('Malformed asset path occurrences:', malformedFound.length > 0 ? malformedFound.join('\n') : 'NONE');

