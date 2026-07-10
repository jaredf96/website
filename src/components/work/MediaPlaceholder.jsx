import { PlayCircle, Image as ImageIcon } from "lucide-react";

/**
 * Case-study media. With `media.src` renders the real image (captioned by
 * `label`); without it, renders a framed "coming soon" placeholder.
 * Spacing/layout is owned by the parent (CaseStudySection).
 *
 * media: { kind: "video" | "image", label, src? }
 */
export default function MediaPlaceholder({ media }) {
  if (media.src) {
    return (
      <figure className="m-0">
        <img
          src={media.src}
          alt={media.label}
          loading="lazy"
          className="w-full rounded-xl border border-border bg-white"
        />
        <figcaption className="mt-2 text-center text-xs text-muted">
          {media.label}
        </figcaption>
      </figure>
    );
  }
  const Icon = media.kind === "video" ? PlayCircle : ImageIcon;
  return (
    <div className="grid aspect-video w-full place-items-center rounded-xl border border-dashed border-border bg-surface-accent">
      <div className="flex flex-col items-center gap-2 text-muted">
        <Icon size={32} />
        <span className="text-sm">{media.label}</span>
      </div>
    </div>
  );
}
