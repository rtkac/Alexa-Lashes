import { Locale } from '@alexa-lashes/db/locales';
import { createDialogHandle } from '@alexa-lashes/ui/shadcn';

export type ReviewItem = {
  id: string;
  name: string;
  rating: number;
  url: string | null;
  description: string | null;
};

export type EditReviewPayload = {
  reviewId: string;
  locale: Locale;
};

export type EditReviewDialogHandle = ReturnType<typeof createDialogHandle<EditReviewPayload>>;
