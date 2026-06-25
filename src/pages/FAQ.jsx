const FAQ = () => {
  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer:
        "I primarily work with JavaScript, React, Python, and Tailwind CSS, but I'm always exploring new tools.",
    },
    {
      question: "Can I see your GitHub?",
      answer:
        "Absolutely — it's linked in the contact section or under each project that has a repository.",
    },
    {
      question: "Are you open to freelance work?",
      answer:
        "Yes! Feel free to reach out through the contact page or email me directly.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-surface text-text">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">FAQ</h1>
        <p className="text-lg text-muted mb-12 text-center">
          A few things people often ask.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-surface-card rounded-base shadow-soft p-6 transition-all duration-(--duration-medium) hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
