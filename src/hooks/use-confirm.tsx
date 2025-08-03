import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";

type PromiseProps = {
  resolve: (value: boolean) => void;
} | null;

export function useConfirm(
  title: string,
  message: string,
): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<PromiseProps>(null);

  function confirm() {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(true);
    handleClose();
  }

  function handleCancel() {
    promise?.resolve(false);
    handleClose();
  }

  function ConfirmationDialog() {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant="outline">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} variant="destructive">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return [ConfirmationDialog, confirm];
}
