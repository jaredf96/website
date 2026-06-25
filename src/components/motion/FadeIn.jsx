import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, VIEWPORT } from "../../lib/motion";

/**
 * Scroll-reveal wrapper: fades + rises into view once.
 * Respects prefers-reduced-motion (renders in final state, no transform).
 *
 * Props: as (tag), delay, y (rise distance), once, amount, className, ...rest
 */
export default function FadeIn({
  children,
  as = "div",
  delay = 0,
  y = 16,
  once = VIEWPORT.once,
  amount = VIEWPORT.amount,
  className,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: VIEWPORT.margin }}
      transition={{ duration: DURATION.base, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
