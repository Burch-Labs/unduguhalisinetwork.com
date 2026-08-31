import Link from "next/link";

export function LililaLogo({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { width: 40, height: 40, textSize: "text-lg" },
    md: { width: 48, height: 48, textSize: "text-xl" },
    lg: { width: 56, height: 56, textSize: "text-2xl" },
  };

  const { width, height, textSize } = sizes[size];

  return (
    <Link
      href="/"
      className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
      title="Lilita Keper Agent Portal"
    >
      {/* Lion Icon SVG */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Lion head with mane */}
        <circle cx="50" cy="50" r="35" fill="#f97316" opacity="0.1" />

        {/* Mane (circular background) */}
        <circle cx="50" cy="45" r="32" stroke="#f97316" strokeWidth="2.5" fill="none" />

        {/* Left mane curves */}
        <path
          d="M 30 35 Q 20 30 18 45 Q 20 50 30 48"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right mane curves */}
        <path
          d="M 70 35 Q 80 30 82 45 Q 80 50 70 48"
          stroke="#f97316"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Face */}
        <circle cx="50" cy="50" r="22" fill="#f97316" />

        {/* Eyes */}
        <circle cx="43" cy="46" r="3.5" fill="#ffffff" />
        <circle cx="57" cy="46" r="3.5" fill="#ffffff" />
        <circle cx="43.5" cy="46.5" r="1.5" fill="#000000" />
        <circle cx="57.5" cy="46.5" r="1.5" fill="#000000" />

        {/* Nose */}
        <path
          d="M 50 52 L 48 56 L 52 56 Z"
          fill="#000000"
        />

        {/* Mouth */}
        <path
          d="M 50 56 Q 45 58 42 57"
          stroke="#000000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 50 56 Q 55 58 58 57"
          stroke="#000000"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Whiskers */}
        <line x1="20" y1="48" x2="35" y2="47" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="54" x2="35" y2="54" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="80" y1="48" x2="65" y2="47" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="80" y1="54" x2="65" y2="54" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Text branding */}
      <span className={`font-display font-semibold text-orange-600 tracking-wide hidden sm:inline ${textSize}`}>
        Lilita
      </span>
    </Link>
  );
}
