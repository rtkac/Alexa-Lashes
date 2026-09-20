import { RefreshCcwIcon } from 'lucide-react';

type DefaultCatchBoundaryProps = {
  onRetry: () => void;
};

export const DefaultCatchBoundary = ({ onRetry }: DefaultCatchBoundaryProps) => {
  return (
    <div className="mx-auto max-w-180 p-10 text-center md:p-20">
      <h1 className="mb-4 font-bold text-xl md:text-3xl">Something went wrong</h1>
      <p className="mb-7 md:mb-9">
        We apologize, but an unexpected error occurred while loading this page. Please try again in
        a moment. If the problem persists, contact us.
      </p>
      <div>
        <button
          type="button"
          className="btn-primary mx-auto flex max-w-max items-center justify-center gap-2"
          onClick={onRetry}
        >
          <RefreshCcwIcon />
          Retry
        </button>
      </div>
    </div>
  );
};
