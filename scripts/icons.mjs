// App icons: the logo's red X (traced path from logo-paths.ts) in the black disc with a red ring.
// Writes src/app/icon.svg, src/app/apple-icon.png, public/icon-192.png, public/icon-512.png.
// Usage: node scripts/icons.mjs
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const src = await readFile("src/components/brand/logo-paths.ts", "utf8");
const x = src.match(/\n\s*x: "([^"]+)"/)?.[1];
if (!x) throw new Error("Could not find the X path in logo-paths.ts");

// X bounding box in logo units (see logo-paths.ts): 274..451 × 170..294.
const [x0, y0, x1, y1] = [274, 170, 451, 294];
const target = 36; // glyph width inside the 64-unit disc
const s = target / (x1 - x0);
const tx = 32 - ((x0 + x1) / 2) * s;
const ty = 32 - ((y0 + y1) / 2) * s;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30.5" fill="#000" stroke="#ED0C0C" stroke-width="3"/><path fill="#ED0C0C" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})" d="${x}"/></svg>\n`;
await writeFile("src/app/icon.svg", svg);
console.log("src/app/icon.svg");

for (const [file, size] of [
  ["src/app/apple-icon.png", 180],
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
]) {
  await sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
  console.log(`${file} ${size}x${size}`);
}
