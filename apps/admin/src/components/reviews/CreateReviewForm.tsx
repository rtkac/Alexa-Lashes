import { Locale, locales } from '@alexa-lashes/types/locales';
import { useMutation } from '@tanstack/react-query';

import { ReviewForm } from './ReviewForm';

import { createReviewOptions } from '@/effects/reviews';
import { ReviewFormOutput, ReviewFormValues } from '@/types/review';

const emptyReviewValues: ReviewFormValues = {
  name: '',
  rating: 0,
  url: '',
  translations: Object.fromEntries(locales.map((locale) => [locale, ''])) as Record<Locale, string>,
};

type CreateReviewFormProps = {
  defaultLocale: Locale;
  onSaved: () => void;
};

export const CreateReviewForm = ({ defaultLocale, onSaved }: CreateReviewFormProps) => {
  const { mutateAsync, isError } = useMutation(createReviewOptions());

  const handleSubmit = async (values: ReviewFormOutput) => {
    await mutateAsync({
      name: values.name,
      rating: values.rating,
      url: values.url || null,
      translations: values.translations,
    });
    onSaved();
  };

  return (
    <ReviewForm
      defaultValues={emptyReviewValues}
      defaultLocale={defaultLocale}
      onSubmit={handleSubmit}
      submitError={isError ? 'The review could not be created.' : undefined}
    />
  );
};
