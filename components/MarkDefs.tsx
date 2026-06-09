// Registers the Hibi mark once per document as an SVG <symbol>.
// Render in app/layout.tsx so every <Mark/> can <use href="#hibi-mk"/>.
export default function MarkDefs() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        <mask
          id="hibi-cut"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="200"
        >
          <rect width="200" height="200" fill="#fff" />
          <g
            fill="#000"
            stroke="#000"
            strokeWidth="12"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M 76.4 87 L 76.4 29.9 A 74 74 0 0 1 123.6 29.9 L 123.6 87 Z" />
            <path d="M 76.4 107 L 76.4 170.1 A 74 74 0 0 0 123.6 170.1 L 123.6 107 Z" />
            <path d="M 53.4 42.5 L 53.4 157.5 A 74 74 0 0 1 53.4 42.5 Z" />
            <path d="M 146.6 42.5 L 146.6 157.5 A 74 74 0 0 0 146.6 42.5 Z" />
          </g>
        </mask>
        <symbol id="hibi-mk" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="var(--mc,#15141a)"
            mask="url(#hibi-cut)"
          />
        </symbol>

        {/* water-ripple displacement for text hover (subtle, animated) */}
        <filter id="ripple" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.018"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="16s"
              values="0.008 0.018; 0.013 0.022; 0.008 0.018"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
