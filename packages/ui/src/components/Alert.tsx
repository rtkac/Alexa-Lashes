import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '../lib/utils';

type AlertProps = {
  variant: 'success' | 'error';
  children: ReactNode;
  className?: string;
};

const variants = {
  success: {
    Icon: CircleCheckIcon,
    container: 'border-[#cfe2c8] bg-[#f0f6ed] text-[#2d4a2b]',
    icon: 'text-[#3f7a3c]',
  },
  error: {
    Icon: CircleAlertIcon,
    container: 'border-[#ecd0c9] bg-[#fbf2ef] text-[#6b2a20]',
    icon: 'text-[#b0412f]',
  },
} as const;

export const Alert = ({ variant, children, className }: AlertProps) => {
  const { Icon, container, icon } = variants[variant];

  return (
    <div
      className={cn(
        'fade-in slide-in-from-top-1 flex animate-in items-center gap-3 rounded-lg border p-3 pr-4 duration-300 ease-out',
        container,
        className,
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgb(43_36_24/0.08)]">
        <Icon aria-hidden="true" className={cn('size-5', icon)} />
      </span>
      <p className="text-sm leading-relaxed md:text-base">{children}</p>
    </div>
  );
};
