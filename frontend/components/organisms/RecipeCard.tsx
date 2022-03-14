import Link from 'next/link';
import Image from "next/image"
import { useState, useEffect } from 'react';
import { Recipe } from '../../types/recipe';
import { favoriteRecipe } from '/apis/recipes';


type RecipeCardProps = {
    recipe: Recipe;
    onClickFavoriteButton: (id: number, isFavorite: boolean) => void;
};

/**
 * レシピのカードコンポーネント
 * @param props {@link RecipeCardProps}
 */

export const RecipeCard = (props: RecipeCardProps) => {
    // console.log('props', props);
    // const router = useRouter();

    const { recipe, onClickFavoriteButton } = props;

    // console.log('onClickfavoriteButton', onClickfavoriteButton);
    console.log('recipe', recipe);
    const { id, title, image, cost, isFavorite } = recipe;

    const handleSubmit = () => {
        onClickFavoriteButton(id, isFavorite);
    }
    return (
        <div className="rounded shadow overflow-hidden">
            <div className="hover:bg-gray-100 duration-300 cursor-pointer">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Link href={`/recipe/detail/${id}`}>
                        <a>
                            <div>
                                <Image src={`http://localhost:8000/storage/image/${image}`} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="w-full h-full object-center object-cover group-hover:opacity-75" width={400} height={300} />
                            </div>
                        </a>
                    </Link>
                    <div className="p-2">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <p className="mt-1 text-lg font-medium text-gray-900 font-semibold tracking-wider">
                                        レシピ名:{title}
                                    </p>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">作成者：{recipe.user.name}さん</p>
                            </div>
                            <p className="text-lg font-medium text-gray-900">{cost}円(1人分)</p>
                        </div>
                        <form>
                            <div className="text-right mr-1">
                                {isFavorite === false ?
                                    <button type='button' onClick={handleSubmit}
                                        className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4">お気に入り
                                    </button>
                                    :
                                    <button type='button' onClick={handleSubmit}
                                        className="bg-blue-500 hover:bg-blue-700 text-white rounded-full py-2 px-4">お気に入り解除
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}