import { Fragment } from "react/jsx-runtime";

import { getLocale, locales, setLocale } from "@/paraglide/runtime";

export function LanguageSwitcher() {
  return (
    <div className="font-medium flex justify-center md:p-0 mt-4 bg-neutral-secondary-soft md:mt-0">
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          <button
            type="button"
            onClick={() => setLocale(locale)}
            className={`px-3 cursor-pointer ${locale === getLocale() ? "text-primary" : "text-heading"}`}
          >
            {locale.toUpperCase()}
          </button>
          {index < locales.length - 1 && " | "}
        </Fragment>
      ))}
    </div>
  );
}
