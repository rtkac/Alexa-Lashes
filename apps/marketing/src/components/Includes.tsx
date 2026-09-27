import { cn } from '@alexa-lashes/ui/lib/utils';
import { CircleCheckIcon } from 'lucide-react';

type IncludesProps = {
  data: string[];
};

const Includes = ({ data }: IncludesProps) => {
  return (
    <div className="mx-auto mb-4 max-w-3xl">
      <div className="card p-8 md:p-10">
        {data.map((include, index) => (
          <div
            key={include}
            className={cn('flex items-center', {
              'mb-4 border-primary-light border-b pb-4': index !== data.length - 1,
            })}
          >
            <CircleCheckIcon className="mr-3 w-5 shrink-0 fill-primary stroke-white" />
            <p className="text-sm">{include}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Includes;
