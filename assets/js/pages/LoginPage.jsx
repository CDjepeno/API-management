import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import authContext from '../context/authContext';
import authAPI from '../services/authAPI';
import 'react-toastify/dist/ReactToastify.css';

    const LoginPage = ({ history }) => {

        const [error, setError]             = useState("");
        const [credentials, setCredentials] = useState({
            username: "",
            password:""
        })
        
        const { setIsAuthenticated } = useContext(authContext)
    
    
    // Gestion des champs du formulaire
    const handleChange = ({currentTarget}) => {
        // const {value, name} = currentTarget;
        const value = currentTarget.value;
        const name  = currentTarget.name;
        setCredentials({...credentials, [name]: value});
    }

    // Gestion du submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await authAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecter");
            history.replace("/customers");
        } catch (error) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas")
            toast.error("Une erreur est survenue");
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