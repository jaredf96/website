import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SidebarMenu from "./components/SidebarMenu";
import ThemeToggle from "./components/layout/ThemeToggle";
import AnimatedPage from "./components/motion/AnimatedPage";
import NotFound from "./pages/NotFound";
import { navItems } from "./navItems";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Resume = lazy(() => import("./pages/Resume"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Scroll to top on route change, or to the hash target for deep links.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();
      };
      // Retry across lazy mount + scroll-reveal settle so the offset is stable.
      scrollToHash();
      const timers = [120, 350, 600].map((ms) => setTimeout(scrollToHash, ms));
      return () => timers.forEach(clearTimeout);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function TopNav({ reduce }) {
  return (
    <div className="hidden md:flex gap-7 ml-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className="relative py-1 text-sm font-medium"
        >
          {({ isActive }) => (
            <span
              className={`transition-colors duration-(--duration-medium) ${
                isActive ? "text-accent" : "text-text hover:text-accent"
              }`}
            >
              {item.name}
              {isActive &&
                (reduce ? (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent" />
                ) : (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ))}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
}

function App() {
  const reduce = useReducedMotion();
  const location = useLocation();

  // Initialise from the class set by the pre-paint script in index.html
  // (falls back to localStorage), avoiding a flash of the wrong theme.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("dark")) return true;
      const saved = localStorage.getItem("colorMode");
      return saved === "dark" || saved === null;
    }
    return true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("colorMode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="relative flex min-h-screen flex-col bg-surface text-text transition-colors duration-(--duration-medium)">
      <ScrollManager />

      {/* Slide-over sidebar + backdrop (mobile primary, available everywhere) */}
      <SidebarMenu
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Header / top navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur shadow-soft py-4 px-4 md:px-8">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <TopNav reduce={reduce} />
          {/* Spacer keeps the right group aligned on mobile (links hidden) */}
          <div className="md:hidden" />
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
            <Link
              to="/"
              className="text-2xl font-bold text-accent hover:text-accent-hover transition-colors duration-(--duration-medium)"
            >
              jareds.codes
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <AnimatedPage key={location.pathname}>
              <Suspense
                fallback={
                  <div className="py-20 text-center text-muted animate-pulse">Loading…</div>
                }
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:slug" element={<CaseStudy />} />
                  {/* Redirect the old route so existing links keep working */}
                  <Route path="/projects" element={<Navigate to="/work" replace />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </AnimatedPage>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} jareds.codes</p>
          <div className="flex gap-5">
            <Link to="/work" className="hover:text-accent transition-colors">Work</Link>
            <Link to="/resume" className="hover:text-accent transition-colors">Résumé</Link>
            <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
