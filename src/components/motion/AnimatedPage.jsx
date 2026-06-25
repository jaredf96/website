import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "../../lib/motion";

/**
 * Wraps a route's content for enter/exit transitions.
 * Use inside <AnimatePresence mode="wait"> keyed by the route location.
 */
export default function AnimatedPage({ children, className }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
