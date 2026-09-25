import { cn } from '../lib/utils';

type FieldErrorProps = {
  errors: readonly (string | { message: string } | null | undefined)[];
  className?: string;
};

export const FieldError = ({ errors, className }: FieldErrorProps) => {
  const messages = errors
    .filter((error) => error != null)
    .map((error) => (typeof error === 'string' ? error : error.message));

  return messages.length ? (
    <p className={cn('text-red-500 text-sm', className)}>{messages.join(', ')}</p>
  ) : null;
};
