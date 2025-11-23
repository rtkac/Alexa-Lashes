import { StarIcon } from "lucide-react";

import type { Review } from "@/types";

type ReviewsProps = {
  data: Review[];
};

const Reviews = ({ data }: ReviewsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data.map((review) => (
        <div
          key={review.name}
          className="flex flex-col justify-between rounded-md border border-primary-light bg-white p-5"
        >
          <div className="mb-3">
            <div className="mb-3 flex space-x-1 text-primary">
              <StarIcon size="17" />
              <StarIcon size="17" />
              <StarIcon size="17" />
              <StarIcon size="17" />
              <StarIcon size="17" />
            </div>
            <p className="text-neutral-600 text-sm">{review.description}</p>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="size-[35px] overflow-hidden rounded-full">
              <img src="/logo.svg" alt={review.name} className="h-full w-full object-cover" />
            </div>
            <h3 className="font-bold text-sm">{review.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
