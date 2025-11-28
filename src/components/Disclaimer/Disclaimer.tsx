import CookieConsent from "react-cookie-consent";

import { initializeAnalytics } from "./analytics";

import { m } from "@/paraglide/messages";

const Disclaimer = () => (
  <CookieConsent
    disableStyles
    enableDeclineButton
    expires={150}
    location="bottom"
    buttonText={m.disclaimer_accept_button()}
    declineButtonText={m.disclaimer_decline_button()}
    buttonClasses="btn-primary"
    declineButtonClasses="btn-tertiary mr-4"
    contentClasses="mb-4 max-w-3xl mx-auto text-sm md:text-base"
    containerClasses="bg-primary-light fixed bottom-0 z-50 w-full p-4 text-center md:p-6"
    buttonStyle={{}}
    onAccept={() => {
      initializeAnalytics();
    }}
  >
    {m.disclaimer_text()}
  </CookieConsent>
);

export default Disclaimer;
