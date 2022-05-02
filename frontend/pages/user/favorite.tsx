import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { DefaultLayout } from '../../components/templates/layouts/DefaultLayout';
import { RecipeCard } from '../../components/organisms/RecipeCard';
import { useRouter } from 'next/router';
import { favoriteRecipe, fetchUserFavorite, unfavoriteRecipe } from '../../apis/recipes'


const UserFavorite = () => {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  const init = async () => {
    const res = await fetchUserFavorite();
    const { recipes } = res;
    setRecipes(recipes);
  }

  const onClickFavoriteButton = async (id: number, isFavorite: boolean) => {
    const res = isFavorite === false
      ? await favoriteRecipe({ id })
      : await unfavoriteRecipe({ id });
    if (res.response == false) {
      return <div>保存できていません...</div>;
    }
    init();
    return;
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-center mt-6 text-5xl font-semibold tracking-wider">
        お気に入りレシピ
      </h1>
      <main className={styles.main} >
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onClickFavoriteButton={onClickFavoriteButton} />
          ))}
        </div>
      </main>
    </DefaultLayout>
  );
}
export default UserFavorite;
