import FadeIn from "../motion/FadeIn";
import MediaPlaceholder from "./MediaPlaceholder";

export default function CaseStudySection({ section }) {
  return (
    <FadeIn as="section" id={section.id} className="scroll-mt-20">
      <h2 className="text-2xl font-bold">{section.title}</h2>

      {section.body?.map((para, i) => (
        <p key={i} className="mt-4 max-w-2xl leading-relaxed text-muted">
          {para}
        </p>
      ))}

      {section.bullets?.length > 0 && (
        <ul className="mt-5 max-w-2xl space-y-2.5">
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
            <MediaPlaceholder
              key={m.label}
              media={m}
              // A screen recording of a dense UI is already hard to read; half a
              // column would finish the job. Video takes the full width.
              className={m.kind === "video" ? "lg:col-span-2" : ""}
            />
          ))}
        </div>
      )}
    </FadeIn>
  );
}
