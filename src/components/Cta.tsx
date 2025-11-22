import { m } from "@/paraglide/messages";
import { whatsAppNumber } from "@/types";

const Cta = () => {
  return (
    <div className="mb-8 rounded-md bg-primary-light px-6 py-10 text-center md:p-10">
      <h2 className="mb-4 font-bold text-xl md:text-3xl">{m.cta_title()}</h2>
      <p className="mx-auto mb-6 max-w-100">{m.cta_desc()}</p>
      <a href={whatsAppNumber} aria-label="Chat on WhatsApp" className="btn-primary">
        {m.cta_link()}
      </a>
    </div>
  );
};

export default Cta;
