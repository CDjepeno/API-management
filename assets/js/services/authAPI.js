"Use Strict"
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// 
/**
 * Déconnexion (suppression du token du localStorage et sur Axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Requête HTTP d'authentification et stockage du token dans le storage sur Axios
 * @param {object} credentials 
 */
function authenticate(credentials) {
    return axios
    .post("https://127.0.0.1:8000/api/login_check", credentials)
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
 * Mise en place lors du chargement de l'application
 */
function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token) {
        const jwtData = jwtDecode(token)
        if(jwtData.exp > new Date().getTime() / 1000) {
            axios.defaults.headers["Authorization"] = "Bearer " + token;
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
    isAuthenticated
}