import { queryOptions } from '@tanstack/react-query';

import { getReviews } from '@/server/reviews';

export const fetchReviewsOptions = () =>
  queryOptions({
    queryKey: ['reviews'],
    queryFn: () => getReviews({ data: { locale: 'sk' } }),
  });
