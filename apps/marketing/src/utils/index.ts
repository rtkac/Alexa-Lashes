import type { Locale } from '@alexa-lashes/types/locales';

import { getLocale } from '@/paraglide/runtime';

export const nameRegex = /^([A-Za-z0-9ÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽáäčďéíĺľňóôŕšťúýž_\s]+)$/;
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const formatPrice = (price: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

const siteUrl = 'https://alexalashes.sk';

/** Absolute per-locale URLs for a page path with leading and trailing slash, e.g. `/about/`. */
export const pageUrls = (path: string): Record<Locale, string> => ({
  sk: `${siteUrl}${path}`,
  en: `${siteUrl}/en${path}`,
  ru: `${siteUrl}/ru${path}`,
});

/** Absolute URL of a page path for the current locale. */
export const pageUrl = (path: string) => pageUrls(path)[getLocale()];

/** hreflang alternates (sk/en/ru + x-default) and canonical for the current locale. */
export const pageLinks = (path: string) => {
  const urls = pageUrls(path);

  return [
    { rel: 'alternate', href: urls.sk, hrefLang: 'sk' },
    { rel: 'alternate', href: urls.en, hrefLang: 'en' },
    { rel: 'alternate', href: urls.ru, hrefLang: 'ru' },
    { rel: 'alternate', href: urls.sk, hrefLang: 'x-default' },
    { rel: 'canonical', href: pageUrl(path) },
  ];
};
