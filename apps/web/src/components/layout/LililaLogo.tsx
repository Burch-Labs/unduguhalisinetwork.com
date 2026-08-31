import Link from "next/link";
import Image from "next/image";

interface LililaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function LililaLogo({ size = "sm", showText = true }: LililaLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40, textSize: "text-lg" },
    md: { width: 48, height: 48, textSize: "text-xl" },
    lg: { width: 56, height: 56, textSize: "text-2xl" },
  };

  const { width, height, textSize } = sizes[size];

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 flex-shrink-0 hover:opacity-90 transition-opacity"
      title="Lilita Keper Agent Portal - Masai Mara"
    >
      {/* Logo Image - High Resolution */}
      <div className="relative flex-shrink-0" style={{ width, height }}>
        <Image
          src="/logos/lilita-keper-logo-transparent.png"
          alt="Lilita Keper Logo"
          width={width}
          height={height}
          priority
          className="object-contain"
          onError={(e) => {
            // Fallback if logo image not found
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = "none";
          }}
        />
      </div>

      {/* Text branding - Only on larger screens */}
      {showText && (
        <div className="hidden sm:flex flex-col leading-tight">
          <span className={`font-display font-bold text-amber-900 tracking-widest ${textSize}`}>
            LILITA
          </span>
          <span className="text-xs text-amber-700 font-medium tracking-wide">
            KEPER
          </span>
        </div>
      )}
    </Link>
  );
}
