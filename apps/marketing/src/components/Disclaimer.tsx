import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';
import CookieConsent from 'react-cookie-consent';

import { initializeAnalytics } from '@/lib/analytics';
import { m } from '@/paraglide/messages';

export const Disclaimer = () => (
  <CookieConsent
    disableStyles
    enableDeclineButton
    expires={150}
    buttonText={m.disclaimer_accept_button()}
    declineButtonText={m.disclaimer_decline_button()}
    ariaAcceptLabel={m.disclaimer_accept_button()}
    ariaDeclineLabel={m.disclaimer_decline_button()}
    customContainerAttributes={{ role: 'region', 'aria-label': m.disclaimer_title() }}
    buttonClasses={buttonVariants({ size: 'sm' })}
    declineButtonClasses={buttonVariants({ variant: 'secondary', size: 'sm', className: 'mr-4' })}
    contentClasses="mb-4"
    containerClasses="fixed right-0 z-50 m-4 max-w-96 rounded-xl bg-white p-4 shadow-[0_12px_32px_-12px_rgb(43_36_24/0.28),0_2px_6px_-2px_rgb(43_36_24/0.08)] md:p-6"
    onAccept={() => {
      initializeAnalytics();
    }}
  >
    <p className="mb-2 font-bold">{m.disclaimer_title()}</p>
    <p className="mb-2 text-sm">{m.disclaimer_desc()}</p>
    <p className="text-sm">
      {m.disclaimer_link_1()}&nbsp;
      <Link to="/privacy-policy/" className="text-sm underline">
        {m.disclaimer_link_2()}
      </Link>
    </p>
  </CookieConsent>
);
