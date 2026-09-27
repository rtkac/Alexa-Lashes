import { Fragment } from 'react/jsx-runtime';

import { getLocale, locales, setLocale } from '@/paraglide/runtime';

const LanguageSwitcher = () => {
  return (
    <div className="flex items-center justify-center space-x-2 font-medium">
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          <button
            type="button"
            onClick={() => setLocale(locale)}
            aria-current={locale === getLocale() ? 'true' : undefined}
            className={`cursor-pointer rounded-md px-1.5 py-2 text-xl transition-colors hover:text-primary md:text-base ${locale === getLocale() ? 'font-semibold text-primary-strong' : 'text-foreground'}`}
          >
            {locale.toLocaleLowerCase()}
          </button>
          {index < locales.length - 1 && <span className="text-xl md:text-base">/</span>}
        </Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
