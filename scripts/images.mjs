// Turn whatever you drop into _incoming-images/ into optimised, correctly sized files.
// Files are matched by their leading number (see IMAGE_PROMPTS.md): "01.png", "01-hero-bay.png"
// and "1 anything.png" all map to image 1. Originals never leave _incoming-images/ (gitignored).
//
// Usage: npm run images
// Writes public/images/<name>.jpg and updates src/content/images.generated.json
// (width, height, blur placeholder), which the page reads. No code changes needed.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

// Mirrors IMAGE_SPECS in src/content/images.ts.
const SPECS = {
  1: { key: "hero-bay", width: 2560, height: 1440, position: "centre" },
  2: { key: "hero-bay-mobile", width: 1080, height: 1920, position: "centre" },
  3: { key: "stockyard", width: 1600, height: 2000, position: "attention" },
  4: { key: "engineer-walkround", width: 2400, height: 1600, position: "attention" },
  5: { key: "detail-paint-gauge", width: 1200, height: 1200, position: "attention" },
  6: { key: "detail-tread-gauge", width: 1200, height: 1200, position: "attention" },
  7: { key: "detail-obd", width: 1200, height: 1200, position: "attention" },
  8: { key: "detail-underbody", width: 1200, height: 1200, position: "attention" },
};

const IN = "_incoming-images";
const OUT = "public/images";
const MANIFEST = "src/content/images.generated.json";

await mkdir(OUT, { recursive: true });
let files = [];
try {
  files = (await readdir(IN)).filter((f) => [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase()));
} catch {
  console.log(`No ${IN}/ folder yet. Create it and drop the PNGs from IMAGE_PROMPTS.md there.`);
  process.exit(0);
}

const manifest = JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}"));
let done = 0;

for (const file of files.sort()) {
  const n = Number(file.match(/^\s*0*(\d+)/)?.[1]);
  const spec = SPECS[n];
  if (!spec) {
    console.log(`skip  ${file} (no image number 1-8 at the start of the name)`);
    continue;
  }
  const input = join(IN, file);
  const meta = await sharp(input).metadata();
  if ((meta.width ?? 0) < spec.width * 0.6 || (meta.height ?? 0) < spec.height * 0.6) {
    console.log(`warn  ${file}: ${meta.width}x${meta.height} is well below ${spec.width}x${spec.height}; it will look soft`);
  }

  const out = join(OUT, `${spec.key}.jpg`);
  await sharp(input)
    .rotate()
    .resize(spec.width, spec.height, { fit: "cover", position: spec.position, withoutEnlargement: false })
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);

  const blur = await sharp(input)
    .resize(16, Math.round((16 * spec.height) / spec.width), { fit: "cover", position: spec.position })
    .webp({ quality: 40 })
    .toBuffer();

  manifest[spec.key] = {
    src: `/images/${spec.key}.jpg`,
    width: spec.width,
    height: spec.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  done++;
  console.log(`ok    ${file} -> ${out} (${spec.width}x${spec.height})`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${done} image(s) processed. ${MANIFEST} updated.`);
if (manifest["hero-bay"]) console.log("Hero photo present: recalibrate callouts with ?calibrate (see README).");
