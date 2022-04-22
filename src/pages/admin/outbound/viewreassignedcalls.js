import React, { useState,useEffect } from 'react';
import SweetAlert from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Breadcrumb from '../../commonComponent/common/breadcrumb';
import bookingImage from '../../../assets/images/booking.jpg';
import { Container, Row, Col, Card, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import ConnectionInstance from '../../apisettings/ConnectionInstance';
import { useHistory } from 'react-router';

let DefaultdateField='';
const ViewReAssignedCalls = () => {
    const[CallingId, setCallingId] = useState(localStorage.CallingId == undefined ? "" : localStorage.CallingId);
    const [LoginId, setLoginId] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
    const [UserTypeId, setUserTypeId] = useState(localStorage.UserType == undefined ? "" : localStorage.UserType);
    const[isSubmitting,setisSubmitting]=useState(false);
    const [textComment, settextComment] = useState("");

    const navigate = useHistory();

    const[Sldate,setSldate]=useState("");
    const[Sltime,setSltime]=useState("");
    const[CallstatusDLL,SetCallstatusDLL]=useState(0);
    const[CallSummaryresult,setCallSummaryresult]=useState(null);
    const[CallCommentresult,setCallCommentresult]=useState(null);
const[Dbresult,setDbresult]=useState(null);
    const [ErrorPopUp, setErrorPopUp] = useState(0);
    const [ModalBodyHtml, SetModalBodyHtml] = useState("");
    const [errorModal, setErrorModal] = useState(false);
      useEffect(() => {
        asyncFunBindAddAssignedCallAdminId();
       asyncFunBindCallSummaryDetailById();
    }, []);

    const [visible, setVisible] = useState(false);

    const [modify, setModify] = useState(false);
    const [sms, setSms] = useState(false);
    const [booking, setBooking] = useState(false);

    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }

    const updateHandler = () => {
        setModal(!modal);
        SweetAlert.fire({ title: "Success!", text: "Data has been updated!", icon: "success" });
    }

    const modifyHandler = () => {
        setModal(!modal);
        setModify(true);
        setSms(false);
        setBooking(false);
    }

    const smsHandler = () => {
        setModal(!modal);
        setModify(false);
        setSms(true);
        setBooking(false);
    }

    const bookHandler = () => {
        setModal(!modal);
        setModify(false);
        setSms(false);
        setBooking(true);
    }

 

    async function asyncFunBindAddAssignedCallAdminId() {

        try {

            let url = ConnectionInstance + 'OutboundCalling/GetCallCentreAssignedAdminViewCallingId';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: { CallingId: `${CallingId}` }
            };
            let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;

                // let data = await response.data;
                if (data.Success == true) {
                    let ds = data.Data;
                    if (ds != null) {
                   await setDbresult(data.Data);

                    }
                }
                else {
                    let Errtext = <p><div className='text-required'> no record found </div></p>;
                    SetModalBodyHtml(Errtext);
                    setModal(!modal);
                    setErrorModal(true);
                    console.log('no record found');
                }

                //setUserData(data.map((option) =>(<option value={option.sNo}>{option.ename}</option>)));
                // do something with data
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
            console.log(error);
            let Errtext = <p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
            SetModalBodyHtml(Errtext);
            setModal(!modal);
            setErrorModal(true);
            //alert(error);
        }
    }
   
/********** Previous Interaction  ***********/

    async function asyncFunBindCallSummaryDetailById() {
        try {

            let url = ConnectionInstance + 'OutboundCalling/GetCallCentreCallSummaryCallId';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: { CallingId: `${CallingId}` }
            };
            let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;

                // let data = await response.data;
                if (data.Success == true) {
                    let ds = data.Data;
                    if (ds != null) {
                   await setCallSummaryresult(data.Data);

                    }
                }
                else {
                //     let Errtext = <p><div className='text-required'> no record found </div></p>;
                //     SetModalBodyHtml(Errtext);
                //     setModal(!modal);
                //    setErrorModal(true);
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
            console.log(error);
            let Errtext="";
                    Errtext =<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
                SetModalBodyHtml(Errtext);
                setModal(!modal);
                setErrorModal(true);
            //alert(error);
        }
    }
 
    const  SaveCommentFun= async (textComment) => {

        try {
            if (textComment && CallingId) {

                let url = ConnectionInstance + 'OutboundCalling/SETOutBoundCallCommentDetails';
                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: { CallingId: `${CallingId}`,AddedBy: `${LoginId}`,Comment: textComment }
                };
                setisSubmitting(true);
                let response = await axios(options);
                let responseOK = response && response.status == 200;
                if (responseOK) {
                    let data = response.data;
                    if(data.Success==true && data.Data=="2000")
                    {
                        asyncFunBindCallCommentDCallingId();  
                        SweetAlert.fire({ title: "Success!", text: "Comment has been saved successfully!", icon: "success" }); 
                            
                    }
                    else{
                         if(data.ErrorList!=null && data.ErrorList.length>0)
                         {
                           
                            SweetAlert.fire({ title: "Server Inaccessible!", text: data.ErrorList[0].errorMsg, icon: "error" });
                         }
                    }
                }
                else {

                    SweetAlert.fire({ title: "Server Inaccessible!", text: "You may not be connected to a network or Unable to connect to a server", icon: "error" });

                }
            }
            else {

                if (!textComment) {
                    SweetAlert.fire({ title: "Required!", text: "Please Required Comment", icon: "warning" });
                }
            }

        } catch (error) {

            console.log(error.message);
            SweetAlert.fire({ title: "Server Inaccessible!", text: "You may not be connected to a network or Unable to connect to a server", icon: "error" });
        }
        settextComment("");  
        setisSubmitting(false);
    }

    async function asyncFunBindCallCommentDCallingId() {
        try {

            let url = ConnectionInstance + 'OutboundCalling/GetCallCentreCallOutboundCommentDetails';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: { CallingId: `${CallingId}` }
            };
            let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;

                // let data = await response.data;
                if (data.Success == true) {
                    let ds = data.Data;
                    if (ds != null) {
                   await setCallCommentresult(data.Data);

                    }
                }
                else {
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
            console.log(error);
            let Errtext="";
                    Errtext =<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
                SetModalBodyHtml(Errtext);
                setModal(!modal);
                setErrorModal(true);
            //alert(error);
        }
    }
    const backHandler = () => {
       navigate.push('/admin/outbound/reassignedcalls');
    }
    const onSubmitLoginHandler = (e) => {
        e.preventDefault();
        SaveCommentFun(textComment);
       
    }
    useEffect(() => {
        asyncFunBindCallCommentDCallingId();
        }, [CallCommentresult]);
 
    return (
        <>
            <Breadcrumb title="Assigned Call" parent="Outbound Calls" />
            <div className='container-fluid'>


                <div className='row'>
                    <div className='col-md-8'>
                        <div className="card">
                            {Dbresult!=null?  <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-6 col-lg-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Customer Name</b></label>
                                            <span className="form-control-plaintext" >{Dbresult.CustomerName==null?'N/A':Dbresult.CustomerName}</span>
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-lg-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Mobile</b></label>
                                            <span className="form-control-plaintext" >{Dbresult.CustomerMobile==null?'N/A':Dbresult.CustomerMobile}</span>
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-lg-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Source</b></label>
                                            <span className="form-control-plaintext" >{Dbresult.CASourceCategory==null?'N/A':Dbresult.CASourceCategory}{' - '}{Dbresult.CASourceName==null?'N/A':Dbresult.CASourceName}</span>
                                        </div>
                                    </div>
                                    <div className='col-md-6 col-lg-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Purpose</b></label>
                                            <span className="form-control-plaintext" >
                                            { 
                                           
                                           (() => {
                                          switch (Dbresult.CallTypeId) {
                                          case "1":
                                              return <>{'New Call'}{' - '}{Dbresult.MPurposeName==null?'N/A':Dbresult.MPurposeName}</>;
                                          case "2":
                                            return <>{'Follow Up'}{' - '}{Dbresult.MPurposeName==null?'N/A':Dbresult.MPurposeName}</>;
                                            case "3":
                                                return <>{'Complaint'}{' - '}{Dbresult.MPurposeName==null?'N/A':Dbresult.MPurposeName}</>;
                                          default:
                                              return null
                                          }
                                      })()

                                           }
                                            {/* {Dbresult.CallTypeId==1?'New Call':'Follow Up'}{' - '} {Dbresult.MPurposeName==null?'N/A':Dbresult.MPurposeName} */}
                                               </span>
                                        </div>
                                    </div>
                                </div>
                            </div>:null}

                            <div className="card-footer text-center">
                                <button className="btn btn-primary mr-1"onClick={backHandler} >Previous</button>
                                {/* <button className="btn btn-secondary" onClick={modifyHandler}>Modify Personal Detail</button> */}
                            </div>
                        </div>

                        <div className="card pageDivDisble">
                        
                        <div className='card-header pb-0'>
                            <h5>Home Collection</h5>
                        </div>
                        <div className='pageUnderConstruction'>
                        <h1 >Under Development</h1>
                        </div>
                        <div className="card-body">
                        
                            <div className='row justify-content-between'>
                                <div className='col-md-6 col-lg-5'>
                                    <div className="form-group">
                                        <label className="col-form-label">Location</label>
                                        <input className="form-control" type="text" />
                                    </div>
                                    <div className="form-group text-center">
                                        <button className="btn btn-secondary btn-sm" type="button" onClick={bookHandler}>Book Appointment</button>
                                    </div>
                                </div>
                                <div className='col-md-6 col-lg-5'>
                                    <div className="form-group">
                                        <label className="col-form-label">Radiology Location</label>
                                        <input className="form-control" type="text" />
                                    </div>
                                    <div className="form-group text-center">
                                        <button className="btn btn-secondary btn-sm" type="button" onClick={bookHandler}>Book Appointment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card pageDivDisble">
                        <div className='card-header pb-0'>
                            <h5>Report</h5>
                        </div>
                        <div className='pageUnderConstruction'>
                        <h1 >Under Development</h1>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className='thead-light'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>UHID/Lab No.</th>
                                                    <th>Patient</th>
                                                    <th>Invoice No./ Invoice Date </th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className='text-center' colSpan="6">No Data Found</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="card pageDivDisble">
                        <div className='card-header pb-0'>
                            <h5>Sample Quotation</h5>
                        </div>
                        <div className='pageUnderConstruction'>
                        <h1 >Under Development</h1>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-md-6 col-lg-4'>
                                    <div className="form-group">
                                        <label className="col-form-label">Patient Type</label>
                                        <select className="form-control">
                                            <option value="0">---Select---</option>
                                            <option value="1">Walk-in</option>
                                            <option value="2">Corporate</option>
                                            <option value="3">Government</option>
                                            <option value="4">Insurance</option>
                                            <option value="5">B2B</option>
                                            <option value="6">IPD</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-6 col-lg-4'>
                                    <div className="form-group">
                                        <label className="col-form-label">Rate Type</label>
                                        <select className="form-control">
                                            <option value="0">---Select---</option>
                                            <option value="1">Standard</option>
                                            <option value="2">Rate 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-12 col-lg-4'>
                                    <div className="form-group">
                                        <label className="col-form-label">Add Test</label>
                                        {/* <input className="form-control" type="text" /> */}
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" />
                                            <div className="input-group-append">
                                                <button className="btn btn-secondary" type="button"><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                   
                                    {/* <div className='auto'>
                                        <div className="form-group">
                                            <label className="col-form-label">&nbsp;</label>
                                            <div><i class="fa fa-plus-square icRight"></i></div>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </div>


                    </div>{/** en col-md-8 */}

                    <div className='col-md-4'>
                    <Row>
                    <Col md={12}>
                        <Card>
                        <div className='card-header pb-0'>
                                        <h5>Comment Summary</h5>
                                    </div>
                            <Card.Body>
                                <Form >
                                    <Form.Row className="justify-content-center">

                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="Notes">Comment</Form.Label>
                                                <textarea className="form-control"  id="txtComment" name="txtComment" rows="3"  value={textComment}
                                                            onChange={e => settextComment(e.target.value)} ></textarea>
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                   
                            
                                    <div className='row text-center'>
                                            <div className="col-md-12">
                                            <button className="btn btn-primary btn-sm" type="button"disabled={isSubmitting} onClick={(e) => {onSubmitLoginHandler(e) }}  >Submit</button>
                                            </div>
                                        </div>
                                        <hr />
                                </Form>
                            </Card.Body>
                            <div className="card-body">
                                    {CallCommentresult!=null &&CallCommentresult.length>0?
                                  CallCommentresult.map((tb1,index) => {
                                        return (
                                       <>
                                       
                                        <div className="row">
                                            <div className="col-md-6 col-6"><strong>{tb1.UserName}</strong></div>
                                            <div className="col-md-6 col-6 text-right text-muted">{tb1.CommentDate}</div>
                                            <div className="col-md-12 m-t-5">
                                                <p className='mb-0'><em><b>Comment:</b>{tb1.Comment}</em></p>
                                                </div>
                                            {/* {(tb.CFollowUpDate!="")?<div className="col-md-12 m-t-5">
                                                
                                                <p className='mb-0 text-right'><em><b>Follow Up Date:</b>{tb.CFollowUpDate!=null &&tb.CFollowUpTime!=null?tb.CFollowUpDate +' | '+ tb.CFollowUpTime:tb.CFollowUpDate}</em></p>
                                            </div>:null} */}
                                        </div>
                                        <hr />
                                   
                                       </> )})
                                    
                                   :null }
                                    </div>
                        </Card>
                    </Col>
                </Row>


                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-header pb-0'>
                                        <h5>Previous Interactions</h5>
                                    </div>
                                    <div className="card-body">
                                    {CallSummaryresult!=null &&CallSummaryresult.length>0?
                                   CallSummaryresult.map((tb,index) => {
                                        return (
                                       <>
                                       
                                        <div className="row">
                                            <div className="col-md-6 col-6"><strong>{tb.UserName}</strong></div>
                                            <div className="col-md-6 col-6 text-right text-muted">{tb.CFollowUpDate}</div>
                                            <div className="col-md-12 m-t-5">
                                                <p className='mb-0'><em><b>Notes:</b>{tb.Notes}</em></p>
                                                {/* <p className='mb-0 text-success'><b>Solution:</b> Report has been collected</p> */}
                                                </div>
                                            {(tb.CFollowUpDate!="")?<div className="col-md-12 m-t-5">
                                                
                                                <p className='mb-0 text-right'><em><b>Follow Up Date:</b>{tb.CFollowUpDate!=null &&tb.CFollowUpTime!=null?tb.CFollowUpDate +' | '+ tb.CFollowUpTime:tb.CFollowUpDate}</em></p>
                                                {/* <p className='mb-0 text-success'><b>Solution:</b> Report has been collected</p> */}
                                            </div>:null}
                                        </div>
                                        <hr />
                                   
                                       </> )})
                                    
                                   :null }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>



            <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                {modify ?
                    <>
                        <ModalHeader toggle={toggleModal}>Edit Personal Detail</ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label">Customer Name:</label>
                                    <input className="form-control" type="text" value="Manish" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Mobile:</label>
                                    <input className="form-control" type="text" value="9953685212" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="recipient-name">Gender:</label>
                                    <select className="form-control">
                                        <option value="0">---Select---</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">State:</label>
                                    <select className="form-control">
                                        <option value="0">---Select---</option>
                                        <option value="1">State 1</option>
                                        <option value="2">State 2</option>
                                        <option value="3">State 3</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">City:</label>
                                    <select className="form-control">
                                        <option value="0">---Select---</option>
                                        <option value="1">City 1</option>
                                        <option value="2">City 2</option>
                                        <option value="3">City 3</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Pincode:</label>
                                    <input className="form-control" type="text" />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button color="primary" onClick={updateHandler}>Update</Button>
                        </ModalFooter>
                    </>
                    : null}

                {sms ?
                    <>
                        <ModalHeader toggle={toggleModal}>Send SMS</ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label">Message:</label>
                                    <textarea className="form-control" rows="5"></textarea>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button color="primary" onClick={toggleModal}>Send SMS</Button>
                        </ModalFooter>
                    </>
                    : null}

                {booking ?
                    <>
                        <ModalHeader toggle={toggleModal}>Book Appointment</ModalHeader>
                        <ModalBody>
                            <p>
                                <img className="img-fluid" src={bookingImage} alt="" />
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button color="primary" onClick={toggleModal}>Submit</Button>
                        </ModalFooter>
                    </>
                    : null}

            </Modal>

            {errorModal &&
                <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>

                    {ModalBodyHtml}

                      
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

export default ViewReAssignedCalls;