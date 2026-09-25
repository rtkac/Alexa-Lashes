import type {
  CreateReviewInput,
  UpdateReviewInput,
  Review,
  ReviewWithTranslation,
} from '@alexa-lashes/contracts/reviews';
import { locales, type Locale } from '@alexa-lashes/types/locales';
import { asc, and, eq, sql } from 'drizzle-orm';

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
      // Append to the end of the current order by default, rather than
      // always inserting at the very front (0) — new reviews should land
      // last, not silently jump ahead of everything else.
      displayOrder:
        input.displayOrder ?? sql`(SELECT COALESCE(MAX(display_order), 0) + 1000 FROM reviews)`,
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

export async function updateReviewOrder(id: string, displayOrder: number) {
  await db.update(reviews).set({ displayOrder, updatedAt: new Date() }).where(eq(reviews.id, id));
}

export async function deleteReview(id: string) {
  await db.delete(reviews).where(eq(reviews.id, id));
}

// Rare fallback — only called when a gap between two drag neighbors has
// closed below 2 (no integer midpoint left). Renumbers the given ids 1000
// apart, in the order provided.
export async function renumberReviews([firstId, ...restIds]: string[]) {
  if (!firstId) {
    return;
  }

  const updatedAt = new Date();

  await db.batch([
    db.update(reviews).set({ displayOrder: 1000, updatedAt }).where(eq(reviews.id, firstId)),
    ...restIds.map((id, index) =>
      db
        .update(reviews)
        .set({ displayOrder: (index + 2) * 1000, updatedAt })
        .where(eq(reviews.id, id)),
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
