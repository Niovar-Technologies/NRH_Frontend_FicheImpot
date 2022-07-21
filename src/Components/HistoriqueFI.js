import React from "react";

import {Grid, List, Plus, Check, Delete, Edit, Trash2, Phone, DollarSign, File, BookOpen, CheckCircle, EyeOff , AlertTriangle, UserX, User, UserCheck, ToggleLeft, Clock, Send, X, AlignJustify, ArrowRight, Upload, ArrowLeft} from "react-feather";
import {useNavigate} from "react-router-dom";
import ReactTooltip from 'react-tooltip';


import axios from "axios";
import { useEffect, useState , useRef} from 'react';
import Badge from 'react-badges'

import { Oval } from  'react-loader-spinner';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useAlert } from "react-alert";


//jQuery libraries
 
// import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { createGlobalState } from 'react-hooks-global-state';
import { Modal } from "react-bootstrap";


const serverName = 'http://localhost:5000/NiovarRH/UserFIMicroservices/';
//const serverName = 'http://nrhloadbalancer03-1908089206.ca-central-1.elb.amazonaws.com/NiovarRH/UserTDPMicroservices/';


const annee = 2022;
const idEts = 1;



const HistoriqueRE = () => {
   
    const options = {
        timeout: 5000,
        position: positions.TOP_CENTER
      };
      
    return (
        <Provider template={AlertTemplate} {...options}> 
        <Content/>
        </Provider>
    );
}


const Content = () => {
    const alert = useAlert();
    const [isloading, setLoading] = useState(true);
    const [loader,setLoader ] = useState(false);
    const [listEmploye, setListEmploye] = useState([]);
    const [total, setTotal] = useState(0);

    const [showModal,setShowModal ] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }
    
    useEffect(() => {
        //initialize datatable
      $(document).ready(function () {
           setTimeout(function(){
           $('#example').DataTable(
            {
                language: {
                    "emptyTable": "Aucune donnée disponible dans le tableau",
                    "search": "Rechercher:",
                    "paginate": {
                        "first": "Première",
                        "last": "Dernière",
                        "next": "Suivante",
                        "previous": "Précédente"
                    },
                    "info": "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
                    "infoEmpty": "Affichage de 0 à 0 sur 0 entrées",
                    "infoFiltered": "(filtrées depuis un total de _MAX_ entrées)",
                    "lengthMenu": "Afficher _MENU_ entrées",
                    "zeroRecords": "Aucune entrée correspondante trouvée"
                }
            }
           );
           } ,1000);
       });
       fetchData();
    
      }, []);

      const fetchData = async () => {
        const apiURL =  serverName+'TraiterFicheImpot/historiqueFicheImpot/'; 
        const response = await axios.post(apiURL, {
            idEts: idEts,
            annee: annee,
          })
          .then(function (response) {
           setListEmploye(response.data.result);
           setTotal(response.data.total);
            setLoading(false);
          })
          .catch(function (error) {
           setLoading(false);
          });
      }

  
    return(
        <div className="page-wrapper">
            <div className="content container-fluid">
               <div className="row">

               { isloading && 

                    <div class="container">
                    <div class="row justify-content-md-center mt-4">

                    <div class="col-md-auto  mt-4">
                    <Oval
                        height="50"
                        width="50"
                        color='#f8f9fa'
                        ariaLabel='loading'/> 
                    </div>

                    </div>
                    </div>
                }

                { !isloading &&  
               <>
                  <div className="col-xl-12 col-sm-12 col-12">
                            <div className="breadcrumb-path ">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active"><h3>Historique des fiches d'impot envoyé </h3>
                                    </li>
                                    <li className="breadcrumb-item "> Année  :  {annee} </li>
                                    <li className="breadcrumb-item "> Nombre employé  :  {total} </li>
                                </ul>
                                <h3><ArrowLeft/> retour</h3>
                            </div>
                 </div>
                </>
                }

{ !isloading && 
                <>
                          
                 <div className="col-xl-12 col-sm-12 col-12 mt-2">
                            <div className="card p-2" >
                            
                                <div className="table-responsive mt-4">
                                    <table id="example" className="table  custom-table  no-footer tablenoheader">
                                        <thead>
                                        <tr>
                                            <th># d’employé</th>
                                            <th>Nom complet</th>
                                            <th>Email</th>
                                            <th>Fiche impot</th>
                                            <th>Feuillet T4</th>
                                        
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {listEmploye && listEmploye.map((item, index) => {
                                             let total =0;
                                            return (
                                            
                                                <tr>
                                                <td>{item.employe.matricule} </td>
                                                <td>{item.employe.nom} {item.employe.prenom}</td>
                                                <td>{item.employe.email}</td>
                                                <td>   <ListFicheImpotModal employe={item} type={0} />  </td>                                          
                                                <td>   <ListFicheImpotModal employe={item}  type={1}/>  </td>
                                                </tr> 
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>                      
                </>
                }

                
                </div>
            </div>
        </div>
    );
}


const ListFicheImpotModal = ({ employe, type }) =>{
    var libelle = type==1 ? "feuillets T4" : "fiches d'impot";
    const [employeItem, setEmployeItem] = useState(employe);
    const [loading, setLoading] = useState(false);
    const [listFicheImpot, setListFicheImpot] = useState([]);
    const [modal,setModal] = useState(false);
    const modalClose = () => { 
        setModal(false);
    }

    const modalShow = () => {
         setModal(true) ;
         setLoading(true);
         fetchData();
        }

      const fetchData = async () => {
          console.log(employeItem.id);
          console.log(type);
  
       const apiURL =  serverName+'TraiterFicheImpot/getSingleListFicheImpot/'; 
          const response = await axios.post(apiURL, {
            idTraiterFicheImpot: employeItem.id,
            type: type,
            })
            .then(function (response) {
                console.log(response.data.result);
              setListFicheImpot(response.data.result);
              setLoading(false);
            })
            .catch(function (error) {
             setLoading(false);
            });
      }

    return (
        <>
                 <a  className="btn-add" onClick={modalShow}>  <span>  <AlignJustify/> Afficher </span>   </a>
                 
                    <Modal show={modal} onHide={modalClose} centered backdrop="static" size="lg" >
                            <Modal.Header closeLabel="fermer">  <span>Liste des {libelle} envoyé à l'employé <span className="font-weight-bold">{employeItem.employe.nom} </span> </span>     </Modal.Header>
                            <Modal.Body centered>
                            <div className="row  p-4"> 
                            {loading && <div class="container">
                                    <div class="row justify-content-md-center mt-4">
                                    <div class="col-md-auto  ">
                                    <Oval
                                        height="50"
                                        width="50"
                                        color='#f8f9fa'
                                        ariaLabel='loading'/> 
                                    </div>

                                    </div>
                                </div> }
                                {!loading && <div class="container">
                                    <div class="list-group">
                                    {listFicheImpot && listFicheImpot.map((item, index) => {
                                             let total =0;
                                            var color= (index % 2)==0 ? "#f0f5f5" : "#ffffff";

                                            return (
                                                <a  href={item.chemin} target="_blank" class= {"list-group-item list-group-item-action flex-column align-items-start mt-1 list-group-item"} style={{ backgroundColor:color}} >
                                                <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1"><File/>  {libelle} </h5>
                                                <small class="text-muted">ajouté le {item.created}</small>
                                                </div>
                                                <small class="text-muted text-blue">Cliquer ici pour consulter ({item.fileName})</small>
                                            </a>
                                            )
                                        })}
                                    </div>
                                       
                                </div> }
                        
                             </div>
                          
                             <div  className="modal-footer mt-4 text-right">
                             <button type="button" className="btn btn-danger p-" onClick={modalClose} > Fermer </button>
                             </div>   
                            </Modal.Body>
                        </Modal>
        </>
    );

}

export default HistoriqueRE;