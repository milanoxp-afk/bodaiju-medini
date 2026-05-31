"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveal — fades + lifts children into view on scroll.
 * Respects prefers-reduced-motion (handled in globals.css).
 *
 * `immediate` = render visible from first paint (NO opacity:0). Use for
 * above-the-fold / hero content: scroll-reveal is pointless there, and hiding
 * it until JS hydrates badly delays LCP on slow connections.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const Component = Tag as "div";

  // immediate: no `reveal` class at all → content is in the SSR HTML at full
  // opacity, so it counts toward LCP straight away.
  if (immediate) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
