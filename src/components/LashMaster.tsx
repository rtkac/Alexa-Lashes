import { m } from "@/paraglide/messages";

interface LashMasterProps {
  title: string;
  desc_1: string;
  desc_2?: string;
}

export const LashMaster = ({ title, desc_1, desc_2 }: LashMasterProps) => {
  return (
    <div className="grid gap-10 md:grid-cols-5">
      <div className="mx-auto max-h-65 max-w-65 overflow-hidden rounded-full border-2 border-primary p-2 sm:col-span-2">
        <div className="overflow-hidden rounded-full">
          <img
            src="https://placehold.co/400x400/4a413a/4a413a"
            alt="Alexa Lashes master"
            className="h-full w-full object-cover"
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
