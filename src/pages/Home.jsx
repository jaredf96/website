// Home.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  // Reveal sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".section-animate");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="w-full relative z-0">
      {/* Hero Section */}
      <section className="min-h-screen grid place-items-center bg-surface text-text text-center px-6 section-animate opacity-0">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Hi, I'm{" "}
            <span className="text-accent relative group">
              Jared
              <span className="absolute bottom-0 left-0 w-full h-1 bg-accent transform scale-x-0 transition-transform duration-(--duration-medium) group-hover:scale-x-100"></span>
            </span>
          </h1>

          <p className="text-lg text-muted mb-8">
            A developer passionate about building great software.
          </p>

          {/* Profile Image */}
          <div className="relative z-0 w-80 h-80 mx-auto mb-8 rounded-full overflow-hidden border-4 border-accent shadow-soft hover:shadow-lg transition-all duration-(--duration-medium) hover:scale-105">
            <img
              src="/canon.jpg"
              alt="Portrait of Jared Fulk"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Link to="/projects">
              <button className="px-6 py-3 bg-accent text-white rounded-base hover:bg-accent-hover transition-all duration-(--duration-medium) hover:scale-105 shadow-soft">
                View My Work
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-6 py-3 bg-transparent border-2 border-accent text-accent rounded-base hover:bg-accent hover:text-white transition-all duration-(--duration-medium) hover:scale-105">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-24">
        <div className="absolute inset-0 bg-surface">
          <svg className="absolute bottom-0 w-full h-16 text-surface-light" viewBox="0 0 1440 48" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-24 bg-surface-light text-text text-center px-6 section-animate opacity-0">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <span className="mr-3 text-accent">📁</span>
            Projects
          </h2>
          <p className="text-lg text-muted mb-6">
            Showcasing some of the projects I've worked on.
          </p>
          <Link to="/projects">
            <button className="px-6 py-3 bg-accent text-white rounded-base hover:bg-accent-hover transition-all duration-(--duration-medium) ease-snappy hover:scale-105 shadow-soft">
              View Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-24">
        <div className="absolute inset-0 bg-surface-light">
          <svg className="absolute bottom-0 w-full h-16 text-surface" viewBox="0 0 1440 48" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,48 C480,0 960,0 1440,48 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 bg-surface text-text text-center px-6 section-animate opacity-0">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <span className="mr-3 text-accent">👨‍💻</span>
            About Me
          </h2>
          <p className="text-lg text-muted mb-6">
            I'm a full-stack developer who genuinely loves to code.
          </p>
          <Link to="/about">
            <button className="px-6 py-3 bg-accent text-white rounded-base hover:bg-accent-hover transition-all duration-(--duration-medium) ease-snappy hover:scale-105 shadow-soft">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} jareds.codes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
