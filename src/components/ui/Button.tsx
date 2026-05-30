import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "gold";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2";

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[0.95rem]",
  lg: "px-9 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-ink-soft)] hover:-translate-y-0.5 shadow-sm hover:shadow-md",
  gold:
    "bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-deep)] hover:text-white hover:-translate-y-0.5 shadow-sm hover:shadow-md",
  outline:
    "border border-[var(--color-ink)]/25 text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:-translate-y-0.5",
  ghost: "text-[var(--color-ink)] hover:text-[var(--color-gold-deep)]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  onClick,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
