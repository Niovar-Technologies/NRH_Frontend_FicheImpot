import React from 'react';

import { Route, Switch, Router } from "react-router-dom"
import FicheImpot from './Components/FicheImpot'
import "./static/css/style.css"
import "./static/css/bootstrap.min.css"

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

const testApp = () => (<div>Hello React!</div>)
export default () => {
    return (
	<>
		<FicheImpot />
        <Router history={history}>
			<Route path='/test' component={testApp} />
        </Router>
	</>
    )
}

