import React from 'react';

import { Route, Switch, Router } from "react-router-dom"
import TalonDePaie from './Components/TalonDePaie'
import "./static/css/style.css"
import "./static/css/bootstrap.min.css"

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

const testApp = () => (<div>Hello React!</div>)
export default () => {
    return (
	<>
		<TalonDePaie />
        <Router history={history}>
			<Route path='/talons-de-paie' component={testApp} />
        </Router>
	</>
    )
}

