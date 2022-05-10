import { useRouter } from "next/router";
import { AUTH_KEY } from "/consts/auth";

export const useAuth = () => {
    const router = useRouter();
    const onClickLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        localStorage.removeItem(AUTH_KEY);
        router.push('/recipe');
    }
    return { onClickLogout }
}