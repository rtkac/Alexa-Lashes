import type { AnyFieldApi } from "@tanstack/react-form";

export const FieldErrorMessage = ({ field }: { field: AnyFieldApi }) => {
  return field.state.meta.isTouched && !field.state.meta.isValid ? (
    <em className="text-red-500 text-sm">{field.state.meta.errors.join(",")}</em>
  ) : null;
};
