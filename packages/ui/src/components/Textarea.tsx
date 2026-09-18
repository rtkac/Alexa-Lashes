import { cn } from '../lib/utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onBlur?: () => void;
  invalid?: boolean;
  className?: string;
};

export const Textarea = ({
  name,
  placeholder,
  value,
  disabled,
  onChange,
  onBlur,
  invalid,
  className,
}: TextareaProps) => (
  <textarea
    id={name}
    name={name}
    placeholder={placeholder}
    rows={4}
    value={value}
    disabled={disabled}
    onBlur={onBlur}
    onChange={onChange}
    className={cn(
      'rounded-md border border-primary-light bg-background px-4 py-3 focus:outline-primary',
      invalid ? 'border-red-300 focus:outline-red-400' : 'focus:outline-primary',
      className,
    )}
  />
);
