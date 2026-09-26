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
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon, RocketIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { CreateReviewForm } from '@/components/reviews/CreateReviewForm';
import { EditReviewForm } from '@/components/reviews/EditReviewForm';
import { ReviewList } from '@/components/reviews/ReviewList';
import { triggerMarketingBuildOptions } from '@/effects/deploy';
import { fetchReviewsOptions } from '@/effects/reviews';
import { createReviewDialog, editReviewDialog } from '@/utils/review';

const RouteComponent = () => {
  const [locale, setLocale] = useState<Locale>(baseLocale);
  const { mutate, isPending } = useMutation(triggerMarketingBuildOptions());

  const handleTriggerBuild = () => {
    mutate(undefined, {
      onSuccess: () => alert('Build triggered — the marketing site will redeploy shortly.'),
      onError: () => alert('Failed to trigger the build. Please try again.'),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl md:text-2xl">Reviews</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleTriggerBuild} disabled={isPending}>
            <RocketIcon />
            {isPending ? 'Triggering build…' : 'Deploy marketing site'}
          </Button>
          <DialogTrigger handle={createReviewDialog} render={<Button size="sm" />}>
            <PlusIcon />
            Add review
          </DialogTrigger>
        </div>
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
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
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
  }),
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchReviewsOptions(baseLocale), staleTime: 'static' });
  },
  component: RouteComponent,
});
