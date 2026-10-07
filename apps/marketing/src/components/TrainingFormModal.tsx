import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@alexa-lashes/ui/shadcn';
import { type ReactElement, useState } from 'react';

import { TrainingForm } from './TrainingForm';

import { m } from '@/paraglide/messages';

type TrainingFormModalProps = {
  trigger: ReactElement;
};

export const TrainingFormModal = ({ trigger }: TrainingFormModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Dialog onOpenChange={(val) => val && isSuccess && setIsSuccess(false)}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-lg" closeLabel={m.training_form_close_button()}>
        {isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>{m.training_form_success_title()}</DialogTitle>
              <DialogDescription>{m.training_form_success_desc()}</DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton closeLabel={m.training_form_close_button()} />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{m.training_form_title()}</DialogTitle>
              <DialogDescription>{m.training_form_desc()}</DialogDescription>
            </DialogHeader>
            <TrainingForm setIsSuccess={setIsSuccess} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
