import { Locale, locales } from '@alexa-lashes/types/locales';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { ReviewForm } from './ReviewForm';

import { fetchReviewOptions, updateReviewOptions } from '@/effects/reviews';
import { EditReviewPayload, ReviewFormOutput } from '@/types/review';
import { getReviewChanges } from '@/utils/review';

type EditReviewFormProps = EditReviewPayload & {
  onSaved: () => void;
};

export const EditReviewForm = ({ reviewId, locale, onSaved }: EditReviewFormProps) => {
  const { data } = useSuspenseQuery(fetchReviewOptions(reviewId));
  const { mutateAsync, isError } = useMutation(updateReviewOptions());

  const initialValues = {
    name: data.name,
    rating: data.rating,
    url: data.url ?? '',
    translations: Object.fromEntries(
      locales.map((locale) => [
        locale,
        data.translations.find((translation) => translation.locale === locale)?.description ?? '',
      ]),
    ) as Record<Locale, string>,
  };

  const handleSubmit = async (values: ReviewFormOutput) => {
    const changes = getReviewChanges(data.id, initialValues, values);
    if (changes) {
      await mutateAsync(changes);
    }
    onSaved();
  };

  return (
    <ReviewForm
      defaultValues={initialValues}
      defaultLocale={locale}
      onSubmit={handleSubmit}
      submitError={isError ? 'The review could not be saved.' : undefined}
    />
  );
};
