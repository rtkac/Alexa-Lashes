import { Locale, locales } from '@alexa-lashes/types/locales';
import { createDialogHandle } from '@alexa-lashes/ui/shadcn';
import z from 'zod';

export type EditReviewPayload = {
  reviewId: string;
  locale: Locale;
};

export type EditReviewDialogHandle = ReturnType<typeof createDialogHandle<EditReviewPayload>>;

export const reviewFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  rating: z.number().min(1, 'Rating is required').max(5),
  url: z.union([z.literal(''), z.url('Enter a valid URL')]),
  translations: z.record(z.enum(locales), z.string().trim().min(1, 'Description is required')),
});

export type ReviewFormValues = z.input<typeof reviewFormSchema>;

export type ReviewFormOutput = z.output<typeof reviewFormSchema>;
