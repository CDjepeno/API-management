// import de react
import React, { useContext, useState } from 'react';
import ReactDOM from "react-dom";
import Navbar from './components/Navbar';
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import authAPI from './services/authAPI';
import authContext from './context/authContext';
import PrivateRoute from './components/PrivateRoute';

// import du scss
import '../styles/app.scss';
// import CustomerPageWithPagination from './pages/CustomerPageWithPagination';


authAPI.setup();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const NavbarWithRouter = withRouter(Navbar);

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    }

    return(
        <authContext.Provider value={contextValue}> 
            <HashRouter>
                <NavbarWithRouter />

                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRoute path="/invoices" isAuthenticated={isAuthenticated} component={InvoicePage}/>
                        <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomerPage}/>   
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>;
        </authContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));

