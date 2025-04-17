import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { ReactNode, useState } from 'react';

type DialogOptions = {
  title: string;
  description: ReactNode;
  onConfirm: () => void;
  isDestructive?: boolean;
};

let openDialogCallback: ((options: DialogOptions) => void) | null = null;

export const useDialog = () => {
  const openDialog = (options: DialogOptions) => {
    if (openDialogCallback) {
      openDialogCallback(options);
    }
  };

  return { openDialog };
};

export const DialogManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null);

  // Store the dialog callback for triggering it
  openDialogCallback = (options: any) => {
    setDialogOptions(options);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogOptions(null);
  };

  return (
    <>
      {isOpen && dialogOptions && (
        <AlertDialog open={isOpen} onOpenChange={closeDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogOptions.title}</AlertDialogTitle>
              <AlertDialogDescription>{dialogOptions.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button
                variant={dialogOptions.isDestructive ? 'destructive' : 'default'}
                onClick={() => {
                  dialogOptions.onConfirm();
                  closeDialog();
                }}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
