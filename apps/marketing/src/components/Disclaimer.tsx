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
    declineButtonClasses={buttonVariants({ variant: 'secondary', size: 'sm' })}
    contentClasses="md:flex-1"
    buttonWrapperClasses="flex shrink-0 gap-3"
    containerClasses="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-6xl flex-col gap-3 border-primary-line border-t bg-white px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(43_36_24/0.18)] md:mb-4 md:flex-row md:items-center md:gap-6 md:rounded-xl md:border md:px-5"
    onAccept={() => {
      initializeAnalytics();
    }}
  >
    <p className="mb-1 font-bold text-sm">{m.disclaimer_title()}</p>
    <p className="text-neutral-600 text-sm leading-normal">
      {m.disclaimer_desc()} {m.disclaimer_link_1()}&nbsp;
      <Link to="/privacy-policy/" className="text-sm underline">
        {m.disclaimer_link_2()}
      </Link>
    </p>
  </CookieConsent>
);
