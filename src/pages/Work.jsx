import { featuredProjects, smallerBuilds } from "../data/projects";
import ProjectCard from "../components/work/ProjectCard";
import FadeIn from "../components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "../components/motion/Stagger";

export default function Work() {
  return (
    <div className="mx-auto max-w-5xl py-12 sm:py-16">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Work</h1>
        <p className="mt-3 text-lg text-muted">
          Case studies in identifying real problems, designing systems, and
          reasoning about the tradeoffs.
        </p>
      </FadeIn>

      <section className="mt-12 sm:mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Featured Projects
        </h2>
        <StaggerContainer className="mt-5 grid gap-6">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} variant="featured" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Smaller Builds
        </h2>
        <StaggerContainer className="mt-5 grid gap-6 sm:grid-cols-2">
          {smallerBuilds.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} variant="smaller" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
