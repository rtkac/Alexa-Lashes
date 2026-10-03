import { cn } from '../../lib/utils';

type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'className'> & {
  name: string;
  id?: string;
  invalid?: boolean;
  className?: string;
};

function Textarea({ name, id, invalid, className, rows = 4, ...props }: TextareaProps) {
  return (
    <textarea
      id={id ?? name}
      name={name}
      rows={rows}
      data-slot="textarea"
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

export { Textarea };
