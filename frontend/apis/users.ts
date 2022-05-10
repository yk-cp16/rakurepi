import { HOSTS, ENDPOINTS } from '/consts/apis';
import { AUTH_KEY } from '/consts/auth';

export const fetchUserLogin = async (email, password) => {
    const res = await fetch(`${HOSTS.LOCAL}${ENDPOINTS.LOGIN}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const { access_token } = await res.json();
    if (!access_token) {
        return false;
    }
    localStorage.setItem(AUTH_KEY, access_token);
    return true;
};



