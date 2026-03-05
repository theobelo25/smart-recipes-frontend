"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";

type ConfirmDeleteRecipeDialogProps = {
  trigger: React.ReactNode;
  recipeTitle?: string;
  onConfirm: () => void | Promise<void>;
};

export function ConfirmDeleteRecipeDialog({
  trigger,
  recipeTitle,
  onConfirm,
}: ConfirmDeleteRecipeDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete recipe</DialogTitle>
          <DialogDescription>
            {recipeTitle
              ? `This will permanently delete "${recipeTitle}". This action cannot be undone.`
              : "This will permanently delete this recipe. This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton={false}>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
