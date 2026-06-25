export default function TechBadge({ children }) {
  return (
    <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
      {children}
    </span>
  );
}
