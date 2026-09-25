import { ensureSession } from '@alexa-lashes/auth/server';
import { updateReviewSchema } from '@alexa-lashes/contracts/reviews';
import {
  getReviewById,
  getReviewsWithMissingTranslations,
  updateReview as updateReviewInDb,
} from '@alexa-lashes/db/queries/reviews';
import type { Locale } from '@alexa-lashes/types/locales';
import { createServerFn } from '@tanstack/react-start';

export const getReviews = createServerFn({
  method: 'GET',
})
  .validator((data: { locale: Locale }) => data)
  .handler(async ({ data }) => {
    await ensureSession();
    return getReviewsWithMissingTranslations(data.locale);
  });

export const getReview = createServerFn({
  method: 'GET',
})
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await ensureSession();
    const review = await getReviewById(data.id);
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  });

export const updateReview = createServerFn({
  method: 'POST',
})
  .validator(updateReviewSchema)
  .handler(async ({ data }) => {
    await ensureSession();
    await updateReviewInDb(data);
  });
