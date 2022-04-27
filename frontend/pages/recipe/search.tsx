import styles from '../../styles/Home.module.css'
import { useState } from 'react';
import { DefaultLayout } from '../../components/templates/layouts/DefaultLayout';
import { RecipeCard } from '../../components/organisms/RecipeCard';
import { fetchRecipesBySearchWord } from '/apis/recipes';

const Search = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const handleSubmit = async () => {
    const res = await fetchRecipesBySearchWord(searchWord);
    const { recipes } = res;
    setSearchedRecipes(recipes);
  }

  return (
    <DefaultLayout>
      <main className={styles.main} >
        <h1 className="text-center text-4xl mb-3 font-semibold tracking-wide">
          レシピ検索
        </h1>
        <div className={styles.container} >
          <form>
            <span className="recipeSearch">
              レシピ検索</span>
            <input
              type="search"
              name="searchWord"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="料理名を入力して下さい"
              value={searchWord}
              onChange={(e) => setSearchWord(e.currentTarget.value)} />
            <div className="flex justify-center mt-3">
              <button type="button" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">検索</button>
            </div>
          </form>
          <div>
            {searchedRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      </main >
    </DefaultLayout>
  );
}
export default Search;
