import { getRecipe } from "@/src/features/recipes/api/recipes.api";
import ActiveRecipe from "@/src/features/recipes/components/ActiveRecipe";
import SavedRecipeHeader from "@/src/features/recipes/components/SavedRecipeHeader";
import { Card, CardContent } from "@/src/shared/ui/card";
import { notFound } from "next/navigation";

export default async function SavedRecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  let recipe;
  try {
    recipe = await getRecipe(slug);
  } catch {
    notFound();
  }
  if (!recipe) notFound();

  return (
    <main className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-64">
      <section>
        <Card>
          <SavedRecipeHeader recipe={recipe} />
          <CardContent>
            <ActiveRecipe recipe={recipe} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
