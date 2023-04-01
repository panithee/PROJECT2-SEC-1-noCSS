import { generateRandomId } from "./generateKey";

const URL_API = "http://localhost:5000";
const ERR_INPUT = "Error Input";
const ERR_REGISTRATION = "Error Cannot Register";
const ERR_LOGIN = "failed to login";
const ERR_NOTFOUND = "Error: 404";
const ERR_FORBIDDEN = "Error: 403";
const SUCCESS_UPDATE_GROUPS = "Success Update Groups";
const FAILED_UPDATE_GROUPS = "failed to update groups";
const checkUsernameExists = async (username) => {
    if (username === undefined) {
        return ERR_INPUT;
    }
    username = String(username).toLowerCase();
    try {
        const response = await fetch(`${URL_API}/users?username=${username}`);
        const user = await response.json();
        return user.length > 0 ? "Username Exists" : "Not Exists";
    } catch (e) {
        console.log(e);

    }
};
const registerUser = async (username, password) => {
    if (username === undefined || password === undefined) {
        return ERR_INPUT;
    }
    username = String(username).toLowerCase();
    const check = await checkUsernameExists(username);
    if (check === "Username Exists") {
        return ERR_REGISTRATION;
    }
    try {
        const response = await fetch(`${URL_API}/users`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'username': username, 'password': password, 'groups': [], 'key': ''
            })
        });
        return await response.json();
    } catch (e) {
        console.log(e);
    }
};
const loginUser = async (username, password) => {
    if (username === undefined || password === undefined) {
        return ERR_INPUT;
    }
    username = String(username).toLowerCase();
    const check = await checkUsernameExists(username);
    if (check === "Not Exists") {
        return check;
    }
    try {
        const response = await fetch(`${URL_API}/users?username=${username}`);
        const user = await response.json();
        if (user[0].password.localeCompare(password) !== 0) {
            return ERR_LOGIN;
        }
        const key = generateRandomId(5);
        await fetch(`${URL_API}/users/${user[0].id}`, {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'key': key
            })
        });
        sessionStorage.setItem('key', key);
        sessionStorage.setItem('username', user[0].username);
        return user[0].username;
    } catch (e) {
        console.log(e);
    }
};
const getUserGroups = async (username) => {
    if (username === undefined) {
        return ERR_INPUT;
    }
    try {
        const resp = await fetch(`${URL_API}/users?username=${username}`);
        const user = await resp.json();
        return user.length > 0 ? user[0].groups : '';
    } catch (e) {
        console.log(e);
    }
};

const findKey = async (username) => {
    if (username === undefined) {
        return ERR_INPUT;
    }
    try {
        const response = await fetch(`${URL_API}/users?username=${username}`);
        const user = await response.json();
        return user[0].key;
    } catch (e) {
        console.log(e);
    }
}
const checkKey = async (username, key) => {
    if (username === undefined || key === undefined) {
        return ERR_INPUT;
    }
    try {
        const response = await fetch(`${URL_API}/users?username=${username}`);
        const user = await response.json();
        return user[0].key.localeCompare(key) === 0;
    } catch (e) {
        console.log(e);
    }
}
const updateGroups = async (username, groups) => {
    if (username === undefined || groups === undefined) {
        return ERR_INPUT;
    }
    try {
        const response = await fetch(`${URL_API}/users?username=${username}`);
        if (!response.ok) {
            return ERR_NOTFOUND;
        }
        if (await checkKey(username, sessionStorage.getItem('key')) === false) {
            return ERR_FORBIDDEN;
        }
        const user = await response.json();
        const res = await fetch(`${URL_API}/users/${user[0].id}`, {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'groups': groups
            })
        });
        if (res.ok) {
            return SUCCESS_UPDATE_GROUPS;
        }
        return FAILED_UPDATE_GROUPS;
    } catch (e) {
        console.log(e);
    }
}
export { checkUsernameExists, registerUser, loginUser, getUserGroups, findKey, updateGroups };

