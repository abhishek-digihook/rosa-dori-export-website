import type {
  ArtAccent,
  ArtHandle,
  ArtPalette,
  ArtSpec,
  ArtTexture,
} from "@/lib/products";

/**
 * ProductArt — procedurally composed product imagery.
 *
 * Every product in the catalogue is drawn from the same kit of parts: a body
 * silhouette (`form`), a handle treatment, a woven texture and a decorative
 * accent. Because the parts share one palette and one light source, 43 very
 * different products still read as a single photographic set.
 *
 * This is a plain server component — the movement comes from CSS keyframes
 * declared in globals.css, so there is no client JavaScript cost per card.
 *
 * Replacing these with real photography: drop a file at
 * `public/products/<slug>.jpg` and `<ProductImage>` will use it instead.
 */

type Palette = {
  bgFrom: string;
  bgTo: string;
  halo: string;
  body: string;
  bodyDark: string;
  /** Stroke/detail colour that reads correctly on top of `body`. */
  line: string;
  /** Handles, cords and twine — almost always a natural fibre tan. */
  thread: string;
  /** Secondary colour for stripes, trims and printed marks. */
  accent: string;
};

const PALETTES: Record<ArtPalette, Palette> = {
  natural: {
    bgFrom: "#F7EFE2",
    bgTo: "#EADDC8",
    halo: "#EFE3D0",
    body: "#C9B189",
    bodyDark: "#A2865B",
    line: "#6F5A3C",
    thread: "#94743F",
    accent: "#A8322B",
  },
  wheat: {
    bgFrom: "#F9F2E2",
    bgTo: "#ECDFC5",
    halo: "#F3E7CF",
    body: "#D4B683",
    bodyDark: "#AE8E56",
    line: "#755D34",
    thread: "#996F35",
    accent: "#6E4423",
  },
  clay: {
    bgFrom: "#F8EEE7",
    bgTo: "#EAD5C7",
    halo: "#F2E1D6",
    body: "#CDAB93",
    bodyDark: "#AC876B",
    line: "#77523C",
    thread: "#9A7051",
    accent: "#7C8465",
  },
  wine: {
    bgFrom: "#F5E6E1",
    bgTo: "#E6CCC5",
    halo: "#EFD8D1",
    body: "#A8322B",
    bodyDark: "#812420",
    line: "#EBCFC8",
    thread: "#C9A98B",
    accent: "#F2DED6",
  },
  forest: {
    bgFrom: "#EDEFE3",
    bgTo: "#D9DFCB",
    halo: "#E4E8D6",
    body: "#5F6B4A",
    bodyDark: "#475236",
    line: "#DCE3CC",
    thread: "#BFA57C",
    accent: "#E8EDDC",
  },
  charcoal: {
    bgFrom: "#EFEAE3",
    bgTo: "#DAD2C8",
    halo: "#E7DFD5",
    body: "#332D28",
    bodyDark: "#1E1A17",
    line: "#C8BCAC",
    thread: "#B79B75",
    accent: "#DCD2C4",
  },
  indigo: {
    bgFrom: "#E9EDF1",
    bgTo: "#D2DAE3",
    halo: "#DFE6EC",
    body: "#46566E",
    bodyDark: "#334053",
    line: "#D5DEE8",
    thread: "#C0A47E",
    accent: "#E3EAF1",
  },
  lemon: {
    bgFrom: "#F8F1DC",
    bgTo: "#EBDEB6",
    halo: "#F2E7C9",
    body: "#C9A03F",
    bodyDark: "#A8842F",
    line: "#F6EDD3",
    thread: "#B3915F",
    accent: "#F7EFD8",
  },
  paper: {
    bgFrom: "#FBF6EE",
    bgTo: "#EFE4D2",
    halo: "#F6EEE0",
    body: "#E6D6BB",
    bodyDark: "#C9B491",
    line: "#87724F",
    thread: "#A98A5C",
    accent: "#6C7A52",
  },
  shimmer: {
    bgFrom: "#FAF3EB",
    bgTo: "#EDDFCF",
    halo: "#F5E9DC",
    body: "#D8BB9B",
    bodyDark: "#B9946F",
    line: "#7E6242",
    thread: "#9C7546",
    accent: "#A8322B",
  },
};

/* ================================================================== */
/* Texture patterns                                                    */
/* ================================================================== */

function Texture({ id, texture, pal }: { id: string; texture: ArtTexture; pal: Palette }) {
  const l = pal.line;

  switch (texture) {
    case "jute":
      // Open hessian: a coarse over-under grid with visible gaps.
      return (
        <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill="none" />
          <path d="M0 2.5h9M0 6.5h9" stroke={l} strokeWidth="2" opacity="0.16" />
          <path d="M2.5 0v9M6.5 0v9" stroke={l} strokeWidth="2" opacity="0.1" />
        </pattern>
      );

    case "canvas":
      // Fine cotton twill — tight diagonal ribs.
      return (
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M-1 5l6-6M-1 11l12-12M-1 -1l6 6" stroke={l} strokeWidth="1" opacity="0.12" />
        </pattern>
      );

    case "paper":
      // Cotton-rag pulp — scattered fibres and flecks.
      return (
        <pattern id={id} width="26" height="26" patternUnits="userSpaceOnUse">
          <path
            d="M3 7q4-3 8 0M15 18q5-2 8 1M6 21q3-2 6-1M18 5q3 1 5 3"
            stroke={l}
            strokeWidth="0.8"
            fill="none"
            opacity="0.22"
          />
          <circle cx="21" cy="11" r="0.9" fill={l} opacity="0.2" />
          <circle cx="9" cy="14" r="0.7" fill={l} opacity="0.16" />
          <circle cx="13" cy="24" r="0.8" fill={l} opacity="0.14" />
        </pattern>
      );

    case "sitalpati":
      // Murta reed mat — alternating basket-weave blocks.
      return (
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="none" />
          <rect x="0" y="0" width="8" height="8" fill={l} opacity="0.16" />
          <rect x="8" y="8" width="8" height="8" fill={l} opacity="0.16" />
          <path d="M0 8h16M8 0v16" stroke={l} strokeWidth="0.7" opacity="0.28" />
        </pattern>
      );

    case "khadi":
      // Handloom cotton — horizontal weft with occasional slubs.
      return (
        <pattern id={id} width="14" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 2h14M0 5h14" stroke={l} strokeWidth="1" opacity="0.12" />
          <path d="M2 2h4" stroke={l} strokeWidth="1.8" opacity="0.16" />
          <path d="M9 5h3" stroke={l} strokeWidth="1.6" opacity="0.13" />
        </pattern>
      );

    case "newsprint":
      // Columns of set type, abstracted to rules. Coarse on purpose — at card
      // size a finer grid just reads as noise.
      return (
        <pattern id={id} width="46" height="30" patternUnits="userSpaceOnUse">
          {/* A heavier line stands in for a headline. */}
          <path d="M3 5h16" stroke={l} strokeWidth="3.4" opacity="0.34" />
          <path
            d="M3 12h17M3 17h14M3 22h17M3 27h11"
            stroke={l}
            strokeWidth="2"
            opacity="0.24"
          />
          <path d="M26 5h15" stroke={l} strokeWidth="3.4" opacity="0.3" />
          <path
            d="M26 12h16M26 17h13M26 22h16M26 27h9"
            stroke={l}
            strokeWidth="2"
            opacity="0.24"
          />
          <path d="M23 2v26" stroke={l} strokeWidth="1" opacity="0.2" />
        </pattern>
      );

    case "stripe":
      // Woven awning stripe in the palette's accent colour.
      return (
        <pattern id={id} width="34" height="8" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="11" height="8" fill={pal.accent} opacity="0.5" />
          <rect x="15" y="0" width="4" height="8" fill={pal.accent} opacity="0.3" />
          <path d="M0 2h34M0 6h34" stroke={l} strokeWidth="0.8" opacity="0.12" />
        </pattern>
      );

    case "shimmer":
      // Metallic flecks caught in a natural weave.
      return (
        <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 4h18M0 12h18" stroke={l} strokeWidth="1.4" opacity="0.12" />
          <circle cx="5" cy="8" r="1.1" fill="#FFF6EA" opacity="0.85" />
          <circle cx="13" cy="15" r="0.9" fill="#FFF6EA" opacity="0.7" />
          <circle cx="15" cy="3" r="0.7" fill="#FFF6EA" opacity="0.6" />
        </pattern>
      );

    case "lace":
      // Openwork — rings and picots on a plain ground.
      return (
        <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="5.5" fill="none" stroke={l} strokeWidth="0.9" opacity="0.3" />
          <circle cx="11" cy="11" r="1.6" fill={l} opacity="0.16" />
          <circle cx="0" cy="0" r="2.4" fill="none" stroke={l} strokeWidth="0.8" opacity="0.22" />
          <circle cx="22" cy="22" r="2.4" fill="none" stroke={l} strokeWidth="0.8" opacity="0.22" />
        </pattern>
      );
  }
}

/* ================================================================== */
/* Body silhouettes                                                    */
/* ================================================================== */

/**
 * Each form returns the outline path of the product body. Fills, texture and
 * shading are applied uniformly by <Body> so every silhouette catches the
 * light from the same direction.
 */
const FORM_PATHS: Record<string, string> = {
  bottle: "M128 176 L272 176 Q276 300 270 428 Q200 438 130 428 Q124 300 128 176 Z",
  "bottle-drawstring":
    "M126 214 L274 214 Q280 312 272 428 Q200 438 128 428 Q120 312 126 214 Z",
  purse: "M112 254 L288 254 Q292 340 284 424 Q200 434 116 424 Q108 340 112 254 Z",
  pouch:
    "M132 250 Q116 340 138 410 Q200 432 262 410 Q284 340 268 250 Q200 240 132 250 Z",
  carrier: "M106 238 L294 238 L288 428 L112 428 Z",
  basket: "M96 272 L304 272 L288 420 L112 420 Z",
  hamper: "M94 296 L306 296 L294 424 L106 424 Z",
  "gift-bag": "M116 216 L284 216 L284 428 L116 428 Z",
  "mini-bag": "M138 272 L262 272 L262 404 L138 404 Z",
  baguette: "M158 152 L242 152 Q248 300 244 430 Q200 440 156 430 Q152 300 158 152 Z",
  "jar-bag": "M118 292 L282 292 L276 420 L124 420 Z",
  tote: "M104 238 L296 238 L288 428 L112 428 Z",
  sack: "M120 220 L280 220 Q288 320 284 430 Q200 440 116 430 Q112 320 120 220 Z",
  handbag: "M118 264 L282 264 Q276 348 270 420 L130 420 Q124 348 118 264 Z",
  picnic: "M100 284 L300 284 L292 428 L108 428 Z",
  laundry: "M124 212 L276 212 Q272 330 268 434 Q200 444 132 434 Q128 330 124 212 Z",
  yoga: "M158 134 L242 134 Q246 280 244 420 Q200 430 156 420 Q154 280 158 134 Z",
  lunch: "M132 290 L268 290 L262 414 L138 414 Z",
  "round-basket":
    "M104 302 Q104 260 200 260 Q296 260 296 302 L286 416 Q200 432 114 416 Z",
};

/** Extra construction detail drawn on top of the body, per form. */
function FormDetail({ form, pal }: { form: string; pal: Palette }) {
  const l = pal.line;
  const stroke = { stroke: l, fill: "none", strokeWidth: 1.4, opacity: 0.4 };

  switch (form) {
    case "carrier":
      // Internal dividers, plus six bottle necks above the rim.
      return (
        <>
          <path d="M168 244v180M232 244v180M112 330h176" {...stroke} />
          {[137, 168, 199, 230, 261].map((x, i) => (
            <g key={x}>
              <rect
                x={x}
                y={196 - (i % 2) * 8}
                width="16"
                height={44 + (i % 2) * 8}
                rx="5"
                fill={pal.bodyDark}
                opacity="0.55"
              />
              <rect
                x={x - 1}
                y={190 - (i % 2) * 8}
                width="18"
                height="9"
                rx="3"
                fill={l}
                opacity="0.45"
              />
            </g>
          ))}
        </>
      );

    case "basket":
      // Rolled rim and a couple of loaves resting inside.
      return (
        <>
          <rect x="92" y="262" width="216" height="16" rx="8" fill={pal.bodyDark} opacity="0.6" />
          <path
            d="M132 268q14-34 46-32t40 34"
            fill={pal.bgFrom}
            stroke={l}
            strokeWidth="1.4"
            opacity="0.85"
          />
          <path
            d="M196 268q12-26 40-24t34 26"
            fill={pal.bgTo}
            stroke={l}
            strokeWidth="1.4"
            opacity="0.85"
          />
          <path d="M150 250l10-8M170 246l9-8M214 252l9-8" stroke={l} strokeWidth="1.2" opacity="0.5" />
        </>
      );

    case "hamper":
      // Lid sitting proud of the body.
      return (
        <>
          <path d="M86 268 L314 268 L306 296 L94 296 Z" fill={pal.bodyDark} opacity="0.75" />
          <path d="M86 268 L314 268" stroke={l} strokeWidth="1.6" opacity="0.4" />
          <path d="M106 360h188" {...stroke} />
        </>
      );

    case "picnic":
      // Fold-over lid with a button closure.
      return (
        <>
          <path d="M108 256 L292 256 L300 288 L100 288 Z" fill={pal.bodyDark} opacity="0.7" />
          <circle cx="200" cy="300" r="7" fill={pal.line} opacity="0.5" />
          <path d="M108 348h184" {...stroke} />
        </>
      );

    case "laundry":
      // Fold-down rim and die-cut side handles.
      return (
        <>
          <ellipse cx="200" cy="212" rx="76" ry="15" fill={pal.bodyDark} opacity="0.65" />
          <ellipse cx="200" cy="212" rx="62" ry="10" fill={pal.bgTo} opacity="0.9" />
          <rect x="146" y="286" width="36" height="11" rx="5.5" fill={pal.bgTo} opacity="0.85" />
          <rect x="218" y="286" width="36" height="11" rx="5.5" fill={pal.bgTo} opacity="0.85" />
        </>
      );

    case "yoga":
      // Rounded cap, seam and a zip run.
      return (
        <>
          <ellipse cx="200" cy="134" rx="42" ry="13" fill={pal.bodyDark} opacity="0.6" />
          <path d="M200 150v258" stroke={l} strokeWidth="1.2" opacity="0.35" strokeDasharray="6 5" />
          <rect x="168" y="330" width="64" height="42" rx="6" fill={pal.bodyDark} opacity="0.35" />
        </>
      );

    case "baguette":
      // The loaf, scored, standing above the sleeve.
      return (
        <>
          <path
            d="M172 154q4-58 28-58t28 58"
            fill={pal.bgFrom}
            stroke={l}
            strokeWidth="1.5"
            opacity="0.9"
          />
          <path d="M186 132l10-12M192 148l10-12M204 142l10-12" stroke={l} strokeWidth="1.3" opacity="0.55" />
        </>
      );

    case "jar-bag":
      // Three jar lids showing above the carrier.
      return (
        <>
          {[142, 186, 230].map((x) => (
            <g key={x}>
              <rect x={x} y="262" width="30" height="34" rx="4" fill={pal.bodyDark} opacity="0.5" />
              <rect x={x - 2} y="256" width="34" height="10" rx="3" fill={l} opacity="0.45" />
            </g>
          ))}
          <path d="M124 356h152" {...stroke} />
        </>
      );

    case "sack":
      // Rolled-over top edge.
      return (
        <>
          <path d="M112 214 L288 214 L284 244 L116 244 Z" fill={pal.bodyDark} opacity="0.6" />
          <path d="M112 214q44 16 88 16t88-16" stroke={l} strokeWidth="1.5" fill="none" opacity="0.45" />
        </>
      );

    case "gift-bag":
      // Turned-over top band and a base fold.
      return (
        <>
          <path d="M116 216 L284 216 L284 246 L116 246 Z" fill={pal.bodyDark} opacity="0.55" />
          <path d="M116 404h168" {...stroke} />
        </>
      );

    case "mini-bag":
      // Gusset fold line.
      return <path d="M232 272v132" {...stroke} />;

    case "tote":
      // Base seam and side gusset.
      return (
        <>
          <path d="M112 396h176" {...stroke} />
          <path d="M262 238v190" {...stroke} />
        </>
      );

    case "handbag":
      // Turn-lock detail and a reversible-lining peek at the rim.
      return (
        <>
          <path d="M118 264 L282 264 L279 282 L121 282 Z" fill={pal.bgTo} opacity="0.75" />
          <circle cx="200" cy="322" r="9" fill="none" stroke={l} strokeWidth="1.6" opacity="0.5" />
          <circle cx="200" cy="322" r="3" fill={l} opacity="0.4" />
        </>
      );

    case "round-basket":
      // Rim binding and a weave centre line.
      return (
        <>
          <path
            d="M104 302 Q104 260 200 260 Q296 260 296 302"
            fill="none"
            stroke={pal.bodyDark}
            strokeWidth="11"
            opacity="0.6"
          />
          <path d="M200 268v156" {...stroke} />
        </>
      );

    case "lunch":
      return <path d="M132 340h136" {...stroke} />;

    case "purse":
      // Gusset corners.
      return <path d="M144 254v170M256 254v170" {...stroke} />;

    case "pouch":
      // Gathered neck above the body.
      return (
        <>
          <path
            d="M150 250q-6-36 12-46h76q18 10 12 46"
            fill={pal.bodyDark}
            opacity="0.5"
          />
          <path d="M170 216v34M200 210v40M230 216v34" stroke={l} strokeWidth="1.2" opacity="0.4" />
        </>
      );

    case "bottle-drawstring":
      // Gathered channel and the bottle top emerging.
      return (
        <>
          <path
            d="M152 214q0-42 20-54h56q20 12 20 54"
            fill={pal.bodyDark}
            opacity="0.45"
          />
          <path d="M172 176v38M200 168v46M228 176v38" stroke={l} strokeWidth="1.2" opacity="0.4" />
        </>
      );

    case "bottle":
      // Folded cuff, plus the bottle itself standing proud of the bag: a
      // tapered shoulder, a neck and a foil capsule, so it reads as glass
      // rather than as a spout.
      return (
        <>
          <path d="M128 176 L272 176 L271 200 L129 200 Z" fill={pal.bodyDark} opacity="0.55" />
          <path
            d="M176 180 Q176 138 189 124 L189 98 L211 98 L211 124 Q224 138 224 180 Z"
            fill="#4C563D"
          />
          <rect x="185" y="88" width="30" height="26" rx="3" fill="#8E2A26" />
          <path d="M196 104v72" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.18" />
        </>
      );

    default:
      return null;
  }
}

/* ================================================================== */
/* Handles                                                             */
/* ================================================================== */

function Handle({ form, handle, pal }: { form: string; handle: ArtHandle; pal: Palette }) {
  const t = pal.thread;

  // Where the handle meets the body, per silhouette.
  const anchors: Record<string, { y: number; lx: number; rx: number }> = {
    bottle: { y: 176, lx: 152, rx: 248 },
    "bottle-drawstring": { y: 176, lx: 156, rx: 244 },
    purse: { y: 254, lx: 140, rx: 260 },
    pouch: { y: 214, lx: 168, rx: 232 },
    carrier: { y: 238, lx: 140, rx: 260 },
    basket: { y: 272, lx: 110, rx: 290 },
    hamper: { y: 268, lx: 110, rx: 290 },
    "gift-bag": { y: 216, lx: 152, rx: 248 },
    "mini-bag": { y: 272, lx: 162, rx: 238 },
    baguette: { y: 152, lx: 170, rx: 230 },
    "jar-bag": { y: 292, lx: 146, rx: 254 },
    tote: { y: 238, lx: 142, rx: 258 },
    sack: { y: 214, lx: 148, rx: 252 },
    handbag: { y: 264, lx: 152, rx: 248 },
    picnic: { y: 256, lx: 142, rx: 258 },
    laundry: { y: 212, lx: 150, rx: 250 },
    yoga: { y: 150, lx: 176, rx: 224 },
    lunch: { y: 290, lx: 160, rx: 240 },
    "round-basket": { y: 262, lx: 140, rx: 260 },
  };

  const a = anchors[form] ?? { y: 220, lx: 150, rx: 250 };
  const rise = 62;

  switch (handle) {
    case "rope": {
      const d = `M${a.lx} ${a.y} Q200 ${a.y - rise} ${a.rx} ${a.y}`;
      return (
        <>
          <path d={d} fill="none" stroke={t} strokeWidth="11" strokeLinecap="round" />
          {/* Dashes across the cord suggest the twist of the ply. */}
          <path
            d={d}
            fill="none"
            stroke={pal.line}
            strokeWidth="11"
            strokeLinecap="butt"
            strokeDasharray="3 9"
            opacity="0.4"
          />
        </>
      );
    }

    case "braided": {
      // Bamboo cross-bar with braided rope rising to it.
      const d = `M${a.lx} ${a.y} Q${a.lx + 6} ${a.y - 48} ${a.lx + 34} ${a.y - 58}`;
      const d2 = `M${a.rx} ${a.y} Q${a.rx - 6} ${a.y - 48} ${a.rx - 34} ${a.y - 58}`;
      return (
        <>
          <path d={d} fill="none" stroke={t} strokeWidth="10" strokeLinecap="round" />
          <path d={d2} fill="none" stroke={t} strokeWidth="10" strokeLinecap="round" />
          <path
            d={`${d} ${d2}`}
            fill="none"
            stroke={pal.line}
            strokeWidth="10"
            strokeLinecap="butt"
            strokeDasharray="3 8"
            opacity="0.38"
          />
          <rect
            x={a.lx + 24}
            y={a.y - 66}
            width={a.rx - a.lx - 48}
            height="16"
            rx="8"
            fill={pal.line}
          />
          <rect
            x={a.lx + 30}
            y={a.y - 63}
            width={a.rx - a.lx - 60}
            height="5"
            rx="2.5"
            fill="#FFF3E2"
            opacity="0.4"
          />
        </>
      );
    }

    case "leather": {
      // Straight straps with visible saddle stitching.
      return (
        <>
          {[a.lx, a.rx].map((x) => (
            <g key={x}>
              <rect x={x - 9} y={a.y - 58} width="18" height="66" rx="4" fill={pal.line} />
              <path
                d={`M${x} ${a.y - 52}v52`}
                stroke={pal.bgFrom}
                strokeWidth="1.6"
                strokeDasharray="4 4"
                opacity="0.85"
              />
            </g>
          ))}
          <path
            d={`M${a.lx} ${a.y - 56} Q200 ${a.y - 100} ${a.rx} ${a.y - 56}`}
            fill="none"
            stroke={pal.line}
            strokeWidth="17"
            strokeLinecap="round"
          />
        </>
      );
    }

    case "webbing": {
      // Flat cotton webbing, stitched through the body.
      const d = `M${a.lx} ${a.y + 18} Q200 ${a.y - rise - 10} ${a.rx} ${a.y + 18}`;
      return (
        <>
          <path d={d} fill="none" stroke={t} strokeWidth="14" strokeLinecap="round" />
          <path
            d={d}
            fill="none"
            stroke={pal.line}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </>
      );
    }

    case "twin-loop":
      return (
        <>
          {[
            [a.lx, a.lx + 46],
            [a.rx - 46, a.rx],
          ].map(([x1, x2]) => (
            <path
              key={x1}
              d={`M${x1} ${a.y + 6} Q${(x1 + x2) / 2} ${a.y - 50} ${x2} ${a.y + 6}`}
              fill="none"
              stroke={t}
              strokeWidth="11"
              strokeLinecap="round"
            />
          ))}
        </>
      );

    case "shoulder": {
      // One long strap slung up and off the frame.
      return (
        <>
          <path
            d={`M${a.lx} ${a.y + 10} C${a.lx - 30} ${a.y - 116} ${a.rx + 30} ${a.y - 116} ${a.rx} ${a.y + 10}`}
            fill="none"
            stroke={t}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Slider buckle, so the strap reads as adjustable. */}
          <rect x={194} y={a.y - 100} width="22" height="14" rx="3" fill={pal.line} />
        </>
      );
    }

    case "drawstring": {
      // Cord through a channel, knotted, with tassel ends.
      const y = a.y + 6;
      return (
        <>
          <path
            d={`M${a.lx - 16} ${y} Q200 ${y - 28} ${a.rx + 16} ${y}`}
            fill="none"
            stroke={t}
            strokeWidth="7"
            strokeLinecap="round"
          />
          {[a.lx - 16, a.rx + 16].map((x, i) => (
            <g key={x}>
              <path
                d={`M${x} ${y} q${i ? 14 : -14} 18 ${i ? 8 : -8} 36`}
                fill="none"
                stroke={t}
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx={x + (i ? 8 : -8)} cy={y + 40} r="7" fill={t} />
            </g>
          ))}
          <circle cx="200" cy={y - 18} r="8" fill={t} />
        </>
      );
    }

    case "cut-out":
      // Handled by FormDetail for the forms that use it.
      return null;

    case "none":
    default:
      return null;
  }
}

/* ================================================================== */
/* Accents                                                             */
/* ================================================================== */

function Accent({ accent, pal }: { accent: ArtAccent; pal: Palette }) {
  switch (accent) {
    case "bow":
      return (
        <g transform="translate(200 262)">
          <path d="M0 0 L-42 -20 L-46 16 Z" fill="#8E2A26" />
          <path d="M0 0 L42 -20 L46 16 Z" fill="#A8322B" />
          <path d="M-4 2 L-18 44 L-6 44 Z" fill="#8E2A26" opacity="0.9" />
          <path d="M4 2 L20 44 L8 44 Z" fill="#A8322B" opacity="0.9" />
          <circle cx="0" cy="0" r="11" fill="#962E29" />
          <circle cx="-3" cy="-3" r="3.5" fill="#FFF" opacity="0.18" />
        </g>
      );

    case "botanical":
      // Pressed flowers laid into the wet sheet, with a trailing stem.
      return (
        <g>
          {/* Stem first, so the blooms sit over it. */}
          <path
            d="M168 300 C186 336 206 360 244 384"
            stroke={pal.line}
            strokeWidth="2.4"
            fill="none"
            opacity="0.6"
          />
          {[
            [196, 336, -34],
            [214, 352, -30],
            [232, 370, -26],
          ].map(([x, y, r]) => (
            <ellipse
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              rx="15"
              ry="7"
              fill={pal.accent}
              opacity="0.45"
              transform={`rotate(${r} ${x} ${y})`}
            />
          ))}

          <g transform="translate(166 292)">
            {[0, 60, 120, 180, 240, 300].map((r) => (
              <ellipse
                key={r}
                cx="0"
                cy="-20"
                rx="10"
                ry="19"
                fill={pal.accent}
                opacity="0.6"
                transform={`rotate(${r})`}
              />
            ))}
            <circle cx="0" cy="0" r="8" fill={pal.line} opacity="0.75" />
          </g>

          <g transform="translate(250 372)">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse
                key={r}
                cx="0"
                cy="-15"
                rx="8"
                ry="14"
                fill={pal.accent}
                opacity="0.45"
                transform={`rotate(${r})`}
              />
            ))}
            <circle cx="0" cy="0" r="6" fill={pal.line} opacity="0.65" />
          </g>
        </g>
      );

    case "chikankari":
      // White-on-white shadow work: fine floral sprigs.
      return (
        <g stroke="#FFFDF8" fill="none" strokeWidth="1.8" opacity="0.9">
          {[
            [166, 268],
            [234, 300],
            [180, 344],
            [246, 380],
            [156, 390],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              {[0, 90, 180, 270].map((r) => (
                <ellipse key={r} cx="0" cy="-8" rx="4.5" ry="8" transform={`rotate(${r})`} />
              ))}
              <circle cx="0" cy="0" r="2" fill="#FFFDF8" />
            </g>
          ))}
          <path d="M172 292q22 22 56 26M188 356q26 8 52 26" strokeDasharray="2 5" opacity="0.7" />
        </g>
      );

    case "stone":
      // Hand-set stones catching the light, on embroidered vines.
      return (
        <g>
          <path
            d="M150 300q34 26 46 62M250 296q-30 30-38 68"
            stroke={pal.line}
            strokeWidth="1.6"
            fill="none"
            opacity="0.55"
          />
          {[
            [200, 268, 8],
            [166, 314, 6],
            [236, 322, 6],
            [186, 366, 5],
            [222, 380, 5],
            [200, 406, 4],
          ].map(([x, y, r]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={r} fill="#F3E2CE" stroke={pal.line} strokeWidth="1" />
              <circle cx={x - r / 3} cy={y - r / 3} r={r / 3} fill="#FFF" opacity="0.85" />
            </g>
          ))}
        </g>
      );

    case "twine":
      // Jute twine wrapped around the neck of the bag.
      return (
        <g stroke={pal.thread} strokeWidth="5" fill="none" strokeLinecap="round">
          <path d="M132 236h136M130 250h140M132 264h136" />
          <path d="M268 250q22 8 16 30" strokeWidth="4" />
          <circle cx="286" cy="286" r="5" fill={pal.thread} stroke="none" />
        </g>
      );

    case "seed":
      // A seedling breaking through — the plantable promise.
      return (
        <g transform="translate(200 322)">
          <path d="M0 44V6" stroke={pal.accent} strokeWidth="3" strokeLinecap="round" />
          <path d="M0 18q-26-6-30-30 26-2 30 30Z" fill={pal.accent} opacity="0.75" />
          <path d="M0 26q26-8 32-32-26 0-32 32Z" fill={pal.accent} opacity="0.6" />
          <circle cx="0" cy="50" r="4" fill={pal.line} opacity="0.6" />
        </g>
      );

    case "label":
      // Stitched brand patch — where the customer's logo goes.
      return (
        <g>
          <rect x="164" y="322" width="72" height="30" rx="3" fill={pal.line} opacity="0.75" />
          <rect
            x="168"
            y="326"
            width="64"
            height="22"
            rx="2"
            fill="none"
            stroke={pal.bgFrom}
            strokeWidth="1"
            opacity="0.7"
          />
          <path d="M180 337h40" stroke={pal.bgFrom} strokeWidth="2" opacity="0.75" />
        </g>
      );

    case "none":
    default:
      return null;
  }
}

/* ================================================================== */
/* Scene furniture                                                     */
/* ================================================================== */

/**
 * A sprig of foliage that sits behind the product and sways gently. Kept in a
 * muted olive rather than the palette's own brown, so it reads as a plant
 * rather than as a stray mark in the same colour as the bag.
 */
function Sprig({ flip = false }: { flip?: boolean }) {
  const leaves: [number, number, number][] = [
    [5, -40, -32],
    [10, -74, -36],
    [16, -106, -30],
    [22, -136, -24],
  ];

  return (
    <g
      className="motion-safe:animate-sway origin-bottom"
      // Set wide enough that the product never buries the foliage.
      transform={flip ? "translate(368 412) scale(-1 1)" : "translate(32 412)"}
    >
      <path
        d="M0 0C3 -58 10 -110 26 -152"
        stroke="#7C8465"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      {leaves.map(([x, y, r], i) => (
        <g key={i}>
          <ellipse
            cx={x - 19}
            cy={y}
            rx="21"
            ry="9"
            fill="#7C8465"
            opacity={0.42 - i * 0.03}
            transform={`rotate(${r} ${x - 19} ${y})`}
          />
          <ellipse
            cx={x + 19}
            cy={y + 10}
            rx="21"
            ry="9"
            fill="#7C8465"
            opacity={0.3 - i * 0.03}
            transform={`rotate(${-r} ${x + 19} ${y + 10})`}
          />
        </g>
      ))}
    </g>
  );
}

/* ================================================================== */
/* Composition                                                         */
/* ================================================================== */

export type ProductArtProps = {
  art: ArtSpec;
  /** Unique per rendered instance — namespaces the SVG defs. */
  id: string;
  className?: string;
  /** Decorative by default; pass a label when the art is the only content. */
  title?: string;
};

/**
 * Forms whose construction detail deliberately breaks the silhouette — a
 * bottle neck, a loaf, a lid sitting proud of the body. These draw over the
 * clip instead of inside it.
 */
const DETAIL_BREAKS_SILHOUETTE = new Set([
  "bottle",
  "bottle-drawstring",
  "baguette",
  "basket",
  "carrier",
  "hamper",
  "jar-bag",
  "laundry",
  "picnic",
  "pouch",
  "sack",
  "yoga",
]);

/** Accents that sit on the outside of the bag rather than printed into it. */
const ACCENT_SITS_PROUD = new Set<ArtAccent>(["bow", "twine"]);

/** The drawstring is the only handle that reads in front of the body. */
const HANDLE_IN_FRONT = new Set<ArtHandle>(["drawstring"]);

export function ProductArt({ art, id, className, title }: ProductArtProps) {
  const pal = PALETTES[art.palette];
  const path = FORM_PATHS[art.form] ?? FORM_PATHS.tote;

  const detailInFront = DETAIL_BREAKS_SILHOUETTE.has(art.form);
  const accentInFront = ACCENT_SITS_PROUD.has(art.accent);
  const handleInFront = HANDLE_IN_FRONT.has(art.handle);

  const bgId = `${id}-bg`;
  const texId = `${id}-tex`;
  const shadeId = `${id}-shade`;
  const clipId = `${id}-clip`;
  const grainId = `${id}-grain`;

  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={pal.bgFrom} />
          <stop offset="100%" stopColor={pal.bgTo} />
        </linearGradient>

        {/* Light falls from the upper left, consistently across the set. */}
        <linearGradient id={shadeId} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.24" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.16" />
        </linearGradient>

        <Texture id={texId} texture={art.texture} pal={pal} />

        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>

        <filter id={grainId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n" />
          <feColorMatrix type="saturate" values="0" in="n" result="d" />
          <feComponentTransfer in="d">
            <feFuncA type="linear" slope="0.16" />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* Ground */}
      <rect width="400" height="500" fill={`url(#${bgId})`} />

      {/* The brand's circle motif, drifting slowly behind the subject. */}
      <circle
        cx="200"
        cy="228"
        r="150"
        fill={pal.halo}
        opacity="0.75"
        className="motion-safe:animate-drift-slow"
      />

      {/* Surface the product stands on */}
      <ellipse cx="200" cy="436" rx="168" ry="26" fill={pal.bodyDark} opacity="0.14" />

      <Sprig />
      <Sprig flip />

      {/* --- Subject --------------------------------------------------- */}
      <g className="motion-safe:animate-drift">
        {/* Handles pass behind the body unless they close over it. */}
        {!handleInFront && <Handle form={art.form} handle={art.handle} pal={pal} />}

        <path d={path} fill={pal.body} />
        <g clipPath={`url(#${clipId})`}>
          <rect width="400" height="500" fill={`url(#${texId})`} />
          <rect width="400" height="500" fill={`url(#${shadeId})`} />
        </g>
        <path d={path} fill="none" stroke={pal.bodyDark} strokeWidth="1.5" opacity="0.5" />

        {/* Detail and decoration printed into the fabric stay clipped. */}
        <g clipPath={`url(#${clipId})`}>
          {!detailInFront && <FormDetail form={art.form} pal={pal} />}
          {!accentInFront && <Accent accent={art.accent} pal={pal} />}
        </g>

        {/* …everything else is a physical part sitting on top of it. */}
        {detailInFront && <FormDetail form={art.form} pal={pal} />}
        {accentInFront && <Accent accent={art.accent} pal={pal} />}
        {handleInFront && <Handle form={art.form} handle={art.handle} pal={pal} />}
      </g>

      {/* Paper grain over the whole frame ties the layers together. */}
      <rect width="400" height="500" filter={`url(#${grainId})`} opacity="0.5" />
    </svg>
  );
}
