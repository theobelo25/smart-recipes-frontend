import { cn } from "@/src/shared/lib";
import { Card, CardContent, CardHeader } from "@/src/shared/ui/card";

export function PantryItems({ className }: { className: string }) {
  return (
    <Card className={cn(className, "")}>
      <CardHeader>
        <h2>Pantry Items</h2>
      </CardHeader>
      <CardContent>
        <p>Pantry Items!</p>
      </CardContent>
    </Card>
  );
}
