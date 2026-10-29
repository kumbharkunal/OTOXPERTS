import Image from "next/image";
import { getImage, IMAGE_SPECS, type ImageKey } from "@/content/images";
import { cn } from "@/lib/cn";

type Props = {
  name: ImageKey;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  tone?: "light" | "dark";
};

/**
 * A photograph at its fixed aspect ratio. Until the real file exists it renders a
 * designed placeholder in the same box, so swapping images needs no code change.
 */
export function Shot({ name, alt, sizes, className, imgClassName, tone = "light" }: Props) {
  const spec = IMAGE_SPECS[name];
  const img = getImage(name);
  const [w, h] = spec.ratio;

  return (
    <figure className={cn("relative overflow-hidden rounded-md", className)} style={{ aspectRatio: `${w} / ${h}` }}>
      {img ? (
        <Image
          src={img.src}
          alt={alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          // The tiny WebP itself, stretched: next/image's "blur" wraps it in an SVG blur
          // filter, which costs far more to paint for a placeholder few people ever see.
          placeholder={img.blurDataURL as `data:image/${string}`}
          quality={75}
          className={cn("absolute inset-0 size-full object-cover", imgClassName)}
        />
      ) : (
        <Placeholder n={spec.n} label={spec.label} alt={alt} tone={tone} />
      )}
    </figure>
  );
}

function Placeholder({ n, label, alt, tone }: { n: number; label: string; alt: string; tone: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "absolute inset-0 grid place-items-end p-4",
        dark ? "bg-[#0d0e10] text-muted-dark" : "bg-concrete text-muted",
      )}
    >
      {/* Hairline frame and crop marks, like an unprinted proof. */}
      <svg aria-hidden="true" className="absolute inset-3 size-[calc(100%-1.5rem)]" preserveAspectRatio="none" viewBox="0 0 100 100">
        <rect x="0.5" y="0.5" width="99" height="99" fill="none" stroke="currentColor" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" strokeDasharray="2 3" />
      </svg>
      <span className="relative text-[0.8125rem] leading-tight reading">
        Image {n}: {label}
      </span>
    </div>
  );
}
