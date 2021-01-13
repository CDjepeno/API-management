import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/customers")
        .then(response => (response.data['hydra:member']));
}

function findById(id) {
    return axios
        .get("https://localhost:8000/api/customers/" + id)
        .then(response => response.data)
        .catch(error => error.response)
}

function deleteCustomer(id) {
    return axios
       .delete("https://localhost:8000/api/customers/" + id)
}

function addCustomer(customer) {
    return axios
       .post("https://localhost:8000/api/customers" , customer)
}

function putCustomer(id,customer) {
    return axios
    .put("https://localhost:8000/api/customers/" + id, customer)
}

export default {
    findAll,
    delete: deleteCustomer,
    addCustomer,
    findById,
    putCustomer
}