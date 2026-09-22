import type { AnyFieldApi } from '@tanstack/react-form';

type FieldErrorMessageProps = { field: AnyFieldApi };

export const FieldErrorMessage = ({ field }: FieldErrorMessageProps) => {
  return field.state.meta.isTouched && !field.state.meta.isValid ? (
    <em className="text-red-500 text-sm">{field.state.meta.errors.join(',')}</em>
  ) : null;
};
