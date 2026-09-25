import { cn } from '../../lib/utils';

type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'className'> & {
  name: string;
  invalid?: boolean;
  className?: string;
};

function Textarea({ name, invalid, className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      id={name}
      name={name}
      rows={rows}
      data-slot="textarea"
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

export { Textarea };
