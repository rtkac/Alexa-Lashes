import { m } from "@/paraglide/messages";

const QrCode = () => {
  return (
    <div className="mt-18 items-center rounded-md bg-white p-10 text-center md:flex md:text-left">
      <img src="/qr_code.svg" alt="QR code" className="mx-auto h-40 w-40 md:mr-8 md:ml-0" />
      <div>
        <h2 className="mt-7 mb-3 font-bold text-xl md:mt-0 md:text-2xl">{m.qr_code_title()}</h2>
        <p>{m.qr_code_desc()}</p>
      </div>
    </div>
  );
};

export default QrCode;
