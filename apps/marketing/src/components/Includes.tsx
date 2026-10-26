import { CircleCheckIcon } from 'lucide-react';

type IncludesProps = {
  data: string[];
};

const Includes = ({ data }: IncludesProps) => {
  return (
    <ul className="card grid px-6 py-2 md:grid-cols-2 md:gap-x-12">
      {data.map((include) => (
        <li
          key={include}
          className="flex items-start gap-3 border-primary-line py-4 not-first:border-t md:nth-2:border-t-0"
        >
          <CircleCheckIcon
            className="mt-0.5 size-5 shrink-0 fill-primary-strong stroke-white"
            aria-hidden="true"
          />
          <p className="text-pretty">{include}</p>
        </li>
      ))}
    </ul>
  );
};

export default Includes;
