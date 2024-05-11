import Axios from './_caller.service';

let login = (credentials) => {
    return Axios.post('/login', {
        email: credentials.email,
        password: credentials.password
    });
}

let register = (credentials) => {
    return Axios.post('/register', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.password_confirmation
    });
}

let logout = () => {
    return Axios.post('/logout');
}

let getUser = () => {
    return Axios.get('/me');
}

let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let getToken = () => {
    return localStorage.getItem('token');
}

let removeToken = () => {
    localStorage.removeItem('token');
}

let isLoggedIn = () => {
    return localStorage.getItem('token') !== null;
}

export const accountService = {
    login,
    register,
    logout,
    getUser,
    saveToken,
    getToken,
    removeToken,
    isLoggedIn
};
