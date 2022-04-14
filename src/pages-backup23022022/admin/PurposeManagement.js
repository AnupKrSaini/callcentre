import React, { Fragment, useState,useEffect } from 'react'
import Breadcrumb from '../../components/common/breadcrumb';
import SweetAlert from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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


const PurposeManagement = () => {
    const [CallTypeData, setCallTypeData] = useState(0);
    const[ErrorPopUp, setErrorPopUp]=useState(0);
    const[PageHelper,SetPageHelper]=useState({
   PageNo:'1',
   PageSize:'3',
   TotalRecord:0,
    dsPurposeList:[]

    });
     const[PurposeDs, SetPurposeDs]=useState({
        editpurpose:"",
        editcallType:"",
        purposeId:""
     });
    
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
             asyncFunBindPurposeDetails(page,sizePerPage);
             document.getElementsByClassName('dropdown-menu show')[0].classList.remove('show')
         },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
           
            asyncFunBindPurposeDetails(page,sizePerPage);
        }
    };
    
   
    useEffect(() => {
        asyncFunCallTypeDDL();
    }, []);
    
    async function asyncFunCallTypeDDL() {
        try {
         
        let url=ConnectionInstance+ 'master/GetCallTypeDetailsDDList';
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
                   setCallTypeData(ds.map((option) =>(<option value={option.CallTypeId}>{option.CallType}</option>)));   
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

     
    
    
      
      useEffect(() => {
        asyncFunBindPurposeDetails(1,3);
    }, []);
  
    async function asyncFunBindPurposeDetails(PageNo, PageSize) {
        try {
         
        let url=ConnectionInstance+ 'master/GetCallCentrePurposeList';
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
                            dsPurposeList:ds.callCentrePurposeList
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
                <EditToolTip title="Edit" onClick={()=>editHandler(rowData.PurposeId)} />
                <DeleteToolTip title="Delete" onClick={()=>Displayalert(rowData.PurposeId)} />
                {
                   rowData.IsActive=="False"?<InactiveToolTip title="Inactive" onClick={()=>StatusHandler(rowData.PurposeId)} />: <ActiveToolTip title="Active" onClick={()=>StatusHandler(rowData.PurposeId)}/>
                }
               
            </div>
        </React.Fragment>
    }


    const columns = [{
        dataField: 'PurposeId',
        text: 'SNo.',
        //sort: true,
        // formatter: idFormatter,
        // onSort: (field, order) => {
        //     console.log(field, order);
        // }
    },
    {
        dataField: 'CallType',
        text: 'Call Type'
    },
    {
        dataField: 'PurPoseName',
        text: 'Purpose'
    },
    {
        dataField: 'actions',
        isDummyField: true,
        text: 'Actions',
        formatter: actionFormatter
    }
    ];

   


    /********** Delete Confirm Alert  ***********/
    const Displayalert = (PurposeId) => {
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

                    CallCenterPurposeDeletebyId(PurposeId);
                   
                }
                else {
                    SweetAlert.fire(
                        'Your data is safe!'
                    )
                }
            })
    }

    async function  CallCenterPurposeDeletebyId(PurposeId) {
        try {
         
        let url=ConnectionInstance+ 'master/DeleteCallCentrePurposeById';
       
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
          data:{PurposeId:PurposeId}
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
                    asyncFunBindPurposeDetails(1,3);
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
  

    //alert(JSON.stringify(values, null, 2));
}

    /********** Update Success Alert  ***********/
    const updateHandler = () => {
        formikEdit.handleSubmit();
        // setModal(!modal);
        // SweetAlert.fire({ title: "Success!", text: "Data has been updated!", icon: "success" });
    }



    /********** Modals  ***********/
    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }

    const [errorModal, setErrorModal] = useState();
    const errorHandler = () => {
        toggleModal(); 
        setErrorModal(true);
        setEditModal(false);
       // setModal(true);
       // setErrorModal(true);
       // setEditModal(false);
    }

    const [editModal, setEditModal] = useState(false);
    const editHandler = (PurposeId) => {
        asyncFunBindPurposeGetById(PurposeId);
       
    }
     const StatusHandler=(purposeId)=>{
        CallCenterPurposeStatusbyId(purposeId);
     }
     async function  CallCenterPurposeStatusbyId(PurposeId) {
        try {
         
        let url=ConnectionInstance+ 'master/UpdateCallCentrePurposeStatusById';
       
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
          data:{PurposeId:PurposeId}
        };
       
        let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;
                // let data = await response.data;
                if(data.Success==true && data.Data=="2000")
                { 
                    SweetAlert.fire({ title: "Success!", text: "Status has been updated!", icon: "success" });
                    asyncFunBindPurposeDetails(1,3);
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
  

    //alert(JSON.stringify(values, null, 2));
}



    /********** Validations  ***********/
    const formik = useFormik({
        initialValues: {
            // email: '',
            purpose: '',
            callType: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            // email: Yup.string().email('Invalid email address').required('Required'),
            callType: Yup.string().transform(v => v=== '0' ? '' : v)
            .required('Call Type is Required'),
            purpose: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Purpose is Required'),
        }),
      
        onSubmit:  async (values) => {
                try {
                 
                let url=ConnectionInstance+ 'master/SetCallCentrePurposeDetail';
               
                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                  data:{ CallTypeId:values.callType, PurposeName:values.purpose}
                };
               
                let response = await axios(options);
                    let responseOK = response && response.status == 200;
                    if (responseOK) {
                        let data = response.data;
                        // let data = await response.data;
                        if(data.Success==true && data.Data=="2000")
                        { 
                            SweetAlert.fire({ title: "Success!", text: "Purpose has been Saved!", icon: "success" });
                            asyncFunBindPurposeDetails(1,3);
                            setErrorModal(false);
                            formik.resetForm();
                            formikEdit.resetForm();

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
          
        
            //alert(JSON.stringify(values, null, 2));
        },
    });
    

    useEffect(() => {
           
            paginationOptions.totalSize=PageHelper.TotalRecord;
            paginationOptions.PageSize=PageHelper.PageSize;
            console.log(PageHelper.TotalRecord);
        }, []);

        
    /********** Validations  ***********/
    const formikEdit = useFormik({
        initialValues: {
            // email: '',
            editpurpose: '',
            editcallType: '',
            purposeId:'0'
        },
        validationSchema: Yup.object({
            // email: Yup.string().email('Invalid email address').required('Required'),
            editcallType: Yup.string().transform(v => v=== '0' ? '' : v)
                .required('Call Type is Required'),
                editpurpose: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Purpose is Required'),
        }),
      
        onSubmit:  async (values) => {
                try {
                 
                   
                let url=ConnectionInstance+ 'master/UpdateCallCentrePurposeById';
               
                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                  data:{PurposeId:values.purposeId, CallTypeId:values.editcallType, PurposeName:values.editpurpose}
                };
               
                let response = await axios(options);
                    let responseOK = response && response.status == 200;
                    if (responseOK) {
                        let data = response.data;
                        // let data = await response.data;
                        if(data.Success==true && data.Data=="2000")
                        { 
                            setModal(!modal);
                            SweetAlert.fire({ title: "Success!", text: "Data has been updated!", icon: "success" });
                            asyncFunBindPurposeDetails(1,3);
                            formikEdit.resetForm();
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
          
        
            //alert(JSON.stringify(values, null, 2));
        },
    });
    
        async function asyncFunBindPurposeGetById(PurposeId) {
            try {
             
            let url=ConnectionInstance+ 'master/GetCallCentrePurposeById';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {PurposeId:`${PurposeId}` }
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
                            formikEdit.values.editpurpose=ds.PurPoseName;
                            formikEdit.values.editcallType=ds.CallTypeId;
                            formikEdit.values.purposeId=ds.PurposeId;
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
         
    return (
        
        <>
            <Breadcrumb title="Purpose Management" parent="Admin" />


            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Row className="justify-content-center">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Call Type</Form.Label>
                                                <Form.Control as="select" id="callType" name="callType"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.callType}>
                                                        <option value='0'>---select---</option>
                                                             {CallTypeData}
                                                </Form.Control>

                                                {formik.touched.callType && formik.errors.callType ? (
                                                    <div className='text-required'>{formik.errors.callType}</div>
                                                ) : null}

                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label htmlFor="purpose">Purpose</Form.Label>
                                                <Form.Control type='text' id="purpose" name="purpose"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.purpose} />

                                                {formik.touched.purpose && formik.errors.purpose ? (
                                                    <div className='text-required'>{formik.errors.purpose}</div>
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
                                <Card.Title>Purpose Lists</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <DataTables
                                    keyField='PurposeId'
                                    tableData={PageHelper.dsPurposeList}
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




            {editModal &&
                <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Edit</ModalHeader>
                   
                    <ModalBody>
                   
                    <Form >
                    <Form.Row>
                            <Col md={12}>
                            <Form.Group>
                                                <Form.Label>Call Type</Form.Label>
                                                <Form.Control as="select" id="editcallType" name="editcallType"
                                                    onChange={formikEdit.handleChange}
                                                    onBlur={formikEdit.handleBlur}
                                                    value={formikEdit.values.editcallType}>
                                                        <option value='0'>---select---</option>
                                                             {CallTypeData}
                                                </Form.Control>

                                                {formikEdit.touched.editcallType && formikEdit.errors.editcallType ? (
                                                    <div className='text-required'>{formikEdit.errors.editcallType}</div>
                                                ) : null}

                                            </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group>
                                <Form.Label htmlFor="editpurpose">Purpose</Form.Label>
                                                <Form.Control type='text' id="editpurpose" name="editpurpose"
                                                    onChange={formikEdit.handleChange}
                                                    onBlur={formikEdit.handleBlur}
                                                    value={formikEdit.values.editpurpose}   />

                                                {formikEdit.touched.editpurpose && formikEdit.errors.editpurpose ? (
                                                    <div className='text-required'>{formikEdit.errors.editpurpose}</div>
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
                    
                </Modal>
            }

            {errorModal &&
                <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>
                        {ErrorPopUp?ErrorPopUp:<> <p>
                            {formik.touched.callType && formik.errors.callType ? (
                                <div className='text-required'>{formik.errors.callType}</div>
                            ) : null}
                        </p>
                        <p>
                            {formik.touched.purpose && formik.errors.purpose ? (
                                <div className='text-required'>{formik.errors.purpose}</div>
                            ) : null}
                        </p></> }
                        {/* <p>
                            {formik.touched.callType && formik.errors.callType ? (
                                <div className='text-required'>{formik.errors.callType}</div>
                            ) : null}
                        </p>
                        <p>
                            {formik.touched.purpose && formik.errors.purpose ? (
                                <div className='text-required'>{formik.errors.purpose}</div>
                            ) : null}
                        </p> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button variant="primary" onClick={toggleModal}>Ok</Button>
                    </ModalFooter>
                    
                </Modal>
            }

        </>
    )
        
}

export default PurposeManagement;