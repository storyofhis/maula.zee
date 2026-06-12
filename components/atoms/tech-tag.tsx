interface TechTagProps {
  children: React.ReactNode;
}

export function TechTag({ children }: TechTagProps) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-wide text-ink-tertiary bg-bg-primary dark:bg-bg-dark border border-border-subtle dark:border-border-strong px-2 py-0.5 rounded-sm">
      {children}
    </span>
  );
}
