"use client";

import { useState } from "react";
import { Button } from "@/src/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui/dialog";
import { AddPantryItemForm } from "./AddPantryItemForm";

type AddPantryItemDialogProps = {
  /** When true, keep the user on the current page after adding (e.g. when opened from generate page). */
  stayOnPageAfterAdd?: boolean;
};

export default function AddPantryItemDialog({
  stayOnPageAfterAdd = false,
}: AddPantryItemDialogProps = {}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Pantry Item</Button>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>Add Pantry Item</DialogTitle>
          <DialogDescription>
            Add an ingredient to your pantry!
          </DialogDescription>
        </DialogHeader>
        <AddPantryItemForm
          redirectAfterSuccess={stayOnPageAfterAdd ? null : "/pantry"}
          onSuccess={stayOnPageAfterAdd ? () => setOpen(false) : undefined}
        />
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
          <Button variant={"outline"} type="submit" form="add-pantry-item">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
