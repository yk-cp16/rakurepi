import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { UserDefaultLayout } from '../../components/templates/layouts/UserDefaultLayout';
import { UserRecipeCard } from '../../components/organisms/UserRecipeCard';
import { useRouter } from 'next/router';
import { deleteRecipe, fetchMyRecipes } from '../../apis/recipes';

const UserIndex = () => {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetchMyRecipes();
      if (!res.recipes) {
        router.push('/login');
        return
      }
      const recipes = res.recipes.data;
      setRecipes(recipes);
    })()
  }, []);

  const deleteRecipeId = async (id: number) => {
    const res = await deleteRecipe({ id });
    if (!res.response?.isSuccess) {
      alert('レシピ削除に失敗しました。');
      return;
    }
    return location.reload();
  }

  return (
    <UserDefaultLayout>
      <h1 className="text-center mt-6 text-4xl font-semibold tracking-wide">
        マイページ(投稿レシピ一覧)
      </h1>
      <main className={styles.main} >
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {recipes.map((recipe, index) => (
            <UserRecipeCard key={index} recipe={recipe} onClickdeleteButton={deleteRecipeId} />
          ))}
        </div>
      </main>
    </UserDefaultLayout>
  );
}
export default UserIndex;
