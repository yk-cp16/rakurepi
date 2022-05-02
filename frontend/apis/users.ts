import { HOSTS, ENDPOINTS } from '/consts/apis';

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
    localStorage.setItem('auth', access_token);
    return true;
};



