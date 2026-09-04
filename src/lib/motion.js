// Shared animation tokens + variants for Motion for React.
// Keep these values restrained: subtle rise + fade, quick springs.

// Easing tuned to feel crisp but soft (matches --ease-snappy in spirit).
export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.25,
  base: 0.45,
  slow: 0.6,
};

// Default viewport config for scroll reveals: animate once, a little early.
// `amount` is a fraction of the ELEMENT, not of the viewport, so a numeric
// threshold breaks on anything taller than the screen: the Work index's
// featured list is ~2700px, of which only ~400px is on screen at rest, and it
// would sit invisible until you scrolled. Past ~5x the viewport height the
// ratio can never reach a threshold like 0.2 at all. "some" reveals as soon as
// the element enters; the negative bottom margin still holds it back a little.
export const VIEWPORT = { once: true, amount: "some", margin: "0px 0px -10% 0px" };

// Reusable variants ---------------------------------------------------------

export const fadeInVariants = (y = 16) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
});

export const staggerContainerVariants = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

// Gentle hover spring for interactive cards.
export const cardHoverSpring = { type: "spring", stiffness: 300, damping: 26, mass: 0.6 };
