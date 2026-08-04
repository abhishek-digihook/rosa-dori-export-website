type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ className = "h-7 w-7", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" {...base}>
      {children}
    </svg>
  );
}

/** Natural fibers — a leaf on its stem. */
export const LeafIcon = ({ className }: IconProps) => (
  <Frame className={className}>
    <path d="M16 28V14" />
    <path d="M16 15c-7 0-10-4-10-10 7-1 10 3 10 10Z" />
    <path d="M16 19c7 0 10-4 10-10-7-1-10 3-10 10Z" />
  </Frame>
);

/** Skilled artisans — a figure at work. */
export const ArtisanIcon = ({ className }: IconProps) => (
  <Frame className={className}>
    <circle cx="16" cy="10" r="5" />
    <path d="M6 27c0-5.5 4.5-9 10-9s10 3.5 10 9" />
    <path d="M11 8c2-3 8-3 10 0" />
  </Frame>
);

/** Sustainable choice — hands cupping a shoot. */
export const HandsIcon = ({ className }: IconProps) => (
  <Frame className={className}>
    <path d="M16 16V6" />
    <path d="M16 10c-1-3-4-4-6-4 0 3 2 5 6 6Z" />
    <path d="M16 13c1-3 4-4 6-4 0 3-2 5-6 5Z" />
    <path d="M5 19c3 6 7 8 11 8s8-2 11-8" />
  </Frame>
);

/** Timeless design — a clock face. */
export const ClockIcon = ({ className }: IconProps) => (
  <Frame className={className}>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 9v7l5 3" />
  </Frame>
);

/** Made in India — an open palm. */
export const HandIcon = ({ className }: IconProps) => (
  <Frame className={className}>
    <path d="M12 16V7a2 2 0 1 1 4 0v8" />
    <path d="M16 15V6a2 2 0 1 1 4 0v9" />
    <path d="M20 16v-4a2 2 0 1 1 4 0v9a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-6a2 2 0 1 1 4 0" />
  </Frame>
);

/** Global delivery — a meridian globe. */
export const GlobeIcon = ({ className }: IconProps) => (
  <Frame className={className}>
    <circle cx="16" cy="16" r="11" />
    <path d="M5 16h22" />
    <path d="M16 5c3.5 3.5 3.5 18 0 22-3.5-4-3.5-18.5 0-22Z" />
  </Frame>
);

export const PILLAR_ICONS = [
  LeafIcon,
  ArtisanIcon,
  HandsIcon,
  ClockIcon,
  HandIcon,
  GlobeIcon,
];
