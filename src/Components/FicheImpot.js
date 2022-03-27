import React from 'react';
// import LayoutApp from "../Containers/Layout";
// import LayoutApp from "./LayoutApp";



import {Check, Delete, Edit, Trash2, Phone, DollarSign, File, BookOpen, CheckCircle, EyeOff , AlertTriangle, UserX, User, UserCheck, ToggleLeft, Clock, Send, X} from "react-feather";

import ReactTooltip from 'react-tooltip';


import axios from "axios";
import { useEffect, useState , useRef} from 'react';

import { Oval } from  'react-loader-spinner';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useAlert } from "react-alert";

//jQuery libraries
 
import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

//const serverName = 'http://localhost:5000/NiovarRH/UserTLPMicroservices/';
const serverName = 'http://nrhloadbalancer03-1908089206.ca-central-1.elb.amazonaws.com/NiovarRH/UserTLPMicroservices/';

const dateDebut = '2022-03-06';
const dateFin='2022-03-19';
const jourPaie='2022-03-31';
const idEts ='1';

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

    const style = { color: "green", fontSize: "1.1em" }

    const [laoderTraitementPaie, setLaoderTraitementPaie] = useState(false);

    const [listEmploye, setListEmploye] = useState(null);

    const [isloading, setLoading] = useState(true);

    const [date_debut, setDate_debut] = useState('06-03-2022'); 
    const [date_fin, setDate_fin] = useState('19-03-2022');
    const [jour_paie, setJour_paie] = useState('31-03-2022');

    const [total, setTotal] = useState(0);
    const [nbreTalonSend, setNbreTalonSend] = useState(0);
    const [nbreTalonNotSend, setNbreTalonNotSend] = useState(0);

  
    useEffect(() => {
         //initialize datatable
       $(document).ready(function () {
            setTimeout(function(){
            $('#example').DataTable();
            } ,1000);
        });
        fetchData();
     
       }, []);
 
       const fetchData = async () => {
         const apiURL =  serverName+'TraiterTalonPaie/StartTraitementTalonPaie/'; 
         const response = await axios.post(apiURL, {
             idEts: idEts,
             date_debut: dateDebut,
             date_fin: dateFin,
             jour_paie: jourPaie
           })
           .then(function (response) {
            setListEmploye(response.data.result);
            setTotal(response.data.total);
            setNbreTalonSend(response.data.nbreTalonSend);
            setNbreTalonNotSend(response.data.nbreTalonNotSend);
            console.log(response.data.result);
             setLoading(false);
           })
           .catch(function (error) {
            setLoading(false);
           });
       }

    return(

        <div className="page-wrapper">
            <div className="content container-fluid">
          

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

               { !isloading &&  <div className="row breadcrumb-path">
                    <div className="col-xl-8 col-sm-12 col-8 ">
                    <h4 className=" font-weight-bold">Talons de paie </h4>
                    <h6 className=" font-weight-bold mt-1">Période  du  {date_debut} au  {date_fin} </h6>
                    <h6 className=" font-weight-bold mt-1">Jour de paie   {jour_paie}  </h6>
                    </div>

                    <div className="col-xl-4 col-sm-12 col-4 ">
                    <h6 className="font-weight-bold"> Nombre employé :  {total} </h6>
                    <h6 className="font-weight-bold mt-1"><UserCheck style={style}/> : {nbreTalonSend}  </h6>
                    <h6 className="font-weight-bold mt-1"> <UserX style={{ color: "red" }}/> : {nbreTalonNotSend}  </h6>
                    </div>
                </div>
                }

                { !isloading && <div className="row">
                 <div className="col-xl-12 col-sm-12 col-12">
                            <div className="card p-2" >
                                <div className="table-responsive">
                                    <table id="example" className="table  custom-table  no-footer tablenoheader">
                                        <thead>
                                        <tr>
                                            <th># d’employé</th>
                                            <th>Nom complet</th>
                                            <th>Email</th>
                                            <th>Téléphone</th>
                                            <th>Talon paie</th>
                                        
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
                                                <td>{item.employe.telephone}</td>
                                                <td> <FileForm employe={item} /> </td>
                                                </tr> 
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                </div>
                }
               
            </div>
        </div>


    );

}




const FileForm = ({ employe }) => {
    const [employeItem, setEmployeItem] = useState(employe);
    const [file, setFile] = useState();
    const [fileExtension, setFileExtention] = useState();
    const [enableButton,setEnableButton ] = useState(true);
    const [loader,setLoader ] = useState(false);
    const alert = useAlert();

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
   

    const saveFile = (e) => {
        var fileExtension = e.target.files[0].name.split('.').pop(); 
        var fileSize = Math.round((e.target.files[0].size / 1024));

        if(fileSize>= 4096){
            alert.error("Taille fichier recommandée : 4 mo");
           return;
        }
        if(!verifyExtention(fileExtension)){
            alert.error("Extention non valide.");
           return ;
        }    
        setFile(e.target.files[0]);
        setFileExtention(fileExtension);
        setEnableButton(false);  

      }

      const UploadFile = async (e) => {
          setLoader(true);
          const apiURL =  serverName+'TraiterTalonPaie/sendSingleTalonPaie/'; 
           const formData = new FormData();
           formData.append("idTraiterTalonPaie", employeItem.id);
           formData.append("extention",fileExtension);
           formData.append("formFile",file);
          const response = await axios.post(apiURL, formData)
            .then(function (response) {
                setLoader(false);
             if(response.data.statusCode==1){
                 alert.success(response.data.message);
                setEmployeItem(response.data.result);
                setEnableButton(true);
            }
            if(response.data.statusCode==-1){
                alert.info(response.data.message);            
            }
            })
            .catch(function (error) {
                setLoader(false);
                console.log(error);
            });
      }
  return (
                            <div className="row ">
                                <div className=" col-lg-8 col-md-12 col-sm-12 p-0 mt-2">
                                    <div className=" form-group">
                                        <input type="file" className="form-control" onChange={saveFile} />
                                    </div>
                                </div>
                             
                                <div className="col-lg-2 col-md-6  col-sm-12 mt-2">
                                <button type="button" className="btn btn-sm btn-info py-2 px-4" onClick={UploadFile} disabled={enableButton} >
                                {!loader  && <Send/> }
                                
                                {loader && 
                                <Oval
                                height="20"
                                width="20"
                                color='#f8f9fa'
                                ariaLabel='loading'/>}
                                    </button>
                                </div>

                                <div className="col-lg-2 col-md-6 col-sm-12 mt-2">
                                <button type="button" className="btn btn-sm">
                                {employeItem.status==1  && <Check style={{ color: "green" }}/> }
                                {employeItem.status==0  && <X style={{ color: "red" }}/> }
                                </button>
                                </div>
                               
                            </div>
  );
}



export default FicheImpot;