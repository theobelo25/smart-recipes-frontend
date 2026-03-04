import { GeneratedRecipe } from "../types";

export default function GenereatedRecipe({
  recipe,
}: {
  recipe: GeneratedRecipe;
}) {
  return (
    <article>
      <h3>{recipe.title}</h3>
      <p>{`Prep Time: ${recipe.prepMinutes}mins`}</p>
      <p>{`Cook Time: ${recipe.cookMinutes}mins`}</p>
      <p>{`Servings: ${recipe.servings}`}</p>
      <hr className="my-4" />
      <div className="flex gap-8">
        <div>
          <h4>Pantry Ingredients</h4>
          <ul>
            {recipe.ingredients.map((i) => (
              <li key={i.name}>
                {i.quantity} {i.unit} {i.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {recipe.extras && (
            <>
              <h4>Other Ingredients</h4>
              <ul>
                {recipe.extras.map((i) => (
                  <li key={i.name}>
                    {i.quantity} {i.unit} {i.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <hr className="my-4" />
      <ul>
        {recipe.instructions.map((s: string, index: number) => {
          const stepNum = index + 1;
          return <li key={s}>{`${stepNum}. ${s}`}</li>;
        })}
      </ul>
    </article>
  );
}
