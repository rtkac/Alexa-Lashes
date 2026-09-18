import { Input, Label, Textarea } from '@alexa-lashes/ui/components';
import { useForm } from '@tanstack/react-form';
import { CircleAlertIcon, CircleCheckIcon, LoaderIcon } from 'lucide-react';
import { useState } from 'react';

import { FieldErrorMessage } from './FieldErrorMessage';

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
  });

  return (
    <div className="rounded-md border border-primary-light bg-white p-6 dark:border-tertiary-light dark:bg-tertiary">
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
                      placeholder={m.contact_form_name_placeholder()}
                      value={field.state.value}
                      disabled={isSubmitting}
                      onChange={(e) => field.handleChange(e.target.value)}
                      invalid={!field.state.meta.isValid}
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
                      placeholder={m.contact_form_email_placeholder()}
                      value={field.state.value}
                      disabled={isSubmitting}
                      onChange={(e) => field.handleChange(e.target.value)}
                      invalid={!field.state.meta.isValid}
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
                      disabled={isSubmitting}
                      onChange={(e) => field.handleChange(e.target.value)}
                      invalid={!field.state.meta.isValid}
                    />
                    <FieldErrorMessage field={field} />
                  </div>
                )}
              </form.Field>
            )}
          </form.Subscribe>
        </div>

        {isSuccess && (
          <div className="flex space-x-3 rounded border border-green-200 bg-green-100 p-5 text-green-800">
            <CircleCheckIcon />
            <p>{m.contact_form_success_message()}</p>
          </div>
        )}

        {isError && (
          <div className="flex space-x-3 rounded border border-red-200 bg-red-100 p-5 text-red-800">
            <CircleAlertIcon />
            <p>{m.contact_form_error_message()}</p>
          </div>
        )}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex w-full items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <LoaderIcon className="h-5 w-5 animate-spin" />
                  {m.contact_form_sending_button()}
                </span>
              ) : (
                m.contact_form_submit_button()
              )}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default ContactForm;
