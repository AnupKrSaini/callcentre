
import React, { Fragment, useState, useEffect,useRef } from 'react'
import SweetAlert from 'sweetalert2';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { ErrorModelPopUp } from '../ModelPopUp/ErrorModelPopUp';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { string } from 'yup/lib/locale';
import Jexcel from './Jexcel';
import ConnectionInstance from '../../apisettings/ConnectionInstance';
const JexcelDDL = ({ TableData, colHeaders, ...props }) => {

    const jRef = useRef(null);
    const [TeamMData, SetTeamMData] = useState(0);
    const [ModalBodyHtml, SetModalBodyHtml] = useState("");
    /********** Modals  ***********/
    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }
    const [ErrorPopUp, setErrorPopUp] = useState(null);
    const [errorModal, setErrorModal] = useState("");


    useEffect(() => {
        asyncFunCallTeamDDL();
    }, []);

    //const modelpopUp = ({modal,toggleModal,Errtext}) => { return  (<ErrorModelPopUp modal={modal} toggleModal={toggleModal} ModalBodyHtml={Errtext}  ></ErrorModelPopUp>)};
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
            console.log(error);
            let Errtext = <p><div className='text-required'>{error} </div></p>;
            SetModalBodyHtml(Errtext);
            setModal(!modal);
            setErrorModal(true);
           
        }
    }

   
   
     
    return (
        <>
            <Container fluid>

                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Row className="justify-content-center">
                                        <Col md={6} >
                                            <Form.Group>
                                                <Form.Label>Team</Form.Label>
                                                <Form.Control as="select" id="TeamId" name="TeamId"  
       >
                                                    <option value='0'>---select---</option>
                                                    {TeamMData}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Jexcel tableData={TableData} colHeaders={colHeaders}  ref={jRef} />
                </Row>
            </Container>
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
export default JexcelDDL;
