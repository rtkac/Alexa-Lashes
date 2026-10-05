import { m } from '@/paraglide/messages';
import { cdnSrc, cdnSrcSet } from '@/utils/image';

const QrCode = () => {
  return (
    <div className="card space-y-5 p-5 text-center md:p-12">
      <img
        src={cdnSrc('/qr_code.webp', 320, 70)}
        srcSet={cdnSrcSet('/qr_code.webp', 975, [160, 320, 480], 70)}
        sizes="160px"
        alt={m.qr_code_alt()}
        width={160}
        height={160}
        className="mx-auto size-40"
      />
      <div>
        <h2 className="mt-7 mb-3 text-balance font-bold text-xl md:mt-0">{m.qr_code_title()}</h2>
        <p className="text-neutral-500 text-sm md:text-base">{m.qr_code_desc()}</p>
      </div>
    </div>
  );
};

export default QrCode;
