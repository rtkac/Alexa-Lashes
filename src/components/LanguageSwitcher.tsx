import { Fragment } from "react/jsx-runtime";

import { getLocale, locales, setLocale } from "@/paraglide/runtime";

const LanguageSwitcher = () => {
  return (
    <div className="flex justify-center space-x-2 font-medium">
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          <button
            type="button"
            onClick={() => setLocale(locale)}
            className={`cursor-pointer text-xl hover:text-primary md:text-base ${locale === getLocale() ? "text-primary" : "text-heading"}`}
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
