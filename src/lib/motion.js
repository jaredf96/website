// Shared animation tokens + variants for Motion for React.
// Keep these values restrained — subtle rise + fade, quick springs.

// Easing tuned to feel crisp but soft (matches --ease-snappy in spirit).
export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.25,
  base: 0.45,
  slow: 0.6,
};

// Default viewport config for scroll reveals: animate once, a little early.
export const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -10% 0px" };

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
