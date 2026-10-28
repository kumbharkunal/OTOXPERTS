import type { ReactNode } from "react";
import { site } from "@/content/site";
import { getVideo, formatDuration, type GeneratedVideo } from "@/content/videos";

type Props = {
  /** Instagram reel code; the file lives at public/videos/<code>.mp4. */
  code: string;
  /** Caption in the player, e.g. the finding or the city. */
  title: string;
  /** Previous and next in the player step through links of the same group. */
  group: string;
  className?: string;
  children: (video: GeneratedVideo) => ReactNode;
  /** Read after the visible text, before the duration; defaults to ", video". */
  srText?: string;
  /** Shown while the video file isn't there yet. Never a link to Instagram. */
  fallback?: ReactNode;
};

/**
 * A link to a reel hosted on this site. Without JS it opens the MP4 itself; with JS,
 * ReelHost opens the on-site player instead.
 */
export function ReelLink({ code, title, group, className, children, srText, fallback = null }: Props) {
  const video = getVideo(code);
  if (!video) return fallback;
  return (
    <a
      href={video.src}
      className={className}
      data-reel={code}
      data-reel-group={group}
      data-reel-title={title}
      data-reel-poster={video.poster}
      data-reel-ratio={`${video.width} / ${video.height}`}
    >
      {children(video)}
      <span className="sr-only">
        {srText ?? `, ${site.player.srKind}`}, {formatDuration(video.duration)}
      </span>
    </a>
  );
}
