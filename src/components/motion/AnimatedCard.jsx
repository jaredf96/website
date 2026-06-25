import { motion, useReducedMotion } from "motion/react";
import { cardHoverSpring } from "../../lib/motion";

/**
 * Interactive card surface: subtle lift on hover/focus.
 * Pair with Tailwind `group`/`group-hover` inside for the arrow nudge and
 * shadow transition. Lift is disabled under prefers-reduced-motion.
 */
export default function AnimatedCard({ children, className, lift = -4, ...rest }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: lift }}
      whileFocus={reduce ? undefined : { y: lift }}
      transition={cardHoverSpring}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
