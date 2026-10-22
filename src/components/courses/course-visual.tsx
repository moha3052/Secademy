export function CourseVisual({ kind }: { kind: "shield" | "network" }) {
  return (
    <div className={`course-visual visual-${kind}`} aria-hidden="true">
      {kind === "shield" ? (
        <svg viewBox="0 0 420 190" fill="none">
          <path
            d="M30 150H390M60 40V170M360 20V170"
            stroke="currentColor"
            opacity=".15"
          />
          <rect
            x="86"
            y="38"
            width="220"
            height="128"
            rx="8"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M86 68H306" stroke="currentColor" />
          <circle cx="101" cy="53" r="3" fill="currentColor" />
          <circle cx="112" cy="53" r="3" fill="currentColor" />
          <circle cx="123" cy="53" r="3" fill="currentColor" />
          <text
            x="105"
            y="100"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="14"
          >
            $ ls -l noter.txt
          </text>
          <text
            x="105"
            y="130"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="20"
          >
            -rw-r-----
          </text>
          <path
            d="M298 68L342 85V119C342 146 298 164 298 164S254 146 254 119V85L298 68Z"
            fill="var(--accent)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M280 114L293 127L317 101"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55 82h16M63 74v16M359 57h14M366 50v14"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 420 190" fill="none">
          <path
            d="M85 65H195V130H330M195 65H330"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <rect
            x="40"
            y="36"
            width="90"
            height="58"
            rx="6"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M65 108H105M85 94V108"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text
            x="59"
            y="70"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="13"
          >
            klient
          </text>
          <rect
            x="161"
            y="38"
            width="72"
            height="54"
            rx="6"
            fill="var(--accent)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M177 57H217M177 72H217M211 52L217 57L211 62M183 67L177 72L183 77"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="286"
            y="35"
            width="90"
            height="56"
            rx="6"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="286"
            y="108"
            width="90"
            height="56"
            rx="6"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text
            x="301"
            y="67"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="12"
          >
            VLAN 20
          </text>
          <text
            x="301"
            y="141"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="12"
          >
            VLAN 30
          </text>
          <circle cx="252" cy="65" r="6" fill="currentColor" />
          <text
            x="157"
            y="160"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="11"
          >
            ÉT LINK. FLERE VLAN.
          </text>
        </svg>
      )}
    </div>
  );
}
