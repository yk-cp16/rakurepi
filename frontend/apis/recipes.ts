import { HOSTS, ENDPOINTS } from '/consts/apis';


// TODO: 他のAPI処理をこのファイルに移す

export const fetchRecipesBySearchWord = async (searchWord: string) => {
    // console.log('searchWord', searchWord);
    const fetchRes = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.SEARCH_RECIPE}${searchWord}`);
    console.log('fetchRes', fetchRes);
    return fetchRes.json();
};


export const fetchRecipeByRecipeId = async (recipe_id) => {
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.RECIPE_DETAIL}${recipe_id}`);
    return res;
}

export const fetchRecipesIndex = async () => {
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.RECIPE}`);
    return res.json();
}

export const fetchRecipesByRanking = async () => {
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.RANKING_RECIPE}`);
    return res.json();
}


export const fetchMyRecipes = async (accessToken) => {
    // console.log('accessToken', accessToken);

    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_RECIPE}`, {
        method: 'GET',
        // credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    console.log('res', res);
    return await res.json();
}

export const fetchRecipes = async (accessToken) => {
    // console.log('accessToken', accessToken);

    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.RECIPE}`, {
        method: 'GET',
        // credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    console.log('res', res);
    return await res.json();
}

export const createRecipe = async (props) => {
    const { title, description, imageFile, cost, accessToken, ingredients } = props;
    console.log('title', title);

    const url = `${HOSTS.LOCAL}${ENDPOINTS.USER_CREATE_RECIPE}`;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);
    formData.append('cost', cost);
    ingredients.forEach(({ name, amount }, i) => {
        formData.append(`ingredients[${i}][name]`, name);
        formData.append(`ingredients[${i}][amount]`, amount);
    })
    const res = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                "X-HTTP-Method-Override": "POST",
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        }
    );
    return res.json();
};

type EditRecipeProps = {
    id: number;
    accessToken: string;
}

export const editRecipe = async (props: EditRecipeProps) => {
    const { id, accessToken } = props;
    console.log('recipeId_after', id);

    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_EDIT_RECIPE}${id
        }`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });
    console.log('headerRes', res);

    return res.json();
}

export const updateRecipe = async (props) => {
    const { id, title, description, imageFile, cost, accessToken, ingredients } = props;
    // console.log('props', props);

    const url = `${HOSTS.LOCAL}${ENDPOINTS.USER_UPDATE_RECIPE}`;
    // const ingredientsLoop = filteredInputIngredients.length;
    console.log('url', url);

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);
    formData.append('cost', cost);
    ingredients.forEach(({ name, amount }, i) => {
        formData.append(`ingredients[${i}][name]`, name);
        formData.append(`ingredients[${i}][amount]`, amount);
    })
    const res = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                "X-HTTP-Method-Override": "PUT",
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: formData
        }
    );
    console.log('updateRes2', res);
    return res.json();
};

// お気に入りレシピ一覧
export const fetchUserFavorite = async (accessToken) => {
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_RECIPE_FAVORITE
        }`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    console.log('res', res);
    return res.json();
}

// お気に入り追加
export const favoriteRecipe = async (props) => {
    const { id, accessToken } = props;
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_RECIPE_FAVORITE
        }`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ recipe_id: id }),
    });
    return res.json();
}

// お気に入り解除
export const unfavoriteRecipe = async (props) => {
    const { id, accessToken } = props;
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_RECIPE_FAVORITE
        }`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "X-HTTP-Method-Override": "DELETE",
            'Content-Type': 'application/json; charset=utf8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ recipe_id: id }),
    });
    return res.json();
}


export const deleteRecipe = async (props) => {
    const { id, accessToken } = props;
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_DELETE_RECIPE
        }`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf8',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ id }),
    });
    return res.json();
}
