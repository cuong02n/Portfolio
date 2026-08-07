// Static check: every i18n key referenced from components/data must exist in
// BOTH the `en` and `vi` blocks of src/Assets/lang/i18n.js — and every declared
// key must be referenced somewhere.
//
// Run with: node .i18n-check.mjs
import fs from "node:fs";
import path from "node:path";

const NS = [
  "home", "about", "stack", "proj", "demo", "exp", "cert", "edu", "nav",
  "hero", "footer", "resume", "projects", "links", "common", "profile",
  "stats", "typed", "contact",
];

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== "features") walk(p);
    } else if (/\.jsx?$/.test(e.name)) {
      files.push(p);
    }
  }
})("src");

const src = fs.readFileSync("src/Assets/lang/i18n.js", "utf8");
const block = (name) => {
  const start = src.indexOf(`const ${name} = {`);
  const end = src.indexOf("\n}\n", start);
  const slice = src.slice(start, end === -1 ? undefined : end);
  return new Set([...slice.matchAll(/^[ \t]*'([^']+)':/gm)].map((m) => m[1]));
};
const en = block("en");
const vi = block("vi");

// Any dotted string literal opening with a known namespace is a key reference —
// this covers t('x'), labelKey: "x", bulletKeys: ['x', 'y'] and plain arrays.
const KEY_RE = new RegExp(`['"]((?:${NS.join("|")})\\.[a-zA-Z0-9.]+)['"]`, "g");

const used = new Set();
for (const f of files) {
  if (f.endsWith(path.join("lang", "i18n.js"))) continue;
  const code = fs.readFileSync(f, "utf8");
  for (const m of code.matchAll(KEY_RE)) used.add(m[1]);
}

// Keys assembled from template literals at render time, which no regex sees.
for (const c of ["c1", "c2", "c3"]) {
  used.add(`home.what.${c}.title`);
  used.add(`home.what.${c}.desc`);
}
for (const lvl of ["core", "working", "familiar"]) {
  used.add(`stack.level.${lvl}`);
  used.add(`stack.level.${lvl}.hint`);
}
for (const g of ["languages", "backend", "architecture", "data", "messaging",
                 "workflow", "security", "devops", "frontend", "tooling"]) {
  used.add(`stack.${g}.title`);
  used.add(`stack.${g}.blurb`);
}

const report = (label, list) => list.length && console.log(`${label}: ${list.join(", ")}`);
const missEn = [...used].filter((k) => !en.has(k)).sort();
const missVi = [...used].filter((k) => !vi.has(k)).sort();
const onlyEn = [...en].filter((k) => !vi.has(k)).sort();
const onlyVi = [...vi].filter((k) => !en.has(k)).sort();
const unused = [...en].filter((k) => !used.has(k)).sort();

console.log(`referenced: ${used.size} | en: ${en.size} | vi: ${vi.size}`);
report("MISSING in en", missEn);
report("MISSING in vi", missVi);
report("in en but not vi", onlyEn);
report("in vi but not en", onlyVi);
report("declared but never used", unused);

const failed = missEn.length + missVi.length + onlyEn.length + onlyVi.length + unused.length;
console.log(failed ? `\nFAIL (${failed})` : "\nOK — both locales complete, no dead keys");
process.exit(failed ? 1 : 0);
