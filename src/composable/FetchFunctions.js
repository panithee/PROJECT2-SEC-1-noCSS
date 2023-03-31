import {generateRandomId} from "./generateKey";

const checkUsernameExists = async (username) => {
    if (username === undefined) {
        return "Error Input";
    }
    username = String(username).toLowerCase();
    try {
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await response.json();
        if (user.length > 0) {
            return "Username Exists";
        }
        return "Not Exists";
    } catch (e) {
        console.log(e);
    }

}
const registerUser = async (username, password) => {
    if (username === undefined || password === undefined) {
        return "Error Input";
    }
    username = String(username).toLowerCase();
    const check = await checkUsernameExists(username);
    if (check === "Username Exists") {
        return "Error Cannot Register";
    }
    try {
        const response = await fetch('http://localhost:5000/users', {
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
}
const loginUser = async (username, password) => {
    if (username === undefined || password === undefined) {
        return "Error Input";
    }
    username = String(username).toLowerCase();
    try {
        const check = await checkUsernameExists(username);
        if (check === "Not Exists") {
            return check;
        }
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await response.json();
        if (user[0].password.localeCompare(password) === 0) {
            const key = generateRandomId(5);
            // update key
            await fetch(`http://localhost:5000/users/${user[0].id}`, {
                method: 'PATCH', headers: {
                    'Content-Type': 'application/json'

                }, body: JSON.stringify({
                    'key': key
                })
            });
            sessionStorage.setItem('key', key);
            sessionStorage.setItem('username', user[0].username);
            return user[0].username;
        }
        return "failed to login";
    } catch (e) {
        console.log(e);
    }
}
const getUserGroups = async (username) => {
    if (username === undefined) {
        return "Error Input";
    }
    try {
        const resp = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await resp.json();
        if (user.length === 0) {
            return ' ';
        }
        return user[0].groups;
    } catch (e) {
        console.log(e);
    }
}
const findKey = async (username) => {
    if (username === undefined) {
        return "Error Input";
    }
    try {
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await response.json();
        return user[0].key;
    } catch (e) {
        console.log(e);
    }
}
const checkKey = async (username, key) => {
    if (username === undefined || key === undefined) {
        return "Error Input";
    }
    try {
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await response.json();
        return user[0].key.localeCompare(key) === 0;
    } catch (e) {
        console.log(e);
    }
}
const updateGroups = async (username, groups) => {
    if (username === undefined || groups === undefined) {
        return "Error Input";
    }
    try {
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        if (!response.ok) {
            return "Error: 404";
        }
        if (await checkKey(username, sessionStorage.getItem('key')) === false) {
            return "Error: 403";
        }
        const user = await response.json();
        const res = await fetch(`http://localhost:5000/users/${user[0].id}`, {
            method: 'PATCH', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                'groups': groups
            })
        });
        if (res.ok) {
            return "Success Update Groups";
        }
        return "failed to update groups";
    } catch (e) {
        console.log(e);
    }
}
export {checkUsernameExists, registerUser, loginUser, getUserGroups, findKey, updateGroups};

