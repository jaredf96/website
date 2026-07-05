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
          ],
          media: { kind: "video", label: "Demo walkthrough — coming soon" },
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
          ],
          media: { kind: "image", label: "Sample scored output — coming soon" },
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
          ],
          media: { kind: "image", label: "Dashboard preview — coming soon" },
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

  {
    slug: "caltracker",
    name: "CalTracker",
    tagline: "Accuracy-first calorie & macro logging",
    group: "featured",
    year: "2026",
    status: "private",
    repo: null,
    repoNote: "Private repository. Case study available.",
    summary:
      "A personal calorie and macro tracker built for speed of daily entry, where accuracy comes from weighing grams — every food stores per-100g macros and every total is derived, never trusted from a label.",
    context:
      "Most food trackers optimize for database size and accept whatever numbers the database claims. CalTracker inverts that: a kitchen scale is the source of truth, imported data is quarantined until reviewed, and logging a meal takes seconds.",
    role: "Solo — product, data model, full-stack build.",
    tech: ["SvelteKit", "Svelte 5", "TypeScript", "Supabase", "Tailwind CSS", "ZXing", "Vitest"],
    highlights: [
      "Per-100g data model: totals always derived as grams ÷ 100 × per-100g",
      "Four capture paths: barcode camera scan, label entry, USDA search, manual",
      "Imported/scanned data flagged 'needs review' until confirmed",
      "Postgres with row-level security via Supabase Auth (SSR)",
      "Six unit-test suites: nutrition math, USDA + Open Food Facts clients, auth guard, DB layer",
    ],
    metrics: [],
    actions: [
      { kind: "case-study", label: "View Case Study", to: "/work/caltracker" },
      { kind: "architecture", label: "Data Model", to: "/work/caltracker#model" },
      { kind: "demo", label: "Capture Flow", to: "/work/caltracker#capture" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "CalTracker is a single-user calorie and macro logger built around one conviction: the kitchen scale is the only number you should trust. Label and database values are starting points, not truth.",
            "The product goal is speed — logging a weighed meal should take seconds — without ever compromising the integrity of the daily totals.",
          ],
        },
        {
          id: "model",
          title: "Accuracy-First Data Model",
          body: [
            "Every food stores macros per 100g, and every logged total is derived at read time as amount ÷ 100 × per-100g. Nothing user-facing is ever a stored, editable total — so a corrected food definition retroactively fixes every meal that used it.",
          ],
          bullets: [
            "Per-100g as the single canonical representation for all foods",
            "Derived totals — no denormalized numbers to drift out of sync",
            "Imported and scanned foods are flagged 'needs review' until explicitly confirmed",
            "Postgres with row-level security; auth via Supabase SSR helpers",
          ],
        },
        {
          id: "capture",
          title: "Fast Capture",
          body: [
            "Daily use lives or dies on entry friction, so there are four ways in: scan a barcode with the camera (ZXing), transcribe a nutrition label, search USDA FoodData Central, or enter manually. All four converge on the same review step before anything is trusted.",
          ],
          media: { kind: "image", label: "Capture flow — coming soon" },
        },
        {
          id: "testing",
          title: "Testing & Tradeoffs",
          body: [
            "The parts that can silently lie are the parts under test: the nutrition math, the USDA and Open Food Facts API clients, the auth guard, and the database layer — six Vitest suites in strict TypeScript.",
            "Notable tradeoffs: deriving totals costs reads but eliminates a whole class of stale-data bugs; quarantining imports adds a tap but keeps garbage out of the log; and database errors are propagated to the UI rather than rendering empty states that look like truth.",
          ],
        },
      ],
    },
  },

  {
    slug: "gym-tracker",
    name: "Personal Gym Tracker",
    tagline: "Local-first PWA with a deterministic progression engine",
    group: "featured",
    year: "2026",
    status: "private",
    repo: null,
    repoNote: "Private repository. Case study available.",
    summary:
      "A local-first, offline-capable PWA for fast workout logging — with a deterministic, rule-based progressive-overload engine that explains every suggestion, and optional cloud sync when you want it.",
    context:
      "A 'Notes-app upgrade' for the gym: log sets in seconds, see last session at a glance, and get progression suggestions you can actually audit — computed by rules, not vibes. Data lives on-device and the app works fully offline; Supabase sync is strictly opt-in.",
    role: "Solo — product, engine design, frontend, sync.",
    tech: ["React", "TypeScript", "Dexie (IndexedDB)", "PWA", "Supabase", "Vitest"],
    highlights: [
      "Deterministic progression engine — nine rule modules covering progression, deloads, rotation, volume, and readiness flags",
      "Local-first: IndexedDB via Dexie, fully offline, installable as a PWA",
      "Optional Supabase sync with row-level security — zero config runs local-only",
      "Last-session comparison, exercise swaps, session editing, and plate math",
      "Engine behaviors covered by a Vitest suite; delivered in hardening phases (data safety → engine truthfulness → UX)",
    ],
    metrics: [],
    actions: [
      { kind: "case-study", label: "View Case Study", to: "/work/gym-tracker" },
      { kind: "scoring", label: "Progression Engine", to: "/work/gym-tracker#engine" },
      { kind: "architecture", label: "Local-First Sync", to: "/work/gym-tracker#sync" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "A mobile-first PWA for tracking gym progress, seeded from the 4-day upper/lower split I actually run. The design bar was simple: logging a set must be faster than the rest timer, and every progression suggestion must be explainable.",
          ],
        },
        {
          id: "engine",
          title: "Deterministic Progression Engine",
          body: [
            "Progressive overload is handled by a rule-based engine, deliberately not an ML model: given your history, it produces the same suggestion every time, and each rule can be read, tested, and argued with.",
            "The engine is decomposed into nine focused modules — progression, deload, rotation, schedule, volume, comparison, readiness flags, analysis, and stats — each independently unit-tested with Vitest.",
          ],
        },
        {
          id: "sync",
          title: "Local-First Architecture & Optional Sync",
          body: [
            "All data lives on-device in IndexedDB (via Dexie), so the app is fully functional offline and installs to the home screen as a PWA. Cloud sync is strictly additive: with no environment variables set, there is no login and no network dependency; with Supabase configured, you get accounts and per-user row-level-secured persistence.",
          ],
          bullets: [
            "IndexedDB via Dexie with live React queries (dexie-react-hooks)",
            "First launch seeds the exercise library and program from a spreadsheet template",
            "Sync is opt-in by configuration — local-only remains the default path",
            "Row-level security scopes every synced row to its owner",
          ],
        },
        {
          id: "tradeoffs",
          title: "Tradeoffs & Discipline",
          body: [
            "Deterministic rules over ML: less flashy, but auditable, testable, and trustworthy at 6am with a barbell loaded. Local-first over cloud-first: sync complexity is real, but the app never blocks on a network it doesn't need.",
            "The build was delivered in explicit hardening phases — data-safety for sync/seeding/backup first, then engine truthfulness fixes, then UX polish — with the engine's behavior locked down by tests before the interface got attention.",
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
          ],
          media: { kind: "image", label: "Bot in action — coming soon" },
        },
      ],
    },
  },

  {
    slug: "plane-crash-analysis",
    name: "Plane Crash Analysis",
    tagline: "Failure-mode themes from a century of crashes",
    group: "smaller",
    year: "2023",
    status: "public",
    repo: null,
    repoNote: null,
    summary:
      "An exploratory analysis of ~5,200 aviation accidents (1908–2009) that uses unsupervised NLP to surface recurring failure-mode themes from free-text crash summaries.",
    context:
      "Originally a coursework project — reworked: cleaned data handling, reframed as descriptive theme discovery (not prediction), with written findings and honest limitations.",
    role: "Solo.",
    tech: ["Python", "Pandas", "scikit-learn", "TF-IDF", "K-Means", "PCA", "Matplotlib"],
    highlights: [
      "Cleaned a messy historical dataset (year/country parsing, safe survivor derivation)",
      "TF-IDF + K-Means clustering over thousands of crash summaries",
      "Five interpretable failure-mode themes (engine, weather, terrain, takeoff, approach)",
      "Reframed 'cause prediction' as honest nearest-theme assignment",
    ],
    metrics: [],
    actions: [
      { kind: "case-study", label: "View Case Study", to: "/work/plane-crash-analysis" },
      {
        kind: "notes",
        label: "Notebook",
        to: "/notebooks/plane-crash-analysis.ipynb",
        external: true,
      },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "A reworked coursework project. It analyzes roughly a century of aviation accidents (1908–2009) and asks a focused question: what recurring failure modes show up across thousands of free-text crash summaries?",
            "Rather than predicting causes, it uses unsupervised NLP to let the themes emerge — and is careful to say what the method can and can't claim.",
          ],
        },
        {
          id: "data",
          title: "Data & Cleaning",
          body: [
            "The raw dataset is messy: inconsistent dates, free-text locations, and sparse early records. Getting it analysis-ready was most of the work.",
          ],
          bullets: [
            "Parsed crash year and country from inconsistent Date/Location strings",
            "Coerced Aboard/Fatalities/Ground to numerics",
            "Derived Survivors = Aboard − Fatalities — only where both are known, clipped at zero so bad records can't go negative",
          ],
        },
        {
          id: "themes",
          title: "Failure-Mode Themes",
          body: [
            "TF-IDF over the crash summaries feeds a K-Means model (k=5); a 2-D projection makes the clusters legible. The five clusters are interpretable and stable:",
          ],
          bullets: [
            "Engine / mechanical failure (often around takeoff)",
            "Approach & landing (runway, altitude, control)",
            "Weather & poor visibility (fog, adverse conditions)",
            "En-route loss over terrain (mountains, ocean, disappearance)",
            "Cargo / short-flight takeoff incidents",
          ],
          media: { kind: "image", label: "Cluster projection (TF-IDF + K-Means) — coming soon" },
        },
        {
          id: "findings",
          title: "What It Shows",
          body: [
            "The themes line up with well-known aviation risk categories, which is a good sanity check that the unsupervised method found something real.",
          ],
          bullets: [
            "Weather and terrain dominate en-route losses; mechanical issues cluster around takeoff",
            "Limitations: k was chosen heuristically; summaries are post-hoc human text (reporting bias); the result is descriptive, not causal",
            "Next steps: silhouette/elbow to justify k, topic modeling (NMF/LDA), and tracking how the theme mix shifts by decade",
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

/** Previous/next project for case-study footer navigation. */
export const getAdjacent = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i >= 0 && i < projects.length - 1 ? projects[i + 1] : null,
  };
};

/** True when a public, intentionally-clean repo should be linked. */
export const hasPublicRepo = (project) => Boolean(project.repo);
