import { Link } from "@tanstack/react-router";
import CookieConsent from "react-cookie-consent";

import { initializeAnalytics } from "./analytics";

import { m } from "@/paraglide/messages";

const Disclaimer = () => (
  <CookieConsent
    disableStyles
    enableDeclineButton
    expires={150}
    buttonText={m.disclaimer_accept_button()}
    declineButtonText={m.disclaimer_decline_button()}
    buttonClasses="btn-primary py-2 text-sm"
    declineButtonClasses="btn-secondary py-2 text-sm mr-4"
    contentClasses="mb-4"
    containerClasses="bg-white border border-primary-light fixed right-0 z-50 max-w-96 p-4 md:p-6 rounded rounded-md m-4 dark:bg-tertiary dark:border-tertiary-light "
    onAccept={() => {
      initializeAnalytics();
    }}
  >
    <p className="mb-2 font-bold">{m.disclaimer_title()}</p>
    <p className="mb-2 text-sm">{m.disclaimer_desc()}</p>
    <p className="text-sm">
      {m.disclaimer_link_1()}&nbsp;
      <Link to="/privacy-policy" className="text-sm underline">
        {m.disclaimer_link_2()}
      </Link>
    </p>
  </CookieConsent>
);

export default Disclaimer;
