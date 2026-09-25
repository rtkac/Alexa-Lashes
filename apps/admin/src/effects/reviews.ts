import type {
  CreateReviewInput,
  RenumberReviewsInput,
  ReorderReviewInput,
  UpdateReviewInput,
} from '@alexa-lashes/contracts/reviews';
import type { Locale } from '@alexa-lashes/types/locales';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

import {
  createReview,
  getReview,
  getReviews,
  renumberReviews,
  reorderReview,
  updateReview,
} from '@/server/reviews';

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

export const reorderReviewOptions = (locale: Locale) =>
  mutationOptions({
    mutationFn: (data: ReorderReviewInput) => reorderReview({ data }),
    onMutate: async (variables, context) => {
      const { queryKey } = fetchReviewsOptions(locale);
      await context.client.cancelQueries({ queryKey });

      const previous = context.client.getQueryData(queryKey);
      context.client.setQueryData(queryKey, (old) =>
        old
          ?.map((review) =>
            review.id === variables.id
              ? { ...review, displayOrder: variables.displayOrder }
              : review,
          )
          .toSorted((a, b) => a.displayOrder - b.displayOrder),
      );

      return { previous, queryKey };
    },
    onError: (_error, _variables, onMutateResult, context) => {
      if (onMutateResult?.previous) {
        context.client.setQueryData(onMutateResult.queryKey, onMutateResult.previous);
      }
    },
    onSettled: (_data, _error, _variables, _onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ['reviews'] }),
  });

export const renumberReviewsOptions = () =>
  mutationOptions({
    mutationFn: (data: RenumberReviewsInput) => renumberReviews({ data }),
    onSuccess: (_data, _variables, _onMutateResult, context) =>
      context.client.invalidateQueries({ queryKey: ['reviews'] }),
  });
