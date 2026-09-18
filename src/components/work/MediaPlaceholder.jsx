import { useEffect, useRef, useState } from "react";
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
          width={media.width}
          height={media.height}
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
 * A walkthrough player. Deliberately plain: real controls, no autoplay, no
 * loop, and `preload="metadata"` so a visitor who never presses play pulls the
 * poster and a few KB of headers instead of the whole file.
 *
 * The cut currently on the site carries no audio track at all, which `media.note`
 * states on the page. When the narrated cut lands: swap the file, point
 * `media.captions` at a .vtt so the <track> below wakes up, and delete the note.
 * Nothing in this component has to change for that.
 */
function Walkthrough({ media, className }) {
  const ref = useRef(null);

  const seek = (seconds) => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = seconds;
    // Clicking a chapter is an intent to watch from there. The file has no
    // audio track, so starting playback cannot ambush anyone with sound.
    el.play().catch(() => {});
  };

  return (
    <figure className={`m-0 ${className}`}>
      <video
        ref={ref}
        controls
        preload="metadata"
        playsInline
        poster={media.poster}
        width={media.width}
        height={media.height}
        className="h-auto w-full rounded-xl border border-border bg-black"
      >
        <source src={media.src} type="video/mp4" />
        {media.captions && (
          <track kind="captions" src={media.captions} srcLang="en" label="English" default />
        )}
        Your browser cannot play this video.
      </video>

      {/* The chapter list lives in the figcaption on purpose: the recording is a
          1080p capture of a dense UI, unreadable on a phone, so the claims it
          makes have to exist as text beside it rather than only in pixels. */}
      <figcaption className="mt-3">
        <p className="text-sm text-muted">{media.label}</p>

        {(media.duration || media.note) && (
          <p className="mt-1 text-xs text-muted">
            {media.duration && (
              <span className="font-mono tabular-nums text-accent">{media.duration}</span>
            )}
            {media.duration && media.note ? " · " : null}
            {media.note}
          </p>
        )}

        {media.chapters?.length > 0 && (
          <ol className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {media.chapters.map((c) => (
              <li key={c.at}>
                <button
                  type="button"
                  onClick={() => seek(c.seconds)}
                  aria-label={`Play from ${c.at}: ${c.title}`}
                  className="flex w-full gap-3 rounded-base bg-transparent px-2 py-1.5 text-left transition-colors duration-(--duration-medium) hover:bg-surface-accent"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-xs tabular-nums text-accent">
                    {c.at}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-text">{c.title}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                      {c.body}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * Case-study media. With `media.src` renders the real thing: a player for
 * `kind: "video"`, otherwise the image (captioned, click to enlarge). Without
 * `src`, a framed "coming soon" placeholder.
 * Spacing/layout is owned by the parent (CaseStudySection).
 *
 * media: { kind: "video" | "image", label, src?, width?, height?,
 *          poster?, duration?, note?, captions?, chapters? }
 */
export default function MediaPlaceholder({ media, className = "" }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  if (media.kind === "video" && media.src) {
    return <Walkthrough media={media} className={className} />;
  }

  if (media.src) {
    return (
      <>
        <figure className={`m-0 ${className}`}>
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
              width={media.width}
              height={media.height}
              loading="lazy"
              className="h-auto w-full rounded-xl border border-border bg-white transition-colors duration-(--duration-medium) hover:border-accent"
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
    <div
      className={`grid aspect-video w-full place-items-center rounded-xl border border-dashed border-border bg-surface-accent ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-muted">
        <Icon size={32} />
        <span className="text-sm">{media.label}</span>
      </div>
    </div>
  );
}
