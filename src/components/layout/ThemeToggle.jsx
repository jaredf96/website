import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { EASE } from "../../lib/motion";

/**
 * Animated light/dark toggle. Crossfades + rotates between sun and moon.
 * `withLabel` adds a text label (used in the mobile sidebar).
 */
export default function ThemeToggle({ isDark, onToggle, withLabel = false, className = "" }) {
  const reduce = useReducedMotion();
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-2 rounded-base text-text transition-colors ${
        withLabel ? "w-full px-3 py-2 hover:bg-surface-accent" : "p-2 hover:text-accent"
      } ${className}`}
    >
      <span className="relative grid h-5 w-5 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            className="absolute inline-flex"
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </motion.span>
        </AnimatePresence>
      </span>
      {withLabel && (
        <span className="text-sm font-medium">{isDark ? "Light mode" : "Dark mode"}</span>
      )}
    </button>
  );
}
