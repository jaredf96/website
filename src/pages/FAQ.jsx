const FAQ = () => {
    const faqs = [
      {
        question: "What technologies do you specialize in?",
        answer: "I primarily work with JavaScript, React, Python, and Tailwind CSS, but I’m always exploring new tools.",
      },
      {
        question: "Can I see your GitHub?",
        answer: "Absolutely — it's linked in the contact section or under each project that has a repository.",
      },
      {
        question: "Are you open to freelance work?",
        answer: "Yes! Feel free to reach out through the contact form or email me directly.",
      },
    ];
  
    return (
      <section className="py-16 px-6 bg-gray-100 min-h-screen text-gray-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQ;
  