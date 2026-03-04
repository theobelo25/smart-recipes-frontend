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
import { Checkbox } from "@/src/shared/ui/checkbox";

type BaseProps = {
  pantryItems: PantryItem[];
  isPantryPage?: boolean;
};

type GeneratePageProps = BaseProps & {
  isGeneratePage: true;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
};

type NonGeneratePageProps = BaseProps & {
  isGeneratePage?: false;
  selectedIds?: never;
  setSelectedIds?: never;
};

type PantryItemTableProps = GeneratePageProps | NonGeneratePageProps;

export function PantryItemTable(props: PantryItemTableProps) {
  const removePantryItem = usePantryStore((s) => s.removePantryItem);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {props.isGeneratePage && <TableHead></TableHead>}
          <TableHead className="w-25">Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          {props.isPantryPage && (
            <TableHead className="w-20 text-center">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.pantryItems?.map((pi) => (
          <TableRow key={pi.id}>
            {props.isGeneratePage && (
              <TableCell>
                <Checkbox
                  checked={props.selectedIds.includes(pi.id)}
                  onCheckedChange={(value) => {
                    if (value === true) {
                      props.setSelectedIds((prev) => [...prev, pi.id]);
                    } else {
                      props.setSelectedIds((prev) =>
                        prev.filter((id) => id !== pi.id),
                      );
                    }
                  }}
                />
              </TableCell>
            )}
            <TableCell className="font-medium">{pi.ingredient.name}</TableCell>
            <TableCell className="text-right">{`${pi.quantity} ${pi.unit}`}</TableCell>
            {props.isPantryPage && (
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
