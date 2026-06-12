type ProjectStatus = "Live" | "WIP" | "Archived";

const STATUS_CLASSES: Record<ProjectStatus, string> = {
  Live:     "bg-accent/10 text-accent dark:bg-accent-dark/10 dark:text-accent-dark border border-accent/20 dark:border-accent-dark/20",
  WIP:      "bg-warning/10 text-warning border border-warning/20",
  Archived: "bg-bg-secondary dark:bg-bg-dark-muted text-ink-tertiary border border-border-subtle dark:border-border-strong",
};

interface StatusBadgeProps {
  status: ProjectStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${STATUS_CLASSES[status]}`}
    >
      {status}
    </span>
  );
}
