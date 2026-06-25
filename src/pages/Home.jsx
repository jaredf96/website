import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "../data/projects";
import ProjectCard from "../components/work/ProjectCard";
import FadeIn from "../components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "../components/motion/Stagger";

const btnPrimary =
  "inline-flex items-center gap-2 rounded-base bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-(--duration-medium) hover:bg-accent-hover";
const btnOutline =
  "inline-flex items-center gap-2 rounded-base border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors duration-(--duration-medium) hover:border-accent hover:text-accent";

export default function Home() {
  return (
    <div className="py-10 sm:py-14">
      {/* Hero */}
      <section className="grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-[1.25fr_1fr]">
        <StaggerContainer stagger={0.09} amount={0.4}>
          <StaggerItem as="p" className="text-sm font-medium text-accent">
            Hi, I'm Jared 👋
          </StaggerItem>
          <StaggerItem
            as="h1"
            className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            I build software that solves{" "}
            <span className="text-accent">real problems</span>.
          </StaggerItem>
          <StaggerItem as="p" className="mt-5 max-w-xl text-lg text-muted">
            Computer Science grad focused on software engineering and data
            science. I like designing systems, testing them properly, and being
            able to explain the tradeoffs.
          </StaggerItem>
          <StaggerItem className="mt-8 flex flex-wrap gap-3">
            <Link to="/work" className={btnPrimary}>
              View My Work <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className={btnOutline}>
              Get in Touch
            </Link>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn delay={0.15} className="justify-self-center lg:justify-self-end">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-accent/10 blur-2xl"
            />
            <div className="relative h-60 w-60 overflow-hidden rounded-2xl ring-1 ring-border shadow-medium sm:h-72 sm:w-72">
              <img
                src="/canon.jpg"
                alt="Portrait of Jared Fulk"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Selected Work */}
      <section className="mt-16 sm:mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">Selected Work</h2>
          <Link
            to="/work"
            className="group inline-flex items-center gap-1 text-sm font-medium text-accent"
          >
            View all
            <ArrowRight
              size={16}
              className="transition-transform duration-(--duration-medium) group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <StaggerContainer className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} variant="smaller" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Closing CTA */}
      <FadeIn
        as="section"
        className="mt-20 rounded-2xl border border-border bg-surface-accent p-8 text-center sm:p-12"
      >
        <h2 className="text-2xl font-bold sm:text-3xl">Let's build something.</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          I'm open to roles and collaborations across software and data. Happy to
          walk through any of these projects in depth.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className={btnPrimary}>
            Get in Touch
          </Link>
          <Link to="/resume" className={btnOutline}>
            View Résumé
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
