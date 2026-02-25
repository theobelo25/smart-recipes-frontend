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

export default function AddPantryItemDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>Add Pantry Item</DialogTitle>
          <DialogDescription>
            Add an ingredient to your pantry!
          </DialogDescription>
        </DialogHeader>
        <AddPantryItemForm />
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
