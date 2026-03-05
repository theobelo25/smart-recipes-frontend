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
    <div className="flex flex-col items-center w-full bg-bg">
      <main className="flex w-full flex-col items-center justify-center px-6 sm:px-8 md:px-10 xl:px-24 sm:items-start">
        <section className="grid grid-cols-1 gap-8 w-full">
          <Card>
            <CardHeader className="flex flex-col gap-4 items-start sm:flex-row sm:justify-between sm:items-center min-h-14">
              <CardTitle>Pantry</CardTitle>
              <AddPantryItemDialog stayOnPageAfterAdd />
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <PantryItemTable pantryItems={pantryItems} isPantryPage={true} />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
