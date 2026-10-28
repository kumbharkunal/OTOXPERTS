// Lists everything waiting on OtoXperts: todo(...) values, TODO(client) comments and
// facts marked `confirm` in src/content/site.ts. Usage: npm run todos
import { readFile } from "node:fs/promises";

const file = "src/content/site.ts";
const lines = (await readFile(file, "utf8")).split(/\r?\n/);
const rows = [];
lines.forEach((line, i) => {
  const at = `${file}:${i + 1}`;
  const t = line.match(/todo\("([^"]+)"\)/);
  if (t) rows.push(["missing", t[1], at]);
  const c = line.match(/TODO\(client\):\s*(.+)$/);
  if (c) rows.push(["confirm", c[1].trim(), at]);
  const s = line.match(/confirm: (?:true, )?\{?\s*source: "([^"]+)"/) ?? line.match(/source: "([^"]+)"/);
  if (s && /confirm/.test(line)) rows.push(["check", s[1], at]);
});

const width = Math.max(...rows.map((r) => r[0].length));
for (const [kind, text, at] of rows) console.log(`${kind.padEnd(width)}  ${text}  (${at})`);
console.log(`\n${rows.length} item(s) for the client. Full question list: docs/PLAN.md §15.`);
