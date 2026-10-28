// Turn the reels dropped into _incoming-videos/ into web-ready files.
// Name each file after its Instagram reel code, e.g. DdG0NxypRuM.mp4 (mp4, mov, m4v or webm).
// Writes public/videos/<code>.mp4 (H.264 + AAC, longer side 960px at most, fast start) and
// <code>.jpg (poster), and updates src/content/videos.generated.json, which the page reads.
// Originals stay in _incoming-videos/ (gitignored). Needs ffmpeg on PATH, or FFMPEG_PATH.
//
// Usage: npm run videos
import { readdir, readFile, writeFile, mkdir, rm, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const IN = "_incoming-videos";
const OUT = "public/videos";
const MANIFEST = "src/content/videos.generated.json";
const SITE = "src/content/site.ts";
const LONG_SIDE = 960;

async function findFfmpeg() {
  for (const bin of [process.env.FFMPEG_PATH, "ffmpeg"].filter(Boolean)) {
    try {
      await run(bin, ["-hide_banner", "-version"]);
      return bin;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

/** ffmpeg prints stream details to stderr when given an input and no output. */
async function probe(ffmpeg, file) {
  const { stderr } = await run(ffmpeg, ["-hide_banner", "-i", file]).catch((e) => e);
  const d = stderr.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return {
    duration: d ? Number(d[1]) * 3600 + Number(d[2]) * 60 + Number(d[3]) : 0,
    hasAudio: /Stream #\S+.*Audio:/.test(stderr),
  };
}

const ffmpeg = await findFfmpeg();
if (!ffmpeg) {
  console.log("ffmpeg not found. Install it (winget install Gyan.FFmpeg) or set FFMPEG_PATH to the binary.");
  process.exit(1);
}

let files = [];
try {
  files = (await readdir(IN)).filter((f) => [".mp4", ".mov", ".m4v", ".webm"].includes(extname(f).toLowerCase()));
} catch {
  console.log(`No ${IN}/ folder yet. Create it and drop the reels there, named <reel code>.mp4.`);
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
const manifest = JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}"));
let done = 0;

for (const file of files.sort()) {
  const code = basename(file, extname(file));
  if (!/^[A-Za-z0-9_-]{6,20}$/.test(code)) {
    console.log(`skip  ${file} (name it after the reel code, e.g. DdG0NxypRuM.mp4)`);
    continue;
  }
  const input = join(IN, file);
  const out = join(OUT, `${code}.mp4`);
  const { hasAudio } = await probe(ffmpeg, input);

  // Longer side at most 960px, even dimensions, 30 fps at most; fast start so playback
  // begins before the download ends.
  const scale = `scale='if(gt(iw,ih),min(${LONG_SIDE},iw),-2)':'if(gt(iw,ih),-2,min(${LONG_SIDE},ih))':flags=lanczos`;
  await run(
    ffmpeg,
    [
      "-hide_banner", "-loglevel", "error", "-y", "-i", input,
      "-vf", scale, "-fpsmax", "30",
      "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-maxrate", "1800k", "-bufsize", "3600k",
      ...(hasAudio ? ["-c:a", "aac", "-b:a", "96k", "-ac", "2"] : ["-an"]),
      "-movflags", "+faststart", out,
    ],
    { maxBuffer: 16 * 1024 * 1024 },
  );

  const { duration } = await probe(ffmpeg, out);
  const frame = join(OUT, `${code}.frame.jpg`);
  await run(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", "-ss", String(Math.min(1.5, duration / 3)), "-i", out, "-frames:v", "1", "-q:v", "2", frame]);
  const meta = await sharp(frame).metadata();
  await sharp(frame).jpeg({ quality: 74, mozjpeg: true }).toFile(join(OUT, `${code}.jpg`));
  const blur = await sharp(frame)
    .resize(12, Math.round((12 * meta.height) / meta.width))
    .webp({ quality: 40 })
    .toBuffer();
  await rm(frame);

  manifest[code] = {
    src: `/videos/${code}.mp4`,
    poster: `/videos/${code}.jpg`,
    width: meta.width,
    height: meta.height,
    duration: Math.round(duration * 10) / 10,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  done++;
  const kb = Math.round((await stat(out)).size / 1024);
  console.log(`ok    ${file} -> ${out} (${meta.width}x${meta.height}, ${duration.toFixed(1)} s, ${kb} KB${hasAudio ? "" : ", no audio"})`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${done} video(s) processed. ${MANIFEST} updated.`);

// Which reels on the page still have no file (they show as plain text until they do).
const wanted = [...new Set([...(await readFile(SITE, "utf8")).matchAll(/video: "([A-Za-z0-9_-]+)"/g)].map((m) => m[1]))];
const missing = wanted.filter((code) => !manifest[code]);
console.log(missing.length ? `Still missing ${missing.length} of ${wanted.length}: ${missing.join(", ")}` : `All ${wanted.length} reels on the page have files.`);
