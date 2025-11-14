import type { IntlayerConfig } from "intlayer";
import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.SLOVAK,
    locales: [Locales.SLOVAK, Locales.ENGLISH],
  },
};

export default config;
