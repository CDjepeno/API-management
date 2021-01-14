"Use strict"
import axios from 'axios';

function findAll(){
    return axios
        .get("https://127.0.0.1:8000/api/invoices")
        .then(response => response.data["hydra:member"]);
}

function findOne(id){
    return axios
        .get("https://127.0.0.1:8000/api/invoices/" + id)
        .then(response => response.data);
}
    
function addInvoice(invoice, customer) {
    return axios
    .post("https://localhost:8000/api/invoices",{
         ...invoice, customer:`/api/customers/${invoice.customer}`
    })
    .then(response => response.data);
}

function putInvoice(id, invoice) {
    return axios
    .put("https://localhost:8000/api/invoices/" + id 
    , { 
        ...invoice, 
        customer: `/api/customers/${invoice.customer}`
    });
}

function deleteInvoice(id) {
    return axios
    .delete("https://localhost:8000/api/invoices/" + id)
}

export default {
    findAll,
    delete: deleteInvoice, 
    addInvoice, 
    findOne, 
    putInvoice
}