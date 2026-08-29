import fs from "node:fs";
const c = fs.readFileSync('scripts/check-i18n.mjs', 'utf8');
const modified = c.replace(
  'for (const m of code.matchAll(KEY_RE)) used.add(m[1]);',
  'for (const m of code.matchAll(KEY_RE)) { used.add(m[1]); if (m[1].includes("workflow")) console.log("FOUND", f, m[1]); }'
);
fs.writeFileSync('scripts/check-i18n.mjs', modified);
