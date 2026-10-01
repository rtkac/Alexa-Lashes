import { cn } from '@alexa-lashes/ui/lib/utils';
import { buttonVariants } from '@alexa-lashes/ui/shadcn';

import { m } from '@/paraglide/messages';
import { whatsAppNumber } from '@/types';

type CtaProps = {
  variant?: 'wheat' | 'white';
  title?: string;
  description?: string;
  buttonLabel?: string;
};

const Cta = ({ variant = 'wheat', title, description, buttonLabel }: CtaProps) => {
  return (
    <div
      className={cn('mb-8 rounded-md bg-primary-light px-6 py-10 text-center md:p-10', {
        'border border-primary-light bg-white': variant === 'white',
      })}
    >
      <h2 className="mb-4 text-balance font-bold text-xl md:text-3xl">{title || m.cta_title()}</h2>
      <p className="mx-auto mb-6 max-w-130 leading-6">{description || m.cta_desc()}</p>
      <a href={whatsAppNumber} className={buttonVariants()}>
        {buttonLabel || m.cta_link()}
      </a>
    </div>
  );
};

export default Cta;
