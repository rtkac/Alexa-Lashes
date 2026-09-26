import { ensureSession } from '@alexa-lashes/auth/server';
import { createServerFn } from '@tanstack/react-start';

export const triggerMarketingBuild = createServerFn({ method: 'POST' }).handler(async () => {
  await ensureSession();

  const buildHookUrl = process.env.NETLIFY_MARKETING_BUILD_HOOK_URL;
  if (!buildHookUrl) {
    throw new Error('NETLIFY_MARKETING_BUILD_HOOK_URL is not set');
  }

  const response = await fetch(buildHookUrl, { method: 'POST', body: '{}' });
  if (!response.ok) {
    throw new Error(`Netlify build hook responded with status ${response.status}`);
  }
});
