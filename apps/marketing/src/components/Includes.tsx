import { CircleCheckIcon } from 'lucide-react';

type IncludesProps = {
  data: string[];
};

const Includes = ({ data }: IncludesProps) => {
  return (
    <div className="mx-auto mb-4 max-w-3xl">
      <ul className="card divide-y divide-primary-light px-8 py-4 md:px-10 md:py-6">
        {data.map((include) => (
          <li key={include} className="flex items-center py-4">
            <CircleCheckIcon className="mr-3 w-5 shrink-0 fill-primary-strong stroke-white" />
            <p className="text-sm">{include}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Includes;
