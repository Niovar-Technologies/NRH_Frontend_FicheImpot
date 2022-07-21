import {Route, Routes} from "react-router-dom";

import "./static/css/bootstrap.min.css"
import "./static/css/bootstrap-datetimepicker.min.css"
import "./static/css/select2.min.css"
import "./static/css/style.css"

import FicheImpot from "./Components/FicheImpot";
import HistoriqueFI from "./Components/HistoriqueFI";

const TestApp = () => (<div>Hello Niovar!</div>)

function App() {
    return (
		<FicheImpot/>
		<HistoriqueFI/>
    );
}

export default App;








import React from 'react';

import "./static/css/style.css"
import "./static/css/bootstrap.min.css"

import { Route, Switch, Router, Link } from "react-router-dom"
import Annees from './Components/Annees'


const TestApp = () => (<div>Hello Niovar!</div>)
export default () => {
    return (
		<Annees />
    )
} 