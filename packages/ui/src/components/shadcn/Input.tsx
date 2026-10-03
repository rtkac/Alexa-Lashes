import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '../../lib/utils';

type InputProps = Omit<InputPrimitive.Props, 'className'> & {
  name: string;
  id?: string;
  invalid?: boolean;
  className?: string;
};

function Input({ name, id, invalid, className, ...props }: InputProps) {
  return (
    <InputPrimitive
      id={id ?? name}
      name={name}
      data-slot="input"
      aria-invalid={invalid}
      className={cn(
        'rounded-md border border-primary-strong/80 bg-background px-4 py-3 focus:outline-primary-strong',
        'aria-invalid:border-red-600 aria-invalid:focus:outline-red-700',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
