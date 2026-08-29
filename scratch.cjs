const fs = require('fs');
const path = require('path');
const NS = ['home', 'about', 'stack', 'proj', 'demo', 'exp', 'cert', 'edu', 'nav', 'hero', 'footer', 'resume', 'projects', 'links', 'common', 'profile', 'stats', 'contact', 'crawler', 'snapshot'];
const KEY_RE = new RegExp('[\'"]((?:' + NS.join('|') + ')\\.[a-zA-Z0-9.]+)[\'"]', 'g');
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.js') || p.endsWith('.jsx')) files.push(p);
  }
})('src');
for (const f of files) {
  if (f.endsWith('i18n.js')) continue;
  const code = fs.readFileSync(f, 'utf8');
  for (const m of code.matchAll(KEY_RE)) {
    if (m[1].includes('stack.workflow')) console.log(f, m[1]);
  }
}
