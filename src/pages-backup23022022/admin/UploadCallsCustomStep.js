import React, { useEffect, useState,useRef,Fragment} from 'react';
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
import jspreadsheet from 'jspreadsheet-ce';
import PropTypes from 'prop-types';
let Step = ({
	indicator,
	label,
	navigateToStepHandler,
	index,
	isActive,
	isComplete,
	isWarning,
	isError,
	isRightToLeftLanguage,
}) => {
	const classes = [''];

	if (isActive) {
		classes.push('is-active');
	}
	if (isComplete) {
		classes.push('is-complete');
	}
	if (isWarning) {
		classes.push('is-warning');
	}
	if (isError) {
		classes.push('is-error');
	}
	if (isRightToLeftLanguage) {
		classes.push('rightToLeft');
	}

	return (
		<div className={`stepper-step ${classes.join(' ')}`}>
			<div className="stepper-indicator">
				<span
					className="stepper-indicator-info"
					onClick={isComplete || isError ? () => navigateToStepHandler(index) : null}
				>
					{isComplete ? (
						<svg className="stepper-tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
							<path d="M452.253 28.326L197.831 394.674 29.044 256.875 0 292.469l207.253 169.205L490 54.528z" />
						</svg>
					) : (
						indicator
					)}
				</span>
			</div>
			<div className="stepper-label">{label}</div>
		</div>
	);
};

Step.propTypes = {
	indicator: PropTypes.oneOfType([PropTypes.node, PropTypes.number]),
	label: PropTypes.string.isRequired,
	navigateToStepHandler: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	isActive: PropTypes.bool,
	isComplete: PropTypes.bool,
	isError: PropTypes.bool,
	isWarning: PropTypes.bool,
	isRightToLeftLanguage: PropTypes.bool,
};

let StepperHead = ({
	stepperContent,
	navigateToStepHandler,
	isVertical,
	isInline,
	isRightToLeftLanguage,
	currentTabIndex,
}) => (
	<div
		className={`stepper-head ${isVertical ? 'vertical-stepper-head' : ''} ${
			isInline ? 'inline-stepper-head' : ''
		}`}
	>
		{stepperContent.map((el, i) => (
			<Step
				key={i}
				index={i}
				navigateToStepHandler={navigateToStepHandler}
				isActive={i === currentTabIndex}
				isComplete={el.isComplete}
				isWarning={el.isWarning}
				isError={el.isError}
				isRightToLeftLanguage={isRightToLeftLanguage}
				indicator={i + 1}
				label={el.label}
			/>
		))}
	</div>
);

StepperHead.propTypes = {
	stepperContent: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			content: PropTypes.node.isRequired,
			clicked: PropTypes.func,
			isWarning: PropTypes.bool,
			isError: PropTypes.bool,
			isComplete: PropTypes.bool,
			isLoading: PropTypes.bool,
		})
	),
	navigateToStepHandler: PropTypes.func.isRequired,
	currentTabIndex: PropTypes.number.isRequired,
	isInline: PropTypes.bool,
	isVertical: PropTypes.bool,
	isRightToLeftLanguage: PropTypes.bool,
};

let StepperFooter = ({
	isPrevBtn,
	previousStepHandler,
	isLastStep,
	nextStepHandler,
	submitHandler,
	stepperContent,
	currentTabIndex,
}) => {
	const submitCurrentStep = async () => {
		await stepperContent[currentTabIndex].clicked();
		nextStepHandler();
	};

	return (
		<div
			className="stepper-footer"
			style={{ justifyContent: isPrevBtn ? 'space-between' : 'flex-end' }}
		>
			{isPrevBtn && (
				<button className="stepper-footer-btn" onClick={previousStepHandler}>
					Back to {stepperContent[currentTabIndex - 1].label}
				</button>
			)}
			<button
				className={`stepper-footer-btn ${isLastStep ? 'success' : 'primary'}`}
				onClick={
					isLastStep
						? submitHandler
						: stepperContent[currentTabIndex].clicked
						? submitCurrentStep
						: nextStepHandler
				}
				disabled={
					(isLastStep
						? stepperContent.some((el) => !el.isComplete)
						: !stepperContent[currentTabIndex].isComplete) ||
					stepperContent[currentTabIndex].isLoading
				}
			>
				{isLastStep ? 'Submit' : `Continue to ${stepperContent[currentTabIndex + 1].label}`}
			</button>
		</div>
	);
};

StepperFooter.propTypes = {
	isPrevBtn: PropTypes.bool,
	previousStepHandler: PropTypes.func.isRequired,
	isLastStep: PropTypes.bool,
	nextStepHandler: PropTypes.func.isRequired,
	submitHandler: PropTypes.func.isRequired,
	currentTabIndex: PropTypes.number.isRequired,
	stepperContent: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			content: PropTypes.node.isRequired,
			clicked: PropTypes.func,
			isWarning: PropTypes.bool,
			isError: PropTypes.bool,
			isComplete: PropTypes.bool,
			isLoading: PropTypes.bool,
		})
	),
};

let Stepper = ({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitStepper }) => {
	const [currentTabIndex, setCurrentTabIndex] = useState(0),
		isLastStep = currentTabIndex === stepperContent.length - 1,
		isPrevBtn = currentTabIndex !== 0;

	const navigateToStepHandler = (index) => {
		if (index !== currentTabIndex) {
			setCurrentTabIndex(index);
		}
	};

	const nextStepHandler = () => {
		setCurrentTabIndex((prev) => {
			if (prev !== stepperContent.length - 1) {
				return prev + 1;
			}
		});
	};

	const previousStepHandler = () => {
		setCurrentTabIndex((prev) => prev - 1);
	};

	const submitHandler = () => {
		submitStepper();
	};

	return (
		<div className="stepper-wrapper">
			<div style={{ display: isVertical ? 'flex' : 'block' }}>
				<StepperHead
					stepperContent={stepperContent}
					navigateToStepHandler={navigateToStepHandler}
					isVertical={isVertical}
					isInline={isInline}
					currentTabIndex={currentTabIndex}
					isRightToLeftLanguage={isRightToLeftLanguage}
				/>
				<div className="stepper-body">
					{stepperContent.map((el, i) => (
						<Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
					))}
				</div>
			</div>
			<StepperFooter
				isPrevBtn={isPrevBtn}
				previousStepHandler={previousStepHandler}
				isLastStep={isLastStep}
				nextStepHandler={nextStepHandler}
				submitHandler={submitHandler}
				stepperContent={stepperContent}
				currentTabIndex={currentTabIndex}
			/>
		</div>
	);
};

Stepper.propTypes = {
	stepperContent: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			content: PropTypes.node.isRequired,
			clicked: PropTypes.func,
			isWarning: PropTypes.bool,
			isError: PropTypes.bool,
			isComplete: PropTypes.bool,
			isLoading: PropTypes.bool,
		})
	),
	submitStepper: PropTypes.func.isRequired,
	isInline: PropTypes.bool,
	isVertical: PropTypes.bool,
	isRightToLeftLanguage: PropTypes.bool,
};

const UploadCalls = (props) => {

    const [acceptFirstTerms, setAcceptFirstTerms] = useState({
        checked: false,
        touched: false,
    }),
    [acceptSecondTerms, setAcceptSecondTerms] = useState({
        checked: false,
        touched: false,
    }),
    [acceptThirdTerms, setAcceptThirdTerms] = useState({
        checked: false,
        touched: false,
    }),
    [isSecondStepLoading, setIsSecondStepLoading] = useState(false);

const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
};

const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
};

const thirdTermsHandler = () => {
    setAcceptThirdTerms((prev) => ({ checked: !prev.checked, touched: true }));
};

//for demo purposes only
const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const secondStepAsyncFunc = async () => {
    //it can be an API call
    setIsSecondStepLoading(true);
    await timeout(3000);
    setIsSecondStepLoading(false);
    console.log('second step clicked');
};

const stepperContent = [
    {
        label: 'Step 1',
        content: (
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={acceptFirstTerms.checked}
                        onChange={firstTermsHandler}
                    />{' '}
                    Accept first terms and conditions
                </label>
            </div>
        ),
        isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
        isComplete: acceptFirstTerms.checked,
    },
    {
        label: 'Step 2',
        content: (
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={acceptSecondTerms.checked}
                        onChange={secondTermsHandler}
                    />{' '}
                    Accept second terms and conditions
                </label>
            </div>
        ),
        clicked: () => secondStepAsyncFunc(),
        isLoading: isSecondStepLoading,
        isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
        isComplete: acceptSecondTerms.checked,
    },
    {
        label: 'Step 3',
        content: (
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={acceptThirdTerms.checked}
                        onChange={thirdTermsHandler}
                    />{' '}
                    Accept third terms and conditions
                </label>
            </div>
        ),
        isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
        isComplete: acceptThirdTerms.checked,
    },
];

const submitStepper = () => {
    console.log('submitted');
};


    const [StepT, SetStepT]=useState(null);
    
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
    
    const jRef = useRef(null);
    
    const options = {
        data: TableData,
        minDimensions: [5, 5],
        contextMenu: false,
        defaultColWidth:200,
        tableWidth: "1000px",
        colHeaders:colHeaders,
        ...props
       // colHeaders: ['Customer Name', 'Customer Mobile', 'Source Type', 'Source Name', 'Purpose', 'Executive Name'],
        //colWidths: [180,180,180,180,180,180]

    };


   
    const steps =
        [
            { name: 'Step 1', component:<JexcelDDL  tableData={TableData} colHeaders={colHeaders}  ref={jRef} {...props} />  },
            //{ name: 'Step 1', component: <Jexcel tableData={TableData} colHeaders={colHeaders}  /> },
           //{ name: 'Step 1', component: <JexcelDDL  tableData={TableData} colHeaders={colHeaders} /> },
            { name: 'Step 2', component: <VerifyManualSheets  /> },
        ]
        useEffect(() => {
            if(jRef.current===null || jRef.current===undefined || !jRef.current.jspreadsheet)
            {
               jspreadsheet(jRef.current, options);
               
            }
            
          
           // if (!jRef.current.jspreadsheet) {
           //     jspreadsheet(jRef.current, options);
           // }
       }, [options]);

     
        useEffect(() => {
          
         alert(StepT);
           // document.getElementById("next-button").addEventListener('click',abc)
           const timer = setTimeout(() => {
           
          },10000);
          return () => clearTimeout(timer);
        }, [StepT]);
const abc = () =>{
    alert('Hello');
    
}
const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }
  const previous = usePrevious(jRef);
let stepzillaProps = {
    onStepChange: step => {
     if(step===1)
     {
        alert(step); 
   
           //const ttable=js
        //const table1 = jRef.current.jexcel.getData();
     }
     
    }
  };
const ab1 = (step,jRef) =>{
    SetStepCounter(step);
    if(step===1)
    {
       alert(step);
    const ss=jRef;
const ss1=previous;
      const table1 =jRef.current.jexcel.getData();
       alert(table1);
      
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

const addRow = () => {
    const table1 = jRef.current.jexcel.getData();
    jRef.current.jexcel.insertRow();
};
useEffect(() => {
   
    BindStepZilla();
 }, []);


 const JXL=()=>{
      return <React.Fragment>
    <div className='row'>
    <div className='col-md-12'>
        <div className='table-responsive1'>
            <div ref={jRef} style={{ marginTop: '30px' }}></div>
           
            {/*
            <br />
             <input type="button" onClick={addRow} value="Add new row" /> 
             */}
        </div>
    </div>
</div>
</React.Fragment>
 }

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
                                        <div className="container">
        <h2>Default stepper</h2>
        <Stepper stepperContent={stepperContent} submitStepper={submitStepper} />
        <hr />
        <h2>Inline stepper</h2>
        <Stepper stepperContent={stepperContent} submitStepper={submitStepper} isInline />
        <hr />
        <h2>Vertical stepper</h2>
        <Stepper stepperContent={stepperContent} submitStepper={submitStepper} isVertical />
    </div>
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