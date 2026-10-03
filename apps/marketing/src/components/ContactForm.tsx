import { Alert, FieldError, Label } from '@alexa-lashes/ui/components';
import { Button, Input, Textarea } from '@alexa-lashes/ui/shadcn';
import { useForm } from '@tanstack/react-form';
import { LoaderIcon } from 'lucide-react';
import { useState } from 'react';

import { submitForm } from '@/lib/form';
import { formOpts } from '@/lib/form-isomorphic';
import { m } from '@/paraglide/messages';
import { emailRegex, nameRegex } from '@/utils';

const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      setIsSuccess(false);
      setIsError(false);
      try {
        await submitForm({ data: { contactType: 'contact', ...value } });
        setIsSuccess(true);
      } catch {
        setIsError(true);
      }
    },
    onSubmitInvalid() {
      const invalidInput = document.querySelector<HTMLInputElement>('[aria-invalid="true"]');
      invalidInput?.focus();
    },
  });

  return (
    <div className="card p-6">
      <h2 className="mb-5 font-bold text-lg md:text-2xl">{m.contact_form_title()}</h2>
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
                      ? m.contact_form_name_required()
                      : !nameRegex.test(value)
                        ? m.contact_form_name_invalid()
                        : undefined,
                }}
              >
                {(field) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label name={field.name}>{m.contact_form_name_label()}</Label>
                    <Input
                      name={field.name}
                      autoComplete="name"
                      placeholder={m.contact_form_name_placeholder()}
                      value={field.state.value}
                      readOnly={isSubmitting}
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
                      ? m.contact_form_email_required()
                      : !emailRegex.test(value)
                        ? m.contact_form_email_invalid()
                        : undefined,
                }}
              >
                {(field) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label name={field.name}>{m.contact_form_email_label()}</Label>
                    <Input
                      name={field.name}
                      type="email"
                      autoComplete="email"
                      placeholder={m.contact_form_email_placeholder()}
                      value={field.state.value}
                      readOnly={isSubmitting}
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
                      ? m.contact_form_message_required()
                      : value.length < 10
                        ? m.contact_form_message_too_short()
                        : value.length > 280
                          ? m.contact_form_message_too_long()
                          : undefined,
                }}
              >
                {(field) => (
                  <div className="flex flex-col space-y-1.5">
                    <Label name={field.name}>{m.contact_form_message_label()}</Label>
                    <Textarea
                      name={field.name}
                      placeholder={m.contact_form_message_placeholder()}
                      value={field.state.value}
                      readOnly={isSubmitting}
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
          <div aria-live="polite">
            {isSuccess && (
              <Alert variant="success" className="mb-5">
                {m.contact_form_success_message()}
              </Alert>
            )}
          </div>
          <div role="alert">
            {isError && (
              <Alert variant="error" className="mb-5">
                {m.contact_form_error_message()}
              </Alert>
            )}
          </div>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                disabled={isSubmitting}
                focusableWhenDisabled
                className="w-full aria-disabled:border-primary-disabled aria-disabled:bg-primary-disabled"
              >
                {isSubmitting ? (
                  <>
                    <LoaderIcon className="size-5 animate-spin motion-reduce:animate-none" />
                    {m.contact_form_sending_button()}
                  </>
                ) : (
                  m.contact_form_submit_button()
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
