import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedCard from "../motion/AnimatedCard";
import TechBadge from "./TechBadge";
import ProjectActions from "./ProjectActions";

/**
 * Project card for the Work index.
 * variant="featured" shows highlights + metrics; "smaller" is compact.
 */
export default function ProjectCard({ project, variant = "featured" }) {
  const featured = variant === "featured";
  const caseStudyPath = `/work/${project.slug}`;

  return (
    <AnimatedCard className="group flex h-full flex-col rounded-xl border border-border bg-surface-card p-6 shadow-soft transition-shadow duration-(--duration-medium) hover:shadow-medium sm:p-7">
      <div className="flex items-center gap-2">
        {project.flagship && (
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
            Flagship
          </span>
        )}
        <span className="text-xs text-muted">{project.year}</span>
      </div>

      <h3 className="mt-2 text-xl font-bold sm:text-2xl">
        <Link
          to={caseStudyPath}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
        >
          {project.name}
          <ArrowUpRight
            size={18}
            className="text-muted transition-transform duration-(--duration-medium) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </Link>
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>

      <p className="mt-4 text-muted">{project.summary}</p>

      {featured && project.highlights?.length > 0 && (
        <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
          {project.highlights.slice(0, 4).map((h) => (
            <li key={h} className="flex gap-2 text-sm text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {featured && project.metrics?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-8">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-lg font-semibold">{m.value}</div>
              <div className="text-xs text-muted">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
      </div>

      {/* Push actions to the bottom so cards in a row align */}
      <div className="mt-auto pt-6">
        <ProjectActions project={project} />
      </div>
    </AnimatedCard>
  );
}
