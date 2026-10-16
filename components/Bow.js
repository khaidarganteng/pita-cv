export default function Bow({ size = 40, className = '' }) {
  return (
    <svg viewBox="0 0 64 40" width={size} height={(size * 40) / 64} className={className} aria-hidden="true">
      <path d="M32 20 8 4C3 1 0 4 0 9v22c0 5 3 8 8 5l24-16Z" fill="#f472a8" />
      <path d="M32 20 56 4c5-3 8 0 8 5v22c0 5-3 8-8 5L32 20Z" fill="#f472a8" />
      <circle cx="32" cy="20" r="7" fill="#ffc2dc" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}
