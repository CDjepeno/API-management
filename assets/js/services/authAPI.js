import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_API, USERS_API } from '../config';

/**
 * Déconnexion (suppression du token du localStorage et sur Axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Inscription 
 */
function register(user) {
    return axios
        .post(USERS_API, user)
}

/**
 * Requête HTTP d'authentification et stockage du token dans le storage sur Axios
 * @param {object} credentials 
 */
function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            // Ont stock le token dans le local storage
            window.localStorage.setItem("authToken", token);
            // Ont préviens axios qu'ont a un header pour toute nos futur requêtes HTTP
            setAxiosToken(token);
        })
}

/**
 * Positionne le token JWT sur Axios
 * @param {string} token 
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application si le token est valide
 */
function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const jwtData = jwtDecode(token)
        if(jwtData.exp > new Date().getTime() / 1000) {
            setAxiosToken(token);
        } 
    }
}

/**
 * Permet de savoir si ont est authentifier ou pas 
 * @returns boolen
 */
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const jwtData = jwtDecode(token)
        if(jwtData.exp > new Date().getTime() / 1000) {
            return true
        } 
        return false
    }
    return false
}

export default {
    authenticate, 
    logout, 
    setup,
    isAuthenticated, 
    register
}