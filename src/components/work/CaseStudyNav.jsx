import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Sticky in-page nav for a case study. Highlights the section currently in
 * view (scrollspy) and smooth-scrolls on click.
 */
export default function CaseStudyNav({ sections, className = "" }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top of the active band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <nav className={className} aria-label="On this page">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px block border-l-2 py-1 pl-3 text-sm transition-colors duration-(--duration-medium) ${
                  isActive
                    ? "border-accent font-medium text-accent"
                    : "border-transparent text-muted hover:text-text"
                }`}
              >
                {s.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
