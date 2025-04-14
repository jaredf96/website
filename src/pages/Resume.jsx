import { useState, useEffect } from "react";
import { FileText, Download, Briefcase, GraduationCap, Award, Calendar } from "lucide-react";

const Resume = () => {
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
        <div className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-[--color-surface] text-[--color-text]">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center">My Resume</h1>
                <p className="text-lg text-[--color-muted] mb-12 text-center">
                    Here's a quick summary of my education and skills.
                </p>

                {/* Download Resume Button */}
                <div className="flex justify-center mb-12 section-animate opacity-0">
                    <a
                        href="/JWF_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-[--color-accent] text-white rounded-[--radius-base] hover:bg-[--color-accent-hover] transition-colors duration-[--duration-medium]"
                    >
                        <FileText size={20} />
                        <span>View Resume (PDF)</span>
                    </a>
                    <a
                        href="/JWF_resume.pdf"
                        download
                        className="flex items-center gap-2 px-6 py-3 ml-4 border border-[--color-accent] text-[--color-accent] rounded-[--radius-base] hover:bg-[--color-accent]/10 transition-colors duration-[--duration-medium]"
                    >
                        <Download size={20} />
                        <span>Download PDF</span>
                    </a>
                </div>

                {/* Resume Content */}
                <div className="grid grid-cols-1 gap-8">
                    {/* Education Section */}
                    <div className="bg-[--color-surface-light] rounded-[--radius-base] overflow-hidden shadow-[--shadow-soft] p-6 section-animate opacity-0">
                        <div className="flex items-center gap-3 mb-6">
                            <GraduationCap size={24} className="text-[--color-accent]" />
                            <h2 className="text-2xl font-bold">Education</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="border-l-2 border-[--color-accent] pl-4 py-2">
                                <div className="flex flex-wrap justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold">B.S. in Computer Science</h3>
                                    <div className="flex items-center text-[--color-muted]">
                                        <Calendar size={16} className="mr-1" />
                                        <span>2020 - 2023</span>
                                    </div>
                                </div>
                                <p className="text-[--color-muted] mb-2">University Of North Carolina at Charlotte</p>
                                <p>Specialized in Data Science and Software Engineering.</p>
                            </div>


                        </div>
                    </div>



                    {/* Skills Section */}
                    <div className="bg-[--color-surface-light] rounded-[--radius-base] overflow-hidden shadow-[--shadow-soft] p-6 section-animate opacity-0">
                        <div className="flex items-center gap-3 mb-6">
                            <Award size={24} className="text-[--color-accent]" />
                            <h2 className="text-2xl font-bold">Skills</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Programming Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Python", "Java", "JavaScript", "SQL", "C/C#/C++", "Assembly", "HTML", "XML", "Swift"].map((skill) => (
                                        <span key={skill} className="px-3 py-1 text-sm rounded-full bg-[--color-accent]/10 text-[--color-accent]">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Frameworks & Libraries</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["React", "Pandas", "Scikit-Learn", "NumPy", "Matplotlib", "Seaborn", "NLTK", "Tailwind"].map((skill) => (
                                        <span key={skill} className="px-3 py-1 text-sm rounded-full bg-[--color-accent]/10 text-[--color-accent]">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Tools & Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["AWS", "MySQL", "Xcode", "Git", "Jupyter Notebook", "Docker", "VS Code"].map((skill) => (
                                        <span key={skill} className="px-3 py-1 text-sm rounded-full bg-[--color-accent]/10 text-[--color-accent]">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Areas of Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Data Analysis", "Machine Learning", "NLP", "Data Visualization", "Web Development", "Database Design", "Algorithm Development"].map((skill) => (
                                        <span key={skill} className="px-3 py-1 text-sm rounded-full bg-[--color-accent]/10 text-[--color-accent]">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;