import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, Link, NavLink, Navigate, useLocation } from "react-router-dom";
import SidebarMenu from "./components/SidebarMenu";
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

function App() {
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

  const topNavClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-(--duration-medium) ${
      isActive ? "text-accent" : "text-text hover:text-accent"
    }`;

  return (
    <div className="relative min-h-screen bg-surface text-text transition-colors duration-(--duration-medium)">
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
          {/* Desktop nav links (hamburger handles mobile) */}
          <div className="hidden md:flex gap-8 ml-2">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === "/"} className={topNavClasses}>
                {item.name}
              </NavLink>
            ))}
          </div>
          {/* Spacer keeps branding right-aligned on mobile (where links are hidden) */}
          <div className="md:hidden" />
          {/* Branding */}
          <Link
            to="/"
            className="text-2xl font-bold text-accent hover:text-accent-hover transition-colors duration-(--duration-medium)"
          >
            jareds.codes
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense
            fallback={
              <div className="text-center py-4 animate-pulse">
                <div className="inline-block h-8 w-8 rounded-full bg-accent animate-bounce"></div>
                <p className="mt-2">Loading...</p>
              </div>
            }
          >
            <Routes>
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
        </div>
      </main>
    </div>
  );
}

export default App;
