import { asc, and, eq } from 'drizzle-orm';

import { db } from '../index';
import { locales, type Locale } from '../locales';
import { reviewTranslations, reviews } from '../schema/reviews-schema';

export type CreateReviewBody = {
  name: string;
  rating: number;
  url?: string | null;
  displayOrder?: number;
  // Required for every locale so that no review is created with a missing translation
  translations: Record<Locale, string>;
};

export async function createReview(input: CreateReviewBody) {
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

export type UpdateReviewBody = {
  id: string;
  // Only present when a locale-independent field changed
  review?: {
    name: string;
    rating: number;
    url: string | null;
  };
  // Only the translations that changed
  translations: { locale: Locale; description: string }[];
};

export async function updateReview({ id, review, translations }: UpdateReviewBody) {
  const updatedAt = new Date();

  await db.batch([
    db
      .update(reviews)
      .set({ ...review, updatedAt })
      .where(eq(reviews.id, id)),
    // Upsert, so a translation missing in the DB (e.g. for a newly added locale) gets created
    ...translations.map(({ locale, description }) =>
      db
        .insert(reviewTranslations)
        .values({ id: crypto.randomUUID(), reviewId: id, locale, description })
        .onConflictDoUpdate({
          target: [reviewTranslations.reviewId, reviewTranslations.locale],
          set: { description, updatedAt },
        }),
    ),
  ]);
}

export async function getReviews(locale: Locale) {
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

/**
 * Like `getReviews`, but also returns reviews without a translation for `locale`
 * (`description` is `null`), so they can be spotted and fixed in the admin.
 */
export async function getReviewsWithMissingTranslations(locale: Locale) {
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

export async function getReviewById(id: string) {
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
