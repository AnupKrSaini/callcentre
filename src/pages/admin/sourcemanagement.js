import React, { Fragment, useState,useEffect } from 'react'
import Breadcrumb from '../commonComponent/common/breadcrumb';
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




const SourceManagement = () => {
    const [SourceCategoryData, setSourceCategoryData] = useState(0);
    const[ErrorPopUp, setErrorPopUp]=useState(0);
    const[PageHelper,SetPageHelper]=useState({
   PageNo:'1',
   PageSize:'10',
   TotalRecord:0,
    dsSourceList:[]

    });
    const[SourceDs, SetSourceDs]=useState({
        editsource:"",
        editsourceCategory:"",
        sourceId:""
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
             asyncFuncBindSourceDetails(page,sizePerPage);
             document.getElementsByClassName('dropdown-menu show')[0].classList.remove('show')
         },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
            asyncFuncBindSourceDetails(page,sizePerPage);
        }
    };
   
    
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault();
        }
      }
      
   
    useEffect(() => {
        asyncFuncSourceCategoryDDL();
        // const listener = event => {
        //     if (event.code === "Enter" || event.code === "NumpadEnter") {
        //         console.log("Enter key was pressed. Run your function.");
        //         event.preventDefault();
        //         event.stopPropagation();
        //         errorHandler();
            
              
        //     }
        // };
        // document.addEventListener("keydown", listener);
        // return () => {
        //     document.removeEventListener("keydown", listener);
        // };
    }, []);
    
    async function asyncFuncSourceCategoryDDL() {
        try {
         
        let url=ConnectionInstance+ 'master/GetCallCentreSourceCategoryDDList';
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
                   setSourceCategoryData(ds.map((option) =>(<option value={option.SourceCatId}>{option.SourceCategory}</option>)));   
                    }
                }
                else{
                    let Errtext=<p><div className='text-required'> no record found </div></p>;
                   setErrorPopUp(Errtext);
                   setModal(!modal);
                   setErrorModal(true);
                    console.log('no record found');
                }
               
            }
            else{
                let Errtext=<p><div className='text-required'> no record found </div></p>;
                setErrorPopUp(Errtext);
                setModal(!modal);
                setErrorModal(true);
                console.log('no record found');
            }
         // return data;
        } catch (error) {
            console.log(error);
            let Errtext=<p><div className='text-required'>{error} </div></p>;
            setErrorPopUp(Errtext);
            setModal(!modal);
            setErrorModal(true);
          //alert(error);
        }
      }
      
      useEffect(() => {
        asyncFuncBindSourceDetails(1,10);
    }, []);
  
    async function asyncFuncBindSourceDetails(PageNo, PageSize) {
        try {
         
        let url=ConnectionInstance+ 'master/GetCallCentreSourceList';
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
                            PageNo:Number(PageNo),
                            PageSize:Number(PageSize),
                            TotalRecord:Number(ds.TotalRecord),
                            dsSourceList:ds.callCentreSourceList==null?[]:ds.callCentreSourceList
                        });
                       

                        
                    }
                }
                else{
                    let Errtext=<p><div className='text-required'> no record found </div></p>;
                   setErrorPopUp(Errtext);
                   setModal(!modal);
                   setErrorModal(true);
                    console.log('no record found');
                }
              
            }
            else{
                let Errtext=<p><div className='text-required'> no record found </div></p>;
                setErrorPopUp(Errtext);
                setModal(!modal);
                setErrorModal(true);
                console.log('no record found');
            }
         // return data;
        } catch (error) {
            console.log(error);
            let Errtext=<p><div className='text-required'>{error} </div></p>;
            setErrorPopUp(Errtext);
            setModal(!modal);
            setErrorModal(true);
          //alert(error);
        }
      }
    
      
    //   const paginationOptions = {
    //     sizePerPage: 2,
    //     showTotal: false,
    //     firstPageText: 'First',
    //     prePageText: 'Back',
    //     nextPageText: 'Next',
    //     lastPageText: 'Last',

    //     // onSizePerPageChange: (sizePerPage, page) => {
    //     //     console.log('Size per page change!!!');
    //     //     console.log('Newest size per page:' + sizePerPage);
    //     //     console.log('Newest page:' + page);
    //     // },
    //     // onPageChange: (page, sizePerPage) => {
    //     //     console.log('Page change!!!');
    //     //     console.log('Newest size per page:' + sizePerPage);
    //     //     console.log('Newest page:' + page);
    //     // }
    // };

    
    const actionFormatter = (cellData, rowData, rowIndex, extraData) => {
        //console.log(cellData, rowData);
          return <React.Fragment>
              <div>
                  <EditToolTip title="Edit" onClick={()=>editHandler(rowData.SourceId)} />
                  <DeleteToolTip title="Delete" onClick={()=>Displayalert(rowData.SourceId)} />
                  {
                     rowData.IsActive=="False"?<InactiveToolTip title="Inactive" onClick={()=>StatusHandler(rowData.SourceId)} />: <ActiveToolTip title="Active" onClick={()=>StatusHandler(rowData.SourceId)}/>
                  }
                 
              </div>
          </React.Fragment>
      }
  
  


    const columns = [{
        // dataField: 'SourceId',
        // text: 'SNo.',
        //sort: true,
        // formatter: idFormatter,
        // onSort: (field, order) => {
        //     console.log(field, order);
        // }
        dataField: '#',
        text: '#',
        formatter: (cell, row, rowIndex) => {
          let rowNumber = (PageHelper.PageNo - 1) * 10 + (rowIndex + 1);
          return <span>{rowNumber}</span>;
        }
    },
    {
        dataField: 'SourceCategory',
        text: 'Source Category'
    },
    {
        dataField: 'SourceName',
        text: 'Source Type'
    },
    {
        dataField: 'actions',
        isDummyField: true,
        text: 'Actions',
        formatter: actionFormatter
    }
    ];

   



    /********** Delete Confirm Alert  ***********/
    const Displayalert = (SourceId) => {
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

                    CallCenterSourceDeletebyId(SourceId);
                   
                }
                else {
                    SweetAlert.fire(
                        'Your data is safe!'
                    )
                }
            })
    }

  
    async function  CallCenterSourceDeletebyId(SourceId) {
        try {
         
        let url=ConnectionInstance+ 'master/DeleteCallCentreSourceById';
       
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
          data:{SourceId:SourceId}
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
                    asyncFuncBindSourceDetails(1,10);
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
 
  /********** Modals  ***********/
  const [modal, setModal] = useState();
  const toggleModal = () => {
      setModal(!modal)
  }

  const [errorModal, setErrorModal] = useState();
  const errorHandler = () => {
    formik.handleSubmit();
   
    if((formik.touched.source && formik.errors.source)||(formik.touched.sourceCategory && formik.errors.sourceCategory)||(formik.touched.source==undefined && formik.values.source=="")||(formik.touched.sourceCategory==undefined && formik.values.sourceCategory==""))
        {
           
        toggleModal();
        setErrorModal(true); 
        setEditModal(false); 
        }
     // setModal(true);
     // setErrorModal(true);
     // setEditModal(false);
  }
  

  const [editModal, setEditModal] = useState(false);
  const editHandler = (SourceId) => {
    formik.resetForm();
    formikEdit.resetForm();
      asyncFunBindSourceGetById(SourceId);
    
     
  }
   const StatusHandler=(sourceId)=>{
    CallCenterSourceStatusbyId(sourceId);
   }
   async function  CallCenterSourceStatusbyId(SourceId) {
      try {
       
      let url=ConnectionInstance+ 'master/UpdateCallCentreSourceStatusById';
     
      let options = {
          method: 'POST',
          url: url,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
          },
        data:{SourceId:SourceId}
      };
     
      let response = await axios(options);
          let responseOK = response && response.status == 200;
          if (responseOK) {
              let data = response.data;
              // let data = await response.data;
              if(data.Success==true && data.Data=="2000")
              { 
                  SweetAlert.fire({ title: "Success!", text: "Status has been updated!", icon: "success" });
                  asyncFuncBindSourceDetails(1,10);
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
        alert(error); console.log(error.message);
        let Errtext=<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
        setErrorPopUp(Errtext);
        setErrorModal(true);
       }
}




    /********** Validations  ***********/
    const formik = useFormik({
        initialValues: {
            // email: '',
            source: '',
            sourceCategory: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            // email: Yup.string().email('Invalid email address').required('Required'),
            sourceCategory: Yup.string().transform(v => v=== '0' ? '' : v)
                .required('Source Category is Required'),
            source: Yup.string()
                .required('Source Type is Required'),
        }),
        isSubmitting:true,
        onSubmit:  async (values, actions) => {
                try {
                    setModal(false);
                    setErrorModal(false);
                    setErrorPopUp(""); 
                let url=ConnectionInstance+ 'master/SetCallCentreSourceDetail';
               
                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                  data:{ SourceCatId:values.sourceCategory, SourceName:values.source}
                };
               
                let response = await axios(options);
                    let responseOK = response && response.status == 200;
                    if (responseOK) {
                        let data = response.data;
                        // let data = await response.data;
                        if(data.Success==true && data.Data=="2000")
                        { 
                            SweetAlert.fire({ title: "Success!", text: "Source has been Saved!", icon: "success" });
                            asyncFuncBindSourceDetails(1,10);
                            setErrorModal(false);
                            formik.resetForm();
                            
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
                    console.log(error.message);
                    let Errtext=<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
                    setErrorPopUp(Errtext);
                    setErrorModal(true);
                 }
          
                 setTimeout(() => {
                  
                    actions.setSubmitting(false);
                    }, 1000);
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
            editsource: '',
            editsourceCategory: '',
            sourceId:'0'
        },
        validationSchema: Yup.object({
            // email: Yup.string().email('Invalid email address').required('Required'),
            editsourceCategory: Yup.string().transform(v => v=== '0' ? '' : v)
                .required('Source Category is Required'),
            editsource: Yup.string()
                .required('Source Type is Required'),
        }),
        isSubmitting:true,
        onSubmit:  async (values) => {
                try {
                    setModal(false);
                    setErrorModal(false);
                    setErrorPopUp(""); 
                let url=ConnectionInstance+ 'master/UpdateCallCentreSourceById';
               
                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                  data:{ SourceId:values.sourceId, SourceCatId:values.editsourceCategory, SourceName:values.editsource}
                };
               
                let response = await axios(options);
                    let responseOK = response && response.status == 200;
                    if (responseOK) {
                        let data = response.data;
                        // let data = await response.data;
                        if(data.Success==true && data.Data=="2000")
                        {   setModal(!modal);
                            SweetAlert.fire({ title: "Success!", text: "Data has been updated!", icon: "success" });
                            asyncFuncBindSourceDetails(1,10);
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
                    console.log(error.message);
            let Errtext=<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
            setErrorPopUp(Errtext);
            setErrorModal(true);
                 }
          
        
            //alert(JSON.stringify(values, null, 2));
        },
    });
    async function asyncFunBindSourceGetById(SourceId) {
        try {
         
        let url=ConnectionInstance+ 'master/GetCallCentreSourceById';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {SourceId:`${SourceId}` }
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
                       
                        
                        formikEdit.values.editsource=ds.SourceName;
                        formikEdit.values.editsourceCategory=ds.SourceCatId;
                        formikEdit.values.sourceId=ds.SourceId;
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
            console.log(error.message);
            let Errtext=<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
            setErrorPopUp(Errtext);
            setErrorModal(true);
          //alert(error);
        }
      }
     
      
    
    return (
        
        <>
            <Breadcrumb title="Source Management" parent="Admin" />


            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={formik.handleSubmit}  onKeyDown={onKeyDown}>
                                    <Form.Row className="justify-content-center">
                                        <Col md={4} lg={3}>
                                            <Form.Group>
                                                <Form.Label>Source Category</Form.Label>
                                                <Form.Control as="select" id="sourceCategory" name="sourceCategory"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.sourceCategory}>
                                                        <option value='0'>---select---</option>
                                                             {SourceCategoryData}
                                                </Form.Control>

                                                {formik.touched.sourceCategory && formik.errors.sourceCategory ? (
                                                    <div className='text-required'>{formik.errors.sourceCategory}</div>
                                                ) : null}

                                            </Form.Group>
                                        </Col>
                                        <Col md={4} lg={3}>
                                            <Form.Group>
                                                <Form.Label htmlFor="source">Source Type</Form.Label>
                                                <Form.Control type='text' id="source" name="source"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.source} />

                                                {formik.touched.source && formik.errors.source ? (
                                                    <div className='text-required'>{formik.errors.source}</div>
                                                ) : null}

                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                            <Button variant='primary' type='submit'disabled={formik.isSubmitting}  onClick={errorHandler}>Save</Button>
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
                                <Card.Title>Source List</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <DataTables
                                    keyField='SourceId'
                                    tableData={PageHelper.dsSourceList}
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
                                                <Form.Label>Source Category</Form.Label>
                                                <Form.Control as="select" id="editsourceCategory" name="editsourceCategory"
                                                    onChange={formikEdit.handleChange}
                                                    onBlur={formikEdit.handleBlur}
                                                    value={formikEdit.values.editsourceCategory}>
                                                        <option value='0'>---select---</option>
                                                             {SourceCategoryData}
                                                </Form.Control>

                                                {formikEdit.touched.editsourceCategory && formikEdit.errors.editsourceCategory ? (
                                                    <div className='text-required'>{formikEdit.errors.editsourceCategory}</div>
                                                ) : null}

                                            </Form.Group>
                            </Col>
                            <Col md={12}>
                            <Form.Group>
                                                <Form.Label htmlFor="editsource">Source Type</Form.Label>
                                                <Form.Control type='text' id="editsource" name="editsource"
                                                    onChange={formikEdit.handleChange}
                                                    onBlur={formikEdit.handleBlur}
                                                    value={formikEdit.values.editsource} />

                                                {formikEdit.touched.editsource && formikEdit.errors.editsource ? (
                                                    <div className='text-required'>{formikEdit.errors.editsource}</div>
                                                ) : null}

                                            </Form.Group>
                            </Col>
                            </Form.Row>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button variant="primary" disabled={formikEdit.isSubmitting} onClick={updateHandler}>Update</Button>
                    </ModalFooter>
                </Modal>
            }

            {errorModal &&
                <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>
                        {ErrorPopUp?ErrorPopUp:<><p>
                            {formik.touched.sourceCategory && formik.errors.sourceCategory ? (
                                                    <div className='text-required'>{formik.errors.sourceCategory}</div>
                                                ) : null}
                        </p>
                        <p>
                        {formik.touched.source && formik.errors.source ? (
                                                    <div className='text-required'>{formik.errors.source}</div>
                                                ) : null}
                        </p>
                        </>}
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

export default SourceManagement;