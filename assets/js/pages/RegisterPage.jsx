import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import authAPI from '../services/authAPI';

const RegisterPage = ({history}) => {

    const [user, setuser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    });

    const [errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    });


    const handleChange = ({currentTarget}) => {
        // const {value, name} = currentTarget;
        const value = currentTarget.value;
        const name  = currentTarget.name;
        setuser({...user, [name]: value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const apiErrors = {};
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe"
            setErrors(apiErrors)
            return;
        }

        try {
             await authAPI.register(user)
             setErrors({})
             history.replaceState('/login')
        } catch({ response }) {
            const {violations} = response.data;
           if(violations) {
               
               violations.forEach(({propertyPath, message}) => {
                   apiErrors[propertyPath] = message;
               })
               setErrors(apiErrors);

            //  flash notification erreurs
           }
        }
    } 

    return ( 
        <>
           <h1>Inscription</h1>
           <form onSubmit={handleSubmit}>
            <Field name="firstName" label="Prenom" placeholder="Votre prenom" error={errors.firstName} value={user.firstName} onChange={handleChange}/>
            <Field name="lastName" label="nom" placeholder="Votre nom" error={errors.lastName} value={user.lastName} onChange={handleChange}/>
            <Field name="email" label="email" placeholder="Votre email" type="email" error={errors.email} value={user.email} onChange={handleChange}/>
            <Field name="password" label="mot de passe" placeholder="Votre mot de passe" type="password" error={errors.password} value={user.password} onChange={handleChange}/>
            <Field name="passwordConfirm" label="Confirmation de votre mot de passe" placeholder="Confirmez votre mot de passe" type="password" error={errors.passwordConfirm} value={user.passwordConfirm} onChange={handleChange}/>
            <div className="form-group">
                <button type="submit" className="btn btn-success">Confirmation</button>
                <Link to="/login" className="btn btn-link">J'ai déja un compte</Link>
            </div>
           </form>
        </>
    );
}
 
export default RegisterPage;