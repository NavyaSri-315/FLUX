import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-primary', props.className)}
      {...props}
    >
      <title>FLUX Logo</title>
      <path d="M16.5 6.5l-9 9" />
      <path d="M16.5 17.5l-9-9" />
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
    </svg>
  );
}
