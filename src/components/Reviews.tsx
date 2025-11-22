import * as Avatar from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";

import type { Review } from "@/types";

type ReviewsProps = {
  data: Review[];
};

const Reviews = ({ data }: ReviewsProps) => {
  return (
    <div className="mb-18 grid gap-4 md:grid-cols-3">
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
            <Avatar.Root className="inline-flex size-[35px] select-none items-center justify-center overflow-hidden rounded-full bg-primary-light align-middle">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src="/logo.svg"
                alt={review.name}
              />
              <Avatar.Fallback
                className="flex size-full items-center justify-center bg-white font-medium text-[15px] leading-1"
                delayMs={600}
              >
                CT
              </Avatar.Fallback>
            </Avatar.Root>
            <h3 className="font-bold text-sm">{review.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
