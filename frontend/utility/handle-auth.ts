import { AUTH_KEY } from "/consts/auth";

export const isAuth = () => {
    if (typeof window === 'undefined') return false;

    const accessToken = localStorage.getItem(AUTH_KEY);
    return accessToken !== null;
}