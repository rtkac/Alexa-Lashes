import { getLocale, locales, setLocale } from "@/paraglide/runtime";

export function LanguageSwitcher() {
  return (
    <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-2 md:mt-0 md:border-0 md:bg-neutral-primary">
      {locales.map((locale, index) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLocale(locale)}
          className={`px-1 cursor-pointer ${locale === getLocale() ? "text-primary" : "text-heading"}`}
        >
          {locale.toUpperCase()}
          {index < locales.length - 1 && " | "}
        </button>
      ))}
    </div>
  );
}
