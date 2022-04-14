import React, { useEffect, useState,useRef } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import SweetAlert from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import StepZilla from "react-stepzilla";
import Jexcel from '../commonComponent/Jexcel/Jexcel'; 
import JexcelDDL from  '../commonComponent/Jexcel/JexcelDDL'; 
import VerifyManualSheets from './VerifyManualSheets';
import { ErrorModelPopUp } from '../commonComponent/ModelPopUp/ErrorModelPopUp';
import axios from 'axios';
import ConnectionInstance from '../apisettings/ConnectionInstance';
const UploadCalls = (props) => {

    const phoneEl = useRef(null)
    /********** Modals  ***********/
    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }
    const[ErrorPopUp, setErrorPopUp]=useState(0);
    const [errorModal, setErrorModal] = useState();


    const successAlert = () => {
        SweetAlert.fire({ title: "Success", text: "Data has been uploaded successfully!", icon: "info" });
    }
    const colHeaders=['Customer Name', 'Customer Mobile', 'Source Type', 'Source Name', 'Purpose'];

const TableData= [[
        "Vikas Kumar", "9999887414", "Web", "Miss Calls", "Package"
    ]];
    const [StartStep,SetStartStep]=useState(0);
    const[Stepszil,SetStepszil]=useState(null);
    const [StepCounter, SetStepCounter]=useState(0);
    const ref = React.createRef();
    const steps =
        [
            { name: 'Step 1', component:<JexcelDDL tableData={TableData} colHeaders={colHeaders} {...props} />  },
            //{ name: 'Step 1', component: <Jexcel tableData={TableData} colHeaders={colHeaders}  /> },
           //{ name: 'Step 1', component: <JexcelDDL  tableData={TableData} colHeaders={colHeaders} /> },
            { name: 'Step 2', component: <VerifyManualSheets  /> },
        ]
       
        useEffect(() => {
           
           // document.getElementById("next-button").addEventListener('click',abc)
           const timer = setTimeout(() => {
           
          },10000);
          return () => clearTimeout(timer);
        }, []);
const abc = () =>{
    alert('Hello');
    
}
let stepzillaProps = {
    onStepChange: step => {
     if(step===1)
     {
        alert(step); 
    const tt=phoneEl.current;
        const ttable=JexcelDDL.Jexcel.getData();
        //const table1 = jRef.current.jexcel.getData();
     }
     
    }
  };
const ab1 = (step) =>{
    SetStepCounter(step);
    if(step===1)
    {
       alert(step); 
       const ttable=props.jRef;
       alert(ttable);
       alert(phoneEl.current);
       const tt=phoneEl.current;
       //const table1 = jRef.current.jexcel.getData();
    }
    
  
   
}
const ab21 =() =>{
   
    SetStartStep(0);
    SetStepCounter(0);
    alert('hello');
   SetStepszil(null);
   const timer = setTimeout(() => {
    BindStepZilla(); 
   
},100);
return () => clearTimeout(timer);
 
  

 //window.location.reload();

 
}

useEffect(() => {
     
    BindStepZilla();
 }, []);




 async function  BindStepZilla(){
    SetStepszil(null);
    return await SetStepszil(
       
        <React.Fragment>
  <StepZilla  steps={steps} showSteps={true} showNavigation={true} stepsNavigation={false}
                                                prevBtnOnLastStep={true}
                                                dontValidate={false} 
                                                nextButtonText='Verify'
                                                nextButtonCls='btn btn-primary'
                                                backButtonCls='btn btn-secondary pull-left'
                                                prevBtnOnLastStep={false}
                                                onStepChange={(step) =>ab1(step)}
                                                startAtStep={StartStep}
                                                />
        </React.Fragment>
    )
  }

 
    return (
        <>
            <Breadcrumb title="Manual Sheets" parent="Admin" />

            <Container fluid>

                <Row className='justify-content-center' id="stepRws">
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Row className="justify-content-center">
                                        <Col xs={12} className='animate-chk'>
                                           {Stepszil}
                                        </Col>
                                    </Form.Row>
                                </Form>
                                { StepCounter===1?(<div className='mt15 text-center'>
                                    <Button variant='primary' onClick={ab21} > Back </Button>
                                </div>):"" }
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}

export default UploadCalls;