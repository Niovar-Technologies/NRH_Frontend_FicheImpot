import React from "react";

import {Search,Grid, List, Plus, Check, Delete, Edit, Trash2, Phone, DollarSign, File, BookOpen, CheckCircle, EyeOff , AlertTriangle, UserX, User, UserCheck, ToggleLeft, Clock, Send, X, AlignJustify, ArrowRight, ArrowLeft, Calendar, Eye} from "react-feather";
import {useNavigate} from "react-router-dom";
import ReactTooltip from 'react-tooltip';


import axios from "axios";
import { useEffect, useState , useRef} from 'react';


import { Oval } from  'react-loader-spinner';


//jQuery libraries
 
// import 'jquery/dist/jquery.min.js';
 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import { createGlobalState } from 'react-hooks-global-state';
import { serverName } from "../Constante";

import { Space, Table, Tag,  Button, Tooltip, Popconfirm, Input, Spin,  message, Upload , Badge, Modal } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined, ExclamationCircleOutlined, CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

let idEts = ( cookies.get( 'code_entreprise' ) ) ? cookies.get( 'code_entreprise' ) : "2020"; //
const annee = cookies.get( 'anneeChoisie' ) ? cookies.get( 'anneeChoisie' ) : "2022";



const HistoriqueRE = () => {
   
    const [isloading, setLoading] = useState(true);
    const [loader,setLoader ] = useState(false);
    const [listEmploye, setListEmploye] = useState([]);
    const [total, setTotal] = useState(0);

    const [searchText, setSearchText] = useState("");
    let [filteredData]  = useState();


    const columns = [
        {
        
            title: '# employé',
            key: 'matricule',
            render: (_, record) => (  <Space>  {record.employe.matricule}</Space> ),
        },
        {
        
            title: 'Nom complet',
            key: 'nom',
            dataIndex: 'nom',
            render: (_, record) => (  <Space> {record.employe.nom} {record.employe.prenom}</Space> ),
        },

        {
        
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            render: (_, record) => (  <Space> {record.employe.email}</Space> ),
        },

        {
        
            title: 'Fiche Impot',
            key: 'impot',
            render: (_, record) => ( <ListFicheImpot item={record} />  ),
        },
        {
        
            title: 'Feuillet T4',
            key: 't4',
            render: (_, record) => ( <ListFeuilletT4 item={record} />  ),
        },
    ] ;
    
    useEffect(() => {
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


      const modifiedData= listEmploye.map(({body, ...item})=>({
        ...item,
        key : item.id,
       }) );

       const handleSearch = async (e) => {
        setSearchText(e.target.value); 
        if(e.target.value===""){
            fetchData(); 
        }
    
    } 
    const globalSearch = async () => {
        filteredData = modifiedData.filter((value)=>{
            return(
                value.employe.matricule.toLowerCase().includes(searchText.toLowerCase()) ||
                value.employe.nom.toLowerCase().includes(searchText.toLowerCase()) ||
                value.employe.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
                value.employe.email.toLowerCase().includes(searchText.toLowerCase())
            );
        });
    
        setListEmploye(filteredData);
    } 
    
    
    const clearAll = async () => {
     setSearchText("");
    }

  
    return(
        <Layout>

        <div className="page-wrapper">
            <div className="content container-fluid">
               <div className="row">
               { isloading && 
                 <div className="col-xl-12 col-sm-12 col-12 mb-4 text-center">
                 <Spin/>
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

                  <div className="col-xl-12 col-sm-12 col-12 text-right"> 
                        <Space style={{ marginBottom:16, marginTop:40}} align="center"> 
                        <Input 
                        placeholder="Saisir ici"
                        onChange={handleSearch}
                        allowClear
                        value={searchText}
                        />
    
                        <Button icon={<Search size={18} /> } onClick={globalSearch}> </Button>
                        <Button icon={<Delete size={18} /> } onClick={clearAll}> </Button>
    
                        </Space>
                            <Table
                            columns={columns}
                            dataSource= { filteredData && filteredData.length ? filteredData :  modifiedData}
                            bordered
                            loading = {isloading}
                            size="middle"
                            />
                    </div>             
                </div>
            </div>
        </div>
                      
    </Layout>
    );
}

const ListFicheImpot = ({ item  }) =>{
    const [employeItem, setEmployeItem] = useState(item);
    const [loading, setLoading] = useState(false);
    const [listFicheImpot, setListFicheImpot] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
        fetchData();
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const columns = [
        {
        
            title: 'Description ',
            key: 'description',
            render: (_, record) => (  <Space> <File size={16}/>   Fiche impot </Space> ),
        },
        {
        
            title: 'Envoyé le ',
            key: 'created',
            dataIndex: 'created',
            render: (_, record) => (  <Space> <Calendar size={16}/>  {record.created}</Space> ),
        },

        {
            align:'center',
            title: 'Options',
            key: 'options',
            render: (_, record) => ( 
                 <Space> 
                  <a  href={record.chemin} target="_blank" className="text-white btn-sm btn-secondary enabled"><Eye size={14}/> Voir </a>

            </Space> ),
        },

  
    ] ;

      const fetchData = async () => {
        setLoading(true);
        const apiURL =  serverName+'TraiterFicheImpot/getSingleListFicheImpot/'; 
        const response = await axios.post(apiURL, {
          idTraiterFicheImpot: employeItem.id,
          type: 0,
          })
          .then(function (response) {
            setListFicheImpot(response.data.result);
            setLoading(false);
          })
          .catch(function (error) {
           setLoading(false);
          });
      }

    return (
        <>
                 <Button type="primary"  onClick={()=>showModal()}  icon={<AlignJustify size={14}/>} >   Lister  </Button>

                        <Modal
                            title="Modal 1000px width"
                            centered
                            visible={isModalVisible} 
                            width={1000}
                            footer={null}
                            maskClosable={false}
                            onCancel={handleCancel}
                            title="Historique des fiches d'impot"

                        >
                           <div className="col-xl-12 col-sm-12 col-12 mb-4">
                            <div className="row">
                                <div className="col-xl-12 col-sm-12 col-12 ">
                                    <div className="employee_add">
                                        <label className="employee_count"><User size={16}/> : {employeItem.employe.nom} {employeItem.employe.prenom}  </label>
                                        <label className="employee_count">Total : <Tag>{listFicheImpot.length}</Tag> </label>
                                    </div>
                                </div>
                            </div>
                           <div className="mt-2">

                                <Table
                                columns={columns}
                                dataSource= {listFicheImpot}
                                bordered
                                loading = {loading}
                                size="small"
                                />
                            </div>
                        </div>
                           
                        </Modal>
        </>
    );

}


const ListFeuilletT4 = ({ item  }) =>{
    const [employeItem, setEmployeItem] = useState(item);
    const [loading, setLoading] = useState(false);
    const [listFeuilletT4, setListFeuilletT4] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
        fetchData();
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const columns = [
        {
        
            title: 'Description ',
            key: 'description',
            render: (_, record) => (  <Space> <File size={16}/>   Fiche impot </Space> ),
        },
        {
        
            title: 'Envoyé le ',
            key: 'created',
            dataIndex: 'created',
            render: (_, record) => (  <Space> <Calendar size={16}/>  {record.created}</Space> ),
        },

        {
            align:'center',
            title: 'Options',
            key: 'options',
            render: (_, record) => ( 
                 <Space> 
                  <a  href={record.chemin} target="_blank" className="text-white btn-sm btn-secondary enabled"><Eye size={14}/> Voir </a>

            </Space> ),
        },

  
    ] ;

      const fetchData = async () => {
        setLoading(true);
        const apiURL =  serverName+'TraiterFicheImpot/getSingleListFicheImpot/'; 
        const response = await axios.post(apiURL, {
          idTraiterFicheImpot: employeItem.id,
          type: 1,
          })
          .then(function (response) {
            setListFeuilletT4(response.data.result);
            setLoading(false);
          })
          .catch(function (error) {
           setLoading(false);
          });
      }

    return (
        <>
                 <Button type="primary"  onClick={()=>showModal()}  icon={<AlignJustify size={14}/>} >   Lister  </Button>

                        <Modal
                            title="Modal 1000px width"
                            centered
                            visible={isModalVisible} 
                            width={1000}
                            footer={null}
                            maskClosable={false}
                            onCancel={handleCancel}
                            title="Historique des fiches de  feuillet T4"

                        >
                           <div className="col-xl-12 col-sm-12 col-12 mb-4">
                            <div className="row">
                                <div className="col-xl-12 col-sm-12 col-12 ">
                                    <div className="employee_add">
                                        <label className="employee_count"><User size={16}/> : {employeItem.employe.nom} {employeItem.employe.prenom}  </label>
                                        <label className="employee_count">Total : <Tag>{listFeuilletT4.length}</Tag> </label>
                                    </div>
                                </div>
                            </div>
                           <div className="mt-2">

                                <Table
                                columns={columns}
                                dataSource= {listFeuilletT4}
                                bordered
                                loading = {loading}
                                size="small"
                                />
                            </div>
                        </div>
                           
                        </Modal>
        </>
    );

}


export default HistoriqueRE;