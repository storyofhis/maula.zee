import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href: string;
  label: string;
}

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-mono-sm text-ink-tertiary hover:text-ink-primary dark:hover:text-ink-inverse transition-colors duration-150 mb-12"
    >
      <ArrowLeft
        size={14}
        className="group-hover:-translate-x-0.5 transition-transform duration-150"
      />
      {label}
    </Link>
  );
}
