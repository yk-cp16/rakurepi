export const HOSTS = {
    LOCAL: 'http://127.0.0.1:8000'
} as const;

export const ENDPOINTS = {
    SEARCH_RECIPE: '/api/recipe/search/',
    RECIPE_DETAIL: '/api/recipe/detail/',
    RECIPE: '/api/recipe/',
    RANKING_RECIPE: '/api/recipe/ranking',
    LOGIN: '/api/auth/login',
    USER_RECIPE: '/api/user/recipe',
    USER_RECIPE_FAVORITE: '/api/user/recipe/favorite',
    USER_CREATE_RECIPE: '/api/user/recipe/store',
    USER_EDIT_RECIPE: '/api/user/recipe/edit/',
    USER_UPDATE_RECIPE: '/api/user/recipe/update',
    USER_DELETE_RECIPE: '/api/user/recipe/delete'
} as const;
