import { m } from "@/paraglide/messages";
import { whatsAppNumber } from "@/types";

const Cta = () => {
  return (
    <div className="bg-primary-light rounded-md px-6 py-10 md:p-10 text-center mb-8">
      <h2 className="font-bold text-xl md:text-3xl mb-4">{m.cta_title()}</h2>
      <p className="mb-6 max-w-100 mx-auto">{m.cta_desc()}</p>
      <a
        href={`https://wa.me/${whatsAppNumber}`}
        aria-label="Chat on WhatsApp"
        className="btn-primary"
      >
        {m.cta_link()}
      </a>
    </div>
  );
};

export default Cta;
