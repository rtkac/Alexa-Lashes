import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '../../lib/utils';

type InputProps = Omit<InputPrimitive.Props, 'className'> & {
  name: string;
  invalid?: boolean;
  className?: string;
};

function Input({ name, invalid, className, ...props }: InputProps) {
  return (
    <InputPrimitive
      id={name}
      name={name}
      data-slot="input"
      aria-invalid={invalid}
      className={cn(
        'rounded-md border border-primary-light bg-background px-4 py-3 focus:outline-primary',
        'aria-invalid:border-red-300 aria-invalid:focus:outline-red-400',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
