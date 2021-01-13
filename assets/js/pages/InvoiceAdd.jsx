import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import customersAPI from '../Services/customersAPI';
import invoicesAPI from '../services/invoicesAPI';

const InvoiceAdd = ({ history, match }) => {

    const { id = "new" } = match.params
    
    const [invoice, setInvoice] = useState({
        amount:"",
        customer:"",
        status:"SENT"
    });
    
    const [errors, setErrors] = useState({
        amount: "",
        customer:"",
        status:""
    })

    const [customers, setCustomers] = useState([]);

    const [editing, setEditing] = useState(false);

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({...invoice, [name]: value});
    }

    // Récupération des customers 
    const fetchCustomers = async () => {
        try {
            const customers  = await customersAPI.findAll();
            setCustomers(customers);
            
            // if(id === "new"){
                if(!invoice.customer) setInvoice({ ...invoice, customer: customers[0].id })
            // }
                        
        } catch(error) {
            history.replace("/customers")
        }
    }

     // Récupération de la facture en fonction de l'identifiant
     const fetchInvoice = async id => {
        try {
            const data  = await invoicesAPI.findOne(id);

            const { amount, status, customer } = data;
            
            setInvoice({amount, status, customer: customer.id});

        } catch (error) {
           
            console.log(error.response)
            // notif flash
            // history.replace("/customers")
        }
    }

    // Au chargement du composant ont va chercher les customers
    useEffect(() => {
        if(id !== "new"){
            setEditing(true)
            fetchInvoice(id)
        } 
    }, [id]);
    
    useEffect(() => {
        // if(id === "new"){
            fetchCustomers()
        // }
    },[])

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(editing)
        try {     
            // const response = await invoicesAPI.addInvoice(invoice,customer)
            const respons = await axios.post("https://127.0.0.1:8000/api/invoices/",{...invoice, customer:`/api/customers/${invoice.customer}`})
            console.log(respons)
            history.replace("/invoices")
            setErrors({})
        } catch(error) {
            console.log()
        }
        // catch({ response }) {            
            
        //     const violations = response.data['violations'];
            
        //     if(violations) {
        //         const apiErrors = {};
        //         violations.forEach(({propertyPath, message}) => {
        //             apiErrors[propertyPath] = message;
        //         })
        //         setErrors(apiErrors); 
        // }
    // }
    //  flash notification erreurs
    }

    return ( 
    <>
        {editing && <h1>Modification d'une facture</h1> || <h1>Création d'une facture</h1> } 

        <form onSubmit={handleSubmit}>
            <Field name="amount" type="number" label="Montant" placeholder="Montant de la facture" onChange={handleChange} value={invoice.amount} error={errors.amount} />

            <Select name="customer" label="Client" value={invoice.customer} error={errors.customer} onChange={handleChange}> 
                {customers.map(customer => 
                    <option key={customer.id} value={customer.id}> 
                        {customer.firstName} {customer.lastName}  
                    </option>
                )}
            </Select>

            <Select name="status" label="Status" value={invoice.status} error={errors.status} onChange={handleChange}> 
                <option value="SENT">Envoyée</option>
                <option value="PAID">Payée</option>
                <option value="CANCELLED">Annulée</option>
            </Select>

            <div className="form-group ">
                <button type="submit" className="btn btn-success">
                    Enregister
                </button>
                <Link to="/invoices" className="btn btn-link">Retour au factures</Link>
            </div>
        </form>
    </> 
    );
}
 
export default InvoiceAdd;