import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import customersAPI from '../Services/customersAPI';
import invoicesAPI from '../services/invoicesAPI';

const InvoiceAdd = ({ history, match }) => {

    const { id = "new" } = match.params
    
    const [invoice, setInvoice] = useState({
        amount:"",
        customer:"",
        // Ont donne par defaut le status a sent pour ne pas avoir quelque chose de vide quand le l'utilisateur ne selectionne rien.
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

    // Récupération des client 
    const fetchCustomers = async () => {
        try {
            const customers  = await customersAPI.findAll();
            setCustomers(customers);
            
            // Dans le cas ou l'utilidateur n'a pas choisi de client ont lui donne le premier client qu'ont as charger 
            if(!invoice.customer) setInvoice({ ...invoice, customer: customers[0].id })
                        
        } catch(error) {
            toast.erro("Impossible de charger les clients");
            history.replace("/invoices")
        }
    }

     // Récupération de la facture en fonction de l'identifiant
     const fetchInvoice = async id => {
        try {
            const { amount, status, customer }  = await invoicesAPI.findOne(id);
            setInvoice({ amount, status, customer: customer.id });   
        } catch (error) {
            console.log(error.response)
            toast.error("Une erreure est survenue lors de la récupération de la facture");
            history.replace("/invoices")
        }
    }

    // Au chargement du composant ont va chercher les customers
    useEffect(() => {
        fetchCustomers()
    },[])

    // Au chargement du composant si id est un nombre récupération de la bonne facture
    useEffect(() => {
        if(id !== "new"){
            setEditing(true)
            fetchInvoice(id)
        } 
    }, [id]);
    

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(invoice)

        try {     
            if(editing) {
                await invoicesAPI.putInvoice(id, invoice)
                toast.success("La facture a  bien été modifier");
                history.replace("/invoices")
            } else {
                await invoicesAPI.addInvoice(invoice,customer)
                history.replace("/invoices")
                toast.success("La facture a bien été ajouter");
                setErrors({})

            }
        } catch({ response }) {            
            const violations = response.data['violations'];
            
            if(violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })
                setErrors(apiErrors); 
                toast.error("Des erreurs dans votre formulaire");           
            }
        }
        
    
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