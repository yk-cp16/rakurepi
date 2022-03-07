import styles from '../../../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { DefaultLayout } from '../../../components/templates/layouts/DefaultLayout';
import { useRouter } from "next/router";

import Image from "next/image"
import { Recipe } from '../../../types/recipe';
import { fetchRecipeByRecipeId } from '../../../apis/recipes';

const RecipeShow = () => {
  const router = useRouter();
  const { recipe_id } = router.query;

  const [recipe, setRecipe] = useState(null);

  console.log('recipe_id', recipe_id);

  useEffect(() => {
    (async () => {
      if (!recipe_id) return;

      const res = await fetchRecipeByRecipeId(recipe_id);
      // console.log('res', res);
      const json = await res.json();
      const { recipe } = json;
      console.log('recipe', recipe);

      setRecipe(recipe)
    })()
  }, [recipe_id]);


  if (recipe === null) return <div>Loading...</div>;

  return (
    <DefaultLayout>
      <h1 className="text-center text-4xl mb-3 font-semibold tracking-wider">
        {recipe.title}
      </h1>
      <div className="text-center text-xl mb-3">
        <h3>
          作成者:{recipe.user.name}さん
        </h3>
      </div>
      <div className="text-center">
        <Image src={`http://localhost:8000/storage/image/${recipe.image}`} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="w-full h-full object-center object-cover group-hover:opacity-75" width={650} height={400} />

      </div>
      <div className="mt-8">
        <div className="w-1/2 mx-auto">
          <div className="text- text-2xl">
            <div className="flex w-full py-2 border-b border-black focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50 justify-between">
              <p>材料（1人分）</p>
              <p>{recipe.cost}円</p>
            </div>
            <div className="mt-3">
              {recipe.recipe_ingredients.map((recipeIngredient, index) => (
                <div key={index}>
                  <div className="flex w-full py-2 border-b border-gray-300 focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50 justify-between">
                    <p>{recipeIngredient.name}</p>
                    <p>{recipeIngredient.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9">
              <div className="w-full py-2 border-b border-black focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50">
                <h2>作り方</h2>
              </div>
              <div className="mt-8">
                <div className="text-center text-2xl mt-3 mb-2">
                  <h2>{recipe.description}{`\n`}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </DefaultLayout >
  );
}
export default RecipeShow;
