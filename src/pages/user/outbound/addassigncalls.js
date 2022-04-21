import React, { useState,useEffect } from 'react';
import SweetAlert from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Breadcrumb from '../../commonComponent/common/breadcrumb';
import bookingImage from '../../../assets/images/booking.jpg';
import {useSelector, useDispatch} from 'react-redux'
import { useFormik, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Form} from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import ConnectionInstance from '../../apisettings/ConnectionInstance';
import LoadingButton from '../../commonComponent/Usecomponent/loadingbutton';
import { useHistory } from 'react-router';
import DatePicker from "react-datepicker";
 let  departmentValid=false;
let DefaultdateField='';
const AddAssignCalls = () => {
    const[CallingId,setCallingId] = useState(localStorage.CallingId == undefined ? "" : localStorage.CallingId);
    const [LoginId, setLoginId] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
    const [UserTypeId, setUserTypeId] = useState(localStorage.UserType == undefined ? "" : localStorage.UserType);
    const [LMobileNo, setLMobileNo] = useState(localStorage.MobileNo == undefined ? "" : localStorage.MobileNo);
    const[PBXfrom,setPBXfrom]=useState(localStorage.ExtenNo == undefined ? "" : localStorage.ExtenNo);
    const[PBXto,setPBXto]=useState("0");
    const navigate = useHistory();
    const calendarRef = React.createRef();
    const timerRef = React.createRef();
    const [inputCustomerMob, setinputCustomerMob] = useState('')
    const[Sldate,setSldate]=useState("");
    const[Sltime,setSltime]=useState("");
    const [startDate,setstartDate] = useState(new Date());
    const [startDateTime,setstartDateTime] = useState(null);

    const[CallstatusDLL,SetCallstatusDLL]=useState(0);
    const[CallDepartmentDLL,SetCallDepartmentDLL]=useState(0);
    const[CallSummaryresult,setCallSummaryresult]=useState(null);
const[Dbresult,setDbresult]=useState(null);
    const [ErrorPopUp, setErrorPopUp] = useState(0);
    const [ModalBodyHtml, SetModalBodyHtml] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const[IsLoadButton,setIsLoadButton]=useState(false);
      useEffect(() => {
       asyncFunBindAddAssignedCallUserId();
       asyncFunBindCallSummaryDetailById();
       }, []);

    const [visible, setVisible] = useState(false);
    const [Complainvisible, setComplainvisible] = useState(false);
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

    



    const [value, setValue] = useState('0');

    const changeHandler = (e) => {
        const s1 = e.target.value;
        
    if(e.target.value=='0')
    {
        
       
        formik.setFieldValue('CallStatus','');
    }
    else{
        formik.setFieldValue('CallStatus',e.target.value);
        setValue(e.target.value);
        //alert(e.target.value);
       
        }
        if(s1=="1")
        {
          setVisible(true);
          setComplainvisible(false);
           DefaultdateField="";
           startDate.setDate(startDate.getDate());
        DefaultdateField=new Date(startDate).toISOString().split("T")[0];
        setSldate(DefaultdateField);
        }
        else{
           setVisible(false);
           DefaultdateField="";
           setSltime("");
           setSldate("");

        }
         if(s1=="4")
         {
            setComplainvisible(true);
            setVisible(false);
            DefaultdateField="";
            setSltime("");
            setSldate("");
            //formik.setFieldTouched('CallStatus',false);
            //formik.errors.CallStatus="";
            //formik.setFieldValue('CallDepartment', 0);
            asyncFuncCallCentreDepartmentDDL();
        
            //formik.setFieldTouched('CallDepartment',true);
         }
         else{
           // formik.setFieldTouched('CallDepartment',false);
            //formik.errors.CallDepartment="";
            setComplainvisible(false);
         }
        // setValue(e.target.value);
        // //alert(e.target.value);
        // const s1 = e.target.value;
        //  if(s1=="1")
        //  {
        //     setVisible(true);
        //  }
        //  else{
        //     setVisible(false);  
        //  }
        // if (s1 === "1" || s1 === "3" || s1 === "4") {
        //     setVisible(true);
        // }
        // if (s1 === "2" || s1 === "5") {
        //     setVisible(false);
        // }
    }
    const handleChange = date => {
        date.setDate(date.getDate());
        DefaultdateField="";
      DefaultdateField=new Date(date).toISOString().split("T")[0];
     setSldate(DefaultdateField);
     setstartDate(date);
    };

    const handleChangeTime = (date,) => {
        date.setDate(date.getDate());
        const DefaultdateFieldTime=new Date(date).toLocaleTimeString();
         setSltime(DefaultdateFieldTime);
     setstartDateTime(date);
    };
   const departmentOnBlurhandleBlur=(e)=>{
    const s1 = e.target.value;
    if(e.target.value=='0')
    {
        
        departmentValid=true;
        formik.setFieldValue('CallDepartment','0');
    }
    else{
       
        formik.setFieldValue('CallDepartment',e.target.value);
    }
   }
    const departmentHandler = (e) => {
        const s1 = e.target.value;
    if(e.target.value=='0')
    {
        
        departmentValid=true;
        formik.setFieldValue('CallDepartment',e.target.value);
    }
    else{
        departmentValid=false;
        formik.setFieldValue('CallDepartment',e.target.value);
      
       
        }
      
    }
    async function asyncFunBindAddAssignedCallUserId() {
        try {

            let url = ConnectionInstance + 'OutboundCalling/GetCallCentreAssignedUserCallingId';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: { UserId: `${LoginId}`, CallingId: `${CallingId}` }
            };
            let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;

                // let data = await response.data;
                if (data.Success == true) {
                    let ds = data.Data;
                    if (ds != null) {
                        setPBXto(ds.CustomerMobile);
                   await setDbresult(data.Data);

                    }
                }
                else {
                    let Errtext = <p><div className='text-required'> no record found </div></p>;
                    SetModalBodyHtml(Errtext);
                    setErrorModal(true);
                    console.log('no record found');
                }

                //setUserData(data.map((option) =>(<option value={option.sNo}>{option.ename}</option>)));
                // do something with data
            }
            else {
                let Errtext = <p><div className='text-required'> no record found </div></p>;
                SetModalBodyHtml(Errtext);
                setErrorModal(true);
                console.log('no record found');
            }
            // return data;
        } catch (error) {
            console.log(error.message);
            let Errtext = <p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
            SetModalBodyHtml(Errtext);
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
                    // let Errtext = <p><div className='text-required'> no record found </div></p>;
                    // SetModalBodyHtml(Errtext);
                    // setErrorModal(true);
                    console.log('no record found');
                }
            }
            else {
                let Errtext = <p><div className='text-required'> no record found </div></p>;
                SetModalBodyHtml(Errtext);
                setErrorModal(true);
                console.log('no record found');
            }
            // return data;
        } catch (error) {
            console.log(error.message);
            let Errtext = <p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
            SetModalBodyHtml(Errtext);
            setErrorModal(true);
            //alert(error);
        }
    }
 /********** Validations  ***********/
 const formik = useFormik({
    initialValues: {
        Notes: '',
        CallStatus: '',
     
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
        // email: Yup.string().email('Invalid email address').required('Required'),
        CallStatus: Yup.string().transform(v => v=== '0' ? '' : v)
        .required('Call Status is Required'),
        Notes: Yup.string().required('Notes is Required')
       
    }),
    isSubmitting:true,
    onSubmit:  async (values) => {
     
    //   setModal(false);
    //   setErrorModal(false);
    if(departmentValid==false)
    {
        try {

            let url=ConnectionInstance+ 'OutboundCalling/SetUpdateCallCentreCallInterActionDetails';

            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
              data:{CallingId: `${CallingId}`,AddedBy: `${LoginId}`, FollowUpDate:`${Sldate}`,FollowUpTime:`${Sltime}`, Notes:values. Notes, CallStatusId:values.CallStatus,DeptId:`${values.CallDepartment}`}
            };

            let response = await axios(options);
                let responseOK = response && response.status == 200;
                if (responseOK) {
                    let data = response.data;
                    // let data = await response.data;
                    if(data.Success==true && data.Data=="2000")
                    {
                       
                        SweetAlert.fire({ title: "Success!", text: "Update  and close call has been successfully!", icon: "success" });
                        setModal(false);
                        setErrorModal(false);
                        setModify(false);
                        localStorage.removeItem('CallingId');
                        navigate.push('/user/outbound/assignedcalls');
                        formik.resetForm();
                      
                    }
                    else{
                         if(data.ErrorList!=null && data.ErrorList.length>0)
                         {
                            let Errtext=<p><div className='text-required'>{data.ErrorList[0].errorMsg} </div></p>;
                            SetModalBodyHtml(Errtext);
                             setModal(!modal);
                             setErrorModal(true);
                             setModify(false);
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
           
    },
});
useEffect(() => {
    asyncFuncCallStatusDDL();
}, []);

async function asyncFuncCallStatusDDL() {
    try {

        let url = ConnectionInstance + 'master/GetCallStatusDDList';
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
                    SetCallstatusDLL(ds.map((option) => (<option value={option.CallStatusId}>{option.CallStatus}</option>)));
                }
            }
            else {
                let Errtext = <p><div className='text-required'> no record found </div></p>;
                SetModalBodyHtml(Errtext);
                setModal(!modal);
                setErrorModal(true);
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
        //alert(error);
    }
}

async function asyncFuncCallCentreDepartmentDDL() {
    try {

        let url = ConnectionInstance + 'master/GetCallCentredepartmentDDList';
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
                    SetCallDepartmentDLL(ds.map((option) => (<option value={option.DeptId}>{option.Department}</option>)));
                }
            }
            else {
                let Errtext = <p><div className='text-required'> no record found </div></p>;
                SetModalBodyHtml(Errtext);
                setModal(!modal);
                setErrorModal(true);
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
        //alert(error);
    }
}


    const errorHandler = () => {
        formik.handleSubmit();
        //formik.errors.CallDepartment="";
       // formik.setFieldTouched('CallDepartment',true);
         if(formik.values.CallStatus=="4")
         {

            if((formik.values.CallDepartment==undefined || formik.values.CallDepartment==""||formik.values.CallDepartment=="0"))
            {
                departmentValid=true;
              
          }
         }
         else{
            formik.setFieldValue('CallDepartment', '');
            departmentValid=false;
            // formik.values.errors.removeItem('CallDepartment');
           // formik.errors.removeItem('CallDepartment');
            //formik.setFieldTouched('CallDepartment',false);
            //formik.errors.CallDepartment="";
            //formik.setFieldTouched('CallDepartment',true);
          }
      if((formik.touched.CallStatus && formik.errors.CallStatus)|| (formik.touched.Notes && formik.errors.Notes)||(formik.touched.Notes==undefined && formik.values.Notes=="") ||(formik.touched.CallStatus==undefined && formik.values.CallStatus==""))
        {
            toggleModal();
            setErrorModal(true); 
        }
         if(departmentValid==true)
         {
            toggleModal();
            setErrorModal(true); 
         }
        
        
    }
    const PBXClicktoCallHandler=()=>{
        asyncFunBindCallingEditmob();
        
     }
     async function asyncFunBindCallingEditmob() {
        if(Dbresult!=null)
        {
            setPBXto(Dbresult.CustomerMobile);
          setModal(!modal);
          setModify(true);
          setErrorModal(false);
        }                  
    
    }
    const changeCustMobHandle=(e) => {
    setPBXto(e.target.value);
    }
    const updateMobHandler = () => {
    setModal(!modal);
    if (PBXto==""||PBXto.length<8) {
    SweetAlert.fire({ title: "Incomplete Mobile", text: "Please enter correct mobile no.", icon: "warning" });
    }
    else{
    
    asyncFunCustomerMobileUpdate();
    }
    
    }
    
    async function asyncFunCustomerMobileUpdate()
    {
    try {
    
    setModal(false);
    setErrorModal(false);
    setErrorPopUp(""); 
    let url=ConnectionInstance+ 'outboundcalling/SETUPDATEOutboundCallCustomerMobByID';
    
    let options = {
    method: 'POST',
    url: url,
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
    },
    data:{ CallingId: `${CallingId}`,CustomerMobile:`${PBXto}`,ModifiedBy:`${LoginId}`}
    };
    
    let response = await axios(options);
    let responseOK = response && response.status == 200;
    if (responseOK) {
    let data = response.data;
    // let data = await response.data;
    if(data.Success==true && data.Data=="2000")
    { 
      setModal(false);
      asyncFunclicktocallpbx();
      asyncFunBindAddAssignedCallUserId();
     
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
    async function asyncFunclicktocallpbx() {
        try {
            setIsLoadButton(true);
            let url=ConnectionInstance+ 'pbxcall/pbxclicktocalls';
    
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
              data:{CallingId: `${CallingId}`,AddedBy: `${LoginId}`, PBXfrom:`${PBXfrom}`,PBXto:`${PBXto}` }
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
                        SweetAlert.fire({ title: "Success!", text: "call connected has been successfully!", icon: "success" });
                      }, 3000);
                       
                       
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

   
  
    
    const openDatepicker = () => this._calendar.setOpen(true);
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
                                            { <span className="form-control-plaintext" >{Dbresult.CustomerMobile==null?'N/A':Dbresult.CustomerMobile}</span>}
                                            {/* <span className="form-control-plaintext" >{Dbresult.CustomerMobile==null?'N/A':Dbresult.CustomerMobile}</span> */}
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
                            { IsLoadButton ? <LoadingButton variantName='primary' cssName="mr-2" btntext={' Connecting...'} /> : <button className="btn btn-primary mr-1" onClick={PBXClicktoCallHandler}><i className='fa fa-headphones'></i> Click to Call</button>}
                                {/* <button className="btn btn-primary mr-1"><i className='fa fa-headphones'></i> Click to Call</button> */}
                                {/* <button className="btn btn-secondary" onClick={modifyHandler}>Modify Personal Detail</button> */}
                            </div>
                        </div>

                        <div className="card">
                            <div className='card-header pb-0'>
                                <h5>Home Collection</h5>
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

                        <div className="card">
                            <div className='card-header pb-0'>
                                <h5>Report</h5>
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

                        <div className="card">
                            <div className='card-header pb-0'>
                                <h5>Sample Quotation</h5>
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
                                        <h5>Call Summary</h5>
                                    </div>
                            <Card.Body>
                                <Form >
                                    <Form.Row className="justify-content-center">

                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label htmlFor="Notes">Notes<span className='text-required'>*</span> </Form.Label>
                                                <textarea className="form-control"  id="Notes" name="Notes" rows="3"  onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.Notes}></textarea>
                                                {formik.touched.Notes && formik.errors.Notes ? (
                                                    <div className='text-required'>{formik.errors.Notes}</div>
                                                ) : null}

                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label>Call Status</Form.Label>
                                                <Form.Control as="select" id="CallStatus" name="CallStatus"
                                                    onChange={changeHandler}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.CallStatus}>
                                                        <option value='0'>---select---</option>
                                                            {CallstatusDLL}
                                                </Form.Control>

                                                {formik.touched.CallStatus && formik.errors.CallStatus ? (
                                                    <div className='text-required'>{formik.errors.CallStatus}</div>
                                                ) : null}

                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    {visible &&
                                                <>
                                                    {/* <div className='col-md-4'>
                                                        <div className="form-group">
                                                            <label className="col-form-label">Priorty</label>
                                                            <select className="form-control">
                                                                <option value="0">---Select---</option>
                                                                <option value="1">High</option>
                                                                <option value="2">Medium</option>
                                                                <option value="3">Low</option>
                                                            </select>
                                                        </div>
                                                    </div> */}
                                                    <div className='col-md-12'>
                                                        <div className="form-group">
                                                            <label className="col-form-label">Follow Up Date</label>
                                                            {/* <input className="form-control digits" type="datetime-local"  defaultValue={DefaultdateField} onChange={SelectDateHandler} /> */}
                                                            {<div className='dateIcon'>
                                                                <DatePicker className="form-control digits"  selected={startDate} onChange={handleChange}   dateFormat="dd-MM-yyyy" ref={calendarRef} />
                                                                <i className='fa fa-calendar' onClick={() => {calendarRef.current.setOpen(true)}}></i>
                                                            </div>}
                                                        </div>
                                                    </div>

                                                    <div className='col-md-12'>
                                                        <div className="form-group">
                                                            <label className="col-form-label">Preferred  Time</label>
                                                            {/* <input className="form-control digits" type="datetime-local"  defaultValue={DefaultdateField} onChange={SelectDateHandler} /> */}
                                                            { <div className='dateIcon'>
                                                                <DatePicker className="form-control digits" selected={startDateTime} onChange={handleChangeTime} showTimeSelect
                                                                    showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa"  ref={timerRef}    />
                                                                    <i className='fa fa-clock-o' onClick={() => { timerRef.current.setOpen(true) }}></i>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {Complainvisible &&<>
                                                <Col md={12}>
                                            <Form.Group>
                                                <Form.Label>Department</Form.Label>
                                                <Form.Control as="select" id="CallDepartment" name="CallDepartment"
                                                    onChange={departmentHandler}
                                                    onBlur={departmentOnBlurhandleBlur}
                                                    value={formik.values.CallDepartment}>
                                                        <option value='0'>---select---</option>
                                                            {CallDepartmentDLL}
                                                </Form.Control>

                                                {departmentValid==true ? (
                                                    <div className='text-required'>Department is Required</div>
                                                ) : null}

                                            </Form.Group>
                                        </Col>
                                            </>

                                            }


                                    <div className='row text-center'>
                                            <div className="col-md-12">
                                            <button className="btn btn-primary btn-sm" type="button" disabled={formik.isSubmitting} onClick={errorHandler} >Update and Close Call</button>
                                                {/* <button class="btn btn-primary btn-sm mr-1" type="button" onClick={smsHandler}>Send SMS</button>
                                                <button class="btn btn-secondary btn-sm" type="button">Submit</button> */}
                                            </div>
                                        </div>
                                </Form>
                            </Card.Body>
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
                                            {/* <div className="col-md-6 col-6 text-right text-muted">{tb.CFollowUpDate}</div> */}
                                            <div className="col-md-6 col-6 text-right text-muted">{tb.AddedOn}</div>
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
                    <ModalHeader toggle={toggleModal}>Edit Customer Mobile Detail</ModalHeader>
                    <ModalBody>
                        <form>
                            {/* <div className="form-group">
                                <label className="col-form-label">Customer Name:</label>
                                <input className="form-control" type="text" value="Manish" disabled />
                            </div> */}
                            <div className="form-group">
                                <label className="col-form-label">Mobile:</label>
                               
                            </div> <input className="form-control" type="text"  id='txtcustmobile'   value={PBXto} onChange={changeCustMobHandle}   name='txtcustmobile'  />
                           
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button color="primary" onClick={updateMobHandler}>Update and Calling</Button>

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

                    {ModalBodyHtml===null||ModalBodyHtml===''?
                        
                        (<><p>  {formik.touched.Notes && formik.errors.Notes ? (
                            <div className='text-required'>{formik.errors.Notes}</div>
                        ) : null}</p>
                            <p>
                            {formik.touched.CallStatus && formik.errors.CallStatus ? (
                                                    <div className='text-required'>{formik.errors.CallStatus}</div>
                                                ) : null}
                            </p>
                            <p>
                            {departmentValid==true  ? (
                                                    <div className='text-required'>Department is Required</div>
                                                ) : null}
                            </p>
                            </> ):ModalBodyHtml }

                      
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

export default AddAssignCalls;