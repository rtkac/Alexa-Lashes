import type { Review as ReviewItem } from '@alexa-lashes/contracts/reviews';
import type { Locale } from '@alexa-lashes/types/locales';
import { cn } from '@alexa-lashes/ui/lib/utils';
import { Button, DialogTrigger } from '@alexa-lashes/ui/shadcn';
import { useSortable } from '@dnd-kit/react/sortable';
import { PencilIcon, StarIcon } from 'lucide-react';

import type { EditReviewDialogHandle } from '../../types/review';

type ReviewProps = {
  review: ReviewItem;
  index: number;
  locale: Locale;
  editDialogHandle: EditReviewDialogHandle;
};

export const Review = ({ review, index, locale, editDialogHandle }: ReviewProps) => {
  const { id, name, description, rating, url } = review;
  const { ref, isDragging } = useSortable({ id, index });

  return (
    <div
      ref={ref}
      className={cn('group relative touch-none', isDragging && 'opacity-50')}
      title={url || ''}
    >
      <div className="flex h-full min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between rounded-md border border-primary-light bg-white p-5 no-underline hover:no-underline md:basis-[40%] lg:basis-[calc(33.1%-8px)] dark:border-tertiary-light dark:bg-tertiary">
        <div className="mb-3">
          <div className="mb-3 flex space-x-1 text-primary">
            {Array.from({ length: rating }).map((_, index) => (
              <StarIcon key={index} size="17" />
            ))}
          </div>
          {description === null ? (
            <p className="text-red-500 text-sm italic">Missing translation</p>
          ) : (
            <p className="text-neutral-600 text-sm dark:text-amber-50">{description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2.5">
          <div className="size-8.75 overflow-hidden rounded-full">
            <img
              src="/logo.svg"
              alt={name}
              className="h-full w-full object-cover"
              width={35}
              height={35}
              loading="lazy"
            />
          </div>
          <h3 className="font-bold text-black text-sm">
            <span>{name}</span>
          </h3>
        </div>
      </div>
      <DialogTrigger
        handle={editDialogHandle}
        payload={{ reviewId: id, locale }}
        render={
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Edit review"
            className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:opacity-100"
          />
        }
      >
        <PencilIcon />
      </DialogTrigger>
    </div>
  );
};
