// Locales that every review must have a translation for.
// Keep in sync with apps/marketing/project.inlang/settings.json
export const locales = ['sk', 'en', 'ru'] as const;

export const baseLocale = 'sk' satisfies Locale;

export type Locale = (typeof locales)[number];
