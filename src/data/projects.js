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
    tagline: "Read-only AWS scanner for forgotten lab resources",
    group: "featured",
    flagship: true,
    year: "2026",
    status: "public",
    repo: { href: "https://github.com/jaredf96/shut-it-down-aws", label: "View on GitHub" },
    repoNote: null,
    summary:
      "A self-hosted AWS scanner that finds resources left running after labs and tutorials, explains in plain English what each one costs, and can clean up on request — behind seven independent safety gates. The live demo needs no AWS account.",
    context:
      "Lab and sandbox accounts accumulate forgotten resources — idle instances, unattached volumes, unassociated Elastic IPs — that quietly burn money. Shut It Down turns that sprawl into a ranked, explained, actionable list for an individual, or an instructor overseeing student accounts.",
    role: "Solo — product, architecture, backend, frontend, and infrastructure.",
    tech: [
      "AWS",
      "Python",
      "FastAPI",
      "React",
      "DynamoDB",
      "Boto3",
      "CloudFormation",
      "Docker",
      "Pytest + moto",
    ],
    highlights: [
      "Seven read-only scanners with concurrent region sweeps — a 17-region scan runs in ~12s",
      "Minimum monthly exposure per resource at on-demand list prices — static price map with optional live Pricing API refinement",
      "Cross-account scanning via STS assume-role, tag-scoped IAM, and CloudFormation onboarding templates",
      "Guided cleanup behind seven gates: off by default, admin-only, typed confirmation, dry-run default, live precondition re-check, write-ahead audit",
      "Scan history, diffs between scans, and alerts for new billable or riskier resources",
      "219 offline backend tests (moto) + 65 frontend tests; the demo bundle carries no API client and no credentials, asserted in CI",
    ],
    metrics: [],
    actions: [
      {
        kind: "live",
        label: "Live Demo",
        to: "https://demo.jareds.codes",
        external: true,
      },
      { kind: "case-study", label: "View Case Study", to: "/work/shut-it-down" },
      { kind: "architecture", label: "Architecture", to: "/work/shut-it-down#architecture" },
      { kind: "demo", label: "See It Run", to: "/work/shut-it-down#demo" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "Shut It Down is a self-hosted, read-only AWS scanner for individuals and instructors: run it against your own account, or assume read-only roles into N student lab accounts. It finds what a lab left running, explains what each finding costs and why, keeps scan history and an audit trail, and can clean up on request.",
            "A public demo — the full frontend fed by generated fixture data, making no AWS calls and holding no credentials — lets anyone walk the real product, safety gates included, without an AWS account.",
          ],
        },
        {
          id: "problem",
          title: "Problem & Goals",
          body: [
            "Lab accounts drift. People spin up instances for an experiment and forget them; volumes outlive the instances they backed; Elastic IPs keep billing after everything they pointed at is gone.",
          ],
          bullets: [
            "Detect billable leftovers — idle compute, orphaned storage, unassociated addresses — and state a minimum monthly exposure for each.",
            "Explain every finding in plain English: why it costs money, and what the safe next action is.",
            "Make cleanup reversible and auditable, not a scary one-way delete.",
          ],
        },
        {
          id: "architecture",
          title: "Architecture",
          body: [
            "A layered FastAPI service — routes call services; services orchestrate scanners, pricing, notifiers, and repositories — over Boto3, with a single DynamoDB table holding scans, accounts, users, and the audit trail. Region sweeps run concurrently: a full 17-region scan takes about 12 seconds.",
            "Two deployment surfaces share one codebase. The public demo is a static build fed by fixtures the real scanners generated, with the API client tree-shaken out of the bundle — CI asserts it stays out. The authenticated app talks to the real API.",
          ],
          bullets: [
            "Uniform scanner contract — a scanner that cannot run is reported, never rendered as an empty result",
            "Single-table DynamoDB with time-sortable scan ids; no GSIs",
            "Pricing and notifications can never break a scan — live pricing falls back to static, notifier failures report per channel",
            "Cross-account access via STS assume-role, tag-scoped IAM, and a CloudFormation onboarding template students can run",
          ],
        },
        {
          id: "tradeoffs",
          title: "Technical Tradeoffs",
          body: [
            "Key decisions and why: cost figures are a floor at on-demand list prices, never a forecast — unpriced usage dimensions are named instead of guessed; the cleanup catalog is deliberately tiny (stop an instance, release an unassociated Elastic IP, delete an unattached volume) with terminate and data-destructive actions explicitly unsupported; and auth is optional by design — a local install runs with zero configuration, API keys exist for shared deployments.",
            "The repository keeps a decision log (docs/DECISIONS.md) recording which side of each architectural seam is live and why — the reasoning is part of what is being shown.",
          ],
        },
        {
          id: "demo",
          title: "In Action",
          body: [
            "Run against my own AWS account: the scan surfaced an unassociated Elastic IP quietly costing ~$3.65/month, ranked it with a plain-English explanation of why it costs money, and tracked the finding across scan history until I released it.",
            "Cleanup is engineered to be hard to get wrong. Scanning never mutates AWS — mutations sit behind an ENABLE_CLEANUP_ACTIONS flag, admin-only — and every action defaults to dry-run, requires re-typing the resource ID to confirm, is re-checked against live AWS state, and lands in an audit trail that records refusals (confirmation_mismatch, precondition_failed) as faithfully as successes.",
            "The live demo above is that same frontend on fixture data: its cleanup preview walks the real gate sequence, refusals and all.",
          ],
          media: [
            {
              kind: "image",
              src: "/images/shut-it-down-scan.png",
              label: "A scan: minimum monthly exposure, risk ranking, and a suggested action per finding",
            },
            {
              kind: "image",
              src: "/images/shut-it-down-cleanup.png",
              label: "Guided cleanup: dry-run, type-to-confirm, and the audited gate sequence",
            },
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
      "Polar and scatter views of isocentre deviation against the AAPM TG-142 1 mm tolerance",
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
          title: "Dashboard Design",
          body: [
            "The dashboard prioritizes clarity: an unambiguous overall verdict, with out-of-tolerance measurements flagged in red.",
            "Two views make the geometry legible at a glance — a polar plot of radiation-field deviation by gantry angle against the 1 mm tolerance ring, and a field-centre offset scatter relative to the ball-bearing phantom. Measurements come in by CSV upload or manual entry, with a realistic demo dataset built in.",
          ],
          media: [
            {
              kind: "image",
              src: "/images/winston-lutz-polar.png",
              label: "Radiation-field deviation by gantry angle vs. the 1 mm tolerance ring",
            },
            {
              kind: "image",
              src: "/images/winston-lutz-scatter.png",
              label: "Field-centre offset relative to the ball-bearing phantom",
            },
          ],
        },
        {
          id: "notes",
          title: "Technical Notes",
          body: [
            "Each run exports a self-contained HTML report: results against the AAPM TG-142 1 mm tolerance, per-measurement pass/fail across gantry, collimator, and couch rotations, and the mean systematic shift. The example below runs on the built-in demo dataset — a realistic session with two couch rotations out of tolerance — and shows the tool doing its job: flagging the failure.",
            "Building this meant learning the clinical QA workflow from the ground up to represent it honestly — the data pipeline and visualization choices all follow from how a physicist actually reads these numbers.",
          ],
          media: {
            kind: "image",
            src: "/images/winston-lutz-report.png",
            label: "Exported QA report — 13 measurements, two couch rotations out of tolerance, overall FAIL",
          },
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
    status: "public",
    repo: { href: "https://github.com/jaredf96/personal-gym-tracker", label: "View on GitHub" },
    repoNote: null,
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
      "Five interpretable failure-mode themes (engine, weather, landing, takeoff, hostile action)",
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
            "Hostile action & midair events (shootdowns, missiles, collisions)",
            "Loss of control shortly after takeoff, often ending at sea",
            "Weather & poor visibility on approach (fog, VFR into terrain)",
            "Engine failure en route and on takeoff, including cargo flights",
            "Runway & landing incidents (landing short, striking ground)",
          ],
          media: {
            kind: "image",
            src: "/images/plane-crash-clusters.png",
            label: "Crash-summary clusters — TF-IDF + K-Means, SVD projection",
          },
        },
        {
          id: "findings",
          title: "What It Shows",
          body: [
            "The themes line up with well-known aviation risk categories, which is a good sanity check that the unsupervised method found something real.",
          ],
          bullets: [
            "Weather-on-approach, engine failure, and landing incidents separate cleanly — and hostile action (shootdowns, midair collisions) emerges as its own theme",
            "Limitations: k was chosen heuristically; summaries are post-hoc human text (reporting bias); the result is descriptive, not causal",
            "Next steps: silhouette/elbow to justify k, topic modeling (NMF/LDA), and tracking how the theme mix shifts by decade",
          ],
        },
      ],
    },
  },

  {
    slug: "car-price-predictor",
    name: "Used-Car Price Predictor",
    tagline: "ML pricing model + interactive Streamlit app",
    group: "smaller",
    year: "2023",
    status: "public",
    repo: { href: "https://github.com/jaredf96/4122", label: "View on GitHub" },
    repoNote: null,
    summary:
      "Predicts UK used-car resale prices across ~33,000 Ford and Volkswagen listings — a random-forest pipeline hitting MAE ≈ £986 (R² 0.95) on a held-out test split, wrapped in an interactive Streamlit app you can try live.",
    context:
      "A coursework project (UNCC 4122) rebuilt into something usable: explore the market visually, or spec out a car and get a price.",
    role: "Solo.",
    tech: ["Python", "pandas", "scikit-learn", "RandomForest", "Streamlit", "seaborn", "joblib"],
    highlights: [
      "Random-forest pipeline (scaled numerics + one-hot categoricals), regularized with min_samples_leaf",
      "MAE ≈ £986 and R² ≈ 0.95 on a held-out 20% test split — from executed output",
      "Identical cleaning rules shared by the training notebook and the app",
      "Interactive Streamlit app: brand comparisons, price-filtered charts, live predictions",
      "Deployed and publicly accessible on Streamlit Community Cloud",
    ],
    metrics: [],
    actions: [
      { kind: "summary", label: "View Summary", to: "/work/car-price-predictor" },
      {
        kind: "live",
        label: "Live Demo",
        to: "https://jaredf96-used-car-predictor.streamlit.app",
        external: true,
      },
      { kind: "scoring", label: "Model & Metrics", to: "/work/car-price-predictor#model" },
    ],
    caseStudy: {
      sections: [
        {
          id: "overview",
          title: "Overview",
          body: [
            "A price predictor for UK used-car listings from Ford and Volkswagen — about 33,000 cars — with an interactive app for exploring the market and pricing a specific car.",
            "Originally a data-mining course project; since reworked with proper data cleaning, a documented model, and a usable front end.",
          ],
        },
        {
          id: "model",
          title: "Model & Metrics",
          body: [
            "A scikit-learn Pipeline feeds scaled numerics (year, mileage, tax, MPG, engine size) and one-hot-encoded categoricals (model, transmission, fuel type) into a random forest regularized with min_samples_leaf=5.",
          ],
          bullets: [
            "MAE ≈ £986 and R² ≈ 0.95 on a held-out 20% test split",
            "Cleaning drops missing numerics and physically impossible rows (engine size of 0, MPG under 5) and strips stray whitespace that silently splits categories",
            "The training notebook and the app share identical cleaning, so predictions see the same distribution the model learned from",
            "Honest next steps: cross-validation, feature importances, and prediction intervals",
          ],
        },
        {
          id: "app",
          title: "The App",
          body: [
            "A Streamlit app with two tabs: Visualizations — brand-vs-brand comparisons (cars per model, average price by year, MPG by fuel type, transmission mix), filterable by dataset and price range — and Predictions, where you spec a car and get a price.",
            "Dataset loads and the ~12 MB model are cached per session, and the trained model ships with the repo via joblib, so the app runs without retraining.",
            "It's deployed on Streamlit Community Cloud and open to anyone — the Live Demo link above runs the same model described here.",
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
    repo: { href: "https://github.com/jaredf96/website", label: "View on GitHub" },
    repoNote: null,
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
