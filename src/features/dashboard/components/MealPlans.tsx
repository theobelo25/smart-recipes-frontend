import { cn } from "@/src/shared/lib";
import { Card, CardContent, CardHeader } from "@/src/shared/ui/card";

export function MealPlans({ className }: { className: string }) {
  return (
    <Card className={cn(className, "")}>
      <CardHeader>
        <h2>Meal Plans</h2>
      </CardHeader>
      <CardContent>
        <p>Meal plans!</p>
      </CardContent>
    </Card>
  );
}
