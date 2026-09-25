import { Locale, locales } from '@alexa-lashes/types/locales';
import { z } from 'zod';

const nameSchema = z.string().trim().min(1, 'Name is required');
const ratingSchema = z.number().int().min(1, 'Rating is required').max(5);
const urlSchema = z.url('Enter a valid URL');
const descriptionSchema = z.string().trim().min(1, 'Description is required');
const localeSchema = z.enum(locales);

export const createReviewSchema = z.object({
  name: nameSchema,
  rating: ratingSchema,
  url: urlSchema.nullable().optional(),
  displayOrder: z.number().int().optional(),
  translations: z.record(localeSchema, descriptionSchema),
});
export type CreateReviewInput = z.infer<typeof createReviewSchema>;

export const updateReviewSchema = z.object({
  id: z.string().min(1),
  review: z
    .object({ name: nameSchema, rating: ratingSchema, url: urlSchema.nullable() })
    .optional(),
  translations: z.array(z.object({ locale: localeSchema, description: descriptionSchema })),
});
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

export const reorderReviewSchema = z.object({
  id: z.string().min(1),
  displayOrder: z.number().int(),
});
export type ReorderReviewInput = z.infer<typeof reorderReviewSchema>;

// Rare self-healing fallback for when two drag neighbors' displayOrder gap
// has closed below 2 (no integer midpoint left) — renumbers a whole ordered
// list 1000 apart in one go.
export const renumberReviewsSchema = z.object({
  orderedIds: z.array(z.string().min(1)).min(1),
});
export type RenumberReviewsInput = z.infer<typeof renumberReviewsSchema>;

export type Review = {
  id: string;
  name: string;
  rating: number;
  url: string | null;
  description: string | null;
  displayOrder: number;
};

export type ReviewWithTranslation = {
  id: string;
  name: string;
  rating: number;
  url: string | null;
  translations: ReviewTranslation[];
};

export type ReviewTranslation = {
  locale: Locale;
  description: string;
};
