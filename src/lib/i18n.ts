export type Locale = "en" | "sk";
export const supportedLocales: Locale[] = ["en", "sk"];
export const defaultLocale: Locale = "en";

export function validateLocale(locale: string | undefined): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}
