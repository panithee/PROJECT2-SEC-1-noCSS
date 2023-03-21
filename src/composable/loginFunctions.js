const checkUsernameExists = async (username) => {
    if (username === undefined) { return false; }
    username = String(username).toLowerCase();
    console.log('4: checkUsernameExists ' + username);
    const response = await fetch(`http://localhost:5000/users?username=${username}`);
    console.log(`5: ${response} HI`);
    const user = await response.json();
    console.log(user);
    console.log("6: user.length :" + user.length);
    const check = user.length > 0;
    return check;
}

const registerUser = async (username, password) => {
    if (username === undefined || password === undefined) { return false; }
    username = String(username).toLowerCase();
    const check = await checkUsernameExists(username);
    if (check) { return "Error Cannot Register"; }
    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
            'groups': [],
            'key': ''
        })
    });
    const user = await response.json();
    return user;
}
const loginUser = async (username, password) => {
    if (username === undefined || password === undefined) { return "Error Input"; }
    console.log('2:loginUser ' + username);
    username = String(username).toLowerCase();
    console.log('3: loginUser ' + username);
    const check = await checkUsernameExists(username);
    console.log(`7:check completed`);
    if (check) {
        console.log(`---> ${check}`);
        console.log(check + username);
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await response.json();
        console.log(user);
        if (user[0].password.localeCompare(password) === 0) {
            const key = generateRandomId(5);
            // update key 
            await fetch(`http://localhost:5000/users/${user[0].id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'key': key
                })
            });
            console.log("password matches");
            sessionStorage.setItem('key', key);
            sessionStorage.setItem('username', user[0].username);
            console.log(user[0].username + " is logged in");
            return user[0].username;
        }
        return "Error: 401"
    }
    return "Error: 404"
}
const getUserGroups = async (username) => {
    try {
        const resp = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await resp.json();
        console.log(username);
        if (user.length === 0) {
            return ' ';
        }
        return user[0].groups;
    }
    catch (e) {
        console.log(e);
    }
}
function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
const findKey = async (username) => {
    const response = await fetch(`http://localhost:5000/users?username=${username}`);
    const user = await response.json();
    return user[0].key;
}
const updateGroups = async (username, groups) => {
    const response = await fetch(`http://localhost:5000/users?username=${username}`);
    const user = await response.json();
    await fetch(`http://localhost:5000/users/${user[0].id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'groups': groups
        })
    });
}

export { checkUsernameExists, registerUser, loginUser, getUserGroups, findKey };