import { Mail, Github, Globe, MessageSquare } from "lucide-react";
import FadeIn from "../components/motion/FadeIn";
import { card } from "../lib/ui";

const Contact = () => {
  const rows = [
    {
      icon: Mail,
      label: "Email",
      value: "jfulk44@gmail.com",
      href: "mailto:jfulk44@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/jaredf96",
      href: "https://github.com/jaredf96",
      external: true,
    },
    {
      icon: Globe,
      label: "Website",
      value: "jareds.codes",
      href: "https://jareds.codes",
      external: true,
    },
    {
      icon: MessageSquare,
      label: "Discord",
      value: "Jared.csv",
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <FadeIn className={`mx-auto w-full max-w-3xl ${card} p-8 sm:p-12`}>
        <h1 className="mb-2 text-center text-3xl font-bold sm:text-4xl">Get in Touch</h1>
        <p className="mb-10 text-center text-muted">
          Feel free to reach out — I&apos;m happy to connect.
        </p>

        <div className="divide-y divide-border">
          {rows.map(({ icon: Icon, label, value, href, external }) => (
            <div
              key={label}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <Icon size={24} className="text-accent shrink-0" />
                <span className="text-xl sm:text-2xl font-light">{label}</span>
              </div>
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-lg sm:text-2xl font-light text-accent hover:underline break-all sm:text-right"
                >
                  {value}
                </a>
              ) : (
                <span className="text-lg sm:text-2xl font-light text-accent break-all sm:text-right">
                  {value}
                </span>
              )}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
};

export default Contact;
