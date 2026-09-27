import { cn } from '../lib/utils';

type FieldErrorProps = {
  errors: readonly (string | { message: string } | null | undefined)[];
  className?: string;
  id?: string;
};

export const FieldError = ({ errors, className, id }: FieldErrorProps) => {
  const messages = errors
    .filter((error) => error != null)
    .map((error) => (typeof error === 'string' ? error : error.message));

  return messages.length ? (
    <p id={id} className={cn('text-red-600 text-sm', className)}>
      {messages.join(', ')}
    </p>
  ) : null;
};
