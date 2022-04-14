import React, { Fragment, useState, useEffect, useRef } from 'react'
import CallToolTip from '../../UI/ToolTips/CallToolTip';
import Breadcrumb from '../../commonComponent/common/breadcrumb';
import SweetAlert from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import EditToolTip from '../../UI/ToolTips/EditToolTip';
import DeleteToolTip from '../../UI/ToolTips/DeleteToolTip';
import ActiveToolTip from '../../UI/ToolTips/ActiveToolTip';
import InactiveToolTip from '../../UI/ToolTips/InactiveToolTip';

import DataTables from '../../commonComponent/DataTable/DataTables';
import NoRecordFounds from '../../commonComponent/DataTable/NoRecordFounds';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ConnectionInstance from '../../apisettings/ConnectionInstance';
import AddAssignCalls from './addassigncalls';
import { icon } from 'leaflet';
import reactDragula from 'react-dragula';
import { useSelector, useDispatch } from 'react-redux';
import { actiontype } from '../../redux/actiontype';
import { useHistory } from 'react-router';
import { set } from 'lodash';
let SourceCatMId = 0;
let buttonclickStatus = false;
let dropclick=false;

const Assignedcalls = () => {
    const dispatch = useDispatch(); // Use it
    const navigate = useHistory();
    const [SourceCategoryData, setSourceCategoryData] = useState(0);
    const [SourceCatId, SetSourceCatId] = useState(0);
    const [ErrorPopUp, setErrorPopUp] = useState(0);
    const[buttonclick,setbuttonclick]=useState(false);
    const [ModalBodyHtml, SetModalBodyHtml] = useState("");
    const [LoginId, setLoginId] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
    const [UserTypeId, setUserTypeId] = useState(localStorage.UserType == undefined ? "" : localStorage.UserType);
    const [PageHelper, SetPageHelper] = useState({
        PageNo: '1',
        PageSize: '10',
        TotalRecord: 0,
        dsAssignedCallDlists: []

    });
    const [errorModal, setErrorModal] = useState(false);
    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }


    useEffect(() => {
        asyncFuncSourceCategoryDDL();
    }, []);

    async function asyncFuncSourceCategoryDDL() {
        try {

            let url = ConnectionInstance + 'master/GetCallCentreSourceCategoryDDList';
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
                if (data.Success == true) {
                    let ds = data.Data;

                    if (ds != null && ds.length > 0) {
                        setSourceCategoryData(ds.map((option) => (<option value={option.SourceCatId}>{option.SourceCategory}</option>)));
                    }
                }
                else {
                    let Errtext = <p><div className='text-required'> no record found </div></p>;
                    // setErrorPopUp(Errtext);
                    // setModal(!modal);
                    // setErrorModal(true);
                    console.log('no record found');
                }

            }
            else {
                let Errtext = <p><div className='text-required'> no record found </div></p>;
                setErrorPopUp(Errtext);
                setModal(!modal);
                setErrorModal(true);
                console.log('no record found');
            }
            // return data;
        } catch (error) {
            console.log(error);
            let Errtext = <p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
            setErrorPopUp(Errtext);
            setModal(!modal);
            setErrorModal(true);
            //alert(error);
        }
    }
    const paginationOptions = {

        totalSize: PageHelper.TotalRecord,
        sizePerPage: PageHelper.PageSize,
        showTotal: true,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',

        onSizePerPageChange: (sizePerPage, page, event) => {
            console.log('Size per page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
            asyncFunBindAssignedCallAdminByCatId(page, sizePerPage);
            document.getElementsByClassName('dropdown-menu show')[0].classList.remove('show')
        },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
            asyncFunBindAssignedCallAdminByCatId(page, sizePerPage);
        }
    };

    const actionFormatter = (cellData, rowData, rowIndex, extraData) => {
        //console.log(cellData, rowData);
        return <React.Fragment>

            {<CallToolTip title="Call" placement="top" id={`call${rowData.CallingId}`} onClick={() =>
                AddCallHandler(rowData.CallingId)} />}
            {/* <EditToolTip title="Edit" onClick={()=>editHandler(rowData.SourceId)} />
                  <DeleteToolTip title="Delete" onClick={()=>Displayalert(rowData.SourceId)} />
                  {
                     rowData.IsActive=="False"?<InactiveToolTip title="Inactive" onClick={()=>StatusHandler(rowData.SourceId)} />: <ActiveToolTip title="Active" onClick={()=>StatusHandler(rowData.SourceId)}/>
                  } */}

        </React.Fragment>
    }




    const columns = [{
        dataField: '#',
        text: '#',
        formatter: (cell, row, rowIndex) => {
          let rowNumber = (PageHelper.PageNo - 1) * 10 + (rowIndex + 1);
          return <span>{rowNumber}</span>;
        },
        headerStyle: (colum, colIndex) => {
            return { width: '6%'};
            }
        //sort: true,
        // formatter: idFormatter,
        // onSort: (field, order) => {
        //     console.log(field, order);
        // }
    },
    {
        dataField: 'CustomerName',
        text: 'Customer Name'
    },
    {
        dataField: 'CustomerMobile',
        text: 'Customer Mobile'
    },
    {
        dataField: 'MSourceCategory',
        text: 'Source Category'
    },
    {
        dataField: 'MPurposeName',
        text: 'Purpose'
    },
    {
        dataField: 'CallType',
        text: 'CallType'
    },
    {
        dataField: 'TeamName',
        text: 'Team'
    },
    {
        dataField: 'actions',
        isDummyField: true,
        text: 'Actions',
        formatter: actionFormatter

    }
    ];

    const drophandleChange = (e) => {
        SetSourceCatId(Number(e.target.value));
        SourceCatMId = Number(e.target.value);
        buttonclickStatus = false;
        dropclick=true;

    }
    
    const AddSearchHandler = () => {
        buttonclickStatus = true;
         asyncFunBindAssignedCallAdminByCatId(1, 10);
    }
    const AddCallHandler = async (callingid) => {
        localStorage.removeItem('CallingId');
        localStorage.setItem('CallingId', callingid);
        dispatch({
            type: actiontype.AddAssignClick, payload: localStorage.CallingId == undefined ? "" : localStorage.CallingId 
        }
        ,{
            type: actiontype.UpdateUserId, payload: localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser
        }
        ,{
            type: actiontype.UpdateUName, payload: localStorage.UName == undefined ? "" : localStorage.UName
        }
        ,{
            type: actiontype.UpdateUserTypeName, payload: localStorage.UserTypeName == undefined ? "" : localStorage.UserTypeName
        }
        ,{
            type: actiontype.UpdateUserType, payload: localStorage.UserType == undefined ? "" : localStorage.UserType
        }
        ,{
            type: actiontype.UpdatecurrentUser, payload: localStorage.currentUser == undefined ? "" : localStorage.currentUser
        }
        ,{
            type: actiontype.UpdateSession, payload: localStorage.Session == undefined ? "" : localStorage.Session
        }
        );

        
        try {

            let url=ConnectionInstance+ 'OutboundCalling/UpdateCallCentreCallProcessStatusbyId';

            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
              data:{CallingId: `${callingid}`,AddedBy: `${LoginId}`, ProcessStatusId:`${2}`}
            };

            let response = await axios(options);
                let responseOK = response && response.status == 200;
                if (responseOK) {
                    let data = response.data;
                    // let data = await response.data;
                    if(data.Success==true && data.Data=="2000")
                    {
                       
                        setModal(false);
                        setErrorModal(false);
                        navigate.push(`/admin/outbound/addassigncalls`);
                    }
                    else{
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
                    console.log('no record found');

                }
             // return data;
            } catch (error) {
                console.log(error.message);
                let Errtext="";
                    Errtext =<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
                SetModalBodyHtml(Errtext);
                setModal(!modal);
                setErrorModal(true);
             }
       
       // http://localhost:3001/admin/outbound/addassigncalls

        //window.location.href = `${process.env.PUBLIC_URL}/admin/outbound/addassigncalls`;
    }
    useEffect(() => {
        buttonclickStatus=false;
         asyncFunBindAssignedCallAdminByCatId(1, 10);
    }, []);
    useEffect(() => {
       
        if (buttonclickStatus) {
            const id = setInterval(() => {
                 asyncFunBindAssignedCallAdminByCatId(1, 10);
              }, 100);
              return () => clearInterval(id);
            }
        //PageHelper
    }, [buttonclickStatus]);
    async function asyncFunBindAssignedCallAdminByCatId(PageNo, PageSize) {
       
            try {
         
                let url=ConnectionInstance+ 'OutboundCalling/GetCallCentreAssignedCallbyAdminCatId';
                    let options = {
                        method: 'POST',
                        url: url,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        data: { UserId: `${LoginId}`, PageNo: `${PageNo}`, PageSize: `${PageSize}`, SourceCatId: `${buttonclickStatus==false?0:SourceCatMId}` }
                    };
                    let response = await axios(options);
                    let responseOK = response && response.status == 200;
                    if (responseOK) {
                        let data = response.data;
        
                        // let data = await response.data;
                        if (data.Success == true) {
                            let ds = data.Data;
                            if (ds != null) {
        
                                await SetPageHelper({
                                    ...PageHelper,
                                    PageNo:Number(PageNo),
                                    PageSize: Number(PageSize),
                                    TotalRecord: Number(ds.TotalRecord),
                                    dsAssignedCallDlists: ds.CallCentreAssignedcallList == null ? [] : ds.CallCentreAssignedcallList
                                });
        
        
                            }
                        }
                        else {
                            let Errtext = <p><div className='text-required'> no record found </div></p>;
                            setErrorPopUp(Errtext);
                            setErrorModal(true);
                            console.log('no record found');
                        }
        
                        //setUserData(data.map((option) =>(<option value={option.sNo}>{option.ename}</option>)));
                        // do something with data
                    }
                    else {
                        let Errtext = <p><div className='text-required'> no record found </div></p>;
                        setErrorPopUp(Errtext);
                        setErrorModal(true);
                        console.log('no record found');
                    }
                    // return data;
                } catch (error) {
                    console.log(error);
                    let Errtext = <p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
                    setErrorPopUp(Errtext);
                    setErrorModal(true);
                    //alert(error);
                }
        }

    

    return (
        <>
            <Breadcrumb title="Assigned Calls" parent="Outbound Calls" />
            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>

                                <Form.Row className="justify-content-center">
                                    <Col lg={4} md={6}>
                                        <Form.Group>
                                            <Form.Label>Source Category</Form.Label>
                                            <Form.Control as="select" id="sourceCategory" name="sourceCategory"
                                                onChange={drophandleChange} >
                                                <option value='0'>---select---</option>
                                                {SourceCategoryData}
                                            </Form.Control>



                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Row className='mt15'>
                                    <Col md={12} className='text-center'>
                                        <Button variant='primary' type='submit' onClick={AddSearchHandler}><i className='fa fa-search'></i> Search </Button>
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
                                <Card.Title>Assigned Outbound Call List</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                <DataTables
                                    keyField='CallingId'
                                    tableData={PageHelper.dsAssignedCallDlists}
                                    columns={columns}
                                    pagination={paginationFactory(paginationOptions)}


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

            {
                errorModal === true ?
                    (<Modal isOpen={modal} toggle={toggleModal} centered={true}>
                        <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                        <ModalBody>
                            {/* {ModalBodyHtml===null||ModalBodyHtml===''?
                        
                        (<><p>{formik.touched.sourceCategory && formik.errors.sourceCategory ? (
                            <div className='text-required'>{formik.errors.sourceCategory}</div>
                        ) : null}</p>  </> ):ModalBodyHtml }             */}
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button variant="primary" onClick={toggleModal}>Ok</Button>
                        </ModalFooter>

                    </Modal>)
                    : null
            }
        </>
    )
}

export default Assignedcalls;