import FadeIn from "../components/motion/FadeIn";
import { card } from "../lib/ui";

// Each item here is demonstrated by a project on the Work page — no aspirational claims.
const toolkit = [
  {
    area: "Cloud & Backend",
    items: [
      "AWS (DynamoDB, Boto3, cost & pricing APIs)",
      "FastAPI service design",
      "Docker containerization",
      "Supabase / PostgreSQL with row-level security",
    ],
  },
  {
    area: "Full-Stack Web",
    items: [
      "React and SvelteKit (Svelte 5) in TypeScript",
      "Tailwind CSS design systems",
      "Local-first / offline PWA architecture",
      "Auth and per-user data isolation",
    ],
  },
  {
    area: "Data & Machine Learning",
    items: [
      "pandas and scikit-learn pipelines",
      "NLP: TF-IDF, clustering, skill taxonomies",
      "Data visualization and QA dashboards",
      "Honest evaluation — limitations stated, not hidden",
    ],
  },
  {
    area: "Engineering Practice",
    items: [
      "Unit testing with Vitest and Pytest",
      "Strict TypeScript",
      "Git/GitHub workflow, Vercel deployment",
      "Deterministic, explainable system design",
    ],
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl py-12 sm:py-16">
      {/* Hero */}
      <FadeIn className={`${card} bg-surface-accent p-8 sm:p-10`}>
        <h1 className="text-4xl font-bold sm:text-5xl">About Me</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Computer Science graduate with a focus on data science and software
          engineering.
        </p>
      </FadeIn>

      {/* Bio */}
      <FadeIn className={`${card} mt-8 p-8`}>
        <h2 className="text-2xl font-semibold text-accent">Background</h2>
        <div className="mt-5 space-y-4 leading-relaxed text-muted">
          <p>
            I&apos;m a Computer Science grad (B.S.) specialized in data science
            and software engineering, with a strong interest in artificial
            intelligence, systems architecture, and big data. My foundation
            combines the theory of computer science with the practice of actually
            shipping it.
          </p>
          <p>
            I take a systems-oriented view of software: how components interact
            across the stack, and how to design for robustness, maintainability,
            and performance. I care about solutions that are correct, tested, and
            explainable — not just demos.
          </p>
          <p>
            Outside of work I enjoy gaming with friends, calisthenics, and side
            projects. A few favorites: the Civilization series, Northgard, Marvel
            Rivals, and Ark: Survival Evolved.
          </p>
        </div>
      </FadeIn>

      {/* Technical expertise */}
      <FadeIn className={`${card} mt-8 p-8`}>
        <h2 className="text-2xl font-semibold text-accent">What I Work With</h2>
        <p className="mt-2 text-sm text-muted">
          Everything below is demonstrated in a project on the Work page.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {toolkit.map(({ area, items }) => (
            <div key={area}>
              <h3 className="text-lg font-medium">{area}</h3>
              <ul className="mt-2 space-y-1.5">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
