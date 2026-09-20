import { asc, and, eq } from 'drizzle-orm';

import { db } from '../index';
import { reviewTranslations, reviews } from '../schema/reviews-schema';

export type CreateReviewBody = {
  name: string;
  rating: number;
  url?: string | null;
  displayOrder?: number;
  translations: { locale: string; description: string }[];
};

export async function createReview(input: CreateReviewBody) {
  const reviewId = crypto.randomUUID();

  await db.insert(reviews).values({
    id: reviewId,
    name: input.name,
    rating: input.rating,
    url: input.url ?? null,
    displayOrder: input.displayOrder ?? 0,
  });

  if (input.translations.length > 0) {
    await db.insert(reviewTranslations).values(
      input.translations.map((translation) => ({
        id: crypto.randomUUID(),
        reviewId,
        locale: translation.locale,
        description: translation.description,
      })),
    );
  }

  return reviewId;
}

export async function getReviews(locale: string) {
  return db
    .select({
      id: reviews.id,
      name: reviews.name,
      rating: reviews.rating,
      url: reviews.url,
      description: reviewTranslations.description,
      displayOrder: reviews.displayOrder,
    })
    .from(reviews)
    .innerJoin(reviewTranslations, eq(reviewTranslations.reviewId, reviews.id))
    .where(and(eq(reviews.enabled, true), eq(reviewTranslations.locale, locale)))
    .orderBy(asc(reviews.displayOrder), asc(reviews.createdAt));
}
