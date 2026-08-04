/**
 * HeroScene — the home page's opening image.
 *
 * A Mediterranean still life: coastline behind, a stone ledge in front, and a
 * grouping of ROSA DORI pieces catching the late light. Drawn rather than
 * photographed so the site is complete before the shoot happens — swap it for
 * a real image by adding `public/editorial/hero.jpg`.
 *
 * Deliberately restrained: soft bands for the landscape, and all of the
 * drawing effort spent on the products in the foreground.
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A grouping of Rosa Dori jute and canvas pieces arranged on a stone ledge above a Mediterranean coastline"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CBDDE2" />
          <stop offset="55%" stopColor="#E6E2D5" />
          <stop offset="100%" stopColor="#F5E6CE" />
        </linearGradient>

        <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FB4BE" />
          <stop offset="100%" stopColor="#B6CDD0" />
        </linearGradient>

        <linearGradient id="hero-ledge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2E7D5" />
          <stop offset="100%" stopColor="#DFCDB2" />
        </linearGradient>

        <linearGradient id="hero-cloth" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#FBF5EA" />
          <stop offset="100%" stopColor="#E9DCC6" />
        </linearGradient>

        <radialGradient id="hero-sun" cx="0.72" cy="0.18" r="0.42">
          <stop offset="0%" stopColor="#FFF3DA" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFF3DA" stopOpacity="0" />
        </radialGradient>

        {/* Reused by every foreground piece so the light stays consistent. */}
        <linearGradient id="hero-shade" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>

        <pattern id="hero-jute" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 3h10M0 7h10" stroke="#8A7355" strokeWidth="2" opacity="0.15" />
          <path d="M3 0v10M7 0v10" stroke="#8A7355" strokeWidth="2" opacity="0.1" />
        </pattern>

        <pattern id="hero-canvas" width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M-1 6l8-8M-1 13l14-14" stroke="#7A5B45" strokeWidth="1" opacity="0.14" />
        </pattern>

        <filter id="hero-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>

        <filter id="hero-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="n" />
          <feColorMatrix type="saturate" values="0" in="n" result="d" />
          <feComponentTransfer in="d">
            <feFuncA type="linear" slope="0.14" />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* ---------- Landscape ---------- */}
      <rect width="1600" height="900" fill="url(#hero-sky)" />
      <rect width="1600" height="900" fill="url(#hero-sun)" />

      {/* Far headland, softened so it reads as distance. */}
      <g filter="url(#hero-soft)" opacity="0.75">
        <path d="M0 372 L214 300 L392 344 L560 288 L742 340 L900 306 L1082 352 L1290 300 L1600 356 L1600 470 L0 470 Z" fill="#A9B3AB" />
      </g>
      <path
        d="M0 388 L206 322 L388 360 L556 310 L740 356 L898 326 L1080 366 L1288 320 L1600 372 L1600 474 L0 474 Z"
        fill="#96A398"
        opacity="0.6"
      />

      {/* Sea */}
      <rect x="0" y="470" width="1600" height="150" fill="url(#hero-sea)" />
      <g stroke="#FFFFFF" strokeLinecap="round" opacity="0.35">
        {[492, 516, 540, 566, 592].map((y, i) => (
          <path
            key={y}
            d={`M${120 + i * 90} ${y}h${210 - i * 22}M${520 + i * 70} ${y}h${150 - i * 14}M${1010 + i * 40} ${y}h${190 - i * 18}`}
            strokeWidth={2 - i * 0.2}
          />
        ))}
      </g>

      {/* Near cliff on the left, with a suggestion of a hill town. */}
      <path d="M0 300 L108 268 L206 318 L286 366 L330 470 L332 624 L0 624 Z" fill="#C4B39A" />
      <path d="M0 300 L108 268 L206 318 L286 366 L330 470 L330 500 L0 500 Z" fill="#CFBFA6" />
      <g fill="#EADCC5" opacity="0.9">
        {[
          [26, 322, 44, 60],
          [82, 300, 38, 52],
          [140, 342, 40, 56],
          [196, 366, 36, 48],
          [46, 400, 50, 62],
          [126, 412, 44, 58],
        ].map(([x, y, w, h]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width={w} height={h} />
            <path d={`M${x - 5} ${y} L${x + w / 2} ${y - 15} L${x + w + 5} ${y} Z`} fill="#C9A38C" />
          </g>
        ))}
      </g>

      {/* Foliage spilling in from the right edge. */}
      <g className="motion-safe:animate-sway origin-bottom-right" opacity="0.9">
        <path d="M1600 250 C1470 268 1400 340 1380 430" stroke="#7C8465" strokeWidth="5" fill="none" opacity="0.55" />
        {[
          [1560, 262],
          [1508, 288],
          [1462, 322],
          [1424, 364],
          [1396, 412],
        ].map(([x, y], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="44" ry="17" fill="#7C8465" opacity="0.45" transform={`rotate(${-22 - i * 6} ${x} ${y})`} />
            <ellipse cx={x + 18} cy={y + 34} rx="38" ry="15" fill="#7C8465" opacity="0.3" transform={`rotate(${18 + i * 5} ${x + 18} ${y + 34})`} />
          </g>
        ))}
      </g>

      {/* ---------- Stone ledge ---------- */}
      <rect x="0" y="620" width="1600" height="280" fill="url(#hero-ledge)" />
      <path d="M0 620h1600" stroke="#CBB79A" strokeWidth="3" />
      <g stroke="#D6C3A6" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M120 700q180 22 360 6t420 18" />
        <path d="M760 786q220-26 420-8t300 22" />
        <path d="M0 748q160 16 300 2" />
      </g>

      {/* Linen cloth draped along the front edge. */}
      <path
        d="M0 690 Q180 664 372 700 Q520 730 640 706 L660 900 L0 900 Z"
        fill="url(#hero-cloth)"
      />
      <g stroke="#4B5A6B" strokeWidth="6" opacity="0.28">
        <path d="M64 726q170-22 320 12" />
        <path d="M52 758q176-22 330 14" />
      </g>

      {/* ---------- Foreground grouping ---------- */}

      {/* Shadows, cast together to seat the objects on the ledge. */}
      <g fill="#8A7355" opacity="0.2">
        <ellipse cx="520" cy="666" rx="150" ry="20" />
        <ellipse cx="880" cy="654" rx="180" ry="22" />
        <ellipse cx="1230" cy="668" rx="150" ry="20" />
      </g>

      {/* — Jute caddy, left — */}
      <g>
        <path d="M392 476 L648 476 L634 660 L406 660 Z" fill="#D8C3A2" />
        <path d="M392 476 L648 476 L634 660 L406 660 Z" fill="url(#hero-jute)" />
        <path d="M392 476 L648 476 L634 660 L406 660 Z" fill="url(#hero-shade)" />
        <rect x="418" y="520" width="204" height="112" fill="#F3EADB" opacity="0.9" />
        <rect x="418" y="520" width="204" height="112" fill="url(#hero-canvas)" />
        <circle cx="520" cy="470" r="34" fill="none" stroke="#B08F63" strokeWidth="11" />
        {/* Bottles standing inside — dark glass, so they read through the
            legibility wash rather than dissolving into it. */}
        <g>
          <path
            d="M446 480 Q446 396 460 372 L460 322 L490 322 L490 372 Q504 396 504 480 Z"
            fill="#3E4A34"
          />
          <rect x="456" y="306" width="38" height="28" rx="4" fill="#8E2A26" />
          <rect x="446" y="404" width="58" height="50" fill="#EBDCC0" opacity="0.9" />
          <path d="M464 340v130" stroke="#FFFFFF" strokeWidth="5" opacity="0.16" />

          <path
            d="M540 480 Q540 408 552 386 L552 344 L580 344 L580 386 Q592 408 592 480 Z"
            fill="#6B4326"
          />
          <rect x="548" y="330" width="36" height="24" rx="4" fill="#C9A03F" />
          <rect x="540" y="414" width="52" height="44" fill="#EBDCC0" opacity="0.9" />
          <path d="M556 358v118" stroke="#FFFFFF" strokeWidth="5" opacity="0.14" />
        </g>
      </g>

      {/* — The red tote, hero of the group — */}
      <g>
        <path d="M726 400 L1042 400 L1020 656 L748 656 Z" fill="#A8322B" />
        <path d="M726 400 L1042 400 L1020 656 L748 656 Z" fill="url(#hero-canvas)" opacity="0.7" />
        <path d="M726 400 L1042 400 L1020 656 L748 656 Z" fill="url(#hero-shade)" />
        {/* Leather handles */}
        <path
          d="M806 400 C806 286 962 286 962 400"
          fill="none"
          stroke="#4A2F1C"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M806 400 C806 286 962 286 962 400"
          fill="none"
          stroke="#6B4326"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Brand patch */}
        <rect x="836" y="512" width="116" height="44" rx="3" fill="#3B2418" />
        <path d="M862 534h64" stroke="#D9BFAE" strokeWidth="3" />
      </g>

      {/* — Bread basket, centre right — */}
      <g>
        <path d="M1064 540 L1276 540 L1252 660 L1088 660 Z" fill="#E3D2B4" />
        <path d="M1064 540 L1276 540 L1252 660 L1088 660 Z" fill="url(#hero-jute)" />
        <path d="M1064 540 L1276 540 L1252 660 L1088 660 Z" fill="url(#hero-shade)" />
        <rect x="1056" y="528" width="228" height="24" rx="12" fill="#C9B287" />
        {/* Baguettes */}
        <g>
          <path d="M1096 534 q10-104 54-100 t44 100 Z" fill="#DFBE8A" />
          <path d="M1152 534 q12-92 56-88 t42 88 Z" fill="#E7C99A" />
          <g stroke="#B99460" strokeWidth="3" opacity="0.8">
            <path d="M1118 486l16-16M1128 512l16-16M1178 484l16-16M1190 510l16-16" />
          </g>
        </g>
      </g>

      {/* — Small handmade paper bag, far right — */}
      <g>
        <path d="M1332 452 L1478 452 L1470 654 L1340 654 Z" fill="#F0E6D4" />
        <path d="M1332 452 L1478 452 L1470 654 L1340 654 Z" fill="url(#hero-shade)" />
        <path d="M1332 452 L1478 452 L1476 488 L1334 488 Z" fill="#DCCCB0" />
        <path
          d="M1362 452 C1362 396 1448 396 1448 452"
          fill="none"
          stroke="#BFA47C"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* A pressed sprig on the face */}
        <g opacity="0.75">
          <path d="M1404 556v66" stroke="#7C8465" strokeWidth="3" />
          <ellipse cx="1386" cy="572" rx="20" ry="8" fill="#7C8465" opacity="0.55" transform="rotate(-30 1386 572)" />
          <ellipse cx="1424" cy="590" rx="20" ry="8" fill="#7C8465" opacity="0.45" transform="rotate(30 1424 590)" />
          <ellipse cx="1390" cy="608" rx="18" ry="7" fill="#7C8465" opacity="0.4" transform="rotate(-28 1390 608)" />
        </g>
      </g>

      {/* — A glass and a few olives, for scale and life — */}
      <g>
        <path d="M690 592 L742 592 L734 664 L698 664 Z" fill="#EDF1F0" opacity="0.85" />
        <rect x="690" y="616" width="52" height="48" fill="#C9A03F" opacity="0.55" />
        <circle cx="704" cy="624" r="9" fill="#7C8465" opacity="0.8" />
        <circle cx="726" cy="634" r="8" fill="#6E7A55" opacity="0.8" />
      </g>

      {/* Grain over the whole frame ties the flat colour together. */}
      <rect width="1600" height="900" filter="url(#hero-grain)" opacity="0.55" />
    </svg>
  );
}
