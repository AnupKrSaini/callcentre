import React, { Fragment, useState,useEffect,useRef } from 'react'
import CallToolTip from '../../UI/ToolTips/CallToolTip';
import Breadcrumb from '../common/breadcrumb';
import SweetAlert from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import ConnectionInstance from '../../apisettings/ConnectionInstance';
import { useHistory } from 'react-router';


const unAssignedViewHandler = () => {
    window.location.href = `${process.env.PUBLIC_URL}/user/outbound/unassignedcalls`;
}
const UserAssignedLists = () => {

     const navigate=new useHistory();
    const[ErrorPopUp, setErrorPopUp]=useState(0);
     const[ModalBodyHtml,SetModalBodyHtml]=useState("");
 const[LoginId, setLoginId] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
 const[UserTypeId, setUserTypeId] = useState(localStorage.UserType == undefined ? "" : localStorage.UserType);
    const[PageHelper,SetPageHelper]=useState({
        PageNo:'1',
        PageSize:'10',
        TotalRecord:0,
         dsAssignedCallDlists:[]
     
         });
         const [errorModal, setErrorModal] = useState(false);
         const [modal, setModal] = useState();
         const toggleModal = () => {
             setModal(!modal)
         }
     

    useEffect(() => {
        asyncFunBindAssignedCallsByUsers(1,10);
    }, [PageHelper]);
    

    async function asyncFunBindAssignedCallsByUsers(PageNo, PageSize) {
        try {
      
        let url=ConnectionInstance+ 'OutboundCalling/GetCallCentreAssignedCallListByUserId';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {UserId:`${LoginId}`, PageNo:`${PageNo}`,PageSize:`${PageSize}` }
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
                            dsAssignedCallDlists:ds.CallCentreAssignedcallList
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
            let Errtext=<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
            setErrorPopUp(Errtext);
            setErrorModal(true);
          //alert(error);
        }
      }
    //   const AddCallHandler = () => {
    //     window.location.href = `${process.env.PUBLIC_URL}/user/outbound/addassigncalls`;
    // }
    
      const AddCallHandler = async (callingid) => {
        localStorage.removeItem('CallingId');
        localStorage.setItem('CallingId', callingid);
     

        
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
                        navigate.push(`/user/outbound/addassigncalls`);
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

    const assignedViewHandler = () => {
        navigate.push(`/user/outbound/assignedcalls`);
        //window.location.href = `${process.env.PUBLIC_URL}/user/outbound/assignedcalls`;
    }
    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            {/* <th scope="col">Executive Name</th>
                            <th scope="col">Executive Number</th> */}
                            <th scope="col">Customer Name</th>
                            <th scope="col">Customer Mobile</th>
                            <th scope="col">Source Category</th>
                            <th scope="col">Source Type</th>
                            <th scope="col">Purpose</th>
                            <th scope="col">CallType</th>
                            <th scope="col">Team</th>
                            <th scope="col" className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { PageHelper.dsAssignedCallDlists!=null?PageHelper.dsAssignedCallDlists.map((tb,index) => {
                            return (
                                <>
                                    <tr key={tb.CallingId}>
                                        <th>{parseInt(index+1)}</th>
                                        <td>{tb.CustomerName}</td>
                                        <td>{tb.CustomerMobile}</td>
                                        <td>{tb.MSourceCategory}</td>
                                        <td>{tb.MSourceName} </td>
                                        <td>{tb.MPurposeName} </td>
                                        <td>{tb.CallType} </td>
                                        <td>{tb.TeamName} </td>
                                        <td className='text-center'>
                                            <CallToolTip title="Call" placement="top" id={`call${tb.CallingId}`} onClick={() =>AddCallHandler(tb.CallingId)} />
                                        </td>
                                    </tr>
                                </>
                            )
                        }): <tr><td colSpan={7} style={{ textAlign: 'center', color: 'red' }}>
                        <h5>No record Found</h5>
                        </td></tr>}
                  

                    </tbody>
                </table>
            </div>
        
            <p className='text-center mt15'>
                                    <button className='btn btn-primary' onClick={PageHelper.TotalRecord=='0'?'javascript:void(0);': assignedViewHandler}>View All</button>
                                </p>
            {
                errorModal===true?
                 (<Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>  
                        {ModalBodyHtml}              
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


export default  UserAssignedLists;