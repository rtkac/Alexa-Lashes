import { m } from "@/paraglide/messages";

const QrCode = () => {
  return (
    <div className="space-y-5 rounded-md border border-primary-light bg-white p-5 text-center md:p-12">
      <img src="/qr_code.svg" alt="QR code" className="mx-auto h-40 w-40" />
      <div>
        <h2 className="mt-7 mb-3 font-bold text-xl md:mt-0 md:text-xl">{m.qr_code_title()}</h2>
        <p className="text-neutral-500 text-sm md:text-base">{m.qr_code_desc()}</p>
      </div>
    </div>
  );
};

export default QrCode;
