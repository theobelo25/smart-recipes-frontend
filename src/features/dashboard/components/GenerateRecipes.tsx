import { cn } from "@/src/shared/lib";
import { Card, CardContent, CardHeader } from "@/src/shared/ui/card";

export function GenerateRecipes({ className }: { className: string }) {
  return (
    <Card className={cn(className, "")}>
      <CardHeader>
        <h2>Generate Recipe</h2>
      </CardHeader>
      <CardContent>
        <p>Generate Recipe</p>
      </CardContent>
    </Card>
  );
}
