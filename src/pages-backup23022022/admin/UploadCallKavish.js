import React, { useEffect, useState,useRef,Fragment,createRef} from 'react';
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
var glblarr=[];
 let GlbalStatus=false;
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
            {isLastStep?'':<button
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
						: !stepperContent[currentTabIndex].isComplete) 
                        ||
					stepperContent[currentTabIndex].isLoading
				}
			>

				{isLastStep ? '' : `Continue to ${stepperContent[currentTabIndex + 1].label}`}
                
			</button> }
			
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
    const reff=useRef();
	const [currentTabIndex, setCurrentTabIndex] = useState(0),
		isLastStep = currentTabIndex === stepperContent.length - 1,
		isPrevBtn = currentTabIndex !== 0;
 const[TestPAss,setTestPAss]=useState(0);
	const navigateToStepHandler = (index) => {
  
		if (index !== currentTabIndex) {
			setCurrentTabIndex(index);
            stepperContent[currentTabIndex].isComplete=false;
           
           
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
        
        setCurrentTabIndex(0);
        stepperContent[1].isComplete=false;
        alert(13);
        
      
        GlbalStatus=true;
        //glblarr = [];
  
       // if (!jRef.current.jspreadsheet) {
       //     jspreadsheet(jRef.current, options);
       // }

        

        
		//setCurrentTabIndex((prev) => prev - 1);
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

const UploadCalls = (props ) => {
    const jRef=useRef();
   // alert('ytt');
    //const jRef = useRef();
    
  
    
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
  const[isFirstStepLoading, setIsFirstStepLoading] = useState(false);
  const[FinalProcess, setFinalProcess] =useState(false);
const firstTermsHandler = () => {
    setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
    //setAcceptFirstTerms((prev) => ({ checked: !prev.checked, touched: true }));
};

const secondTermsHandler = () => {
    setAcceptSecondTerms((prev) => ({ checked: !prev.checked, touched: true }));
};

//for demo purposes only
const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const FirstStepAsyncFunc = async () => {
    const table1 =jRef.current.jexcel.getData();
     setIsFirstStepLoading(true);
    await timeout(500);
    setIsFirstStepLoading(false);
    alert(table1);
    setFinalProcess(true);
    //setAcceptSecondTerms((prev) => ({ checked:true, touched: true }));
    alert(1);
    secondTermsHandler();
    //it can be an API call
    
};

const secondStepAsyncFunc = async () => {
    alert(2);
    //it can be an API call
   // setIsSecondStepLoading(true);
    //await timeout(3000);
    //setIsSecondStepLoading(false);
    console.log('second step clicked');
};


const colHeaders=['Customer Name', 'Customer Mobile', 'Source Type', 'Source Name', 'Purpose'];

const TableData= [[
        "Vikas Kumar", "9999887414", "Web", "Miss Calls", "Package"
    ]];
    const [StartStep,SetStartStep]=useState(0);
    const[Stepszil,SetStepszil]=useState(null);
    const [StepCounter, SetStepCounter]=useState(0);
    
    
    
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
       }, [options,glblarr]);
//console.log(jRef);
console.log(glblarr[0]);
//console.log(glblarr);

console.log(jRef);
alert(GlbalStatus);
const stepperContent = [
    {
        label: 'Step 1',
        content: (
            <div>
            <div></div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='table-responsive1'>
                     
                        <div ref={jRef} style={{ marginTop: '30px' }}  id='divjexcel' ></div>
                    </div>
                </div>
            </div>
            {/* <div>
                <label>
                    <input
                        type="checkbox"
                        checked={acceptFirstTerms.checked}
                        onChange={firstTermsHandler}
                    />{' '}
                    Accept first terms and conditions
                </label>
            </div> */}
            </div>
        ),
        clicked: () => FirstStepAsyncFunc(),
        isLoading: isFirstStepLoading,
        isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
        isComplete:true,
    },
    {
        label: 'Step 2',
        content: (
            <div> <VerifyManualSheets  />
            {/* <div>
                <label>
                    <input
                        type="checkbox"
                        checked={acceptSecondTerms.checked}
                        onChange={secondTermsHandler}
                    />{' '}
                    Accept second terms and conditions
                </label>
            </div> */}
            </div>
        ),
        clicked: () => secondStepAsyncFunc(),
        isLoading: isSecondStepLoading,
        isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
        isComplete: acceptSecondTerms.checked,
    }
    
];

const submitStepper = () => {
    alert('sss');
    console.log('submitted');
};


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
        
       

const addRow = () => {
    const table1 = jRef.current.jexcel.getData();
    jRef.current.jexcel.insertRow();
};


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
        <Stepper stepperContent={stepperContent} submitStepper={submitStepper} ref={jRef} />
        
    </div>
                                           
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}

export default UploadCalls;