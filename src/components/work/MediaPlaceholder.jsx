import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PlayCircle, Image as ImageIcon, X } from "lucide-react";

function Lightbox({ media, onClose, reduce }) {
  // Close on Escape; lock page scroll while open.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={media.label}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-8"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close enlarged image"
        autoFocus
        className="absolute right-4 top-4 rounded-base bg-transparent p-2 text-white/80 transition-colors hover:text-white"
      >
        <X size={28} />
      </button>
      <motion.figure
        className="m-0 max-w-6xl"
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { scale: 0.96 }}
        animate={{ scale: 1 }}
        exit={reduce ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={media.src}
          alt={media.label}
          className="max-h-[85vh] w-auto max-w-full rounded-xl bg-white"
        />
        <figcaption className="mt-3 text-center text-sm text-white/80">
          {media.label}
        </figcaption>
      </motion.figure>
    </motion.div>,
    document.body
  );
}

/**
 * Case-study media. With `media.src` renders the real image (captioned,
 * click to enlarge); without it, a framed "coming soon" placeholder.
 * Spacing/layout is owned by the parent (CaseStudySection).
 *
 * media: { kind: "video" | "image", label, src? }
 */
export default function MediaPlaceholder({ media }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  if (media.src) {
    return (
      <>
        <figure className="m-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Enlarge image: ${media.label}`}
            className="block w-full cursor-zoom-in rounded-xl bg-transparent p-0"
          >
            <img
              src={media.src}
              alt={media.label}
              loading="lazy"
              className="w-full rounded-xl border border-border bg-white transition-colors duration-(--duration-medium) hover:border-accent"
            />
          </button>
          <figcaption className="mt-2 text-center text-xs text-muted">
            {media.label}
          </figcaption>
        </figure>
        <AnimatePresence>
          {open && <Lightbox media={media} onClose={() => setOpen(false)} reduce={reduce} />}
        </AnimatePresence>
      </>
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
