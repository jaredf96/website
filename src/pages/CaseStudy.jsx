import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, getAdjacent } from "../data/projects";
import FadeIn from "../components/motion/FadeIn";
import TechBadge from "../components/work/TechBadge";
import ProjectActions from "../components/work/ProjectActions";
import CaseStudyNav from "../components/work/CaseStudyNav";
import CaseStudySection from "../components/work/CaseStudySection";

function PrevNextNav({ prev, next }) {
  if (!prev && !next) return null;
  return (
    <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          to={`/work/${prev.slug}`}
          className="group rounded-xl border border-border p-4 transition-colors hover:border-accent"
        >
          <span className="flex items-center gap-1 text-xs text-muted">
            <ArrowLeft size={14} /> Previous
          </span>
          <span className="mt-1 block font-medium transition-colors group-hover:text-accent">
            {prev.name}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          to={`/work/${next.slug}`}
          className="group rounded-xl border border-border p-4 text-right transition-colors hover:border-accent sm:col-start-2"
        >
          <span className="flex items-center justify-end gap-1 text-xs text-muted">
            Next <ArrowRight size={14} />
          </span>
          <span className="mt-1 block font-medium transition-colors group-hover:text-accent">
            {next.name}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <Navigate to="/work" replace />;

  const sections = project.caseStudy.sections;
  const { prev, next } = getAdjacent(slug);
  const showNav = sections.length >= 3;

  return (
    <article className="mx-auto max-w-5xl py-12 sm:py-16">
      <Link
        to="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} />
        Back to Work
      </Link>

      {/* Header */}
      <FadeIn className={`mt-6 max-w-2xl ${showNav ? "" : "mx-auto"}`}>
        <p className="text-sm font-medium text-accent">{project.tagline}</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{project.name}</h1>
        <p className="mt-4 text-lg text-muted">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>
        <div className="mt-6">
          <ProjectActions project={project} />
        </div>
      </FadeIn>

      {/* Body: sticky nav (>= 3 sections) + sections */}
      <div className={`mt-12 ${showNav ? "lg:flex lg:gap-12" : ""}`}>
        {showNav && (
          <CaseStudyNav
            sections={sections}
            className="hidden lg:block w-44 shrink-0 self-start sticky top-28"
          />
        )}
        <div className={`min-w-0 max-w-2xl space-y-14 lg:flex-1 ${showNav ? "" : "mx-auto"}`}>
          {sections.map((section) => (
            <CaseStudySection key={section.id} section={section} />
          ))}
          <PrevNextNav prev={prev} next={next} />
        </div>
      </div>
    </article>
  );
}
