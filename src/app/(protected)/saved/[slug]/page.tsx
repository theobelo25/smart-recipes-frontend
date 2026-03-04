import { getRecipe } from "@/src/features/recipes/api/recipes.api";
import ActiveRecipe from "@/src/features/recipes/components/ActiveRecipe";
import { Card, CardContent } from "@/src/shared/ui/card";
import { notFound } from "next/navigation";

export default async function SavedRecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  if (!recipe) notFound();

  return (
    <section className="px-64">
      <Card>
        <CardContent>
          <ActiveRecipe recipe={recipe} />
        </CardContent>
      </Card>
    </section>
  );
}
