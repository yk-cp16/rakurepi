import Link from 'next/link';
import Image from "next/image"
import { Recipe } from '../../types/recipe';
import { useState, useEffect } from 'react';
import { fetchUserLogin } from '../../apis/users';
import { useRouter } from 'next/router';
import { deleteRecipe } from '/apis/recipes';

type RecipeCardProps = {
    recipe: Recipe
    onClickdeleteButton: (id: number) => void;
};

/**
 * レシピのカードコンポーネント
 * @param props {@link RecipeCardProps}
 */
export const UserRecipeCard = (props: RecipeCardProps) => {

    const [accessToken, setAccessToken] = useState('');
    const router = useRouter();

    const { recipe, onClickdeleteButton } = props;
    // console.log('onClickdeleteButton', onClickdeleteButton);
    const { id, title, image, cost } = recipe;

    useEffect(() => {
        (async () => {
            console.log('recipe', recipe);
            if (!recipe) return;
            const email = 'yu375zit@gmail.com';
            const password = 'a529gjs8int';
            const loginRes = await fetchUserLogin(email, password);
            const { access_token } = loginRes;
            setAccessToken(access_token);
        })()
    }, []);

    const handleSubmit = () => {
        onClickdeleteButton(id);
        location.reload();
    }


    return (
        <div className="rounded shadow overflow-hidden">
            <div className="hover:bg-gray-100 duration-300 cursor-pointer">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Link href={`/recipe/detail/${id}`}>
                        <a>
                            <Image src={`http://localhost:8000/storage/image/${image}`} alt="cookImage" className="w-full h-full object-center object-cover group-hover:opacity-75" width={500} height={300} />
                            <div className=" flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <p className="mt-1 text-lg font-medium text-gray-900 font-semibold tracking-wider">
                                            レシピ名:{title}
                                        </p>
                                    </h3>
                                </div>
                                <p className="text-lg font-medium text-gray-900">{cost}円(1人分)</p>
                            </div>
                        </a>
                    </Link>
                    <div className="flex flex-row-reverse">
                        <form>
                            <button type='button' onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded m-1">削除
                            </button>
                        </form>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded m-1">
                            <Link href={`/user/edit/${id}`}>
                                <a>編集</a>
                            </Link>
                        </button>
                    </div>
                </div>
            </div >
        </div >

    );
}