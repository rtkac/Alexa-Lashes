export const locales = ['sk', 'en', 'ru'] as const;

export const baseLocale = 'sk' satisfies Locale;

export type Locale = (typeof locales)[number];
