/** The rosette mark that sits above the wordmark. */
export function Rosette({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse
            key={r}
            cx="24"
            cy="15.5"
            rx="6"
            ry="9.5"
            transform={`rotate(${r} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="2.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * ROSA DORI wordmark. The macron over the second A matches the brand mark.
 * Set in the display serif with wide tracking.
 */
export function Logo({
  className = "",
  markClassName = "h-5 w-5",
  wordClassName = "text-[1.35rem] md:text-[1.6rem]",
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <Rosette className={`${markClassName} mb-1.5`} />
      <span
        className={`font-display tracking-[0.2em] ${wordClassName}`}
        aria-hidden="true"
      >
        ROS<span className="relative">Ā</span> DORI
      </span>
      <span className="sr-only">Rosa Dori — home</span>
    </span>
  );
}
