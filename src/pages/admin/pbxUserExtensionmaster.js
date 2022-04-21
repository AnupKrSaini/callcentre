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
import LoadingButton from '../commonComponent/Usecomponent/loadingbutton';

import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ConnectionInstance from '../apisettings/ConnectionInstance';
import { string } from 'yup/lib/locale';
import { number } from 'yup';


const PbxUserExtensionmaster = () => {
    const [ModalBodyHtml, SetModalBodyHtml] = useState("");
    const[ErrorPopUp, setErrorPopUp]=useState(0);
    const[IsLoadButton,setIsLoadButton]=useState(false);
    const[PageHelper,SetPageHelper]=useState({
   PageNo:'1',
   PageSize:'10',
   TotalRecord:0,
    dsPBXUserList:[]

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
            asyncFunBindPBXExtensionUsers(page,sizePerPage);
             document.getElementsByClassName('dropdown-menu show')[0].classList.remove('show')
         },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
           
           asyncFunBindPBXExtensionUsers(page,sizePerPage);
        }
    };
    
      
      useEffect(() => {
       asyncFunBindPBXExtensionUsers(1,10);
    }, []);
  
    async function asyncFunBindPBXExtensionUsers(PageNo, PageSize) {
        try {
         
        let url=ConnectionInstance+ 'pbxcall/GetpbxExtensionUsersmaster';
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
                            dsPBXUserList:ds.objpbxUserExtensionLists==null?[]:ds.objpbxUserExtensionLists
                        });
                   
                      
                    }
                }
                else{
                    let Errtext=<p><div className='text-required'> no record found </div></p>;
                   setErrorPopUp(Errtext);
                   setErrorModal(true);
                    console.log('no record found');
                }
               
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
    
   
  
    
    const actionFormatter = (cellData, rowData, rowIndex, extraData) => {
      //console.log(cellData, rowData);
        return <React.Fragment>
            <div>
                <DeleteToolTip title="Delete" onClick={()=>Displayalert(rowData.PBXExtUId)} />
            </div>
        </React.Fragment>
    }


    const columns = [{
        // dataField: 'PurposeId',
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
        },
    },
    
    {
        dataField: 'ext',
        text: 'ext'
    },
    {
        dataField: 'username',
        text: 'username'
    },
    {
        dataField: 'callerid',
        text: 'callerid'
    },
    {
        dataField: 'registername',
        text: 'registername'
    },
    
    {
        dataField: 'email',
        text: 'email'
    },
    {
        dataField: 'status',
        text: 'status'
    },
    {
        dataField: 'LastSyncDate',
        text: 'LastSyncDate'
    },
    {
        dataField: 'actions',
        isDummyField: true,
        text: 'Actions',
        formatter: actionFormatter
    }
    ];

   


    /********** Delete Confirm Alert  ***********/
    const Displayalert = (PBXExtUId) => {
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

                PBXExtensionUsersDeletedById(PBXExtUId);
                   
                }
                else {
                    SweetAlert.fire(
                        'Your data is safe!'
                    )
                }
            })
    }
    async function PBXExtensionUsersDeletedById(PBXExtUId) {
        try {
         
        let url=ConnectionInstance+ 'pbxcall/DeletePBXExtensionUsersbyId';
       
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
          data:{PBXExtUId:PBXExtUId}
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
                    asyncFunBindPBXExtensionUsers(1,10);
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
  
}
 

    /********** Modals  ***********/
    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }

    const [errorModal, setErrorModal] = useState();
    


    useEffect(() => {
           
            paginationOptions.totalSize=PageHelper.TotalRecord;
            paginationOptions.PageSize=PageHelper.PageSize;
            console.log(PageHelper.TotalRecord);
        }, []);

        const PBXExtensionUsersHandler=()=>{
            asyncFunPBXExtensionUser();
         }
        async function   asyncFunPBXExtensionUser() {
            try {
                setIsLoadButton(true);
                let url=ConnectionInstance+ 'pbxcall/SyncpbxUserExtensionList';
        
                let options = {
                    method: 'GET',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                  data:{ }
                };
        
                let response = await axios(options);
                    let responseOK = response && response.status == 200;
                    if (responseOK) {
                        let data = response.data;
                        // let data = await response.data;
                        if(data.Success==true)
                        {
                           
                            setTimeout(() => {
                            setIsLoadButton(false);
                            asyncFunBindPBXExtensionUsers(1,10);
                            SweetAlert.fire({ title: "Success!", text: "Latest Sync data has been successfully!", icon: "success" });
                          }, 2000);
                        
                           
                           
                            setModal(false);
                            setErrorModal(false);
                          
                        }
                        else{
                            setIsLoadButton(false);
                             if(data.ErrorList!=null && data.ErrorList.length>0)
                             {
                                let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                                SetModalBodyHtml(Errtext);
                                 setModal(!modal);
                                 setErrorModal(true);
                             }
        
                        }
        
        
                    }
                    else{
                        setIsLoadButton(false);
                        console.log('no record found');
        
                    }
                 // return data;
                } catch (error) {
                    setIsLoadButton(false);
                    console.log(error.message);
                    let Errtext="";
                        Errtext =<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
                    SetModalBodyHtml(Errtext);
                    setModal(!modal);
                    setErrorModal(true);
                 }
        }
      
    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault();
        }
      }
    return (
        
        <>
            <Breadcrumb title="PBX Extension Users" parent="Admin" />

            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                              
                                    <Form.Row className="justify-content-center">
                                       
                                    </Form.Row>
                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                        { IsLoadButton ? <LoadingButton variantName='primary' cssName="mr-2" btntext={' Loading...'} /> : <button className="btn btn-primary mr-1" onClick={PBXExtensionUsersHandler}>Last Sync Data</button>}
                                        </Col>
                                    </Form.Row>
                              
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header className='pb-0'>
                                <Card.Title>PBX Extension Users List </Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <DataTables
                                    keyField='PBXExtUId'
                                    tableData={PageHelper.dsPBXUserList}
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




            {errorModal &&
                <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>
                        {ErrorPopUp?ErrorPopUp:<> 
                        <p>
                            {/* {formik.touched.callType && formik.errors.callType ? (
                                <div className='text-required'>{formik.errors.callType}</div>
                            ) : null} */}
                        </p>
                        <p>
                    
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

export default PbxUserExtensionmaster;