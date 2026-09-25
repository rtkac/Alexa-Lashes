import { getReviews as getReviewsFromDb } from '@alexa-lashes/db/queries/reviews';
import type { Locale } from '@alexa-lashes/types/locales';
import { createServerFn } from '@tanstack/react-start';

export const getReviews = createServerFn({
  method: 'GET',
})
  .validator((data: { locale: Locale }) => data)
  .handler(async ({ data }) => {
    return getReviewsFromDb(data.locale);
  });
