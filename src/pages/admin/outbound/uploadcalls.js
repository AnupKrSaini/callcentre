import React, { useEffect, useState,useRef,Fragment,createRef} from 'react';
import Breadcrumb from '../../commonComponent/common/breadcrumb';
import SweetAlert from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import ConnectionInstance from '../../apisettings/ConnectionInstance';
import jspreadsheet from 'jspreadsheet-ce';
import "../../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import VerifyManualSheets from './verifymanualsheets';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ALERT } from '../../../constant';
var glblarr=[];
  let ErrorBodyHtml="";
 let GlbalStatus=false;
 let ValidStatus=false;
 
//let  currentStep=0;


const UploadCalls = (props) => {
 
    const[currentStep,SetcurrentStep]=useState(1);
    const [TeamMData, SetTeamMData] = useState(0);
    const[UserLogin,SetUserLogin]=useState(1);
    const [ModalBodyHtml, SetModalBodyHtml] = useState("");
    const[ManageOutBound,SetManageOutBound]=useState(null);
    const jRef = useRef(null);

    
    useEffect(() => {
        asyncFunCallTeamDDL();
    }, []);
const colHeaders=['Customer Name', 'Customer Mobile', 'Source Type', 'Source Name', 'Purpose'];

    const [StartStep,SetStartStep]=useState(0);
    const[Stepszil,SetStepszil]=useState(null);
    const [StepCounter, SetStepCounter]=useState(0);
   
    const options = {
        data:null,
        minDimensions: [5, 5],
        contextMenu: false,
        defaultColWidth:180,
        //tableWidth: "1000px",
        //fullscreen:true,
       tableOverflow: true,
        colHeaders:colHeaders,
        ...props
       // colHeaders: ['Customer Name', 'Customer Mobile', 'Source Type', 'Source Name', 'Purpose', 'Executive Name'],
        //colWidths: [180,180,180,180,180,180]

    };


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
            if(jRef.current===null || jRef.current===undefined || !jRef.current.jspreadsheet)
            {
               jspreadsheet(jRef.current, options);
               glblarr.push({
                'current': jRef.current
                        //"options":options
               });
            }
            // if(jRef.current!=null)
            // {
            //     glblarr.push({
            //         "jRef":jRef.current,
            //         "options":options
            //     });
            // }
       }, [options]);
//console.log(jRef);
console.log(glblarr[0]);
console.log(glblarr);

console.log(jRef);
/********** Validations  ***********/
const formik = useFormik({
    initialValues: {
        TeamId: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
        TeamId: Yup.string().transform(v => v=== '0' ? '' : v)
        .required('Team is Required')
       
    }),
  
    onSubmit:  async (values) => {
           
  
    
      
    },
});

    /********** Modals  ***********/
    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }
    const[ErrorPopUp, setErrorPopUp]=useState(0);
    const [errorModal, setErrorModal] = useState(false);
    const[Jxlflag,SetJxlflag]=useState(false);


    const successAlert = () => {
        SweetAlert.fire({ title: "Success", text: "Data has been uploaded successfully!", icon: "info" });
    }
        
       
    const  _prev = () => {
        let currentStepN =currentStep;
        currentStepN  =currentStepN  <= 1? 1: currentStepN - 1
        SetcurrentStep(currentStepN);
        setModal(false);
      setErrorModal(false);
      }
    
const _next = () => {
    let currentStepN = currentStep;
    formik.handleSubmit();
    currentStepN=currentStepN >= 2? 3: currentStepN + 1
      const table1 = jRef.current.jexcel.getData();
      var jsonbulkSubRow = {};
     var jsonbulkSub = [];
      if (table1.length>0)
      {
        for (var i = 0; i < table1.length; i++) {
            if ((table1[i][0] != null && table1[i][0] != "") && (table1[i][1] != null && table1[i][1] != "")) {
        const tt=table1[i][0];
        jsonbulkSubRow = {
            "CustomerName": table1[i][0].trim(),
            "CustomerMobile": table1[i][1].trim(),
            "SourceCategory": table1[i][2].trim(),
            "SourceName": table1[i][3].trim(),
            "PurPoseName": table1[i][4].trim(),
            }
            jsonbulkSub.push(jsonbulkSubRow);
        }
           
      }
      
  }
  
 

      
   if(jsonbulkSub!=null && jsonbulkSub.length>0 )
   { 
        if(formik.values.TeamId!='' && formik.values.TeamId!=='0' )
        {
            SetcurrentStep(currentStepN);
            SetManageOutBound(null);
            PushManaulSheet(jsonbulkSub);
           }
           SetJxlflag(false);
           ValidStatus=false;
        }
   
   else{
    SetJxlflag(true);
    ValidStatus=true;
   }
   if ((formik.touched.TeamId=== undefined || formik.touched.TeamId=== null) || (formik.touched.TeamId && formik.errors.TeamId )|| ValidStatus) {
    toggleModal(); 
    setErrorModal(true);
   }
  
}
useEffect(() => {
           
    // document.getElementById("next-button").addEventListener('click',abc)
    const timer = setTimeout(() => {
    
   },1000);
   return () => clearTimeout(timer);
 }, [currentStep]);
async function PushManaulSheet(blukJsonList)
{

    try {
                 
        let url=ConnectionInstance+ 'OutboundCalling/SetOutboundmManualDetails';
       
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
          data:{ TeamID:formik.values.TeamId,Addedby:`${UserLogin}`, ObjtblCallCentreCalllingType:blukJsonList}
        };
       
        let response = await axios(options);
            let responseOK = response && response.status == 200;
            if (responseOK) {
                let data = response.data;
                //formik.setFieldTouched('JxcelDB',false);
                // let data = await response.data;
                SetManageOutBound(data.Data);
                if(data.Success==true && data.Data.OutPut=="2000")
                { 
                    SweetAlert.fire({ title: "Success!", text: "Record  has been Saved!", icon: "success" });
                   // asyncFunBindPurposeDetails(1,3);
                    setErrorModal(false);
                    formik.resetForm();
                    

                }
              else if(data.Data.OutPut=="-3" && data.Data.tblOutboundList!=null&& data.Data.tblOutboundList.length>0)
                { 
                    //SweetAlert.fire({ title: "Success!", text: "Record  has been Saved!", icon: "success" });
                   // asyncFunBindPurposeDetails(1,3);
                    setErrorModal(false);
                    //formik.setFieldTouched('JxcelDB',false);
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
                let Errtext='no record found';
                SetModalBodyHtml(Errtext);
                setModal(!modal);
                setErrorModal(true);
                
            }
         // return data;
        } catch (error) {
            console.log(error.message);
            let Errtext=<p><div className='text-required'>You may not be connected to a network or Unable to connect to a server</div></p>;
                        
            SetModalBodyHtml(Errtext);
            setModal(!modal);
            setErrorModal(true);
          
         }
  

 }
/*
* the functions for our button
*/
const previousButton=()=>{
    
    let currentStepN =currentStep;
  if(currentStepN !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={_prev}>
      Previous
      </button>
    )
  }
  return null;
}

const nextButton=()=>{
  let currentStepN = currentStep;
  if(currentStepN <2){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={_next}>
     Verify
      </button>        
    )
  }
  return null;
}



    return (
        <>
            <Breadcrumb title="Manual Sheets" parent="Admin" />

            <Container fluid>

                <Row className='justify-content-center' id="stepRws">
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Form >
                                {/* { <p>Step {currentStep} </p>} */}
                                {currentStep!==1?null: <Form.Row className="justify-content-center">
                              
                                        <Col md={6} lg={4} >
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
                                    </Form.Row>}
                                    <Form.Row className="justify-content-center">
                                        <Col xs={12} className='animate-chk'>
                                        {currentStep!==1?null:
                                                <div className="container">
                                                <div className='row'>
                                            <div className='col-md-12'>
                                            <div className='table-responsive1'>
                                            <div ref={jRef} style={{ marginTop: '30px' }}  id='divjexcel'  ></div>
                                            { Jxlflag==true?<p><div className='text-required'>Fill Sheet Required</div></p>: null}
                                            </div>
                                            </div>
                                            </div>   
                                            </div>
                                        }
                                       
   
                                       {currentStep<2?null:
                                      (<div> <VerifyManualSheets dataoutCalling={ManageOutBound}  /></div>)
                                        }
                                        
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className='mt15'>
                                        <Col md={6} className='text-center'>
                                    {ManageOutBound!=null?previousButton():null}
                                           {nextButton()}
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
            {
                errorModal===true?
                 (<Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>
                   
                        {ModalBodyHtml===null||ModalBodyHtml===''?
                        
                        (<><p>{formik.touched.TeamId && formik.errors.TeamId ? (
                            <div className='text-required'>{formik.errors.TeamId}</div>
                            ) : null}</p>
                            <p>
                            { Jxlflag==true?<p><div className='text-required'>Fill Sheet Required</div></p>: null}
                            </p>
                            </> ):ModalBodyHtml }
                    
                     
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

export default UploadCalls;