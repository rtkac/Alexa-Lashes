import { Locale } from '@alexa-lashes/types/locales';
import { move } from '@dnd-kit/helpers';
import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { Review } from './Review';

import {
  fetchReviewsOptions,
  renumberReviewsOptions,
  reorderReviewOptions,
} from '@/effects/reviews';
import { editReviewDialog } from '@/utils/review';

type ReviewListProps = {
  locale: Locale;
};

export const ReviewList = ({ locale }: ReviewListProps) => {
  const { data } = useSuspenseQuery(fetchReviewsOptions(locale));
  const { mutate: reorderMutate } = useMutation(reorderReviewOptions(locale));
  const { mutate: renumberMutate } = useMutation(renumberReviewsOptions());

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) {
      return;
    }

    const sourceId = event.operation.source?.id;
    if (typeof sourceId !== 'string') {
      return;
    }

    const reordered = move(data, event);
    const newIndex = reordered.findIndex((review) => review.id === sourceId);
    const prev = reordered[newIndex - 1];
    const next = reordered[newIndex + 1];

    if (!prev && next) {
      // Moved to the very front — reviews are listed highest-displayOrder-first.
      reorderMutate({ id: sourceId, displayOrder: next.displayOrder + 1000 });
    } else if (prev && !next) {
      reorderMutate({ id: sourceId, displayOrder: prev.displayOrder - 1000 });
    } else if (prev && next) {
      const gap = prev.displayOrder - next.displayOrder;
      if (gap < 2) {
        renumberMutate({ orderedIds: reordered.map((review) => review.id) });
      } else {
        reorderMutate({
          id: sourceId,
          displayOrder: Math.round((prev.displayOrder + next.displayOrder) / 2),
        });
      }
    }
  };

  return data.length ? (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((review, index) => (
          <Review
            key={review.id}
            review={review}
            index={index}
            locale={locale}
            editDialogHandle={editReviewDialog}
          />
        ))}
      </div>
    </DragDropProvider>
  ) : (
    <p>No reviews available.</p>
  );
};
