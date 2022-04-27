import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { UserDefaultLayout } from '../../components/templates/layouts/UserDefaultLayout';
import { useRouter } from 'next/router';
import { fetchUserLogin } from '../../apis/users';
import { createRecipe } from '/apis/recipes';

type InputIngredient = {
    name: string;
    amount: string;
};

const UserRecipeCreate = () => {
    const [recipeImagePath, setRecipeImagePath] = useState('選択されていません');
    const [imageFile, setImageFile] = useState('');
    const [cost, setCost] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const initInputIngredients = [
        { name: '', amount: '' },
        { name: '', amount: '' },
        { name: '', amount: '' },
    ];

    const [inputIngredients, setInputIngredients] = useState<InputIngredient[]>(initInputIngredients);

    const router = useRouter();
    // const numbers = [1, 2, 3];
    // const numbers2 = [4, 5, 6];
    // ...numbers => 1, 2, 3
    // [...numbers] => [1, 2, 3]
    // [...numbers, ...numbers2] => [1, 2, 3, 4, 5, 6]
    // [0, ...numbers] => [0, 1, 2, 3]

    const onChangeIngredientName = (index: number) => {
        return (event) => {
            const ingredients = [...inputIngredients];
            ingredients[index]['name'] = event.currentTarget.value;
            setInputIngredients(ingredients);
        }
    };

    const onChangeIngredientAmount = (index: number) => {
        return (event) => {
            const ingredients = [...inputIngredients];
            ingredients[index]['amount'] = event.currentTarget.value;
            setInputIngredients(ingredients);
        }
    };

    const onClickAddIngredient = () => {
        const ingredients = [...inputIngredients];
        ingredients.push({ name: '', amount: '' });
        setInputIngredients(ingredients);
    }

    useEffect(() => {
        (async () => {
            // 重複を防ぐ
            const email = 'yu375zit@gmail.com';
            const password = 'a529gjs8int';
            const loginRes = await fetchUserLogin(email, password);
            console.log('loginRes', loginRes);
            const { access_token } = loginRes;
            setAccessToken(access_token);
        })()
    }, []);

    const handleSubmit = async () => {
        setIsUpdating(true);
        const ingredients = inputIngredients.filter(({ name, amount }) => {
            return name !== '' && amount !== ''
        });
        // console.log('title', title);
        const res = await createRecipe({
            title, description, imageFile, cost, accessToken, ingredients,
        });

        if (res.response == false) {
            return <div>保存できていません...</div>;
        } router.push('/user');

        alert('レシピ新規作成しました。');
        setIsUpdating(false);
    }

    const handleChangeFile = (e: any) => {
        setImageFile(e.target.files[0]);
        console.log('e.target.files[0]', e.target.files[0]);
    };

    return (
        <UserDefaultLayout>
            <h1 className="text-center text-4xl mt-6 mb-3 font-semibold tracking-wider">
                レシピ新規投稿
            </h1>
            <div className="flex justify-center">
                <div>
                    <form>
                        <div className="form-group row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">
                                画像必須:
                            </label>
                            <div className="col-md-6">
                                <input type="file" name="file" className="form-control-file" accept="image/*" onChange={handleChangeFile} />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">金額</label>
                            <div className="col-md-6">
                                <input type="number" name="cost" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" placeholder="数字のみ記載" required value={cost} onChange={(e) => setCost(e.currentTarget.value)} />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">タイトル</label>
                            <div className="col-md-6">
                                <input type="text" name="title" className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50" required value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label className="col-form-label text-md-right">
                                材料・数量(1人分)
                            </label>
                            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1/2 px-1 rounded" onClick={onClickAddIngredient}>
                                ＋
                            </button>
                            {inputIngredients.map(({ name, amount }, index) => (
                                <div key={index}>
                                    <div className="flex form-group">
                                        <div className="col-md-3">
                                            <input type="text" name="ingredients[index][name]" className="py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50 m-1" placeholder="材料名入力" value={name} onChange={onChangeIngredientName(index)} />
                                        </div>
                                        <div className="col-md-6">
                                            <input type='text' name='ingredients[index][amount]' className="py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50 m-1" placeholder="数量入力(単位まで)" value={amount} onChange={onChangeIngredientAmount(index)} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="form-group row mb-3">
                            <label className="col-md-4 col-form-label text-md-right">内容</label>
                            <div className="col-md-6">
                                <textarea name="description" rows={5} className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
                                    placeholder="箇条書き入力" required value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
                            </div>
                        </div>
                        {isUpdating ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="text-center mb-6">
                                <button type='button' onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">作成
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div >
        </UserDefaultLayout >
    );
}

export default UserRecipeCreate;