import { MessageSquareCheckIcon, SquarePenIcon } from "lucide-react";
import { type ReactNode, useState } from "react";

import { TrainingForm } from "./TrainingForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { m } from "@/paraglide/messages";

type TrainingFormModalProps = {
  trigger: ReactNode;
};

export const TrainingFormModal = ({ trigger }: TrainingFormModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Dialog onOpenChange={(val) => val && isSuccess && setIsSuccess(false)}>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          {isSuccess ? (
            <>
              <DialogHeader className="space-y-5">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground p-2.5">
                  <MessageSquareCheckIcon className="text-primary" />
                </div>
                <DialogTitle>{m.training_form_success_title()}</DialogTitle>
                <DialogDescription>{m.training_form_success_desc()}</DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton closeLabel={m.training_form_close_button()} />
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground p-2.5">
                  <SquarePenIcon className="text-primary" />
                </div>
                <DialogTitle>{m.training_form_title()}</DialogTitle>
                <DialogDescription>{m.training_form_desc()}</DialogDescription>
              </DialogHeader>
              <TrainingForm setIsSuccess={setIsSuccess} />
            </>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
};
