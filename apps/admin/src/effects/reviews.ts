import type { CreateReviewInput, UpdateReviewInput } from '@alexa-lashes/contracts/reviews';
import type { Locale } from '@alexa-lashes/types/locales';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

import { createReview, getReview, getReviews, updateReview } from '@/server/reviews';

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

export const createReviewOptions = () =>
  mutationOptions({
    mutationFn: (data: CreateReviewInput) => createReview({ data }),
    onSuccess: (_data, _variables, _onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ['reviews'] }),
  });
