import { m } from '@/paraglide/messages';
import { cdnSrc, cdnSrcSet } from '@/utils/image';

type LashMasterProps = {
  title: string;
  desc_1: string | React.ReactNode;
  desc_2?: string;
};

export const LashMaster = ({ title, desc_1, desc_2 }: LashMasterProps) => {
  return (
    <div className="grid items-center gap-8 md:grid-cols-5 md:gap-12">
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-xl md:col-span-2 md:max-w-none">
        <img
          src={cdnSrc('/alexa-lashes-stylist.webp', 640, 85)}
          srcSet={cdnSrcSet('/alexa-lashes-stylist.webp', 700, [400, 640], 85)}
          sizes="(min-width: 72rem) 420px, (min-width: 48rem) 36vw, 384px"
          alt="Oleksandra Afanasieva"
          width={700}
          height={1008}
          className="aspect-4/5 h-auto w-full object-cover object-[center_25%]"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 text-center md:col-span-3 md:text-left">
        <div className="pb-2">
          <h2 className="text-balance font-bold text-3xl md:text-4xl">{m.lash_master_name()}</h2>
          <p className="mt-1 font-medium text-neutral-600">{title}</p>
        </div>
        <p className="leading-6">{desc_1}</p>
        {desc_2 && <p className="leading-6">{desc_2}</p>}
      </div>
    </div>
  );
};
