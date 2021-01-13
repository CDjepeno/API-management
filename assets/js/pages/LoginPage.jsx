import React, { useContext, useState } from 'react';
import Field from '../components/forms/Field';
import authContext from '../context/authContext';
import authAPI from '../services/authAPI';

    const LoginPage = ({ history }) => {

        const [error, setError]              = useState("");
        const [credentials, setCredenttials] = useState({
            username: "",
            password:""
        })
        
        const { setIsAuthenticated } = useContext(authContext)
    
    
    // Gestion des champs du formulaire
    const handleChange = ({currentTarget}) => {
        // const {value, name} = currentTarget;
        const value = currentTarget.value;
        const name  = currentTarget.name;

        setCredenttials({...credentials, [name]: value});
    }

    // Gestion du submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await authAPI.authenticate(credentials);
            setIsAuthenticated(true);
            setError("");
            history.replace("/customers");
        } catch (error) {
            setError("Aucun compte ne possède cette addresse ou alors les informations ne correspondent pas")
        }
    }

    return ( 
    <>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
            <Field label="Adresse email" 
                   name="username" 
                   value={credentials.username} 
                   onChange={handleChange}
                   placeholder="Adresse email de connexion"
                   error={error}
            />
            <Field label="Mot de passe" 
                   name="password" 
                   value={credentials.password} 
                   onChange={handleChange}
                   error=""
                   type="password"
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Je me connect</button>
            </div>
        </form>
    </> 
    );
}
 
export default LoginPage;