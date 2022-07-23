import React from 'react';
import { Route, Switch, Router, Link } from "react-router-dom"

import "./static/css/bootstrap.min.css"
import "./static/css/bootstrap-datetimepicker.min.css"
import "./static/css/select2.min.css"
import "./static/css/style.css"

// import TalonPaie from "./Components/TalonPaie";
import FicheImpot from "./Components/FicheImpot";
const Hello = () => (<div>Hello Niovar!</div>)

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

function App() {
    return (
		<Router history={history}>
			<Route exact path='/hello' component={Hello} />
			<Route exact path='/' component={FicheImpot} />
        </Router>
    );
}

export default App;

