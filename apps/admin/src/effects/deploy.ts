import { mutationOptions } from '@tanstack/react-query';

import { triggerMarketingBuild } from '@/server/deploy';

export const triggerMarketingBuildOptions = () =>
  mutationOptions({
    mutationFn: () => triggerMarketingBuild(),
  });
