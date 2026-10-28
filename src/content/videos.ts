import generated from "./videos.generated.json";

/**
 * The reels, hosted on this site. `npm run videos` writes the files and this manifest from
 * _incoming-videos/<reel code>.mp4; a code with no entry yet renders as plain text.
 */
export type GeneratedVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Seconds. */
  duration: number;
  blurDataURL: string;
};

const files = generated as Partial<Record<string, GeneratedVideo>>;

export function getVideo(code: string): GeneratedVideo | null {
  return files[code] ?? null;
}

/** 42 -> "0:42", 75.6 -> "1:16". */
export function formatDuration(seconds: number) {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
