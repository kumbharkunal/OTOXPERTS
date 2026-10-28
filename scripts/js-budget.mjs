// Initial JavaScript budget: gzip size of every script the HTML loads up front
// (chunks fetched later by dynamic import are excluded on purpose).
// Run against a production build: npm run build && npm start, then npm run budget [url]
import { gzipSync } from "node:zlib";

const url = process.argv[2] ?? "http://localhost:3000/";
const BUDGET_KB = 170;

const html = await (await fetch(url)).text();
const srcs = [...html.matchAll(/<script([^>]*)>/g)]
  .filter((m) => !/\bnomodule\b/i.test(m[1])) // legacy polyfills; modern browsers skip them
  .map((m) => m[1].match(/src="([^"]+)"/)?.[1])
  .filter(Boolean)
  .map((s) => new URL(s, url).href);
const unique = [...new Set(srcs)];

let total = 0;
const rows = [];
for (const src of unique) {
  const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
  const gz = gzipSync(buf, { level: 9 }).length;
  total += gz;
  rows.push([gz, src.replace(/^https?:\/\/[^/]+/, "")]);
}
rows.sort((a, b) => b[0] - a[0]);
for (const [gz, src] of rows) console.log(`${(gz / 1024).toFixed(1).padStart(7)} KB  ${src}`);
const kb = total / 1024;
console.log(`\nInitial JS: ${kb.toFixed(1)} KB gzip across ${rows.length} file(s). Budget ${BUDGET_KB} KB: ${kb <= BUDGET_KB ? "PASS" : "OVER"}`);
process.exitCode = kb <= BUDGET_KB ? 0 : 1;
