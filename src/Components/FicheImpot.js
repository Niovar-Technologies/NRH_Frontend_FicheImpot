import React from "react";


import {Grid, List, Plus, Check, Delete, Edit, Trash2, Phone, DollarSign, File, BookOpen, CheckCircle, EyeOff , AlertTriangle, UserX, User, UserCheck, ToggleLeft, Clock, Send, X, AlignJustify, ArrowRight, ArrowLeft, Search, Save} from "react-feather";

import axios from "axios";
import { useEffect, useState , useRef} from 'react';

import { Oval } from  'react-loader-spinner';

 
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import { createGlobalState } from 'react-hooks-global-state';
import { serverName } from "../Constante";


import { Space, Table, Tag,  Button, Tooltip, Popconfirm, Input, Spin,  message, Upload , Badge, Modal   } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined, ExclamationCircleOutlined, CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


const initialState = { listFile: [], listFileT4: [] } ;
const { useGlobalState } = createGlobalState(initialState);

import Cookies from 'universal-cookie';
const cookies = new Cookies();

let idEts = ( cookies.get( 'code_entreprise' ) ) ? cookies.get( 'code_entreprise' ) : "2020"; //
// const jourPaie = ( cookies.get( 'dateJourpaie' ) ) ? transform_date( cookies.get( 'dateJourpaie' ) ) : "2022-06-13";
const annee = cookies.get( 'anneeChoisie' ) ? cookies.get( 'anneeChoisie' ) : "2022";

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
   // const alert = useAlert();
    const [isloading, setLoading] = useState(true);
    const [listEmploye, setListEmploye] = useState([]);
    const [total, setTotal] = useState(0);
    const [listFileArray, setListFileArray] = useGlobalState('listFile');
    const [listFileT4Array, setListFileT4Array] = useGlobalState('listFileT4');

    const [isSend, setIsSend] = useState(false);

    const [searchText, setSearchText] = useState("");
    let [filteredData]  = useState();

    const [showModal,setShowModal ] = useState(false);

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
        
            title: "Fiche d'impot",
            key: 'impot',
            render: (_, record) => ( 
            <> 
                <ModalFicheImpot item={record} /> 
            </> ),
            responsive: ['md'],
            width: '20%',
        },
        {
        
            title: "Feuillet T4",
            align:"center",
            key: 'feuillet',
            render: (_, record) => (
             <> 
                <ModalFeuilleT4 item={record} />
            </> 
             ),
            width: '20%',
            
        },

        {
        
            title: "Options",
            align:"center",
            key: 'options',
            render: (_, record) => (
             <> 
             <ButtonSendRow item={record} />
               
            </> 
             ),
            
        },

    ] ;

    const handleClose = () => {
        setListFileArray([]);
        setListFileT4Array([]);
        setShowModal(false);
        setLoading(true);
        fetchData();
    }
	
	const history = useHistory();
	
	const handleClick = () =>{
		history.push( '/fiches-impot/historique' );
	}
	
    useEffect(() => {
  
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

      const saveAll = async (e) => {
        var promiseArray = [], promiseArrayT4 = [];
        for (var i = 0; i < listFileArray.length; i++) {
            promiseArray.push( sendFileToserver(listFileArray[i]));
        }
        for (var i = 0; i < listFileT4Array.length; i++) {
            promiseArrayT4.push( sendFileToserver(listFileT4Array[i]));
        } 
        setIsSend(true);

           await  axios.all(promiseArray).then(axios.spread((...responses) => {
            setIsSend(false);
            setListFileArray([]);
            setListFileT4Array([])
            confirm({
                title: "Toutes les fiches ont été soumis aux employés avec succès.",
                icon: <CheckCircleOutlined color="green" />,  
                okText: "Terminer", 
                okCancel:false,                  
                onOk() {
                    refreshPage();
                },  
              });
          
          })).catch(errors => {
             message.error("Une erreur est survenu lors de l'envoie groupé. Veuillez réessayez."); 
            setIsSend(false);
            console.log(errors);
          });
    }

    const refreshPage = () => {
        window.location.reload(); 
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
                 <div className="col-xl-12 col-sm-12 col-12 mb-4 text-center">
                 <Spin/>
                 </div>
                }

                { !isloading &&  
               <>
                  <div className="col-xl-12 col-sm-12 col-12">
                            <div className="breadcrumb-path ">
                                <ul className="breadcrumb">
									<li className="breadcrumb-item">Fiche d'impot
                                    </li>
                                    <li className="breadcrumb-item active">Année  :  {annee}</li>
									<li className="breadcrumb-item "> Nombre employé  :  {total} </li>
                                </ul>
                                <h3>Fiche d'impot</h3>
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
                      <div className="col-xl-12 col-sm-12 col-12 text-center"> 
                    <Popconfirm  disabled={listFileArray.length == 0  && listFileT4Array.length==0 ? true : false} placement="top" title={"Voulez-vous soumettre toutes ces fiches de façon grouper ?"} onConfirm={saveAll}  okText="Oui" cancelText="Non">

                        <Button className="mt-3" type="primary"  disabled={listFileArray.length == 0 && listFileT4Array.length==0 ? true : false}
                        success icon={<Send size={14} />} size="large" loading={isSend} > 
                        {isSend ? "Veuillez patientez..." : "Soumettre toutes les fiches selectionner "}  
                        </Button>
                    </Popconfirm>

                    </div>                 
                </div>
            </div>
        </div>
    );
}


const ModalFeuilleT4 = ({ item  }) =>{

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [employeItem, setEmployeItem] = useState(item.employe);
    const [fileList, setFileList] = useState([]);
    const [colorDot, setColorDot] = useState("#ffffff");

  const [listFileT4Array, setListFileT4Array] = useGlobalState('listFileT4');

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleCancel = () => {
        let obj = listFileT4Array.find(data => data.id === item.id);  
        if(obj!=null) handleRemove(obj);
        setFileList([]);
        setColorDot("#ffffff");
        setIsModalVisible(false);
      };

      const handleAdd = (talon) => {
        setListFileT4Array([...listFileT4Array, talon]);
    }
    const handleRemove = (talon) => {
        const newList = listFileT4Array.filter((t) => t !== talon);
        setListFileT4Array(newList);
      }
    
      const handleUpdate = (index, talon) => {
        const newList = [...listFileT4Array];
        newList[index] = talon;
        setListFileT4Array(newList);
      }
    
      const checkOk = async (e) => {
            if(fileList.length>1){ 
                message.warning('Impossible de soumettre plusieurs fichiers.'); 
               return;
            }
            var fileSize = Math.round((fileList[0].size / 1024));
    
            if(fileSize>= 4096){
                message.warning("Taille maximal de fichier recommandé : 4 mo");
               return;
            }

            setIsModalVisible(false);
            setColorDot("green");

      }
    
      const props = {
        multiple: true,
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);   
          let obj = listFileT4Array.find(data => data.id === item.id);  
          if(obj!=null) handleRemove(obj);
        },
        beforeUpload: (file) => {
          setFileList([...fileList, file]);
          let obj = listFileT4Array.find(data => data.id === item.id);
          var fichier = new Fichier(item.id, file,file.name.split('.').pop(),1);
          if(obj!=null){
              var index_of_item = listFileT4Array.indexOf(obj)
              handleUpdate(index_of_item, fichier);
          }else{
          handleAdd(fichier);
          }
          return false;
        },
        fileList,
      };
    return (
        <>
                 <Badge dot  color={colorDot}>
                 <Button type="default" onClick={()=>showModal()} icon={<UploadOutlined />}>Choisir feuillet T4 </Button>
                </Badge>  
                        <Modal
                            title="Modal 1000px width"
                            centered
                            visible={isModalVisible} 
                            width={500}
                            footer={null}
                            maskClosable={false}
                            onCancel={handleCancel}
                            title="Sélectionner un feuillet T4"
                        >
                           <div className="col-xl-12 col-sm-12 col-12 mb-4">
                            <div className="row">
                                <div className="col-xl-8 col-sm-12">
      
                                    <Upload {...props}   accept=".png,.pdf" >
                                        <Button icon={<UploadOutlined />}>Choisir le fichier</Button>
                                        </Upload>
                                
                                    </div>
                                    <div className="col-xl-4 col-sm-12">
                                    <Button
                                        type="primary"
                                        disabled={fileList.length === 0}   
                                        onClick={checkOk} 
                                        > Continuer
                                        </Button>

                                
                                    </div>
                            </div>
                        </div>
                           
                        </Modal>
        </>
    );

}

const ModalFicheImpot = ({ item  }) =>{

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [employeItem, setEmployeItem] = useState(item.employe);
    const [fileList, setFileList] = useState([]);
    const [colorDot, setColorDot] = useState("#ffffff");

  const [listFileArray, setListFileArray] = useGlobalState('listFile');

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleCancel = () => {
        let obj = listFileArray.find(data => data.id === item.id);  
        if(obj!=null) handleRemove(obj);
        setFileList([]);
        setColorDot("#ffffff");
        setIsModalVisible(false);
      };

      const handleAdd = (talon) => {
        setListFileArray([...listFileArray, talon]);
    }
    const handleRemove = (talon) => {
        const newList = listFileArray.filter((t) => t !== talon);
        setListFileArray(newList);
      }
    
      const handleUpdate = (index, talon) => {
        const newList = [...listFileArray];
        newList[index] = talon;
        setListFileArray(newList);
      }
    
      const checkOk = async (e) => {
            if(fileList.length>1){ 
                message.warning('Impossible de soumettre plusieurs fichiers.'); 
               return;
            }
            var fileSize = Math.round((fileList[0].size / 1024));
    
            if(fileSize>= 4096){
                message.warning("Taille maximal de fichier recommandé : 4 mo");
               return;
            }

            setIsModalVisible(false);
            setColorDot("green");

      }
    
      const props = {
        multiple: true,
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);   
          let obj = listFileArray.find(data => data.id === item.id);  
          if(obj!=null) handleRemove(obj);
        },
        beforeUpload: (file) => {
          setFileList([...fileList, file]);
          let obj = listFileArray.find(data => data.id === item.id);
          var fichier = new Fichier(item.id, file,file.name.split('.').pop(),0);
          if(obj!=null){
              var index_of_item = listFileArray.indexOf(obj)
              handleUpdate(index_of_item, fichier);
          }else{
          handleAdd(fichier);
          }
          return false;
        },
        fileList,
      };
    return (
        <>
                 <Badge dot  color={colorDot}>
                 <Button type="default" onClick={()=>showModal()} icon={<UploadOutlined />}>Choisir fiche impot </Button>
                </Badge>  
                        <Modal
                            title="Modal 1000px width"
                            centered
                            visible={isModalVisible} 
                            width={500}
                            footer={null}
                            maskClosable={false}
                            onCancel={handleCancel}
                            title="Sélectionner une fiche d'impot"
                        >
                           <div className="col-xl-12 col-sm-12 col-12 mb-4">
                            <div className="row">
                                <div className="col-xl-8 col-sm-12">
      
                                    <Upload {...props}   accept=".png,.pdf" >
                                        <Button icon={<UploadOutlined />}>Choisir le fichier</Button>
                                        </Upload>
                                
                                    </div>
                                    <div className="col-xl-4 col-sm-12">
                                    <Button
                                        type="primary"
                                        disabled={fileList.length === 0}   
                                        onClick={checkOk} 
                                        > Continuer
                                        </Button>

                                
                                    </div>
                            </div>
                        </div>
                           
                        </Modal>
        </>
    );

}


const ButtonSendRow= ({ item }) => {
    const [listFileT4Array, setListFileT4Array] = useGlobalState('listFileT4');
    const [listFileArray, setListFileArray] = useGlobalState('listFile');

    const [loader,setLoader ] = useState(false);
    
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

    const UploadFile = async (id) => {
        let obj = listFileArray.find(data => data.id === id); 
        let objT4 = listFileT4Array.find(data => data.id === id); 
        console.log("objT4", objT4);
        console.log("obj", obj);

        if(obj==null && objT4==null) {
            message.error("Aucun fichier selectionner"); 
            return;
        }

           setLoader(true);
        
             var promiseArray = [], promiseArrayT4 = [];

            if(obj !=null)   promiseArray.push( sendFileToserver(obj));

            if(objT4 !=null)  promiseArrayT4.push( sendFileToserver(objT4));

           await  axios.all(promiseArray.concat(promiseArrayT4)).then(axios.spread((...responses) => {
            setLoader(false);
            const newList = listFileArray.filter((t) => t !== obj);
            setListFileArray(newList);
            const newListT4 = listFileT4Array.filter((t) => t !== objT4);
            setListFileT4Array(newListT4);
            message.success("Document(s) soumis avec succès.");       
        
          })).catch(errors => {
            setLoader(false);   
            message.error("Une erreur est survenu lors de l'envoie des documents. Veuillez réessayez.");     
            console.log(errors);
          });        
    }
   
  return (
    <>
   <Popconfirm  placement="left" title={"Voulez-vous soumettre ces fichiers ?"} onConfirm={()=>UploadFile(item.id)} okText="Oui" cancelText="Non">

     <Button loading={loader}  type="primary" icon={<Save size={14} />}>Envoyer </Button>
     </Popconfirm>

    </>
                            
  );
}



export default FicheImpot;