import { Fragment } from "react/jsx-runtime";

import { getLocale, locales, setLocale } from "@/paraglide/runtime";

const LanguageSwitcher = () => {
  return (
    <div className="font-medium flex justify-center mt-4 md:mt-0 space-x-2">
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          <button
            type="button"
            onClick={() => setLocale(locale)}
            className={`cursor-pointer hover:text-primary font-bold ${locale === getLocale() ? "text-primary" : "text-heading"}`}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && <span>|</span>}
        </Fragment>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
