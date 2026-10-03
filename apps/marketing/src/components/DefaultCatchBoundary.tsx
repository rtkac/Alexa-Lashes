import { Button } from '@alexa-lashes/ui/shadcn';
import { RefreshCcwIcon } from 'lucide-react';

import { m } from '@/paraglide/messages';

type DefaultCatchBoundaryProps = {
  onRetry: () => void;
};

export const DefaultCatchBoundary = ({ onRetry }: DefaultCatchBoundaryProps) => {
  return (
    <div role="alert" className="mx-auto max-w-180 p-10 text-center md:p-20">
      <h1 className="mb-4 font-bold text-xl md:text-3xl">{m.server_error_title()}</h1>
      <p className="mb-7 md:mb-9">{m.server_error_desc()}</p>
      <div>
        <Button className="mx-auto" onClick={onRetry}>
          <RefreshCcwIcon />
          {m.server_error_button()}
        </Button>
      </div>
    </div>
  );
};
