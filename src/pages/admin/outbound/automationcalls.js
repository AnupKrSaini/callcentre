import React, { useEffect, useState,useRef,Fragment,createRef} from 'react';
import Breadcrumb from '../../commonComponent/common/breadcrumb';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert2';
import axios from 'axios';
import ConnectionInstance from '../../apisettings/ConnectionInstance';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DataTables from '../../commonComponent/DataTable/DataTables';
import NoRecordFounds from '../../commonComponent/DataTable/NoRecordFounds';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import CallToolTip from '../../UI/ToolTips/CallToolTip';
import { analytics } from 'firebase';
import ViewToolTip from '../../UI/ToolTips/ViewToolTip';
import EditToolTip from '../../UI/ToolTips/EditToolTip';
 import { useHistory } from 'react-router';

const  AutoCallList=[];
const AutomationCalls = () => {

    const[currentStep,SetcurrentStep]=useState(1);
    const [TeamMData, SetTeamMData] = useState(0);
    const[UserLogin,SetUserLogin]=useState(1);
    const [ModalBodyHtml, SetModalBodyHtml] = useState("");
    const[ManageOutBound,SetManageOutBound]=useState(null);
     const[SelectDS,setSelectDS]=useState(null);
     const navigate=useHistory();
     const [LoginId, setLoginId] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
    const [PageHelper, SetPageHelper] = useState({
        PageNo: '1',
        PageSize: '10',
        TotalRecord: 0,
        dsAssignedCallDlists: []

    });

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
            asyncFunBindAutomatedCallDetails(page, sizePerPage);
            document.getElementsByClassName('dropdown-menu show')[0].classList.remove('show')
        },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
            asyncFunBindAutomatedCallDetails(page, sizePerPage);
        }
    };

    const actionFormatter = (cellData, rowData, rowIndex, extraData) => {
        //console.log(cellData, rowData);
        return <React.Fragment>
     {rowData.CFollowUpDate!="" && rowData.CTime!=""?rowData.CFollowUpDate +' | '+ rowData.CTime:rowData.CFollowUpDate}
 
        
                   {/* {<input type="checkbox" style={{ marginLeft: 90 }} checked={cellData} ></input>} */}
          

        </React.Fragment>
    }
    const ViewFormatter = (cellData, rowData, rowIndex, extraData) => {
        return <React.Fragment>
        <div >
            <ViewToolTip title="View" onClick={()=>viewAutocallHandler(rowData.CallingId)} />   
        </div>
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
            return { width: '9%'};
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
    // {
    //     dataField: 'MSourceName',
    //     text: 'Source'
    // },
    {
        dataField: 'CallType',
        text: 'CallType'
    },
    {
        dataField: 'CFollowUpDate',
        isDummyField: true,
        text: 'FollowUp Date',
        formatter: actionFormatter
    },
    {
        dataField: 'actions',
        isDummyField: true,
        text: 'Actions',
        formatter: ViewFormatter
        
       

    }
    ];
    

    useEffect(() => {
        asyncFunCallTeamDDL();
        setVisible(true);
    }, []);
    const [visible, setVisible] = useState(false);

    const [value, setValue] = useState('0');

    const changeHandler = (e) => {
        setValue(e.target.value);
        //alert(e.target.value);
        const s1 = e.target.value;
        if (s1 === "1" || s1 === "2" || s1 === "3") {
            setVisible(true);
        }
        if (s1 === "0") {
            setVisible(false);
        }
    }

    const viewAutocallHandler=async (CallingId) => {
            localStorage.removeItem('CallingId');
            localStorage.setItem('CallingId', CallingId);
            navigate.push(`/admin/outbound/viewassignedcalls`);
         
            // try {
    
            //     let url=ConnectionInstance+ 'OutboundCalling/UpdateCallCentreCallProcessStatusbyId';
    
            //     let options = {
            //         method: 'POST',
            //         url: url,
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json;charset=UTF-8'
            //         },
            //       data:{CallingId: `${callingid}`,AddedBy: `${LoginId}`, ProcessStatusId:`${2}`}
            //     };
    
            //     let response = await axios(options);
            //         let responseOK = response && response.status == 200;
            //         if (responseOK) {
            //             let data = response.data;
            //             // let data = await response.data;
            //             if(data.Success==true && data.Data=="2000")
            //             {
                           
            //                 setModal(false);
            //                 setErrorModal(false);
            //                 navigate.push(`/admin/outbound/addassigncalls`);
            //             }
            //             else{
            //                  if(data.ErrorList!=null && data.ErrorList.length>0)
            //                  {
            //                     let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
            //                     SetModalBodyHtml(Errtext);
            //                      setModal(!modal);
            //                      setErrorModal(true);
            //                  }
    
            //             }
    
    
            //         }
            //         else{
            //             console.log('no record found');
    
            //         }
            //      // return data;
            //     } catch (error) {
            //         console.log(error.message);
            //         let Errtext="";
            //             Errtext =<p><div className='text-required'>{error.message} </div></p>;
            //         SetModalBodyHtml(Errtext);
            //         setModal(!modal);
            //         setErrorModal(true);
            //      }
           
          
        

     }
    const searchHandler = (event) => {
        event.preventDefault();
        setVisible(true);
    }

    const assignHandler = () => {
        toggleModal(); 
        setErrorModal(true);
        formik.handleSubmit();
        // alert(JSON.stringify(SelectDS));
        //console.log(JSON.stringify(SelectDS));
       // SweetAlert.fire({ title: "Success!", text: "Calls have been Assigned Successfully!", icon: "success" });
    }
 /********** Modals  ***********/
 const [modal, setModal] = useState();
 const toggleModal = () => {
     setModal(!modal)
 }
 const[ErrorPopUp, setErrorPopUp]=useState(0);
 const [errorModal, setErrorModal] = useState(false);

 /********** Validations  ***********/
 const formik = useFormik({
    initialValues: {
        TeamId: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
        // email: Yup.string().email('Invalid email address').required('Required'),
        TeamId: Yup.string().transform(v => v=== '0' ? '' : v)
        .required('Team is Required')
    }),

    onSubmit:  async (values) => {
    
       
       if(SelectDS!=null)
       { 
           
        setModal(false);
         setErrorModal(false);
         SetModalBodyHtml("");
        try {

            let url=ConnectionInstance+ 'OutboundCalling/SETCallingAutoAssignedDetails';

            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
              data:{TeamId: `${values.TeamId}`,AddedBy: `${LoginId}`,TblcallList:SelectDS}
            };

            let response = await axios(options);
                let responseOK = response && response.status == 200;
                if (responseOK) {
                    let data = response.data;
                    // let data = await response.data;
                    if(data.Success==true && data.Data=="2000")
                    {
                       
                        SweetAlert.fire({ title: "Success!", text: "Calls have been Assigned Successfully!", icon: "success" });
                        asyncFunBindAutomatedCallDetails(1, 10);
                        setModal(false);
                        setErrorModal(false);
                        formik.resetForm();
                      
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
       }
       else{
        let Errtext=<p><div className='text-required'>Selection call required </div></p>;
        SetModalBodyHtml(Errtext);
        setErrorModal(true);
        setModal(true);
       
       }
     
    },
});
    async function asyncFunCallTeamDDL() {
        
        try {

            let url = ConnectionInstance + 'master/GetCallCentreTeamDDList';
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
                    let ds =data.Data;
                    if (ds != null && ds.length > 0) {
                        SetTeamMData(ds.map((option) => (<option value={option.TeamID}>{option.TeamName}</option>)));
                 setModal(false);
                setErrorModal(false);
                    }
                }
                else {
                    let Errtext = <p><div className='text-required'> no record found </div></p>;
                    SetModalBodyHtml(Errtext);
                    setModal(!modal);
                    setErrorModal(true);
                  
                    // modelpopUp(toggleModal,Errtext); 
                    console.log('no record found');
                }
            }
            else {
              
                let Errtext = <p><div className='text-required'> no record found </div></p>;
               
                SetModalBodyHtml(Errtext);
                setModal(!modal);
                setErrorModal(true);
              
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
       
    }
    useEffect(() => {
        asyncFunBindAutomatedCallDetails(1, 10);
    }, [PageHelper]);

    async function  asyncFunBindAutomatedCallDetails(PageNo, PageSize,SourceCatId) {
        try {
         
        let url=ConnectionInstance+ 'OutboundCalling/GetCallCentreAssignedAutomatedCalls';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: {  PageNo: `${PageNo}`, PageSize: `${PageSize}` }
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
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (rowData, isSelect, rowIndex, e) => {
            const AutoCallListArr=[];
            let fiterArr;
           // setSelectDS(null); 
            const AutoCallRow={
                'CallingId':rowData.CallingId
            }
            if(isSelect)
             {
              
                if(SelectDS!=null && SelectDS.length>0)
                 {

                     let fiter=SelectDS.filter((item)=>{

                         return  item.callingid!=rowData.callingid
                      });
                      if(fiter.length==0)
                      {
                        
                        //AutoCallList.push(AutoCallRow);
                        SelectDS.push(AutoCallRow);
                      }
                 }
                 else{
                    setSelectDS([AutoCallRow]);
                 }
            
                //alert(rowData.CallingId +'Status:'+ isSelect)
             }
             else{
                if(SelectDS!=null && SelectDS.length>0)
                {
                    fiterArr=SelectDS.filter((item)=>{
                 
                        return  item.CallingId!=rowData.CallingId
                     });
                }
                //alert(rowData.CallingId+'|Status:'+isSelect); 
                setSelectDS(fiterArr); 
             }
            
            //  if(isSelect)
            //  {
            //     const AutoCallRow={
            //         'CallingId':rowData.CallingId,
            //         'CheckedItem':isSelect
            //     }
            
            //     alert(rowData.CallingId +'Status:'+ isSelect)
            //  }
            //  else{
            //     alert(rowData.CallingId+'|Status:'+isSelect); 
            //  }
            //  const AutoCallRow={
            //     'CallingId':rowData.CallingId,
            //     'CheckedItem':isSelect
            // }
            //  AutoCallList.push(AutoCallRow);
            
         
            // if (SOME_CONDITION) {
            //   return false;
            // }
        },
        onSelectAll: ( isSelect,rowData, e) => {
            setSelectDS(null);
            const  AutoCallListSelectedAll=[];
            if (isSelect) {
                if(rowData.length>0)
                {
                   for(let i=0;i<rowData.length; i++)
                   {
                       const AutoCallRow={
                           'CallingId':rowData[i].CallingId,
                       }
                       AutoCallListSelectedAll.push(AutoCallRow);
                      // alert( rowData[i].CallingId +'-:Status:'+ isSelect)
                   }
                   setSelectDS(AutoCallListSelectedAll); 
                }
               //return this.props.myReducer.myDataItems.map( row => row.DATA_TABLE1 );
            }
                 
               
           
           
            
            
            // if(isSelect)
            // {
            //      if(rowData.length>0)
            //      {
            //         for(let i=0; i<rowData.length; i++)
            //         {
            //             alert( rowData[i].CallingId +'-:Status:'+ isSelect)
            //         }
            //      }
               
              
            // }
          }
      };
    
    return (
        <>
            <Breadcrumb title="Follow Up Calls" parent="Admin" />

            <Container fluid>

                {/* <Row>
                    <Col md={12}>
                        <Card>
                          
                            <Card.Body>
                                <Form>
                                    <Form.Row className="justify-content-around">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control type="date" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Purpose</Form.Label>
                                                <Form.Control as="select">
                                                    <option>---select---</option>
                                                    <option>New Call</option>
                                                    <option>Follow up Call</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Source Type</Form.Label>
                                                <Form.Control as="select" value={value} onChange={changeHandler}>
                                                    <option>---select---</option>
                                                    <option value="1">Web</option>
                                                    <option value="2">Social Media</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                            <Button onClick={searchHandler}>Search</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row> */}

                {visible &&
                    <Row>
                        <Col md={12}>
                            <Card>
                                <Card.Body>
                                    <Form.Row className='justify-content-center'>
                                        <Col md={6} lg={4}>
                                        <Form.Group>
                                                <Form.Label>Team</Form.Label>
                                                <Form.Control as="select" id="TeamId" name="TeamId"  onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.TeamId}  >
                                                    <option value='0'>---select---</option>
                                                    {TeamMData}
                                                </Form.Control>
                                                {formik.touched.TeamId && formik.errors.TeamId ? (
                                                    <div className='text-required'>{formik.errors.TeamId}</div>
                                                ) : null}

                                   
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>

                                    {/* <div className="table-responsive mt15"> */}
                                    <div className="mt15">
                                    <DataTables
                                    keyField='CallingId'
                                    tableData={PageHelper.dsAssignedCallDlists}
                                    columns={columns}
                                    pagination={paginationFactory(paginationOptions)}
                                    selectRow={ selectRow }

                                // cellEdit={cellEditFactory({
                                //     mode: 'dbclick',//dbclick
                                //     blurToSave: true
                                // })}
                                // filter={filterFactory()}
                                />
                                    </div>
                                    <div className='mt15 text-center'>
                                        <Button variant='secondary' onClick={assignHandler}>Assign Calls</Button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }


            </Container>
            {
                errorModal===true?
                 (<Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>
                    <><p>{formik.touched.TeamId && formik.errors.TeamId ? (
                            <div className='text-required'>{formik.errors.TeamId}</div>
                            ) : null}</p>
                            <p>{SelectDS==null?<div className='text-required'>Selection call required</div>:''}
                            </p>
                            </> 
                     
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

export default AutomationCalls;