import React, { Fragment, useState,useEffect,useRef } from 'react'
import Breadcrumb from '../../components/common/breadcrumb';
import SweetAlert from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import DataTables from '../commonComponent/DataTable/DataTables';
import NoRecordFounds from '../commonComponent/DataTable/NoRecordFounds';

import EditToolTip from '../UI/ToolTips/EditToolTip';
import DeleteToolTip from '../UI/ToolTips/DeleteToolTip';
import ActiveToolTip from '../UI/ToolTips/ActiveToolTip';
import InactiveToolTip from '../UI/ToolTips/InactiveToolTip';


import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ConnectionInstance from '../apisettings/ConnectionInstance';
import { string } from 'yup/lib/locale';



import { Typeahead } from 'react-bootstrap-typeahead';
//import TypeaheadOne from '../../components/forms/form-widgets/typeaheadComponent/typeahead-one';





const TeamManagement = () => {

    const multiple = false
    const[PageHelper,SetPageHelper]=useState({
        PageNo:'1',
        PageSize:'10',
        TotalRecord:0,
         dsTeamManagementList:[]
     
         });
    let typeahead = useRef();  
    let edittypeahead = useRef();  
    const [CallCentreExecutiveList, setCallCentreExecutiveList] = useState([]);
    const [EditCallCentreExecutiveList, setEditCallCentreExecutiveList] = useState([]);
const[ExecutiveTyOption,SetExecutiveTyOption]=useState([]);
const[EditExecutiveTyOption,SetEditExecutiveTyOption]=useState([]);
    const[UserLogin,SetUserLogin]=useState(1);
    const[ErrorPopUp, setErrorPopUp]=useState(0);
      const[selection,setSelection]=useState(null);
      const paginationOptions = {
        
        totalSize:PageHelper.TotalRecord,
        sizePerPage:PageHelper.PageSize,
        showTotal: true,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',

         onSizePerPageChange: (sizePerPage, page,event) => {
            console.log('Size per page change!!!');
             console.log('Newest size per page:' + sizePerPage);
             console.log('Newest page:' + page);
             asyncFunBindTeamManagementDetails(page,sizePerPage);
             document.getElementsByClassName('dropdown-menu show')[0].classList.remove('show')
         },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
            asyncFunBindTeamManagementDetails(page,sizePerPage);
        }
    };
    
    useEffect(() => {
      
        asyncFunCallCentreExecutiveDDL();
    }, []);
     
    useEffect(() => {
        asyncFunBindTeamManagementDetails(1,10);
    }, []);
    const [editModal, setEditModal] = useState(false);
    
    async function  asyncFunCallCentreExecutiveDDL() {
        try {
         
        let url=ConnectionInstance+ 'master/GetCallCentreExcutiveDDList';
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {}
        };
        let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;
                // let data = await response.data;
                if(data.Success==true)
                { let ds=data.Data;
                    if(ds!=null && ds.length>0)
                    {
                        const TypeOptionDs=[];
                      
                    ds.map((option) =>{
                        const TypeOptions={
                            'id':option.UserId,
                            'name':option.UserName
                        }
                     return TypeOptionDs.push(TypeOptions);
                        });
                        setCallCentreExecutiveList(TypeOptionDs);                      
                    }
                }
                else{
                    let Errtext=<p><div className='text-required'> no record found </div></p>;
                   setErrorPopUp(Errtext);
                   setErrorModal(true);
                    console.log('no record found');
                }
               
                //setUserData(data.map((option) =>(<option value={option.sNo}>{option.ename}</option>)));
                // do something with data
            }
            else{
                let Errtext=<p><div className='text-required'> no record found </div></p>;
                setErrorPopUp(Errtext);
                setErrorModal(true);
                console.log('no record found');
            }
         // return data;
        } catch (error) {
            console.log(error);
            let Errtext=<p><div className='text-required'>{error} </div></p>;
            setErrorPopUp(Errtext);
            setErrorModal(true);
          //alert(error);
        }
      }

      async function asyncFunBindTeamManagementDetails(PageNo, PageSize) {
        try {
         
        let url=ConnectionInstance+ 'Teammanagement/GetCallCentreTeamMangementList';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {PageNo:`${PageNo}`,PageSize:`${PageSize}` }
        };
        let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;
               
                // let data = await response.data;
                if(data.Success==true)
                { let ds=data.Data;
                    if(ds!=null)
                    {
                      
                        await  SetPageHelper({
                            ...PageHelper,
                            PageSize:Number(PageSize),
                            TotalRecord:Number(ds.TotalRecord),
                            dsTeamManagementList:ds.TeamManagementList
                        });
                   
                      
                    }
                }
                else{
                    let Errtext=<p><div className='text-required'> no record found </div></p>;
                   setErrorPopUp(Errtext);
                   setErrorModal(true);
                    console.log('no record found');
                }
               
                //setUserData(data.map((option) =>(<option value={option.sNo}>{option.ename}</option>)));
                // do something with data
            }
            else{
                let Errtext=<p><div className='text-required'> no record found </div></p>;
                setErrorPopUp(Errtext);
                setErrorModal(true);
                console.log('no record found');
            }
         // return data;
        } catch (error) {
            console.log(error);
            let Errtext=<p><div className='text-required'>{error} </div></p>;
            setErrorPopUp(Errtext);
            setErrorModal(true);
          //alert(error);
        }
      }
    
   
    


    const actionFormatter = (cellData, rowData, rowIndex, extraData) => {
        //console.log(cellData, rowData);
        return <React.Fragment>
            <div>
                <EditToolTip title="Edit" onClick={()=>editHandler(rowData.TeamId)} />
                <DeleteToolTip title="Delete" onClick={()=>Displayalert(rowData.TeamId)} />
                {
                   rowData.IsActive=="False"?<InactiveToolTip title="Inactive" onClick={()=>StatusHandler(rowData.TeamId)} />: <ActiveToolTip title="Active" onClick={()=>StatusHandler(rowData.TeamId)}/>
                }
               
            </div>
        </React.Fragment>
    }

    const columns = [{
        dataField: 'TeamId',
        text: 'SNo.',
        //sort: true,
        // formatter: idFormatter,
        // onSort: (field, order) => {
        //     console.log(field, order);
        // }
    },
    {
        dataField: 'TeamName',
        text: 'TeamName'
    },
    {
        dataField: 'TeamMembers',
        text: 'Team Members'
    },
    {
        dataField: 'actions',
        isDummyField: true,
        text: 'Actions',
        formatter: actionFormatter
    }
    ]; 

    


     /********** Delete Confirm Alert  ***********/
     const Displayalert = (TeamId) => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        })
            .then((result) => {
                if (result.value && result.isConfirmed===true) {

                    CallCenterTeamDeletebyId(TeamId);
                   
                }
                else {
                    SweetAlert.fire(
                        'Your data is safe!'
                    )
                }
            })
    }

    async function  CallCenterTeamDeletebyId(TeamId) {
        try {
         
        let url=ConnectionInstance+ 'Teammanagement/DeleteCallCentreTeamById';
       
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
          data:{TeamId:TeamId}
        };
       
        let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;
                // let data = await response.data;
                if(data.Success==true && data.Data=="2000")
                { 
                    SweetAlert.fire(
                        'Deleted!',
                        'Data has been deleted.',
                        'success'
                    );
                    asyncFunBindTeamManagementDetails(1,10);
                    setErrorModal(false);

                }
                else{
                     if(data.ErrorList!=null && data.ErrorList.length>0)
                     {
                        let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                        setErrorPopUp(Errtext); 
                        setModal(!modal);
                        setErrorModal(true);
                     }
                    
                }
               
              
            }
            else{
                console.log('no record found');
                
            }
         // return data;
        } catch (error) {
            console.log(error);
          alert(error);
         }
}

    /********** Update Success Alert  ***********/
    const updateHandler = () => {
        formikEdit.handleSubmit();
        // setModal(!modal);
        // SweetAlert.fire({ title: "Success!", text: "Data has been updated!", icon: "success" });
    }

    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }


    const [errorModal, setErrorModal] = useState(false);
    const errorHandler = () => {
       
        toggleModal(); 
        setErrorModal(true);
        setEditModal(false);
    }
    const editHandler = (TeamId) => {
        asyncFunCallCentreExecutiveDDL();
       formikEdit.resetForm();
        asyncFunBindTeamGetById(TeamId);
      
    }
    async function asyncFunBindTeamGetById(TeamId) {
        try {
         
        let url=ConnectionInstance+ 'Teammanagement/GetCallCentreTeamById';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {TeamId:`${TeamId}` }
        };
        let response = await axios(options);
            let responseOK = response && response.status === 200;
            if (responseOK) {
                let data = response.data;
               
                // let data = await response.data;
                if(data.Success==true)
                { let ds=data.Data;
                    if(ds!=null)
                    { 
                        //formikEdit.values.editexecutiveName=ds.PurPoseName;
                        formikEdit.values.editteamName=ds.TeamName;
                        formikEdit.values.TeamID=ds.TeamID;
                         if(ds.ObjTeammappingList!=null && ds.ObjTeammappingList.length>0)
                         {
                            const EditTypeOptionDs=[];
                           
                            ds.ObjTeammappingList.map((option) =>{
                                const editTypeOptions={
                                    'id':option.UserId,
                                    'name':option.UserName
                                }
                             return EditTypeOptionDs.push(editTypeOptions);
                                });
                                setEditCallCentreExecutiveList(EditTypeOptionDs);  
                                
                                const TypeOptEdit=[];
                                                        
                                ds.ObjTeammappingList.map((item) =>{
                                                            const TypeOptrowsEdit={
                                                                'UserId':item.UserId
                                                            }
                                                        return TypeOptEdit.push(TypeOptrowsEdit);
                                                            });
                                                            SetEditExecutiveTyOption(TypeOptEdit); 

                         }
                         const value = (ds.ObjTeammappingList.length > 0) ?ds.ObjTeammappingList[0].UserName : '';
                         formikEdit.values.editexecutiveName=value;
                         ///formikEdit.setFieldValue('editexecutiveName', value);

                        setModal(!modal);
                        setEditModal(true);
                        setErrorModal(false);
                    }
                }
                else{
                    let Errtext=<p><div className='text-required'> no record found </div></p>;
                   setErrorPopUp(Errtext);
                   setErrorModal(true);
                    console.log('no record found');
                }
               
                //setUserData(data.map((option) =>(<option value={option.sNo}>{option.ename}</option>)));
                // do something with data
            }
            else{
                let Errtext=<p><div className='text-required'> no record found </div></p>;
                setErrorPopUp(Errtext);
                setErrorModal(true);
                console.log('no record found');
            }
         // return data;
        } catch (error) {
            console.log(error);
            let Errtext=<p><div className='text-required'>{error} </div></p>;
            setErrorPopUp(Errtext);
            setErrorModal(true);
          //alert(error);
        }
      }
   
     const StatusHandler=(TeamId)=>{
        CallCentreTeamStatusbyId(TeamId);
     }
     async function  CallCentreTeamStatusbyId(TeamId) {
        try {
         
        let url=ConnectionInstance+ 'Teammanagement/UpdateCallCentreTeamStatusById';
       
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
          data:{TeamId:TeamId}
        };
       
        let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;
                // let data = await response.data;
                if(data.Success==true && data.Data=="2000")
                { 
                    SweetAlert.fire({ title: "Success!", text: "Status has been updated!", icon: "success" });
                    asyncFunBindTeamManagementDetails(1,10);
                    setErrorModal(false);

                }
                else{
                     if(data.ErrorList!=null && data.ErrorList.length>0)
                     {
                        let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                        setErrorPopUp(Errtext); 
                        setModal(!modal);
                        setErrorModal(true);
                     }
                    
                }
               
              
            }
            else{
                console.log('no record found');
                
            }
         // return data;
        } catch (error) {
            console.log(error);
          alert(error);
         }

}



    const formik = useFormik({
        initialValues: {
            teamName: '',
            executiveName:'',
            TeamID:'0'
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            executiveName: Yup.string().required('executiveName is Required')
              ,teamName: Yup.string().max(15, 'Must be 15 characters or less')
                .required('Team Name is Required'),
              
        }),
        onSubmit:async (values) => {
            //setErrorModal(false);
            try {
                 
                let url=ConnectionInstance+ 'Teammanagement/SetUpdateTeamManagementDetails';

                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                   
                  data:{TeamID:values.TeamID,Addedby:`${UserLogin}`,TeamName:values.teamName,ObjTeammappingList:ExecutiveTyOption}
                };
                let response = await axios(options);
                    let responseOK = response && response.status ===200;
                    if (responseOK) {
                        let data = response.data;
                        // let data = await response.data;
                        if(data.Success===true && data.Data==="2000")
                        { 
                            SweetAlert.fire({ title: "Success!", text: "Team  has been Saved!", icon: "success" });
                            asyncFunBindTeamManagementDetails(1,10);
                            
                            formik.resetForm();
                            typeahead.current.clear();
                            formikEdit.resetForm();
                            //edittypeahead.current.clear();
                            setErrorModal(false);
                            setModal(!modal);
                        }
                        else if(data.Success===true && data.Data==="2")
                        {
                           
                            let Errtext=<p><div className='text-required'>Team already Exist!</div></p>;
                            setErrorPopUp(Errtext);
                            setErrorModal(true);
                          
                        }
                        else{
                             if(data.ErrorList!=null && data.ErrorList.length>0)
                             {
                                let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                                setErrorPopUp(Errtext);
                                
                                setModal(!modal);
                                setErrorModal(true);
                               
                             }
                            
                        }
                       
                      
                    }
                    else{
                        console.log('no record found');
                        
                    }
                 // return data;
                } catch (error) {
                    console.log(error);
                  alert(error);
                 }
        
               // toggleModal();
        
          
           
        },
    });
   /********** Validations  ***********/
    const formikEdit = useFormik({
        initialValues: {
            editteamName: '',
            editexecutiveName:'',
            TeamID:'0'
        },
        validationSchema: Yup.object({
            editexecutiveName: Yup.string().required('executiveName is Required')
              ,editteamName: Yup.string().max(15, 'Must be 15 characters or less')
                .required('Team Name is Required'),
              
        }),
        onSubmit:async (values) => {
            //setErrorModal(false);
            try {
                 
                let url=ConnectionInstance+ 'Teammanagement/SetUpdateTeamManagementDetails';

                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                  data:{TeamID:values.TeamID,Addedby:`${UserLogin}`,TeamName:values.editteamName,ObjTeammappingList:EditExecutiveTyOption}
                };
                let response = await axios(options);
                    let responseOK = response && response.status ===200;
                    if (responseOK) {
                        let data = response.data;
                        // let data = await response.data;
                        if(data.Success===true && data.Data==="2000")
                        { 
                            SweetAlert.fire({ title: "Success!", text: "Team  has been Updated!", icon: "success" });
                            asyncFunBindTeamManagementDetails(1,10);
                            formikEdit.resetForm();
                            edittypeahead.current.clear();
                            setErrorModal(false);
                            setModal(!modal);
                        }
                        else if(data.Success===true && data.Data==="2")
                        {
                           
                            let Errtext=<p><div className='text-required'>Team already Exist!</div></p>;
                            setErrorPopUp(Errtext);
                            setErrorModal(true);
                          
                        }
                        else{
                             if(data.ErrorList!=null && data.ErrorList.length>0)
                             {
                                let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                                setErrorPopUp(Errtext);
                                
                                setModal(!modal);
                                setErrorModal(true);
                               
                             }
                            
                        }
                       
                      
                    }
                    else{
                        console.log('no record found');
                        
                    }
                 // return data;
                } catch (error) {
                    console.log(error);
                  alert(error);
                 }
        
               // toggleModal();
        
          
           
        },
    });

    return (
        <>
            <Breadcrumb title="Team Management" parent="Admin" />


            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Row className="justify-content-center">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Executive Name</Form.Label>
                                                <Typeahead
                                                    id="executiveName" name="executiveName"
                                                    //clearButton
                                                    defaultSelected={CallCentreExecutiveList.slice(0, 5)}
                                                    labelKey="name"
                                                    multiple
                                                    ref={typeahead}
                                                    options={CallCentreExecutiveList}
                                                    value={formik.values.executiveName}
                                                     // onChange is on valid option selection (a menu click)
  onChange={option => {
      const value = (option.length > 0) ?option[0].name : '';
      formik.setFieldValue('executiveName', value);
      const TypeOpt=[];
                      
          option.map((item) =>{
                        const TypeOptrows={
                            'UserId':item.id
                        }
                     return TypeOpt.push(TypeOptrows);
                        });
                        SetExecutiveTyOption(TypeOpt);  
     // SetExecutiveTyOption(option);
   
  }}
 
  // onBlur is on leaving the control. Can be used for error checks
  onBlur={(e) => {
       if(formik.values.executiveName=='' || formik.values.executiveName==null)
   formik.setFieldTouched('executiveName',true);
    else
    //formik.setFieldTouched('executiveName',false);
    formik.errors.executiveName="";

  }}
                                                    placeholder="...Select..."
                                                />
                                                 {formik.touched.executiveName && formik.errors.executiveName ? (
                                                    <div className='text-required'>{formik.errors.executiveName}</div>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label htmlFor="purpose">Team Name</Form.Label>
                                                <Form.Control type='text' id="teamName" name="teamName"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.teamName} />
                                                    {formik.touched.teamName && formik.errors.teamName ? (
                                                    <div className='text-required'>{formik.errors.teamName}</div>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                            <Button variant='primary' type='submit' onClick={errorHandler}>Save</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header className='pb-0'>
                                <Card.Title>Team Lists</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <DataTables
                                   keyField='TeamId'
                                   tableData={PageHelper.dsTeamManagementList}
                                   columns={columns}
                                   pagination={paginationFactory(paginationOptions)}
                                  
                                   noDataIndication={NoRecordFounds}
                                // cellEdit={cellEditFactory({
                                //     mode: 'dbclick',//dbclick
                                //     blurToSave: true
                                // })}
                                // filter={filterFactory()}
                                />

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>



            {/******** Modal Popups ******* */}

            <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                {editModal &&
                    <>
                        <ModalHeader toggle={toggleModal}>Edit</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={formikEdit.handleSubmit} >
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Executive Name</Form.Label>
                                        <Typeahead
                                            id="executiveNameedit" name="executiveNameedit"
                                            //clearButton
                                            defaultSelected={EditCallCentreExecutiveList}
                                            labelKey="name"
                                            multiple
                                            ref={edittypeahead}
                                            options={CallCentreExecutiveList}
                                            value={formikEdit.values.editexecutiveName}
                                                                                  // onChange is on valid option selection (a menu click)
                                            onChange={option => {
                                            const value = (option.length > 0) ?option[0].name : '';
                                            formikEdit.setFieldValue('editexecutiveName', value);
                                            const TypeOptE=[];
                                            option.map((item) =>{
                                                            const TypeOptrowsE={
                                                                'UserId':item.id
                                                            }
                                                        return TypeOptE.push(TypeOptrowsE);
                                                            });
                                                            SetEditExecutiveTyOption(TypeOptE);  
                                            // SetExecutiveTyOption(option);

                                            }}

                                            // onBlur is on leaving the control. Can be used for error checks
                                            onBlur={(e) => {
                                            if(formikEdit.values.editexecutiveName=='' || formikEdit.values.editexecutiveName==null)
                                            formikEdit.setFieldTouched('editexecutiveName',true);
                                            else
                                            formikEdit.setFieldTouched('editexecutiveName',true);
                                            //formik.setFieldTouched('executiveName',false);
                                           // formikEdit.errors.editexecutiveName="";

                                            }}
                                            placeholder="...Select..."
                                        />
                                         {formikEdit.touched.editexecutiveName && formikEdit.errors.editexecutiveName ? (
                                            <div className='text-required'>{formikEdit.errors.editexecutiveName}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>Team Name</Form.Label>
                                        <Form.Control type='text' id="editteamName" name="editteamName"
                                                    onChange={formikEdit.handleChange}
                                                    onBlur={formikEdit.handleBlur}
                                                    value={formikEdit.values.editteamName} />
                                                    {formikEdit.touched.editteamName && formikEdit.errors.editteamName ? (
                                                    <div className='text-required'>{formikEdit.errors.editteamName}</div>
                                                ) : null}
                                        
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button variant="primary" onClick={updateHandler}>Update</Button>
                        </ModalFooter>
                    </>
                }

                {errorModal &&
                    <>
                        <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                        <ModalBody>
                    {ErrorPopUp?ErrorPopUp:  <p>
                            {formik.touched.executiveName && formik.errors.executiveName ? (
                                                    <div className='text-required'>{formik.errors.executiveName}</div>
                                                ) : null}
                                {formik.touched.teamName && formik.errors.teamName ? (
                                    <div className='text-required'>{formik.errors.teamName}</div>
                                ) : null}
                            </p>}
                          

                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button variant="primary" onClick={toggleModal}>Ok</Button>
                        </ModalFooter>
                    </>
                }
            </Modal>


        </>
    )
}

export default TeamManagement;