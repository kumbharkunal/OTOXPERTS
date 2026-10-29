// Turn whatever you drop into _incoming-images/ into optimised, correctly sized files.
// Files are matched by name ("hero-bay.png") or by leading number (see IMAGE_PROMPTS.md):
// "01.png", "01-hero-bay.png" and "1 anything.png" all map to image 1. Each file is cropped to
// its exact ratio at its own resolution (never enlarged, capped at the target size).
// Originals never leave _incoming-images/ (gitignored).
//
// Usage: npm run images
// Writes public/images/<name>.jpg and updates src/content/images.generated.json
// (width, height, blur placeholder), which the page reads. No code changes needed.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

// Mirrors IMAGE_SPECS in src/content/images.ts. The hero pair is the LCP image, so it also
// gets static AVIF and WebP sizes: the page never waits for the image optimiser to warm up.
const SPECS = {
  1: { key: "hero-bay", ratio: [16, 9], width: 2560, height: 1440, position: "centre", sizes: [828, 1080, 1280, 1664, 2048] },
  2: { key: "hero-bay-mobile", ratio: [9, 16], width: 1080, height: 1920, position: "centre", sizes: [480, 640, 750, 936, 1080] },
  3: { key: "stockyard", ratio: [4, 5], width: 1600, height: 2000, position: "attention" },
  4: { key: "engineer-walkround", ratio: [3, 2], width: 2400, height: 1600, position: "attention" },
  5: { key: "detail-paint-gauge", ratio: [1, 1], width: 1200, height: 1200, position: "attention" },
  6: { key: "detail-tread-gauge", ratio: [1, 1], width: 1200, height: 1200, position: "attention" },
  7: { key: "detail-obd", ratio: [1, 1], width: 1200, height: 1200, position: "attention" },
  8: { key: "detail-underbody", ratio: [1, 1], width: 1200, height: 1200, position: "attention" },
};

function specFor(file) {
  const base = file.slice(0, -extname(file).length).toLowerCase();
  const byName = Object.values(SPECS).find((s) => s.key === base);
  return byName ?? SPECS[Number(file.match(/^\s*0*(\d+)/)?.[1])];
}

/** The largest size at the exact ratio that fits the source, capped at the target. */
function outputSize(spec, meta) {
  const [rw, rh] = spec.ratio;
  const fit = Math.min(meta.width, (meta.height * rw) / rh, spec.width);
  const unit = Math.floor(fit / rw);
  return { width: unit * rw, height: unit * rh };
}

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
  const spec = specFor(file);
  if (!spec) {
    console.log(`skip  ${file} (name it after the image, e.g. hero-bay.png, or start it with its number 1-8)`);
    continue;
  }
  const input = join(IN, file);
  const raw = await sharp(input).metadata();
  // EXIF orientations 5-8 are quarter turns: the upright image swaps width and height.
  const meta = (raw.orientation ?? 1) >= 5 ? { width: raw.height, height: raw.width } : { width: raw.width, height: raw.height };
  if (meta.width < spec.width * 0.6 || meta.height < spec.height * 0.6) {
    console.log(`warn  ${file}: ${meta.width}x${meta.height} is well below ${spec.width}x${spec.height}; it will look soft`);
  }
  const { width, height } = outputSize(spec, meta);

  const out = join(OUT, `${spec.key}.jpg`);
  await sharp(input)
    .rotate()
    .resize(width, height, { fit: "cover", position: spec.position })
    .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);

  const blur = await sharp(input)
    .resize(16, Math.round((16 * height) / width), { fit: "cover", position: spec.position })
    .webp({ quality: 40 })
    .toBuffer();

  // Static responsive sizes (never larger than the master), as ready-made srcset strings.
  let sources;
  if (spec.sizes) {
    const widths = [...new Set([...spec.sizes.filter((w) => w < width), width])];
    const sets = { avif: [], webp: [] };
    for (const w of widths) {
      const h = Math.round((w * height) / width);
      const frame = sharp(input).rotate().resize(w, h, { fit: "cover", position: spec.position });
      await frame.clone().avif({ quality: 55, effort: 6 }).toFile(join(OUT, `${spec.key}-${w}.avif`));
      await frame.clone().webp({ quality: 74 }).toFile(join(OUT, `${spec.key}-${w}.webp`));
      sets.avif.push(`/images/${spec.key}-${w}.avif ${w}w`);
      sets.webp.push(`/images/${spec.key}-${w}.webp ${w}w`);
    }
    sources = { avif: sets.avif.join(", "), webp: sets.webp.join(", ") };
  }

  manifest[spec.key] = {
    src: `/images/${spec.key}.jpg`,
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    ...(sources ? { sources } : {}),
  };
  done++;
  console.log(`ok    ${file} -> ${out} (${width}x${height})`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${done} image(s) processed. ${MANIFEST} updated.`);
if (manifest["hero-bay"]) console.log("Hero photo present: recalibrate callouts with ?calibrate (see README).");
