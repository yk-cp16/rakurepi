import Link from 'next/link';
import Image from "next/image"
import { Recipe } from '../../types/recipe';
import { HOSTS } from '/consts/apis';

type RecipeCardProps = {
    recipe: Recipe
    onClickdeleteButton: (id: number) => void;
};

/**
 * レシピのカードコンポーネント
 * @param props {@link RecipeCardProps}
 */
export const UserRecipeCard = (props: RecipeCardProps) => {
    const { recipe, onClickdeleteButton } = props;
    const { id, title, image, cost } = recipe;

    const handleSubmit = () => {
        onClickdeleteButton(id);
    }

    return (
        <div className="rounded shadow overflow-hidden">
            <div className="hover:bg-gray-100 duration-300 cursor-pointer">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Link href={`/recipe/detail/${id}`}>
                        <a>
                            <Image src={`${HOSTS.LOCAL}/storage/image/${image}`} alt="cookImage" className="w-full h-full object-center object-cover group-hover:opacity-75" width={500} height={300} />
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