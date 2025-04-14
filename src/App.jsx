import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import SidebarMenu from "./components/SidebarMenu";
import NotFound from "./pages/NotFound";
// Ensure Lucide React icons are available project-wide
// These are used in the Projects component
import { ChevronDown, ChevronUp, Code, ExternalLink, Github, Menu, X } from "lucide-react";
// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Resume = lazy(() => import("./pages/Resume"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("colorMode");
    if (saved === "dark" || saved === null) setIsDarkMode(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("colorMode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("colorMode", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div className="relative min-h-screen bg-[--color-surface] text-[--color-text] transition-colors duration-[--duration-medium]">
      {/* ScrollToTop component for scroll restoration */}
      <ScrollToTop />

      {/* Sidebar (always rendered) with passed state */}
      <SidebarMenu
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      {/* Content wrapper with dynamic margin based on sidebar state */}
      <div className={`flex-1 transition-all duration-[--duration-medium] ease-[--ease-snappy] ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header/Nav */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-[--color-surface] shadow-[--shadow-soft] py-4 px-4 md:px-8">
          <nav className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left nav links with dynamic spacing based on sidebar */}
            <div className={`flex gap-6 transition-all duration-[--duration-medium] ease-[--ease-snappy] ${sidebarOpen ? "ml-64" : "ml-16"}`}>
            </div>
            {/* Right branding */}
            <Link to="/" className="text-2xl font-bold text-[--color-accent] hover:text-[--color-accent-hover] transition-colors duration-[--duration-medium]">JAREDS.CODES</Link>
          </nav>
        </header>
        {/* Main content with header padding */}
        <main className="pt-28 px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={
              <div className="text-center py-4 animate-pulse">
                <div className="inline-block h-8 w-8 rounded-full bg-[--color-accent] animate-bounce"></div>
                <p className="mt-2">Loading...</p>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
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
    </div>
  );
}

export default App;