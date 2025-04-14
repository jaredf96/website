import { Mail, Globe, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[--color-surface] text-[--color-text] flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 border border-[--color-text]">
        <div className="space-y-20">
          {/* Email Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Mail size={28} className="text-[--color-text]" />
              <span className="text-4xl font-light">Email</span>
            </div>
            <a
              href="mailto:jfulk44@gmail.com"
              className="text-4xl font-light hover:underline text-[--color-accent]"
            >
              jfulk44@gmail.com
            </a>
          </div>

          {/* Website Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe size={28} className="text-[--color-text]" />
              <span className="text-4xl font-light">Website</span>
            </div>
            <a
              href="https://jareds.codes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl font-light hover:underline text-[--color-accent]"
            >
              jareds.codes
            </a>
          </div>

          {/* Discord Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MessageSquare size={28} className="text-[--color-text]" />
              <span className="text-4xl font-light">Discord</span>
            </div>
            <span className="text-4xl font-light text-[--color-accent]">
              (Jared.csv)
            </span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Contact;