import { cn } from "@/src/shared/lib";
import { Card, CardContent, CardHeader } from "@/src/shared/ui/card";

export function SavedRecipes({ className }: { className: string }) {
  return (
    <Card className={cn(className, "")}>
      <CardHeader>
        <h2>Saved Recipes</h2>
      </CardHeader>
      <CardContent>
        <p>Saved recipes here!</p>
      </CardContent>
    </Card>
  );
}
