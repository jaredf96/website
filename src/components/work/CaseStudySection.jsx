import FadeIn from "../motion/FadeIn";
import MediaPlaceholder from "./MediaPlaceholder";

export default function CaseStudySection({ section }) {
  return (
    <FadeIn as="section" id={section.id} className="scroll-mt-28">
      <h2 className="text-2xl font-bold">{section.title}</h2>

      {section.body?.map((para, i) => (
        <p key={i} className="mt-3 leading-relaxed text-muted">
          {para}
        </p>
      ))}

      {section.bullets?.length > 0 && (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.media && (
        <div
          className={`mt-5 ${
            Array.isArray(section.media) ? "grid gap-5 lg:grid-cols-2" : ""
          }`}
        >
          {(Array.isArray(section.media) ? section.media : [section.media]).map((m) => (
            <MediaPlaceholder key={m.label} media={m} />
          ))}
        </div>
      )}
    </FadeIn>
  );
}
