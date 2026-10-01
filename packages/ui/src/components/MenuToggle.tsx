import { MenuIcon, XIcon } from 'lucide-react';

import { cn } from '../lib/utils';

type MenuToggleProps = {
  open: boolean;
  className?: string;
};

export const MenuToggle = ({ open, className }: MenuToggleProps) => {
  return (
    <span
      aria-hidden="true"
      className={cn('relative flex size-5 items-center justify-center', className)}
    >
      <MenuIcon
        className={cn(
          'absolute size-5 transition-all duration-300 ease-out',
          open ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      />
      <XIcon
        className={cn(
          'absolute size-5 transition-all duration-300 ease-out',
          open ? 'rotate-0 scale-100 opacity-100' : '-rotate-45 scale-0 opacity-0',
        )}
      />
    </span>
  );
};
