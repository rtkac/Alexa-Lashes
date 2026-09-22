import type { Locale } from '@alexa-lashes/db/locales';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

import type { UpdateReviewInput } from '@/schemas/reviews';
import { getReview, getReviews, updateReview } from '@/server/reviews';

export const fetchReviewsOptions = (locale: Locale) =>
  queryOptions({
    queryKey: ['reviews', locale],
    queryFn: () => getReviews({ data: { locale } }),
  });

export const fetchReviewOptions = (id: string) =>
  queryOptions({
    queryKey: ['reviews', 'detail', id],
    queryFn: () => getReview({ data: { id } }),
  });

export const updateReviewOptions = () =>
  mutationOptions({
    mutationFn: (data: UpdateReviewInput) => updateReview({ data }),
    onSuccess: (_data, _variables, _onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ['reviews'] }),
  });
