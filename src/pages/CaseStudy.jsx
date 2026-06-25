import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProject } from "../data/projects";
import FadeIn from "../components/motion/FadeIn";
import TechBadge from "../components/work/TechBadge";
import ProjectActions from "../components/work/ProjectActions";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <article className="mx-auto max-w-3xl py-12 sm:py-16">
      <Link
        to="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} />
        Back to Work
      </Link>

      {/* Header */}
      <FadeIn className="mt-6 max-w-3xl">
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

      {/* Sections (ids match the deep-link anchors in projects.js) */}
      <div className="mt-12 max-w-3xl space-y-12">
        {project.caseStudy.sections.map((section) => (
          <FadeIn as="section" key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            {section.body?.map((para, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted">
                {para}
              </p>
            ))}
            {section.bullets?.length > 0 && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </FadeIn>
        ))}
      </div>
    </article>
  );
}
