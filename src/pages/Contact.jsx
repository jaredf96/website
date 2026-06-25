import { Mail, Globe, MessageSquare } from "lucide-react";

const Contact = () => {
  const rows = [
    {
      icon: Mail,
      label: "Email",
      value: "jfulk44@gmail.com",
      href: "mailto:jfulk44@gmail.com",
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
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-3xl bg-surface-card rounded-base shadow-soft p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">Get in Touch</h1>
        <p className="text-muted text-center mb-10">
          Feel free to reach out — I'm happy to connect.
        </p>

        <div className="divide-y divide-muted/15">
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
      </div>
    </div>
  );
};

export default Contact;
