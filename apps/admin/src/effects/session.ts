import { getSession } from '@alexa-lashes/auth/server';
import { queryOptions } from '@tanstack/react-query';

export const fetchSessionOptions = () =>
  queryOptions({
    queryKey: ['session'],
    queryFn: () => getSession(),
  });
