import { type Locale, locales } from '@alexa-lashes/db/locales';
import { Input, Label, Textarea } from '@alexa-lashes/ui/components';
import { cn } from '@alexa-lashes/ui/lib/utils';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@alexa-lashes/ui/shadcn';
import { createErrorVisibility, formOptions, useForm } from '@tanstack/react-form';
import { StarIcon } from 'lucide-react';

import { type ReviewFormOutput, type ReviewFormValues, reviewFormSchema } from '@/schemas/reviews';

const ratings = [1, 2, 3, 4, 5];

type FieldErrorProps = {
  errors: { message: string }[];
};

const FieldError = ({ errors }: FieldErrorProps) =>
  errors.length ? (
    <p className="text-red-500 text-sm">{errors.map((error) => error.message).join(', ')}</p>
  ) : null;

type ReviewFormProps = {
  defaultValues: ReviewFormValues;
  defaultLocale: Locale;
  onSubmit: (values: ReviewFormOutput) => Promise<void>;
  submitError?: string;
};

export const ReviewForm = ({
  defaultValues,
  defaultLocale,
  onSubmit,
  submitError,
}: ReviewFormProps) => {
  const form = useForm(
    formOptions.strictSchema(reviewFormSchema, {
      defaultValues,
      validators: [{ run: reviewFormSchema, triggers: ['change', 'blur'] }],
      errorVisibility: createErrorVisibility(
        ({ fieldState, state }) => fieldState.meta.isBlurred || state.submissionAttempts > 0,
      ),
      onSubmit: async ({ schemaOutputs }) => {
        await onSubmit(schemaOutputs[0]);
      },
    }),
  );

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field name="name">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label name={field.name}>Name</Label>
            <Input
              name={field.name}
              value={field.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              invalid={field.errors.length > 0}
            />
            <FieldError errors={field.errors} />
          </div>
        )}
      </form.Field>

      <form.Field name="rating">
        {(field) => (
          <fieldset className="flex flex-col gap-1.5">
            <legend className="mb-1.5">Rating</legend>
            <div className="flex gap-1">
              {ratings.map((rating) => (
                <label
                  key={rating}
                  className="cursor-pointer rounded text-primary has-focus-visible:outline-2 has-focus-visible:outline-primary"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={rating}
                    checked={field.value === rating}
                    onChange={() => field.handleChange(rating)}
                    onBlur={field.handleBlur}
                    aria-label={`${rating} of 5`}
                    className="sr-only"
                  />
                  <StarIcon size="20" className={cn({ 'fill-current': rating <= field.value })} />
                </label>
              ))}
            </div>
            <FieldError errors={field.errors} />
          </fieldset>
        )}
      </form.Field>

      <form.Field name="url">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label name={field.name}>Link to the original review (optional)</Label>
            <Input
              name={field.name}
              value={field.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              invalid={field.errors.length > 0}
            />
            <FieldError errors={field.errors} />
          </div>
        )}
      </form.Field>

      <Tabs defaultValue={defaultLocale}>
        <TabsList>
          {locales.map((locale) => (
            <form.Field key={locale} name={`translations.${locale}`}>
              {(field) => (
                <TabsTrigger
                  value={locale}
                  className={cn({ 'text-red-500!': field.errors.length })}
                >
                  {locale.toUpperCase()}
                </TabsTrigger>
              )}
            </form.Field>
          ))}
        </TabsList>
        {locales.map((locale) => (
          <TabsContent key={locale} value={locale} keepMounted>
            <form.Field name={`translations.${locale}`}>
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label name={field.name}>Description ({locale.toUpperCase()})</Label>
                  <Textarea
                    name={field.name}
                    value={field.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    invalid={field.errors.length > 0}
                  />
                  <FieldError errors={field.errors} />
                </div>
              )}
            </form.Field>
          </TabsContent>
        ))}
      </Tabs>

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

      <form.Subscribe selector={(state) => [state.isSubmitting, state.isDefaultValue] as const}>
        {([isSubmitting, isDefaultValue]) => (
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || isDefaultValue}>
              {isSubmitting ? 'Saving…' : 'Save'}
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
};
