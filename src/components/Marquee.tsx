/**
 * Infinite client strip.
 *
 * The list is rendered twice and translated by exactly -50%, so the loop is
 * seamless. Pure CSS — pauses on hover, and stops entirely under
 * prefers-reduced-motion.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div
      className="group relative overflow-hidden"
      // Fade the strip out at both edges rather than cutting it hard.
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-10 px-10 md:gap-16 md:px-16"
              >
                <span className="font-display text-lg whitespace-nowrap text-cocoa/80 tracking-[0.12em] md:text-xl">
                  {item}
                </span>
                <span aria-hidden className="h-4 w-px bg-linen" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
