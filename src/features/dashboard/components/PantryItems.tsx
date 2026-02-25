"use client";
import { cn } from "@/src/shared/lib";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import Link from "next/link";
import AddPantryItemDialog from "../../pantry/components/AddPantryItemDialog";
import { useEffect } from "react";
import { usePantryStore } from "../../pantry/stores/pantry.store";
import { PantryItemTable } from "../../pantry/components/PantryItemTable";

export function PantryItems({ className }: { className: string }) {
  const hydrateRecentPantry = usePantryStore((s) => s.hydrateRecent);
  const recentPantryItems = usePantryStore((s) => s.recentPantryItems);

  useEffect(() => {
    hydrateRecentPantry();
  }, [hydrateRecentPantry]);
  return (
    <Card className={cn(className, "justify-start gap-2")}>
      <CardHeader className="flex justify-between h-12 items-center">
        <CardTitle>Recent Pantry Items</CardTitle>
        <AddPantryItemDialog />
      </CardHeader>
      <CardContent>
        {recentPantryItems.length && (
          <PantryItemTable pantryItems={recentPantryItems} />
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Link href={"/pantry"}>View all</Link>
      </CardFooter>
    </Card>
  );
}
