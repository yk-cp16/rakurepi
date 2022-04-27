import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { DefaultLayout } from '../../components/templates/layouts/DefaultLayout';
import { RecipeCard } from '../../components/organisms/RecipeCard';
import { fetchRecipesByRanking } from '../../apis/recipes'

const Ranking = () => {
  const [recipes, setRecipes] = useState([]);
  const init = async () => {
    const res = await fetchRecipesByRanking();
    const { recipes } = res;
    setRecipes(recipes.slice(0, 3));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="text-center mt-6 text-5xl font-semibold tracking-wider">
        コスパレシピランキング(TOP3)
      </h1>
      <main className={styles.main} >
        {recipes.map((recipe, index) => (
          <div key={index}>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-200 text-xl">{index + 1}位</div>
            <div className="mb-12">
              <RecipeCard recipe={recipe} />
            </div>
          </div>
        ))}
      </main>
    </DefaultLayout >
  );
}
export default Ranking;
