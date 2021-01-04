import React, { useContext, useState } from 'react';
import authContext from '../context/authContext';
import authAPI from '../services/authAPI';

    const LoginPage = ({ history}) => {

        const { setIsAuthenticated } = useContext(authContext)

        const [credentials, setCredenttials] = useState({
            username: "",
            password:""
        })
    
    const [error, setError] = useState("");
    
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
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers");
        } catch (error) {
            setError("Aucun compte ne possède cette addresse ou alors les informations ne correspondent pas")
        }
    }


    return ( 
        <>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
             <div className="form-group">
                <label htmlFor="username">Adresse email</label>f
                <input 
                    type="email"
                    onChange={handleChange}
                    value={credentials.username} 
                    placeholder="Adresse email de connexion" 
                    name="username" id="username"
                    className={"form-control" + (error && " is-invalid")} 
                />
                { error && 
                    <p className="invelid-feedback">{error}</p>
                }
            </div>
             <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input 
                    type="password" 
                    onChange={handleChange} 
                    value={credentials.password} 
                    className="form-control" 
                    placeholder="Mot de passe" 
                    name="password" id="password"
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success">Je me connect</button>
            </div>
        </form>
        </> 
    );
}
 
export default LoginPage;