import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { DefaultLayout } from '../../components/templates/layouts/DefaultLayout';
import { RecipeCard } from '../../components/organisms/RecipeCard';
import { useRouter } from 'next/router';
import { fetchUserLogin } from '../../apis/users'
import { fetchUserFavorite } from '../../apis/recipes'


const UserFavorite = () => {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const email = 'yu375zit@gmail.com';
      const password = 'a529gjs8int';
      const loginRes = await fetchUserLogin(email, password);
      // loginResからacces_tokenのみ取り出すことができる
      console.log('loginRes', loginRes);
      const { access_token } = loginRes;
      console.log('access_token', access_token);
      const res = await fetchUserFavorite(access_token);
      console.log('APIres', res);
      // console.log('res', res);
      const { recipes } = res;
      console.log('recipes', recipes);
      setRecipes(recipes);
    })()
  }, []);


  return (
    <DefaultLayout>
      <h1 className="text-center text-5xl font-semibold tracking-wider">
        お気に入りレシピ
      </h1>
      <main className={styles.main} >
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onClickFavoriteButton={(id: number) => console.log('お気に入りしました')
            } />
          ))}
        </div>
      </main>
    </DefaultLayout>
  );
}

export default UserFavorite;
