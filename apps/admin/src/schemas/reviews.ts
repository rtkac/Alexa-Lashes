import { locales } from '@alexa-lashes/db/locales';
import { z } from 'zod';

const nameSchema = z.string().trim().min(1, 'Name is required');
const ratingSchema = z.number().int().min(1, 'Rating is required').max(5);
const descriptionSchema = z.string().trim().min(1, 'Description is required');

// Form values. `z.record` with an enum key requires a translation for every locale.
export const reviewFormSchema = z.object({
  name: nameSchema,
  rating: ratingSchema,
  url: z.union([z.literal(''), z.url('Enter a valid URL')]),
  translations: z.record(z.enum(locales), descriptionSchema),
});

export type ReviewFormValues = z.input<typeof reviewFormSchema>;
export type ReviewFormOutput = z.output<typeof reviewFormSchema>;

export const updateReviewSchema = z.object({
  id: z.string().min(1),
  review: z
    .object({
      name: nameSchema,
      rating: ratingSchema,
      url: z.url().nullable(),
    })
    .optional(),
  translations: z.array(z.object({ locale: z.enum(locales), description: descriptionSchema })),
});

export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
