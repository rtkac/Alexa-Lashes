import { ensureSession } from '@alexa-lashes/auth/server';
import {
  createReviewSchema,
  renumberReviewsSchema,
  reorderReviewSchema,
  setReviewEnabledSchema,
  updateReviewSchema,
} from '@alexa-lashes/contracts/reviews';
import {
  createReview as createReviewInDb,
  deleteReview as deleteReviewInDb,
  getReviewById,
  getReviewsWithMissingTranslations,
  renumberReviews as renumberReviewsInDb,
  updateReview as updateReviewInDb,
  updateReviewEnabled as updateReviewEnabledInDb,
  updateReviewOrder as updateReviewOrderInDb,
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

export const createReview = createServerFn({
  method: 'POST',
})
  .validator(createReviewSchema)
  .handler(async ({ data }) => {
    await ensureSession();
    return createReviewInDb(data);
  });

export const reorderReview = createServerFn({
  method: 'POST',
})
  .validator(reorderReviewSchema)
  .handler(async ({ data }) => {
    await ensureSession();
    await updateReviewOrderInDb(data.id, data.displayOrder);
  });

export const renumberReviews = createServerFn({
  method: 'POST',
})
  .validator(renumberReviewsSchema)
  .handler(async ({ data }) => {
    await ensureSession();
    await renumberReviewsInDb(data.orderedIds);
  });

export const deleteReview = createServerFn({
  method: 'POST',
})
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await ensureSession();
    await deleteReviewInDb(data.id);
  });

export const setReviewEnabled = createServerFn({
  method: 'POST',
})
  .validator(setReviewEnabledSchema)
  .handler(async ({ data }) => {
    await ensureSession();
    await updateReviewEnabledInDb(data.id, data.enabled);
  });
