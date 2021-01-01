// import de react
import React from 'react';
import ReactDOM from "react-dom";


// import du scss
import './styles/app.scss';

// start the Stimulus application
// import './bootstrap';

console.log("je marche")

const App = () => {
    return <h1>Bonjour à tous !</h1>;
};

ReactDOM.render(<App />, document.getElementById("app"));

