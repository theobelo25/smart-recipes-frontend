"use client";
import AddPantryItemDialog from "@/src/features/pantry/components/AddPantryItemDialog";
import { PantryItemTable } from "@/src/features/pantry/components/PantryItemTable";
import { usePantryStore } from "@/src/features/pantry/stores/pantry.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { useEffect } from "react";

export default function PantryPage() {
  const pantryItems = usePantryStore((s) => s.pantryItems);
  const hydratePantryItems = usePantryStore((s) => s.hydrate);

  useEffect(() => {
    hydratePantryItems();
  }, [hydratePantryItems]);
  return (
    <section className="px-64">
      <Card>
        <CardHeader className="flex justify-between h-14 items-center">
          <CardTitle>Pantry</CardTitle>
          <AddPantryItemDialog />
        </CardHeader>
        <CardContent>
          <PantryItemTable pantryItems={pantryItems} isPantryPage={true} />
        </CardContent>
      </Card>
    </section>
  );
}
