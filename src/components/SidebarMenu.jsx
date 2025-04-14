// SidebarMenu.jsx
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: "🏠" },
  { name: "Resume", path: "/resume", icon: "📄" },
  { name: "Projects", path: "/projects", icon: "📁" },
  { name: "Contact", path: "/contact", icon: "📇" },
];

const SidebarMenu = ({ toggleDarkMode, isDarkMode, open, setOpen }) => {
  // Use props instead of local state

  const linkClasses = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-2 rounded bg-[--color-accent] text-white transition-colors duration-[--duration-medium]"
      : "flex items-center gap-3 px-4 py-2 rounded text-[--color-text] hover:bg-[--color-surface-light] transition-colors duration-[--duration-medium]";

  return (
    <>
      {/* Hamburger Icon with animation */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 text-white bg-[--color-accent] p-2 rounded hover:bg-[--color-accent-hover] transition-all duration-[--duration-medium] hover:scale-105"
          aria-label="Open sidebar menu"
        >
          <Menu size={28} className="transition-transform duration-[--duration-spin]" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[--color-surface-light] text-[--color-text] z-50 p-6 shadow-[--shadow-soft] border-r border-[--color-muted]/10 transform transition-transform duration-[--duration-medium] ease-[--ease-snappy] ${open ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="Sidebar navigation"
      >
        {/* Close Button with animation */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setOpen(false)}
            className="text-[--color-text] hover:text-[--color-accent] transition-all duration-[--duration-medium] hover:rotate-90 bg-transparent p-1"
            aria-label="Close sidebar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4" aria-label="Main menu">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
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
            className="w-full py-2 px-4 bg-[--color-accent] text-white rounded-[--radius-base] hover:bg-[--color-accent-hover] transition duration-[--duration-medium] ease-[--ease-snappy] hover:scale-105"
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