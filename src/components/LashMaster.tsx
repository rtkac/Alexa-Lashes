import { m } from "@/paraglide/messages";

interface LashMasterProps {
  title: string;
  desc_1: string | React.ReactNode;
  desc_2?: string;
}

export const LashMaster = ({ title, desc_1, desc_2 }: LashMasterProps) => {
  return (
    <div className="grid gap-10 md:grid-cols-5">
      <div className="flex items-center justify-center sm:col-span-2">
        <div className="flex h-65 w-65 items-center justify-center rounded-full border-2 border-primary bg-white">
          <img
            src="/alexa-lashes-stylist.webp"
            alt="Oleksandra Afanasieva"
            className="h-60 w-60 rounded-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="space-y-3 text-center md:col-span-3 md:text-left">
        <h2 className="font-bold text-primary">{title}</h2>
        <h3 className="pb-2 font-bold text-2xl md:text-3xl">{m.lash_master_name()}</h3>
        <p className="leading-6">{desc_1}</p>
        {desc_2 && <p className="leading-6">{desc_2}</p>}
      </div>
    </div>
  );
};
