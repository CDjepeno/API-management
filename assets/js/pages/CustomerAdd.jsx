import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import CustomersAPI from "../Services/customersAPI";

const CustomerAdd = ({history, match}) => {

    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        lastName:"",
        firstName:"",
        email:"",
        company:""
    })

    const [errors, setErrors] = useState({
        lastName:"",
        firstName:"",
        email:"",
        company:""
    })

    const [editing, setEditing] = useState(false);

    // Récupération du customers en fonction de l'identifiant
    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company} = await  CustomersAPI.findById(id);
            setCustomer({ firstName, lastName, email, company});
        } catch (error) {
            toast.error("Impossible de récupérer le client");           
        }
    }
    
    // Chargement du customer si besion au chargement du composant ou au changement de l'identifiant
    useEffect(() => {
        if(id !== "new"){
            setEditing(true);
            fetchCustomer(id)
        } 
    }, [id])

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value})
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setErrors({});
            if(editing) {
                await CustomersAPI.putCustomer(id, customer)
                toast.success("Le client as bien été modifier");
            }else {
                await CustomersAPI.addCustomer(customer)
                toast.success("Le client as bien été crée");

                history.replace("/customers")
            }
          setErrors({})
        } catch({ response }) {
            const {violations} = response.data;
           if(violations) {
               const apiErrors = {};
               violations.forEach(({propertyPath, message}) => {
                   apiErrors[propertyPath] = message;
               })
               setErrors(apiErrors);
               toast.error("Des erreurs dans votre formulaire");           }
        }
    }

    return ( 
    <>
        {!editing ? <h1>Création d'un client</h1> : <h1>Modification d'un client</h1> }

        <form onSubmit={handleSubmit}>
            <Field onChange={handleChange} value={customer.lastName} error={errors.lastName} name="lastName" label="Nom de famille" placeholder="Nom de famille du client"/>
            <Field onChange={handleChange} value={customer.firstName} error={errors.firstName} name="firstName" label="Prénom" placeholder="Prénom du client"/>
            <Field onChange={handleChange} value={customer.email} error={errors.email} name="email" type="email" label="Email" placeholder="Email du client"/>
            <Field onChange={handleChange} value={customer.company} error={errors.company} name="company" label="Entreprise" placeholder="Entreprise du client"/>

            <div className="form-group">
                <button type="submit" className="btn btn-success">Enregister</button>
                <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
            </div>
        </form>
    </> );
}
 
export default CustomerAdd;