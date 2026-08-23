export function AstronautIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* helmet */}
      <circle cx="24" cy="17" r="10" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="17" r="6" fill="currentColor" fillOpacity="0.85" />
      <path d="M18 14a7 7 0 0 1 11-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />

      {/* body */}
      <path
        d="M15 28c0-3 4-5 9-5s9 2 9 5v8c0 3.5-4 6-9 6s-9-2.5-9-6v-8z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="20.5" y="30" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />

      {/* arms */}
      <path d="M15.5 30c-3 1-5 4-4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M32.5 30c3 1 5 4 4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
