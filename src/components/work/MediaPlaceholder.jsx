import { PlayCircle, Image as ImageIcon } from "lucide-react";

/**
 * Framed placeholder for case-study demo media. Swap for a real <video>/<img>
 * (or embed) once assets exist — keep the same outer sizing.
 *
 * media: { kind: "video" | "image", label }
 */
export default function MediaPlaceholder({ media }) {
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
