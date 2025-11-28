import CookieConsent from "react-cookie-consent";

import { initializeAnalytics } from "./analytics";

const Disclaimer = () => (
  <CookieConsent
    enableDeclineButton
    expires={150}
    location="bottom"
    buttonText="Accept"
    declineButtonText="Decline"
    style={{
      background: "#2b2b2b",
      color: "#ffffff",
    }}
    buttonStyle={{
      background: "#4caf50",
      color: "#ffffff",
      fontSize: "14px",
    }}
    declineButtonStyle={{
      background: "#f44336",
      color: "#ffffff",
      fontSize: "14px",
    }}
    onAccept={() => {
      initializeAnalytics();
    }}
  >
    We use analytics cookies to understand how visitors interact with our website and to help us
    improve it. You can choose to accept or decline these cookies.
  </CookieConsent>
);

export default Disclaimer;
