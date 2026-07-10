import { PlayCircle, Image as ImageIcon } from "lucide-react";

/**
 * Case-study media. With `media.src` renders the real image; without it,
 * renders a framed "coming soon" placeholder.
 *
 * media: { kind: "video" | "image", label, src? }
 */
export default function MediaPlaceholder({ media }) {
  if (media.src) {
    return (
      <img
        src={media.src}
        alt={media.label}
        className="mt-5 w-full rounded-xl border border-border bg-white"
      />
    );
  }
  const Icon = media.kind === "video" ? PlayCircle : ImageIcon;
  return (
    <div className="mt-5 grid aspect-video w-full place-items-center rounded-xl border border-dashed border-border bg-surface-accent">
      <div className="flex flex-col items-center gap-2 text-muted">
        <Icon size={32} />
        <span className="text-sm">{media.label}</span>
      </div>
    </div>
  );
}
