import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const baseButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border-2 border-transparent text-center font-bold no-underline transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-ink hover:border-[color-mix(in_srgb,var(--primary),white_20%)] hover:bg-[color-mix(in_srgb,var(--primary),white_20%)] disabled:border-primary-disabled disabled:bg-primary-disabled',
        secondary:
          'border-secondary bg-secondary text-foreground hover:border-[color-mix(in_srgb,var(--secondary),black_5%)] hover:bg-[color-mix(in_srgb,var(--secondary),black_5%)] disabled:opacity-50',
        outline:
          'border-primary bg-background text-primary-strong hover:bg-white disabled:opacity-50',
        ghost: 'text-primary-strong hover:bg-primary-light disabled:opacity-50',
        destructive: 'bg-destructive/10 text-red-700 hover:bg-destructive/20 disabled:opacity-50',
        link: 'border-0 text-primary-strong underline-offset-4 hover:underline disabled:opacity-50',
      },
      size: {
        default: 'h-11 px-4 text-base',
        xs: "h-7 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-12 px-6 text-base',
        icon: "size-11 rounded-full [&_svg:not([class*='size-'])]:size-5",
        'icon-xs': "size-7 rounded-full [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-9 rounded-full',
        'icon-lg': "size-12 rounded-full [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// Merged so `border-transparent` in the base yields to a variant border when used outside <Button>.
const buttonVariants = (props?: Parameters<typeof baseButtonVariants>[0]) =>
  cn(baseButtonVariants(props));

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof baseButtonVariants>;

const Button = ({ className, variant = 'default', size = 'default', ...props }: ButtonProps) => (
  <ButtonPrimitive
    data-slot="button"
    className={buttonVariants({ variant, size, className })}
    {...props}
  />
);

export { Button, buttonVariants };
