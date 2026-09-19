import { asc, and, eq } from 'drizzle-orm';

import { db } from '../index';
import { reviewTranslations, reviews } from '../schema/reviews-schema';

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
