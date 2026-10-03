import type { Locale } from '@alexa-lashes/types/locales';
import { Fragment } from 'react/jsx-runtime';

import { m } from '@/paraglide/messages';
import { getLocale, locales, setLocale } from '@/paraglide/runtime';

const languageNames: Record<Locale, () => string> = {
  sk: m.language_name_sk,
  en: m.language_name_en,
  ru: m.language_name_ru,
};

const LanguageSwitcher = () => {
  return (
    <fieldset
      aria-label={m.language_switcher_label()}
      className="flex min-w-0 items-center justify-center space-x-2 font-medium"
    >
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          <button
            type="button"
            onClick={() => setLocale(locale)}
            lang={locale}
            aria-label={languageNames[locale]()}
            aria-current={locale === getLocale() ? 'true' : undefined}
            className={`cursor-pointer rounded-md px-1.5 py-2 text-xl transition-colors hover:text-primary-strong md:text-base ${locale === getLocale() ? 'font-semibold text-primary-strong' : 'text-foreground'}`}
          >
            {locale.toLocaleLowerCase()}
          </button>
          {index < locales.length - 1 && (
            <span aria-hidden="true" className="text-xl md:text-base">
              /
            </span>
          )}
        </Fragment>
      ))}
    </fieldset>
  );
};

export default LanguageSwitcher;
