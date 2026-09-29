import type { ReactNode } from 'react';
import type { ShowcaseStage } from '../../../models/showcase/timeline.model';

const PATHS: Record<ShowcaseStage, ReactNode> = {
  design: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.6 7.6" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  code: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
    </>
  ),
};

export function StageIcon({ stage }: { stage: ShowcaseStage }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[stage]}
    </svg>
  );
}
