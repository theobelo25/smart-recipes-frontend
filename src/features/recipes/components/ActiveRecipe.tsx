import { Recipe } from "../types";

export default function ActiveRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <article>
      <h3>{recipe.title}</h3>
      <p>{`Prep Time: ${recipe.prepMinutes}mins`}</p>
      <p>{`Cook Time: ${recipe.cookMinutes}mins`}</p>
      <p>{`Servings: ${recipe.servings}`}</p>
      <hr className="my-4" />
      <ul>
        {recipe.ingredients.map((i) => (
          <li key={i.ingredient.name}>
            {i.quantity} {i.unit} {i.ingredient.name}
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <ul>
        {JSON.parse(recipe.instructions).map((s: string, index: number) => {
          const stepNum = index + 1;
          return <li key={s}>{`${stepNum}. ${s}`}</li>;
        })}
      </ul>
    </article>
  );
}
