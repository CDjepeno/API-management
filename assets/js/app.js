// import du scss
import React, { useState } from 'react';
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
import CustomerAdd from './pages/CustomerAdd';
import InvoiceAdd from './pages/InvoiceAdd';
import RegisterPage from './pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '../styles/app.scss';
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
    <>
        <authContext.Provider value={contextValue}> 
            <HashRouter>
                <NavbarWithRouter />

                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <PrivateRoute path="/invoices/:id" component={InvoiceAdd}/>
                        <PrivateRoute path="/customers/:id" component={CustomerAdd}/>
                        <PrivateRoute path="/invoices" component={InvoicePage}/>
                        <PrivateRoute path="/customers" component={CustomerPage}/>   
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer />

        </authContext.Provider>
    </>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));

