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
    return res.json();
};



