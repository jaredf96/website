import FadeIn from "../components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "../components/motion/Stagger";
import { card } from "../lib/ui";

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I primarily work with Python, JavaScript/React, and Tailwind CSS, plus AWS and data/ML tooling — and I'm always picking up new ones.",
  },
  {
    question: "Can I see your code?",
    answer:
      "Most of my recent work lives in private repositories, so I lead with case studies instead. Code is available on request, and I'll link a repo wherever it's cleaned up and public.",
  },
  {
    question: "Are you open to roles or freelance work?",
    answer:
      "Yes — I'm open to roles and collaborations across software and data. The contact page is the fastest way to reach me.",
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl py-12 sm:py-16">
      <FadeIn className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">FAQ</h1>
        <p className="mt-3 text-lg text-muted">A few things people often ask.</p>
      </FadeIn>

      <StaggerContainer className="mt-10 space-y-4">
        {faqs.map((faq) => (
          <StaggerItem
            key={faq.question}
            className={`${card} p-6 transition-shadow duration-(--duration-medium) hover:shadow-medium`}
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <p className="mt-2 leading-relaxed text-muted">{faq.answer}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
