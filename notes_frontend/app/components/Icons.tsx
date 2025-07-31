import type { SVGProps } from "react";

/**
 * Simple plus icon, for FAB.
 */
export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
