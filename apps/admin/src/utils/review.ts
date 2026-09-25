import type { UpdateReviewInput } from '@alexa-lashes/contracts/reviews';
import { locales } from '@alexa-lashes/types/locales';
import { createDialogHandle } from '@alexa-lashes/ui/shadcn';

import type { EditReviewPayload, ReviewFormOutput, ReviewFormValues } from '@/types/review';

export const editReviewDialog = createDialogHandle<EditReviewPayload>();
export const createReviewDialog = createDialogHandle();

export const getReviewChanges = (
  id: string,
  initial: ReviewFormValues,
  values: ReviewFormOutput,
): UpdateReviewInput | null => {
  const isReviewChanged =
    values.name !== initial.name || values.rating !== initial.rating || values.url !== initial.url;

  const translations = locales
    .filter((locale) => values.translations[locale] !== initial.translations[locale])
    .map((locale) => ({ locale, description: values.translations[locale] }));

  return !isReviewChanged && !translations.length
    ? null
    : {
        id,
        review: isReviewChanged
          ? { name: values.name, rating: values.rating, url: values.url || null }
          : undefined,
        translations,
      };
};
