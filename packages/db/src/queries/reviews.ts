import type {
  CreateReviewInput,
  UpdateReviewInput,
  Review,
  ReviewWithTranslation,
} from '@alexa-lashes/contracts/reviews';
import { locales, type Locale } from '@alexa-lashes/types/locales';
import { asc, and, eq } from 'drizzle-orm';

import { db } from '../index';
import { reviewTranslations, reviews } from '../schema/reviews-schema';

export async function createReview(input: CreateReviewInput) {
  const reviewId = crypto.randomUUID();

  await db.batch([
    db.insert(reviews).values({
      id: reviewId,
      name: input.name,
      rating: input.rating,
      url: input.url ?? null,
      displayOrder: input.displayOrder ?? 0,
    }),
    db.insert(reviewTranslations).values(
      locales.map((locale) => ({
        id: crypto.randomUUID(),
        reviewId,
        locale,
        description: input.translations[locale],
      })),
    ),
  ]);

  return reviewId;
}

export async function updateReview(input: UpdateReviewInput) {
  const updatedAt = new Date();

  await db.batch([
    db
      .update(reviews)
      .set({ ...input.review, updatedAt })
      .where(eq(reviews.id, input.id)),
    ...input.translations.map(({ locale, description }) =>
      db
        .insert(reviewTranslations)
        .values({ id: crypto.randomUUID(), reviewId: input.id, locale, description })
        .onConflictDoUpdate({
          target: [reviewTranslations.reviewId, reviewTranslations.locale],
          set: { description, updatedAt },
        }),
    ),
  ]);
}

export async function getReviews(locale: Locale): Promise<Review[]> {
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

export async function getReviewsWithMissingTranslations(locale: Locale): Promise<Review[]> {
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
    .leftJoin(
      reviewTranslations,
      and(eq(reviewTranslations.reviewId, reviews.id), eq(reviewTranslations.locale, locale)),
    )
    .where(eq(reviews.enabled, true))
    .orderBy(asc(reviews.displayOrder), asc(reviews.createdAt));
}

export async function getReviewById(id: string): Promise<ReviewWithTranslation | null> {
  const [[review], translations] = await db.batch([
    db
      .select({
        id: reviews.id,
        name: reviews.name,
        rating: reviews.rating,
        url: reviews.url,
      })
      .from(reviews)
      .where(eq(reviews.id, id)),
    db
      .select({
        locale: reviewTranslations.locale,
        description: reviewTranslations.description,
      })
      .from(reviewTranslations)
      .where(eq(reviewTranslations.reviewId, id)),
  ]);

  return review ? { ...review, translations } : null;
}
