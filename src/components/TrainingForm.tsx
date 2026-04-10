import { useForm } from "@tanstack/react-form";
import { CircleAlertIcon, LoaderIcon } from "lucide-react";
import { useState } from "react";

import { FieldErrorMessage } from "./FieldErrorMessage";

import { emailRegex, nameRegex } from "@/helpers";
import { submitForm } from "@/lib/form";
import { formOpts } from "@/lib/form-isomorphic";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

type TrainingFormProps = {
  setIsSuccess: (value: boolean) => void;
};

export const TrainingForm = ({ setIsSuccess }: TrainingFormProps) => {
  const [isError, setIsError] = useState(false);

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      setIsSuccess(false);
      setIsError(false);
      try {
        await submitForm({ data: { contactType: "training", ...value } });
        setIsSuccess(true);
      } catch (_) {
        setIsError(true);
      }
    },
  });

  return (
    <form
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <div>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? m.training_form_name_required()
                    : !nameRegex.test(value)
                      ? m.training_form_name_invalid()
                      : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col space-y-1.5">
                  <label className="font-bold text-primary brightness-50" htmlFor={field.name}>
                    {m.training_form_name_label()}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    placeholder={m.training_form_name_placeholder()}
                    value={field.state.value}
                    disabled={isSubmitting}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={cn(
                      "rounded-md border border-primary-disabled bg-background px-4 py-3 focus:outline-primary",
                      field.state.meta.isValid
                        ? "focus:outline-primary"
                        : "border-red-300 focus:outline-red-400",
                    )}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  <FieldErrorMessage field={field} />
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>
      <div>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? m.training_form_email_required()
                    : !emailRegex.test(value)
                      ? m.training_form_email_invalid()
                      : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col space-y-1.5">
                  <label className="font-bold text-primary brightness-50" htmlFor={field.name}>
                    {m.training_form_email_label()}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    placeholder={m.training_form_email_placeholder()}
                    value={field.state.value}
                    disabled={isSubmitting}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={cn(
                      "rounded-md border border-primary-disabled bg-background px-4 py-3 focus:outline-primary",
                      field.state.meta.isValid
                        ? "focus:outline-primary"
                        : "border-red-300 focus:outline-red-400",
                    )}
                  />
                  <FieldErrorMessage field={field} />
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>
      <div>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <form.Field
              name="message"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? m.training_form_message_required()
                    : value.length < 10
                      ? m.training_form_message_too_short()
                      : value.length > 280
                        ? m.training_form_message_too_long()
                        : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col space-y-1.5">
                  <label className="font-bold text-primary brightness-50" htmlFor={field.name}>
                    {m.training_form_message_label()}
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder={m.training_form_message_placeholder()}
                    rows={4}
                    value={field.state.value}
                    disabled={isSubmitting}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={cn(
                      "rounded-md border border-primary-disabled bg-background px-4 py-3 focus:outline-primary",
                      field.state.meta.isValid
                        ? "focus:outline-primary"
                        : "border-red-300 focus:outline-red-400",
                    )}
                  />
                  <FieldErrorMessage field={field} />
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>
      {isError && (
        <div className="flex space-x-3 rounded border border-red-200 bg-red-100 p-5 text-red-800">
          <CircleAlertIcon />
          <p>{m.training_form_error_message()}</p>
        </div>
      )}
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex w-full items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderIcon className="h-5 w-5 animate-spin" />
                  {m.training_form_sending_button()}
                </span>
              ) : (
                m.training_form_submit_button()
              )}
            </button>
          </>
        )}
      </form.Subscribe>
    </form>
  );
};
