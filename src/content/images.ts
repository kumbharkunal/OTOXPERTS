import generated from "./images.generated.json";

/**
 * The eight photographs (IMAGE_PROMPTS.md). Each has a fixed aspect ratio so a
 * designed placeholder holds the exact space until `npm run images` writes the file.
 */
export const IMAGE_SPECS = {
  "hero-bay": { n: 1, ratio: [16, 9], width: 2560, height: 1440, label: "Hero, night delivery bay" },
  "hero-bay-mobile": { n: 2, ratio: [9, 16], width: 1080, height: 1920, label: "Hero, phone crop" },
  stockyard: { n: 3, ratio: [4, 5], width: 1600, height: 2000, label: "Stockyard in daylight" },
  "engineer-walkround": { n: 4, ratio: [3, 2], width: 2400, height: 1600, label: "Engineer walk-round" },
  "detail-paint-gauge": { n: 5, ratio: [1, 1], width: 1200, height: 1200, label: "Paint gauge on a door" },
  "detail-tread-gauge": { n: 6, ratio: [1, 1], width: 1200, height: 1200, label: "Tread depth gauge" },
  "detail-obd": { n: 7, ratio: [1, 1], width: 1200, height: 1200, label: "OBD scanner under the dash" },
  "detail-underbody": { n: 8, ratio: [1, 1], width: 1200, height: 1200, label: "Torch under the car" },
} as const;

export type ImageKey = keyof typeof IMAGE_SPECS;

export type GeneratedImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  /** Static srcset strings, written for the hero pair only (the LCP image). */
  sources?: { avif: string; webp: string };
};

const files = generated as Partial<Record<ImageKey, GeneratedImage>>;

export function getImage(key: ImageKey): GeneratedImage | null {
  return files[key] ?? null;
}
