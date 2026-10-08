import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import type { ReactNode } from 'react';

import { m } from '@/paraglide/messages';
import { telephoneNumber, whatsAppNumber } from '@/types';

type CtaProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  // Replaces the default WhatsApp button, e.g. with the training form modal.
  action?: ReactNode;
};

const Cta = ({ title, description, buttonLabel, action }: CtaProps) => {
  return (
    <section className="mb-8 rounded-xl bg-primary-light px-6 py-12 text-center md:px-10 md:py-16">
      <h2 className="mx-auto mb-3 max-w-2xl text-balance font-bold text-3xl leading-tight md:text-4xl">
        {title || m.cta_title()}
      </h2>
      <p className="mx-auto mb-8 max-w-[52ch] text-pretty text-foreground/80 leading-[1.55]">
        {description || m.cta_desc()}
      </p>
      {action ?? (
        <>
          <a href={whatsAppNumber} className={buttonVariants({ size: 'lg' })}>
            {buttonLabel || m.cta_link()}
          </a>
          <p className="mt-4 text-neutral-600 text-sm">
            {m.cta_call()}{' '}
            <a href={`tel:${telephoneNumber}`} className="whitespace-nowrap font-medium">
              {telephoneNumber}
            </a>
          </p>
        </>
      )}
    </section>
  );
};

export default Cta;
