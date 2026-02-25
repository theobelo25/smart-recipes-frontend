"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shared/ui/table";
import { PantryItem } from "../types";
import { Button } from "@/src/shared/ui/button";
import { usePantryStore } from "../stores/pantry.store";

export function PantryItemTable({
  pantryItems,
  isPantryPage = false,
}: {
  pantryItems: PantryItem[];
  isPantryPage?: boolean;
}) {
  const removePantryItem = usePantryStore((s) => s.removePantryItem);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Name</TableHead>
          {isPantryPage && <TableHead>Notes</TableHead>}
          <TableHead className="text-right">Amount</TableHead>
          {isPantryPage && (
            <TableHead className="w-20 text-center">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {pantryItems?.map((pi) => (
          <TableRow key={pi.id}>
            <TableCell className="font-medium">{pi.ingredient.name}</TableCell>
            {isPantryPage && <TableCell>{pi.notes}</TableCell>}
            <TableCell className="text-right">{`${pi.quantity} ${pi.unit}`}</TableCell>
            {isPantryPage && (
              <TableCell className="w-20 text-center">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => removePantryItem(pi.id)}
                >
                  -
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
