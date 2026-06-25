import { FileText, Download, GraduationCap, Award, Calendar } from "lucide-react";
import FadeIn from "../components/motion/FadeIn";
import { btnPrimary, btnOutline, card } from "../lib/ui";

const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "SQL", "C / C# / C++", "Assembly", "HTML", "Swift"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Pandas", "Scikit-Learn", "NumPy", "Matplotlib", "Seaborn", "NLTK", "Tailwind"],
  },
  {
    title: "Tools & Technologies",
    skills: ["AWS", "MySQL", "Xcode", "Git", "Jupyter Notebook", "Docker", "VS Code"],
  },
  {
    title: "Areas of Expertise",
    skills: ["Data Analysis", "Machine Learning", "NLP", "Data Visualization", "Web Development", "Database Design"],
  },
];

export default function Resume() {
  return (
    <div className="mx-auto max-w-3xl py-12 sm:py-16">
      <FadeIn className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Résumé</h1>
        <p className="mt-3 text-lg text-muted">
          A quick summary of my education and skills.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/JWF_resume.pdf" target="_blank" rel="noopener noreferrer" className={btnPrimary}>
            <FileText size={18} />
            View Résumé (PDF)
          </a>
          <a href="/JWF_resume.pdf" download className={btnOutline}>
            <Download size={18} />
            Download PDF
          </a>
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-6">
        {/* Education */}
        <FadeIn className={`${card} p-6 sm:p-7`}>
          <div className="flex items-center gap-3">
            <GraduationCap size={22} className="text-accent" />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          <div className="mt-5 border-l-2 border-accent pl-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">B.S. in Computer Science</h3>
              <span className="flex items-center gap-1 text-sm text-muted">
                <Calendar size={15} /> 2020 – 2023
              </span>
            </div>
            <p className="mt-1 text-muted">University of North Carolina at Charlotte</p>
            <p className="mt-1 text-muted">Specialized in Data Science and Software Engineering.</p>
          </div>
        </FadeIn>

        {/* Skills */}
        <FadeIn className={`${card} p-6 sm:p-7`}>
          <div className="flex items-center gap-3">
            <Award size={22} className="text-accent" />
            <h2 className="text-2xl font-bold">Skills</h2>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  {group.title}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
