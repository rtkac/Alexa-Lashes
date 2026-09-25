import { baseLocale, type Locale, locales } from '@alexa-lashes/types/locales';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@alexa-lashes/ui/shadcn';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { Review } from '@/components/reviews/Review';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import {
  createReviewOptions,
  fetchReviewOptions,
  fetchReviewsOptions,
  updateReviewOptions,
} from '@/effects/reviews';
import { EditReviewPayload, ReviewFormOutput, ReviewFormValues } from '@/types/review';
import { createReviewDialog, editReviewDialog, getReviewChanges } from '@/utils.ts/review';

const emptyReviewValues: ReviewFormValues = {
  name: '',
  rating: 0,
  url: '',
  translations: Object.fromEntries(locales.map((locale) => [locale, ''])) as Record<Locale, string>,
};

type EditReviewFormProps = EditReviewPayload & {
  onSaved: () => void;
};

const EditReviewForm = ({ reviewId, locale, onSaved }: EditReviewFormProps) => {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(context.fetchReviewOptions(reviewId));
  const { mutateAsync, isError } = useMutation(updateReviewOptions());

  const initialValues = {
    name: data.name,
    rating: data.rating,
    url: data.url ?? '',
    translations: Object.fromEntries(
      locales.map((locale) => [
        locale,
        data.translations.find((translation) => translation.locale === locale)?.description ?? '',
      ]),
    ) as Record<Locale, string>,
  };

  const handleSubmit = async (values: ReviewFormOutput) => {
    const changes = getReviewChanges(data.id, initialValues, values);
    if (changes) {
      await mutateAsync(changes);
    }
    onSaved();
  };

  return (
    <ReviewForm
      defaultValues={initialValues}
      defaultLocale={locale}
      onSubmit={handleSubmit}
      submitError={isError ? 'The review could not be saved.' : undefined}
    />
  );
};

type CreateReviewFormProps = {
  defaultLocale: Locale;
  onSaved: () => void;
};

const CreateReviewForm = ({ defaultLocale, onSaved }: CreateReviewFormProps) => {
  const { mutateAsync, isError } = useMutation(createReviewOptions());

  const handleSubmit = async (values: ReviewFormOutput) => {
    await mutateAsync({
      name: values.name,
      rating: values.rating,
      url: values.url || null,
      translations: values.translations,
    });
    onSaved();
  };

  return (
    <ReviewForm
      defaultValues={emptyReviewValues}
      defaultLocale={defaultLocale}
      onSubmit={handleSubmit}
      submitError={isError ? 'The review could not be created.' : undefined}
    />
  );
};

type ReviewListProps = {
  locale: Locale;
};

const ReviewList = ({ locale }: ReviewListProps) => {
  const context = Route.useRouteContext();

  const { data } = useSuspenseQuery(context.fetchReviewsOptions(locale));

  return data.length ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((review) => (
        <Review
          key={review.id}
          review={review}
          locale={locale}
          editDialogHandle={editReviewDialog}
        />
      ))}
    </div>
  ) : (
    <p>No reviews available.</p>
  );
};

const RouteComponent = () => {
  const [locale, setLocale] = useState<Locale>(baseLocale);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl md:text-2xl">Reviews</h1>
        <DialogTrigger handle={createReviewDialog} render={<Button size="sm" />}>
          <PlusIcon />
          Add review
        </DialogTrigger>
      </div>
      <Tabs value={locale} onValueChange={setLocale} className="mt-4">
        <TabsList>
          {locales.map((tabLocale) => (
            <TabsTrigger key={tabLocale} value={tabLocale}>
              {tabLocale.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        {locales.map((tabLocale) => (
          <TabsContent key={tabLocale} value={tabLocale}>
            {tabLocale === locale && (
              <Suspense
                fallback={
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Skeleton key={index} className="h-40 w-full" />
                    ))}
                  </div>
                }
              >
                <ReviewList locale={locale} />
              </Suspense>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog handle={editReviewDialog}>
        {({ payload }) => (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit review</DialogTitle>
            </DialogHeader>
            {payload && (
              <Suspense
                key={payload.reviewId}
                fallback={
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                }
              >
                <EditReviewForm
                  reviewId={payload.reviewId}
                  locale={payload.locale}
                  onSaved={() => editReviewDialog.close()}
                />
              </Suspense>
            )}
          </DialogContent>
        )}
      </Dialog>

      <Dialog handle={createReviewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create review</DialogTitle>
          </DialogHeader>
          <CreateReviewForm defaultLocale={locale} onSaved={() => createReviewDialog.close()} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const Route = createFileRoute('/_protected/dashboard/')({
  context: () => ({
    fetchReviewsOptions,
    fetchReviewOptions,
  }),
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchReviewsOptions(baseLocale), staleTime: 'static' });
  },
  component: RouteComponent,
});
