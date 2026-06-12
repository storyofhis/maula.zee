interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-label uppercase tracking-widest text-ink-secondary dark:text-ink-tertiary ${className}`}
    >
      {children}
    </p>
  );
}
