import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import type { Faq } from "@/types";

type FaqsProps = {
  data: Faq[];
};

const Faqs = ({ data }: FaqsProps) => {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={data[0].question}>
      {data.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm italic">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Faqs;
