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
import $, { event } from 'jquery'; 
import { createGlobalState } from 'react-hooks-global-state';
import { Modal } from "react-bootstrap";


// const serverName = 'http://localhost:5000/NiovarRH/UserFIMicroservices/';
const serverName = 'http://nrhloadbalancer03-1908089206.ca-central-1.elb.amazonaws.com/NiovarRH/UserFIMicroservices/';

const initialState = { listFile: [], listFileT4: [] } ;
const { useGlobalState } = createGlobalState(initialState);

import Cookies from 'universal-cookie';
const cookies = new Cookies();

let idEts = ( cookies.get( 'code_entreprise' ) ) ? cookies.get( 'code_entreprise' ) : "2020"; //
const jourPaie = ( cookies.get( 'dateJourpaie' ) ) ? transform_date( cookies.get( 'dateJourpaie' ) ) : "2022-06-13";
const annee = ( cookies.get( 'anneeChoisie' ) ) ? transform_date( cookies.get( 'anneeChoisie' ) ) : "2022-06-13";

// const annee = 2022;
// const idEts = 1;

class Fichier {
    constructor(id, fichier, extention, type) {
      this.id = id;
      this.fichier = fichier;
      this.extention = extention;
      this.type = type;
    }
  }

const FicheImpot = () => {
   
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
    const [listFileArray, setListFileArray] = useGlobalState('listFile');
    const [listFileT4Array, setListFileT4Array] = useGlobalState('listFileT4');

    const [showModal,setShowModal ] = useState(false);

    const handleClose = () => {
        setListFileArray([]);
        setListFileT4Array([]);
        setShowModal(false);
        setLoading(true);
        fetchData();
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
        const apiURL =  serverName+'TraiterFicheImpot/StartTraitementFicheImpot/'; 
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

      const saveAll = async (e) => {
        var promiseArray = [], promiseArrayT4 = [];
        for (var i = 0; i < listFileArray.length; i++) {
            promiseArray.push( sendFileToserver(listFileArray[i]));
        }
        for (var i = 0; i < listFileT4Array.length; i++) {
            promiseArrayT4.push( sendFileToserver(listFileT4Array[i]));
        } 

        if(promiseArray.concat(promiseArrayT4).length==0){ 
            alert.info("Aucune fiche d'emploi choisi. ");
            return;
        }
        setLoader(true);

           await  axios.all(promiseArray).then(axios.spread((...responses) => {
            console.log("test ok");
            setLoader(false);
            setShowModal(true);
            
          })).catch(errors => {
            // react on errors.
            console.log(errors);
          });
        
          //  alert.success("Talons de paie envoyé avec succès.");
    }


    async function sendFileToserver(ficheImpot){
        const apiURL =  serverName+'TraiterFicheImpot/sendSingleFicheImpot/'; 
        const formData = new FormData();
        formData.append("id", ficheImpot.id);
        formData.append("extention",ficheImpot.extention);
        formData.append("fichier",ficheImpot.fichier);
        formData.append("type",ficheImpot.type);
       const response = await axios.post(apiURL, formData)
         .then(function (response) {
          if(response.data.statusCode==1){
              console.log(response.data.result);
         }
         if(response.data.statusCode==-1){
            console.log(response.data.message);          
         }
         })
         .catch(function (error) {
             console.log(error);
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
                                    <li className="breadcrumb-item active"><h3>Fiche d'impot </h3>
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
                                            <th>Opération</th>                                       
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
                                                 <FileForm employe={item}/> 
                                                </tr> 
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>                      
               
                <div className="btn-set text-center col-md-12 mt-2">
                   
                    {!loader &&  <button  className="btn btn-dwnd" onClick={saveAll} >  <span> <Send/> Envoyés toutes les fiches d'impot </span>   </button>}
                      
                    {loader && 
                     <button  className="btn btn-dwnd"> 
                       <Oval
                        height="20"
                        width="20"
                        color='#f8f9fa'
                        ariaLabel='loading'/>
                      </button>}
                      
                    </div>

                    <Modal show={showModal} onHide={handleClose} centered backdrop="static">
                            <Modal.Header closeLabel="fermer" >
                            </Modal.Header>
                            <Modal.Body centered>
                            <div className="row"> 
                            <div className="col-md-12 text-center"> 
                            <div className=" col-md-12 p-0">
                                 <div className="alert alert-success alert-dismissible fade show" role="alert">
                                      <Check/>  Envoie des relevés d'emploi  éffectué avec succès.
                                </div>
                            </div>
                             </div>
                             </div>
                             <div className="modal-footer ">
                                <button type="button" className="btn-sm btn-info p-2" onClick={handleClose}> 
                                 Continuer
                                 </button>
                             </div>   
                            </Modal.Body>
                        </Modal>
                </>
                }

                
                </div>
            </div>
        </div>
    );
}

const FileForm = ({ employe }) => {
    const [employeItem, setEmployeItem] = useState(employe);
    const [enableButton,setEnableButton ] = useState(true);
    const [loader,setLoader ] = useState(false);
    const alert = useAlert();

    const [listFileArray, setListFileArray] = useGlobalState('listFile');
    const [listFileT4Array, setListFileT4Array] = useGlobalState('listFileT4');

    const [talonBefore,setTalonBefore ] = useState(null);

    const handleAdd = (talon) => {
     setListFileArray([...listFileArray, talon]);
    }
    const handleAddT4 = (talon) => {
        setListFileT4Array([...listFileT4Array, talon]);
       }

    const handleRemove = (talon) => {
        const newList = listFileArray.filter((t) => t !== talon);
        setListFileArray(newList);
      }


    const handleRemoveT4 = (talon) => {
        const newList = listFileT4Array.filter((t) => t !== talon);
        setListFileT4Array(newList);
      }

      const handleUpdate = (index, talon) => {
        const newList = [...listFileArray];
        newList[index] = talon;
        setListFileArray(newList);
      }
      const handleUpdateT4 = (index, talon) => {
        const newList = [...listFileT4Array];
        newList[index] = talon;
        setListFileT4Array(newList);
      }

     function verifyExtention(extention) {
        var val =false;
        const array = ['pdf', 'docx','png'];
        
        const match = array.find(element => {
          if (element==extention) {
              val=true;
            return val;
          }
        });   
         return val;
    }
   

    const saveFile = (e, type) => {
        let obj = type==1 ? listFileT4Array.find(data => data.id === employeItem.id) : listFileArray.find(data => data.id === employeItem.id);

        var fileExtension = e.target.files[0].name.split('.').pop(); 
        var fileSize = Math.round((e.target.files[0].size / 1024));

        if(fileSize>= 4096){
            setEnableButton(true);
            alert.error("Taille fichier recommandée : 4 mo");
            if(obj!=null) type==1? handleRemoveT4(obj) : handleRemove(obj);
            e.target.value = null;
           return;
        }
        if(!verifyExtention(fileExtension)){
            setEnableButton(true);
            alert.error("Extention non valide.");
            if(obj!=null) type==1 ? handleRemoveT4(obj) : handleRemove(obj);
            e.target.value = null;
           return ;
        }  

        setEnableButton(false);

        var fichier = new Fichier(employeItem.id, e.target.files[0],fileExtension, type);
        if(obj!=null){
            var index_of_item = listFileArray.indexOf(obj)
            type==1 ? handleUpdateT4(index_of_item, obj): handleUpdate(index_of_item, obj);
        }else{
            type==1 ? handleAddT4(fichier) : handleAdd(fichier);
        }
      }

     /* const UploadFile = async (e) => {
        let obj = listFileArray.find(data => data.id === employeItem.id);
          setLoader(true);
          const apiURL =  serverName+'TraiterReleverEmploi/sendSingleReleverEmploi/'; 
           const formData = new FormData();
           formData.append("id", employeItem.id);
           formData.append("extention",fileExtension);
           formData.append("fichier",file);
          const response = await axios.post(apiURL, formData)
            .then(function (response) {
                setLoader(false);
             if(response.data.statusCode==1){
                 alert.success(response.data.message);
                setEmployeItem(response.data.result);
                if(obj!=null) handleRemove(obj);
                setEnableButton(true);
            }
            if(response.data.statusCode==-1){
                alert.info(response.data.message);            
            }
            })
            .catch(function (error) {
                setLoader(false);
                console.log(error);
                alert.error("Aucune connexion au serveur.");  
            });
      }*/

      const UploadFile = async (e) => {

        setLoader(true);

        var promiseArray = [], promiseArrayT4 = [];
        for (var i = 0; i < listFileArray.length; i++) {
            promiseArray.push( sendFileToserver(listFileArray[i]));
        }
        for (var i = 0; i < listFileT4Array.length; i++) {
            promiseArrayT4.push( sendFileToserver(listFileT4Array[i]));

        }
           await  axios.all(promiseArray.concat(promiseArrayT4)).then(axios.spread((...responses) => {
            console.log("test ok");        
            setLoader(false);
            setEnableButton(true);
            alert.success("Fiche d'impot envoyé avec succès.");

          })).catch(errors => {
            setEnableButton(false);
            // react on errors.
            console.log(errors);
          });
         
    }


    async function sendFileToserver(ficheImpot){
        const apiURL =  serverName+'TraiterFicheImpot/sendSingleFicheImpot/'; 
        const formData = new FormData();
        formData.append("id", ficheImpot.id);
        formData.append("extention",ficheImpot.extention);
        formData.append("fichier",ficheImpot.fichier);
        formData.append("type",ficheImpot.type);
       const response = await axios.post(apiURL, formData)
         .then(function (response) {
          if(response.data.statusCode==1){
            if(ficheImpot!=null) ficheImpot.type==1 ? handleRemoveT4(ficheImpot) : handleRemove(ficheImpot);
              console.log(response.data.result);
         }
         if(response.data.statusCode==-1){
            console.log(response.data.message);          
         }
         })
         .catch(function (error) {
             console.log(error);
         });
    }
  return (
    <>
                                <td>
                                <div className=" form-group mt-3">
                                    <input type="file" className="form-control" onChange={(e) => {saveFile(e, 0);}} />
                                </div>
                                </td>
                                <td>
                                <div className=" form-group mt-3">
                                    <input type="file" className="form-control" onChange={(e) => {saveFile(e, 1);}} />
                                </div>
                                </td>
                                 <td>
                                    <div className="col-md-12 ">
                                    <button type="button" className="btn btn-sm btn-info py-2 px-4" disabled={enableButton} onClick={UploadFile}  >
                                    {!loader  && 
                                    <span className="mr-2">Envoyer</span>
                                    } 
                                    
                                    {loader && 
                                    <Oval
                                    height="20"
                                    width="20"
                                    color='#f8f9fa'
                                    ariaLabel='loading'/>}
                                        </button> 
                                    </div>

                                 </td>

    </>
                            
  );
}


export default FicheImpot;