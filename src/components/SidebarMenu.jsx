// SidebarMenu.jsx
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navItems } from "../navItems";

const SidebarMenu = ({ toggleDarkMode, isDarkMode, open, setOpen }) => {
  const closeBtnRef = useRef(null);

  // Close on Escape and move focus to the close button when opened
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-2 rounded-base bg-accent text-white transition-colors duration-(--duration-medium)"
      : "flex items-center gap-3 px-4 py-2 rounded-base text-text hover:bg-surface-light transition-colors duration-(--duration-medium)";

  return (
    <>
      {/* Hamburger (mobile only — desktop uses the top nav) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 text-white bg-accent p-2 rounded-base hover:bg-accent-hover transition-all duration-(--duration-medium) hover:scale-105"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-(--duration-medium) ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface-light text-text z-50 p-6 shadow-soft border-r border-muted/10 transform transition-transform duration-(--duration-medium) ease-snappy ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar navigation"
      >
        {/* Close button */}
        <div className="flex justify-end mb-8">
          <button
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
            className="text-text hover:text-accent transition-all duration-(--duration-medium) hover:rotate-90 bg-transparent p-1"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2" aria-label="Main menu">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={linkClasses}
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-lg">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <div className="mt-6">
          <button
            onClick={toggleDarkMode}
            className="w-full py-2 px-4 bg-accent text-white rounded-base hover:bg-accent-hover transition duration-(--duration-medium) ease-snappy hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarMenu;
