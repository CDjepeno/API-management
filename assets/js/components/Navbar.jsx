import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import authAPI from '../services/authAPI';
import authContext from '../context/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated} = useContext(authContext);

    const handleLogout = () => {
      authAPI.logout();
      setIsAuthenticated(false);
      toast.info("Vous êtes désormais déconnecté 😅", {position: toast.POSITION.BOTTOM_CENTER.LEFT});
      history.push("/login");
    }
    return ( <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <NavLink className="navbar-brand" to="/">Corporate Management</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">Clients</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/invoices">Factures</NavLink>
        </li>
      </ul>
        <ul className="navbar-nav ml-auto">
            {(!isAuthenticated && (
              <> 
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Inscription !</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/login" className="btn btn-success mr-1">Connexion !</NavLink>
                </li>
              </> 
            )) || ( 
                <li className="nav-item">
                    <button onClick={handleLogout} href="#" className="btn btn-danger">Deconnexion !</button>
                </li>
            )}
        </ul>
    </div>
  </nav> );
}
 
export default Navbar;
