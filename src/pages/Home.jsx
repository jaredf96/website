

// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="w-full">
//       {/* Hero Section */}
//       <section className="min-h-screen grid place-items-center bg-surface text-text text-center px-6">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-5xl font-bold mb-4">Hi, I'm Jared</h1>
//           <p className="text-lg text-muted">
//             A developer passionate about building great software.
//           </p>
//         </div>
//       </section>

//       {/* Projects Section */}
//       <section className="py-24 bg-surface-light text-gray-900 dark:bg-surface dark:text-text text-center px-6">
//         <div className="max-w-2xl mx-auto">
//           <h2 className="text-3xl font-bold mb-4">Projects</h2>
//           <p className="text-lg text-gray-700 dark:text-muted mb-6">
//             Showcasing some of my best work — clean, performant, and accessible code.
//           </p>
//           <Link to="/projects">
//             <button className="px-6 py-3 bg-accent text-white rounded-radius-base hover:bg-accent-hover transition duration-duration-medium ease-snappy">
//               View Projects
//             </button>
//           </Link>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-24 bg-white dark:bg-surface-light text-gray-900 dark:text-text text-center px-6">
//         <div className="max-w-2xl mx-auto">
//           <h2 className="text-3xl font-bold mb-4">About Me</h2>
//           <p className="text-lg text-gray-700 dark:text-muted mb-6">
//             I'm a full-stack developer who loves creating modern web experiences
//             with clean, maintainable code. I value performance, accessibility,
//             and thoughtful design.
//           </p>
//           <Link to="/about">
//             <button className="px-6 py-3 bg-accent text-white rounded-radius-base hover:bg-accent-hover transition duration-duration-medium ease-snappy">
//               Learn More
//             </button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;





// Home.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  // Add scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.section-animate');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    // Add relative positioning and z-index to maintain proper stacking context
    <div className="w-full relative z-0">
      {/* Hero Section */}
      <section className="min-h-screen grid place-items-center bg-[--color-surface] text-[--color-text] text-center px-6 section-animate opacity-0">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Hi, I'm <span className="text-[--color-accent] relative group">
              Jared
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[--color-accent] transform scale-x-0 transition-transform duration-[--duration-medium] group-hover:scale-x-100"></span>
            </span>
          </h1>

          <p className="text-lg text-[--color-muted] mb-8">
            A developer passionate about building great software.
          </p>

          {/* Profile Image - Added z-index to prevent sidebar overlap issues */}
          <div className="relative z-0 w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[--color-accent] shadow-[--shadow-soft] hover:shadow-lg transition-all duration-[--duration-medium] hover:scale-105">
            <img
              src="/canon.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Added CTA buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Link to="/projects">
              <button className="px-6 py-3 bg-[--color-accent] text-white rounded-[--radius-base] hover:bg-[--color-accent-hover] transition-all duration-[--duration-medium] hover:scale-105 shadow-[--shadow-soft]">
                View My Work
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-6 py-3 border-2 border-[--color-accent] text-[--color-accent] rounded-[--radius-base] hover:bg-[--color-accent] hover:text-white transition-all duration-[--duration-medium] hover:scale-105 shadow-[--shadow-soft]">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-24">
        <div className="absolute inset-0 bg-[--color-surface]">
          <svg className="absolute bottom-0 w-full h-16 text-[--color-surface-light]" viewBox="0 0 1440 48" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-24 bg-[--color-surface-light] text-[--color-text] text-center px-6 section-animate opacity-0">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <span className="mr-3 text-[--color-accent]">📁</span>
            Projects
          </h2>
          <p className="text-lg text-[--color-muted] mb-6">
            Showcasing some of the projects I've worked on.
          </p>
          <Link to="/projects">
            <button className="px-6 py-3 bg-[--color-accent] text-white rounded-[--radius-base] hover:bg-[--color-accent-hover] transition-all duration-[--duration-medium] ease-[--ease-snappy] hover:scale-105 shadow-[--shadow-soft]">
              View Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-24">
        <div className="absolute inset-0 bg-[--color-surface-light]">
          <svg className="absolute bottom-0 w-full h-16 text-[--color-surface]" viewBox="0 0 1440 48" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,48 C480,0 960,0 1440,48 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 bg-[--color-surface] text-[--color-text] text-center px-6 section-animate opacity-0">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <span className="mr-3 text-[--color-accent]">👨‍💻</span>
            About Me
          </h2>
          <p className="text-lg text-[--color-muted] mb-6">
            I'm a full-stack developer who truly enjoys to code.
          </p>
          <Link to="/about">
            <button className="px-6 py-3 bg-[--color-accent] text-white rounded-[--radius-base] hover:bg-[--color-accent-hover] transition-all duration-[--duration-medium] ease-[--ease-snappy] hover:scale-105 shadow-[--shadow-soft]">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-[--color-muted]">
        <p>© {new Date().getFullYear()} Jared's Codes. All rights reserved.</p>
        <p className="mt-2">Last updated: April 2025</p>
      </footer>
    </div>
  );
};

export default Home;