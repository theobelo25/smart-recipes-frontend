import { cn } from "@/src/shared/lib";
import { Card, CardContent, CardHeader } from "@/src/shared/ui/card";

export function ShoppingList({ className }: { className: string }) {
  return (
    <Card className={cn(className, "")}>
      <CardHeader>
        <h2>Shopping List</h2>
      </CardHeader>
      <CardContent>
        <p>Shopping list!</p>
      </CardContent>
    </Card>
  );
}
