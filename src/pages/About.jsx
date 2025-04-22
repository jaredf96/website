
import React from "react";
import { Github, Mail, Linkedin, FileText } from "lucide-react";

function About() {
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="bg-[--color-surface-accent] rounded-xl p-8 shadow-[--shadow-medium]">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-xl opacity-80 max-w-3xl">
          Computer Science graduate with expertise in Data Science and Software Engineering
        </p>
      </section>

      {/* Bio section */}
      <section className="bg-[--color-surface-card] rounded-xl p-8 shadow-[--shadow-soft]">
        <h2 className="text-2xl font-semibold mb-6 text-[--color-accent]">Professional Background</h2>
        <div className="space-y-6">
          <p>
            I am a Computer Science grad with a BS degree. I specialized in data science and software engineering.
            I have great interest in artificial intelligence, systems architecture, and big data.
            My technical foundation combines the theoretical principles and the practical implementations of computer science.
          </p>
          <p>
            I have a systems-oriented mindset when it comes to software.
            I consider how components interact across the technology stack, design for robustness, maintainability, and performance.
            Whether building microservices architectures or fine-tuning, I prioritize creating solutions that elegantly solve complex technical challenges.
          </p>
          <p>
            In my personal life I enjoy playing video games with my friends, exercising, calisthenics,
            working on side projects.
          </p>
          <p>
            Some of the games I enjoy are the Civilization series, Northgard, Marvel Rivals, and Ark: Survival Evolved.
          </p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="bg-[--color-surface-card] rounded-xl p-8 shadow-[--shadow-soft]">
        <h2 className="text-2xl font-semibold mb-6 text-[--color-accent]">Technical Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Artificial Intelligence</h3>
            <ul className="list-disc pl-5 space-y-1 opacity-80">
              <li>Machine Learning Model Development</li>
              <li>Natural Language Processing</li>
              <li>Computer Vision Systems</li>
              <li>Reinforcement Learning</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Systems Engineering</h3>
            <ul className="list-disc pl-5 space-y-1 opacity-80">
              <li>Cloud Infrastructure Architecture</li>
              <li>Containerization & Orchestration</li>
              <li>Microservices Implementation</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Data Engineering</h3>
            <ul className="list-disc pl-5 space-y-1 opacity-80">
              <li>Big Data Processing Frameworks</li>
              <li>ETL Pipeline Development</li>
              <li>Database System Design</li>
              <li>Data Warehousing Solutions</li>
              <li>Real-time Analytics Systems</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Software Development</h3>
            <ul className="list-disc pl-5 space-y-1 opacity-80">
              <li>Full-Stack Web Development</li>
              <li>API Design & Integration</li>
              <li>Version Control Systems</li>
              <li>Test-Driven Development</li>
              <li>CI/CD Implementation</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;