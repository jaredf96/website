// Single source of truth for the portfolio's work.
//
// Conventions
// -----------
// - `repo` stays null unless a repository is intentionally cleaned up and public.
//   The UI only renders a GitHub button when `repo` is set; otherwise it shows
//   `repoNote` (e.g. "Private repository. Case study available.").
// - `actions[].kind` drives the button icon/label and, for case-study deep
//   links, the `to` points at /work/:slug#<section.id>.
// - `caseStudy.sections[].id` MUST match the anchor used in an action's `to`.
//
// Copy below is a first draft based on the project briefs — refine freely.

/** @typedef {"private"|"public"} RepoStatus */

export const projects = [
  // ───────────────────────── Featured ─────────────────────────
  {
    slug: "shut-it-down",
    name: "Shut It Down",
    tagline: "Cloud Lab Cleanup Dashboard",
    group: "featured",
    flagship: true,
    year: "2025",
    status: "private",
    repo: null,
    repoNote: "Private repository. Case study available.",
    summary:
      "A cloud lab manager that continuously scans AWS accounts for expensive or risky resources and walks users through safe, reversible cleanup.",
    context:
      "Cloud lab and sandbox accounts accumulate forgotten resources — idle GPU instances, unattached volumes, public buckets — that quietly burn money and widen the attack surface. Shut It Down turns that sprawl into a prioritized, actionable list.",
    role: "Solo — product, architecture, backend, and infrastructure.",
    tech: ["AWS", "FastAPI", "Python", "Docker", "DynamoDB", "Pytest", "Boto3"],
    highlights: [
      "Cost engine estimates real spend per resource using AWS pricing data",
      "Risk classification flags public exposure, idle spend, and policy drift",
      "Guided, reversible cleanup with confirmation and audit trail",
      "Alerting for threshold breaches and newly risky resources",
      "Designed for multi-account / multi-tenant scanning",
      "Tested cost and risk logic with a Pytest suite",
    ],
    metrics: [
      { label: "Resource types scanned", value: "12+" },
      { label: "Avg. scan latency", value: "< 5s" },
    ],
    actions: [
      { kind: "case-study", label: "View Case Study", to: "/work/shut-it-down" },
      { kind: "architecture", label: "Architecture", to: "/work/shut-it-down#architecture" },
      { kind: "demo", label: "Demo Walkthrough", to: "/work/shut-it-down#demo" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "Shut It Down is a cloud lab cleanup dashboard: it scans AWS accounts, surfaces resources that are expensive or risky, and guides the user through cleaning them up safely.",
            "The goal was a tool that does more than list resources — it ranks them by cost and risk, explains why each one matters, and makes the safe action obvious.",
          ],
        },
        {
          id: "problem",
          title: "Problem & Goals",
          body: [
            "Lab accounts drift. People spin up instances for an experiment and forget them; buckets get opened for a quick test and stay open.",
          ],
          bullets: [
            "Detect costly resources (idle compute, orphaned storage) and estimate real spend.",
            "Detect risky resources (public access, over-broad policies).",
            "Make cleanup reversible and auditable, not a scary one-way delete.",
          ],
        },
        {
          id: "architecture",
          title: "Architecture",
          body: [
            "A FastAPI service orchestrates scans via Boto3, normalizes findings, and persists state in DynamoDB. The whole thing is containerized with Docker for reproducible local and deployed runs.",
            "Scanning is structured per-account so the same pipeline extends to multi-account and multi-tenant setups.",
          ],
          bullets: [
            "FastAPI API layer + background scan workers",
            "DynamoDB for findings, history, and per-tenant config",
            "Pricing + risk classification as separate, testable modules",
            "Docker for parity between local dev and deployment",
          ],
        },
        {
          id: "tradeoffs",
          title: "Technical Tradeoffs",
          body: [
            "Key decisions and why: DynamoDB over a relational store for simple, fast per-account lookups; precomputed cost estimates over live pricing calls on every render; reversible cleanup flows over immediate deletion.",
          ],
        },
        {
          id: "demo",
          title: "Demo Walkthrough",
          body: [
            "A walkthrough of a scan: discovering resources, reading the cost and risk ranking, and stepping through a guided cleanup.",
            "(Demo video / screenshots to be embedded here.)",
          ],
        },
      ],
    },
  },

  {
    slug: "resume-jd-matcher",
    name: "Explainable Resume / JD Matching Tool",
    tagline: "Explainable screening & tailoring engine",
    group: "featured",
    year: "2025",
    status: "private",
    repo: null,
    repoNote: "Code available upon request.",
    summary:
      "An explainable resume screening and tailoring engine that scores a resume against a job description and shows its reasoning — direct matches, transferable skills, and evidence strength.",
    context:
      "Most matchers reward keyword stuffing and hide their logic. This one separates genuine matches from transferable ones, weighs the evidence behind each, and explains every point it awards.",
    role: "Solo — design, NLP/scoring logic, and tooling.",
    tech: ["Python", "NLP", "spaCy", "FastAPI", "Skill taxonomies"],
    highlights: [
      "Direct match vs. transferability scored separately",
      "Evidence strength weighting per matched skill",
      "Anti-keyword-dump logic resists gaming",
      "Skill taxonomy maps related and adjacent skills",
      "JD parsing extracts requirements and seniority signals",
      "Every score is explained, not just emitted",
    ],
    metrics: [],
    actions: [
      { kind: "case-study", label: "View Case Study", to: "/work/resume-jd-matcher" },
      { kind: "scoring", label: "Scoring Logic", to: "/work/resume-jd-matcher#scoring" },
      { kind: "demo", label: "Demo Output", to: "/work/resume-jd-matcher#demo" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "An engine that reads a resume and a job description and produces an explainable match: what lines up directly, what transfers, and how strong the evidence is for each.",
          ],
        },
        {
          id: "scoring",
          title: "Scoring Logic",
          body: [
            "Scoring is deliberately not a keyword count. Each requirement from the JD is matched against the resume and classified as a direct match or a transferable one, then weighted by how much supporting evidence the resume actually provides.",
          ],
          bullets: [
            "Direct match vs. transferability as distinct signals",
            "Evidence strength weighting (mention vs. demonstrated outcome)",
            "Anti-keyword-dump penalties for unsupported claims",
            "Skill taxonomy to credit adjacent/related skills fairly",
          ],
        },
        {
          id: "parsing",
          title: "JD Parsing",
          body: [
            "The job description is parsed into structured requirements — must-haves, nice-to-haves, and seniority signals — so scoring compares like for like.",
          ],
        },
        {
          id: "demo",
          title: "Demo Output",
          body: [
            "Example output showing a scored resume with per-skill explanations and tailoring suggestions.",
            "(Sample report / screenshots to be embedded here.)",
          ],
        },
      ],
    },
  },

  {
    slug: "winston-lutz-qa",
    name: "Winston-Lutz QA Dashboard",
    tagline: "QA & data visualization for linac QA",
    group: "featured",
    year: "2024",
    status: "private",
    repo: null,
    repoNote: "Private repository. Case study available.",
    summary:
      "A technical QA and data-visualization dashboard for Winston-Lutz medical linac QA workflows, turning specialized measurement data into clear, decision-ready visuals.",
    context:
      "Winston-Lutz testing checks the alignment of a medical linear accelerator. The data is precise and domain-heavy; the dashboard makes trends and tolerances legible at a glance.",
    role: "Solo — data visualization, dashboard design, and domain research.",
    tech: ["Python", "Data Visualization", "Pandas", "Dashboarding"],
    highlights: [
      "Clear visualization of alignment measurements and trends",
      "Dashboard design focused on tolerance and pass/fail clarity",
      "Technical communication of a specialized QA workflow",
      "Required learning the clinical domain from the ground up",
    ],
    metrics: [],
    actions: [
      { kind: "case-study", label: "View Case Study", to: "/work/winston-lutz-qa" },
      { kind: "dashboard", label: "Dashboard Preview", to: "/work/winston-lutz-qa#dashboard" },
      { kind: "notes", label: "Technical Notes", to: "/work/winston-lutz-qa#notes" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "A dashboard for Winston-Lutz QA: it ingests alignment measurement data and presents it so a physicist can quickly judge whether a machine is within tolerance.",
          ],
        },
        {
          id: "dashboard",
          title: "Dashboard Preview",
          body: [
            "The dashboard prioritizes clarity: tolerance bands, trend lines over time, and an unambiguous pass/fail read.",
            "(Dashboard screenshots to be embedded here.)",
          ],
        },
        {
          id: "notes",
          title: "Technical Notes",
          body: [
            "Notes on the data pipeline, the visualization choices, and what I had to learn about the clinical QA workflow to represent it honestly.",
          ],
        },
      ],
    },
  },

  // ───────────────────────── Smaller Builds ─────────────────────────
  {
    slug: "discord-game-alert-bot",
    name: "Discord Game Alert Bot",
    tagline: "Scheduled & event-based game alerts",
    group: "smaller",
    year: "2024",
    status: "private",
    repo: null,
    repoNote: "Code available upon request.",
    summary:
      "A practical automation bot that posts scheduled or event-based game alerts to Discord, with clean config and deployment handling.",
    context:
      "A small, genuinely useful build: reliable alerts on a schedule or trigger, configured through environment variables and deployed to run unattended.",
    role: "Solo.",
    tech: ["Python", "discord.py", "Scheduling", "Docker"],
    highlights: [
      "Discord automation for scheduled and event-based alerts",
      "Scheduling with sensible retry/failure behavior",
      "Config and secrets via environment variables",
      "Deployment thinking — built to run unattended",
    ],
    metrics: [],
    actions: [
      { kind: "summary", label: "View Summary", to: "/work/discord-game-alert-bot" },
      { kind: "demo", label: "Bot Demo", to: "/work/discord-game-alert-bot#demo" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Summary",
          body: [
            "A Discord bot that delivers game alerts on a schedule or in response to events, with configuration and deployment handled cleanly enough to leave running.",
          ],
        },
        {
          id: "demo",
          title: "Bot Demo",
          body: [
            "Example alerts and the configuration behind them.",
            "(Demo clip / screenshots to be embedded here.)",
          ],
        },
      ],
    },
  },

  {
    slug: "portfolio-rebuild",
    name: "Portfolio Rebuild",
    tagline: "A living frontend case study",
    group: "smaller",
    year: "2025",
    status: "public",
    // Repo intentionally omitted until it's cleaned up — see direction.
    repo: null,
    repoNote: "Code available upon request.",
    summary:
      "This site — a frontend case study in React, Tailwind, responsive design, theming, accessibility, and restrained, intentional animation.",
    context:
      "Treated as a real project, not a template: a design system in Tailwind v4, reusable Motion primitives, dark/light theming, and reduced-motion support throughout.",
    role: "Solo — design and build.",
    tech: ["React", "Vite", "Tailwind CSS", "Motion", "React Router"],
    highlights: [
      "Token-based design system with dark/light themes",
      "Reusable animation primitives (FadeIn, Stagger, AnimatedPage, AnimatedCard)",
      "Restrained, purposeful motion — reveals and hover states, no gimmicks",
      "Accessibility and prefers-reduced-motion as first-class concerns",
      "Responsive from mobile to desktop",
    ],
    metrics: [],
    actions: [
      { kind: "live", label: "Live Site", to: "/" },
      { kind: "case-study", label: "Case Study", to: "/work/portfolio-rebuild" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "A rebuild of this portfolio with a focus on craft: a real design system, reusable animation primitives, and motion that supports the content instead of distracting from it.",
          ],
        },
        {
          id: "approach",
          title: "Approach",
          body: [
            "Design tokens drive every color and surface; one accent, a calm neutral base, and a polished dark mode. Animation is centralized in four primitives so every reveal and transition feels consistent — and every one of them respects prefers-reduced-motion.",
          ],
        },
      ],
    },
  },
];

// ───────────────────────── Selectors ─────────────────────────

export const featuredProjects = projects.filter((p) => p.group === "featured");
export const smallerBuilds = projects.filter((p) => p.group === "smaller");

export const getProject = (slug) => projects.find((p) => p.slug === slug);

/** True when a public, intentionally-clean repo should be linked. */
export const hasPublicRepo = (project) => Boolean(project.repo);
