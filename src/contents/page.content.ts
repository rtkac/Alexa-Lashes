import type { Dictionary } from "intlayer";
import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      home: t({
        en: "Home",
        sk: "Domov",
      }),
      services: t({
        en: "Services",
        sk: "Služby",
      }),
    },
    meta: {
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        sk: "Toto je príklad použitia Intlayer s TanStack Router",
      }),
    },
    title: t({
      en: "Welcome to Intlayer + TanStack Router",
      sk: "Vitajte v Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
