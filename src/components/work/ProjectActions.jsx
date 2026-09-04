import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  FileText,
  Network,
  Calculator,
  LayoutDashboard,
  NotebookPen,
  PlayCircle,
  Globe,
  Github,
  Lock,
} from "lucide-react";

// Map an action kind to its icon.
const ICONS = {
  "case-study": BookOpen,
  summary: FileText,
  architecture: Network,
  scoring: Calculator,
  dashboard: LayoutDashboard,
  notes: NotebookPen,
  demo: PlayCircle,
  live: Globe,
};

const BASE =
  "inline-flex items-center gap-1.5 rounded-base px-3.5 py-2 text-sm font-medium transition-colors duration-(--duration-medium)";

/**
 * Renders a project's typed action buttons plus repo/privacy state.
 * A GitHub button only appears when `project.repo` is set; otherwise the
 * privacy note (e.g. "Private repository. Case study available.") is shown.
 *
 * Actions pointing at the page being rendered are dropped, so the case study
 * does not offer a "View Case Study" button back to itself. In-page anchors
 * (#architecture) are kept: on the case study they scroll, on the index they
 * navigate.
 */
export default function ProjectActions({ project }) {
  const { pathname } = useLocation();
  const { actions: allActions = [], repo, repoNote } = project;

  const actions = allActions.filter(
    (action) => action.external || action.to !== pathname
  );

  if (actions.length === 0 && !repo && !repoNote) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {actions.map((action, i) => {
        const Icon = ICONS[action.kind] ?? BookOpen;
        const primary = i === 0;
        const cls = primary
          ? `${BASE} bg-accent text-on-accent hover:bg-accent-hover`
          : `${BASE} border border-border text-muted hover:text-accent hover:border-accent`;
        const inner = (
          <>
            <Icon size={16} />
            <span>{action.label}</span>
          </>
        );
        // External/static files (e.g. a .ipynb) open in a new tab; internal
        // routes use the client router.
        return action.external ? (
          <a
            key={`${action.kind}-${i}`}
            href={action.to}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
          >
            {inner}
          </a>
        ) : (
          <Link key={`${action.kind}-${i}`} to={action.to} className={cls}>
            {inner}
          </Link>
        );
      })}

      {repo ? (
        <a
          href={repo.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${BASE} border border-border text-muted hover:text-accent hover:border-accent`}
        >
          <Github size={16} />
          <span>{repo.label ?? "View on GitHub"}</span>
        </a>
      ) : repoNote ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Lock size={13} />
          <span>{repoNote}</span>
        </span>
      ) : null}
    </div>
  );
}
