import React from 'react';

import {Route, Routes} from "react-router-dom";

import "./static/css/bootstrap.min.css"
import "./static/css/bootstrap-datetimepicker.min.css"
import "./static/css/select2.min.css"
import "./static/css/style.css"

import FicheImpot from "./Components/FicheImpot";

const TestApp = () => (<div>Hello Niovar!</div>)

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

function App() {
    return (
		<Router history={history}>
			<Route exact path='/' component={FicheImpot} />
        </Router>
    );
	
}

export default App;