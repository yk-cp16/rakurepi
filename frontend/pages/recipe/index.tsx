import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { DefaultLayout } from '../../components/templates/layouts/DefaultLayout';
import { RecipeCard } from '../../components/organisms/RecipeCard';
import { Recipe } from '../../types/recipe';
import Image from "next/image"
import { fetchRecipes, fetchRecipesIndex, favoriteRecipe, unfavoriteRecipe } from '../../apis/recipes';
import { fetchUserLogin } from '../../apis/users';
import { useRouter } from 'next/router';
const RecipeTop = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // console.log('recipes1', recipes);


  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();

  const init = async () => {
    const email = 'yu375zit@gmail.com';
    const password = 'a529gjs8int';
    const loginRes = await fetchUserLogin(email, password);
    console.log('loginRes', loginRes);
    const { access_token } = loginRes;

    setAccessToken(access_token);
    const res = fetchRecipes(access_token);
    // console.log('res', res);
    const json = await res;
    // console.log('json.recipes', json.recipes);
    const recipes = json.recipes.data;
    setRecipes(recipes);

  };

  // useEffect(() => {
  //   init();
  // }, []);
  useEffect(() => {
    (async () => {

      init();
    })()
  }, []);

  const onClickFavoriteButton = async (id: number, isFavorite: boolean) => {
    if (isFavorite === false) {
      const res = await favoriteRecipe({ id, accessToken });
      if (res.response == false) {
        return <div>保存できていません...</div>;
      } else { return location.reload(); }

    } else {

      const res = await unfavoriteRecipe({ id, accessToken });
      if (res.response == false) {
        return <div>保存できていません...</div>;
      } else {
        return location.reload();
      }
    }
  }

  return (
    <DefaultLayout>
      <Image src="http://localhost:8000/storage/food-top.jpg" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="w-full h-full object-center object-cover group-hover:opacity-75" width={1500} height={800} />
      <main className={styles.main} >
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {recipes.map((recipe, index) => (
            // recipe、onClickfavoriteButtonはpropsである
            <RecipeCard key={index} recipe={recipe} onClickFavoriteButton={onClickFavoriteButton} />
          ))}
        </div>
      </main>
    </DefaultLayout>

  );
}

export default RecipeTop;
