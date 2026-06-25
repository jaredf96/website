import { motion, useReducedMotion } from "motion/react";
import {
  DURATION,
  EASE,
  VIEWPORT,
  staggerContainerVariants,
} from "../../lib/motion";

/**
 * Reveals children in sequence as the container scrolls into view.
 * Use with <StaggerItem> children. Degrades to a plain element under
 * prefers-reduced-motion.
 */
export function StaggerContainer({
  children,
  as = "div",
  stagger = 0.08,
  delayChildren = 0,
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
      variants={staggerContainerVariants(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: VIEWPORT.margin }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({ children, as = "div", y = 16, className, ...rest }) {
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
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
