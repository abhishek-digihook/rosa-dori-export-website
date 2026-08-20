/**
 * ROSA DORI wordmark — set in the display serif with wide tracking.
 *
 * Plain letterforms throughout: no mark above the type, and no macron on the
 * A, so the wordmark matches the brand logo exactly.
 */
export function Logo({
  className = "",
  wordClassName = "text-[1.7rem] md:text-[2.05rem]",
}: {
  className?: string;
  wordClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center leading-none ${className}`}>
      <span
        className={`font-display font-semibold tracking-[0.18em] ${wordClassName}`}
        aria-hidden="true"
      >
        ROSA DORI
      </span>
      <span className="sr-only">Rosa Dori — home</span>
    </span>
  );
}
