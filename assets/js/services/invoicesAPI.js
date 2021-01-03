"Use strict"
import axios from 'axios';

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/invoices")
        .then(response => response.data["hydra:member"]);
}

export default {
    findAll
}