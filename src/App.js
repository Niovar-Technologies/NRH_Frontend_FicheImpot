import {Route, Routes} from "react-router-dom";

import "./static/css/bootstrap.min.css"
import "./static/css/bootstrap-datetimepicker.min.css"
import "./static/css/select2.min.css"
import "./static/css/style.css"

import FicheImpot from "./Components/FicheImpot";
import HistoriqueFI from "./Components/HistoriqueFI";



function App() {
    return (
        <Routes>
            <Route exact path="/" element={<FicheImpot/>}/>
            <Route exact path="/historiqueFI/" element={<HistoriqueFI/>}/>
        </Routes>
    );
}

export default App;
