/** A simple, elegant Bodhi/Ficus leaf — used as a quiet brand motif. */
export function BodhiMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden="true" fill="none">
      <path
        d="M50 6 C50 6 18 34 18 66 C18 90 34 106 50 112 C66 106 82 90 82 66 C82 34 50 6 50 6 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <path d="M50 14 L50 112" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <path d="M50 40 C42 42 34 48 30 58 M50 40 C58 42 66 48 70 58" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M50 62 C42 64 36 70 33 80 M50 62 C58 64 64 70 67 80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M50 84 C44 86 40 90 38 98 M50 84 C56 86 60 90 62 98" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M50 112 C50 112 49 118 48 120 M50 112 C50 112 51 118 52 120" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
