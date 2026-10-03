import { FieldError, Label } from '@alexa-lashes/ui/components';
import { Button, Input, Textarea } from '@alexa-lashes/ui/shadcn';
import { useForm } from '@tanstack/react-form';
import { CircleAlertIcon, LoaderIcon } from 'lucide-react';
import { useState } from 'react';

import { submitForm } from '@/lib/form';
import { formOpts } from '@/lib/form-isomorphic';
import { m } from '@/paraglide/messages';
import { emailRegex, nameRegex } from '@/utils';

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
        await submitForm({ data: { contactType: 'training', ...value } });
        setIsSuccess(true);
      } catch {
        setIsError(true);
      }
    },
    onSubmitInvalid() {
      requestAnimationFrame(() => {
        const invalidInput = document.querySelector<HTMLInputElement>('[aria-invalid="true"]');
        invalidInput?.focus();
      });
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
                  <Label className="font-bold text-primary-strong" name={field.name}>
                    {m.training_form_name_label()}
                  </Label>
                  <Input
                    name={field.name}
                    autoComplete="name"
                    placeholder={m.training_form_name_placeholder()}
                    value={field.state.value}
                    disabled={isSubmitting}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    invalid={!field.state.meta.isValid}
                    aria-describedby={
                      field.state.meta.isTouched && field.state.meta.errors.length > 0
                        ? `${field.name}-error`
                        : undefined
                    }
                  />
                  <FieldError
                    id={`${field.name}-error`}
                    errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                  />
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
                  <Label className="font-bold text-primary-strong" name={field.name}>
                    {m.training_form_email_label()}
                  </Label>
                  <Input
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    placeholder={m.training_form_email_placeholder()}
                    value={field.state.value}
                    disabled={isSubmitting}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    invalid={!field.state.meta.isValid}
                    aria-describedby={
                      field.state.meta.isTouched && field.state.meta.errors.length > 0
                        ? `${field.name}-error`
                        : undefined
                    }
                  />
                  <FieldError
                    id={`${field.name}-error`}
                    errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                  />
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
                  <Label className="font-bold text-primary-strong" name={field.name}>
                    {m.training_form_message_label()}
                  </Label>
                  <Textarea
                    name={field.name}
                    placeholder={m.training_form_message_placeholder()}
                    value={field.state.value}
                    disabled={isSubmitting}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    invalid={!field.state.meta.isValid}
                    aria-describedby={
                      field.state.meta.isTouched && field.state.meta.errors.length > 0
                        ? `${field.name}-error`
                        : undefined
                    }
                  />
                  <FieldError
                    id={`${field.name}-error`}
                    errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                  />
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>
      <div>
        <div role="alert">
          {isError && (
            <div className="mb-5 flex space-x-3 rounded border border-red-200 bg-red-100 p-5 text-red-800">
              <CircleAlertIcon className="shrink-0" />
              <p>{m.training_form_error_message()}</p>
            </div>
          )}
        </div>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <LoaderIcon className="size-5 animate-spin motion-reduce:animate-none" />
                  {m.training_form_sending_button()}
                </>
              ) : (
                m.training_form_submit_button()
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
};
