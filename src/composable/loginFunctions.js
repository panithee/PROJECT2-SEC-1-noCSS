const checkUsernameIsAlready = async (username) => {
    if (username === undefined) { return false; }
    username = String(username).toLowerCase();
    console.log('4: checkUsernameIsAlready ' + username);
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
    const response = await fetch('http://localhost:5000/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
            'groups': []
        })
    });
    const user = await response.json();
    return user;
}
const userLogin = async (username, password) => {
    if (username === undefined || password === undefined) { return false; }
    console.log('2:userLogin ' + username);
    username = String(username).toLowerCase();
    console.log('3: userLogin ' + username);
    const check = await checkUsernameIsAlready(username);
    console.log(`7:check completed`);
    if (check) {
        console.log(`---> ${check}`);
        console.log(check + username);
        const response = await fetch(`http://localhost:5000/users?username=${username}`);
        const user = await response.json();
        console.log(user);
        if (user[0].password.localeCompare(password) === 0) {
            const key = makeId(5);
            // update key 
            const response = await fetch(`http://localhost:5000/users/${user[0].id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'key': key
                })
            });

            localStorage.setItem('key', key);
            localStorage.setItem('username', user[0].username);
            console.log(user[0].username + " is logged in");
            return user[0].username;
        }
        return "Error: 401"
    }
    return "Error: 404"
}
const getUsernameNow = async (username) => {
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
function makeId(length) {
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
export { checkUsernameIsAlready, registerUser, userLogin, getUsernameNow, findKey };