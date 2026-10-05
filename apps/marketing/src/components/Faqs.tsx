import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@alexa-lashes/ui/shadcn';

import type { Faq } from '@/types';

type FaqsProps = {
  data: Faq[];
};

const Faqs = ({ data }: FaqsProps) => {
  return (
    <Accordion hiddenUntilFound defaultValue={[data[0]?.question]} className="card px-5 md:px-7">
      {data.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question} className="border-primary-line">
          <AccordionTrigger className="items-center rounded-none py-5 font-semibold text-base leading-snug tracking-[-0.01em] hover:text-primary-strong hover:no-underline focus-visible:border-transparent focus-visible:outline-2 focus-visible:outline-primary-strong focus-visible:outline-offset-2 focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:size-7 **:data-[slot=accordion-trigger-icon]:rounded-full **:data-[slot=accordion-trigger-icon]:bg-primary-light **:data-[slot=accordion-trigger-icon]:p-1.5 **:data-[slot=accordion-trigger-icon]:text-primary-strong dark:**:data-[slot=accordion-trigger-icon]:bg-tertiary-light">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <p className="max-w-[65ch] text-pretty text-foreground/80 text-sm leading-[1.6] md:text-base">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Faqs;
