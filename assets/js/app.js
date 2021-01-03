// import de react
import React from 'react';
import ReactDOM from "react-dom";
import Navbar from './components/Navbar';
import { HashRouter, Switch, Route } from "react-router-dom";


// import du scss
import '../styles/app.scss';
import HomePage from './pages/HomePage';
import CustomerPage from './pages/CustomerPage';
import InvoicePage from './pages/InvoicesPage';
// import CustomerPageWithPagination from './pages/CustomerPageWithPagination';

// start the Stimulus application
// import './bootstrap';

console.log("je marche")

const App = () => {
    return <HashRouter>
        <Navbar />

        <main className="container pt-5">
            <Switch>
                <Route path="/invoices" component={InvoicePage} />
                <Route path="/customers" component={CustomerPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>
    </HashRouter>;
};

ReactDOM.render(<App />, document.getElementById("app"));

