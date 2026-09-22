'use client';

import { cn } from '@alexa-lashes/ui/lib/utils';
import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import type * as React from 'react';

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

const Dialog = ({ ...props }: DialogProps) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

type DialogTriggerProps = React.ComponentProps<typeof DialogPrimitive.Trigger>;

const DialogTrigger = ({ ...props }: DialogTriggerProps) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

type DialogPortalProps = React.ComponentProps<typeof DialogPrimitive.Portal>;

const DialogPortal = ({ ...props }: DialogPortalProps) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
};

type DialogCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;

const DialogClose = ({ ...props }: DialogCloseProps) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
};

type DialogOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay>;

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 data-[state=closed]:animate-out data-[state=open]:animate-in supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
      {...props}
    />
  );
};

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
};

const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid max-h-screen w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 overflow-y-auto rounded-xl bg-primary-light p-6 text-popover-foreground text-sm outline-none ring-1 ring-foreground/10 duration-100 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-sm md:p-8',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <button type="button" className="absolute top-4 right-4 cursor-pointer">
              <XIcon className="text-primary brightness-50" />
              <span className="sr-only">Close</span>
            </button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

type DialogHeaderProps = React.ComponentProps<'div'>;

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-4 text-center', className)}
      {...props}
    />
  );
};

type DialogFooterProps = React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
  closeLabel: string;
};

const DialogFooter = ({
  className,
  showCloseButton = false,
  children,
  closeLabel,
  ...props
}: DialogFooterProps) => {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 rounded-b-xl bg-muted/50 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <button type="button" className="btn-primary w-full">
            {closeLabel}
          </button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
};

type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;

const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('cn-font-heading font-bold text-2xl leading-none', className)}
      {...props}
    />
  );
};

type DialogDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>;

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-primary text-sm brightness-50 *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
};

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
