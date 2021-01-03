import React from 'react';

const Navbar = (props) => {
    return ( <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Corporate Management</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">Clients</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Factures</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li>
      </ul>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a href="#" className="nav-link">Inscription !</a>
            </li>
            <li className="nav-item">
                <a href="#" className="btn btn-success mr-1">Connexion !</a>
            </li>
            <li className="nav-item">
                <a href="#" className="btn btn-danger">Deconnexion !</a>
            </li>
        </ul>
    </div>
  </nav> );
}
 
export default Navbar;
