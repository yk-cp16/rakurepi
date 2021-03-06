import { HOSTS, ENDPOINTS } from '/consts/apis';

export const fetchRecipesBySearchWord = async (searchWord: string) => {
    const fetchRes = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.SEARCH_RECIPE}/${searchWord}`);
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

export const fetchMyRecipes = async () => {
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_RECIPE}`, {
        method: 'GET',
        // credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return await res.json();
}

export const fetchRecipes = async () => {
    const accessToken = localStorage.getItem('auth');
    const headers = {
        'Accept': 'application/json',
    }
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.RECIPE}`, {
        method: 'GET',
        headers
    });
    return res.json();
}

export const createRecipe = async (props) => {
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const { title, description, imageFile, cost, ingredients } = props;
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
}

export const editRecipe = async (props: EditRecipeProps) => {
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const { id } = props;
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_EDIT_RECIPE}${id
        }`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });
    return res.json();
}

export const updateRecipe = async (props) => {
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const { id, title, description, imageFile, cost, ingredients } = props;
    const url = `${HOSTS.LOCAL}${ENDPOINTS.USER_UPDATE_RECIPE}`;
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
    return res.json();
};

// ??????????????????????????????
export const fetchUserFavorite = async () => {
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.USER_RECIPE_FAVORITE
        }`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return res.json();
}

// ?????????????????????
export const favoriteRecipe = async (props) => {
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const { id } = props;
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

// ?????????????????????
export const unfavoriteRecipe = async (props) => {
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const { id } = props;
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
    const accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        return;
    }
    const { id } = props;
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