import { CircleCheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type IncludesProps = {
  data: string[];
};

const Includes = ({ data }: IncludesProps) => {
  return (
    <div className="mx-auto mb-4 max-w-3xl">
      <div className="rounded-md border border-primary-light bg-white p-8 md:p-10 dark:border-tertiary-light dark:bg-tertiary">
        {data.map((include, index) => (
          <div
            key={include}
            className={cn("flex items-center", {
              "mb-4 border-primary-light border-b pb-4": index !== data.length - 1,
            })}
          >
            <CircleCheckIcon className="mr-3 w-5 shrink-0 fill-primary stroke-white" />
            <h3 className="text-sm">{include}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Includes;
