import React, { useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import Jexcel from '../commonComponent/Jexcel';


const UploadCalls = () => {

    const [bulkupload, setBulkupload] = useState(false);
    const [manualupload, setmanualupload] = useState(false);
    
        const bulkUploadHandler = () => {
        setBulkupload(true);
        setmanualupload(false);
    }
    const manualUploadHandler = () => {
        setmanualupload(true);
        setBulkupload(false);
    }
   
  
    //const [isChecked, setIsChecked] = useState(false);
    // const handleOnChange = () => {
    //     setIsChecked(!isChecked);
    //   };

    return (
        <>
           <Breadcrumb title="Upload Calls" parent="Admin" />

            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Row className="justify-content-center">
                                        <Col xs={2} className='animate-chk'>
                                            <label className="d-block" for="edo-ani1">
                                                <input className="radio_animated" id="edo-ani1" type="radio" name="rdo-ani" onClick={bulkUploadHandler} />Bulk Upload
                                            </label>
                                        </Col>
                                        <Col xs={2} className='animate-chk'>
                                            <label className="d-block" for="edo-ani2">
                                                <input className="radio_animated" id="edo-ani2" type="radio" name="rdo-ani" onClick={manualUploadHandler} />Manual Upload
                                            </label>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {bulkupload &&
                    <Row>
                        <Col md={12}>
                            <Card>
                                {/* <Card.Header className='pb-0'>
                                <Card.Title>Card Title</Card.Title>
                            </Card.Header> */}
                                <Card.Body>
                                    <Form>
                                        <Form.Row className="justify-content-center">
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
                                                    <Form.Control as="select">
                                                        <option>---select---</option>
                                                        <option value="1">Web</option>
                                                        <option value="2">Social Media</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>
                                                <Form.Group>
                                                    <Form.Label>Source Name</Form.Label>
                                                    <Form.Control as="select">
                                                        <option>---select---</option>
                                                        <option>Missed Call</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>

                                        <Jexcel />

                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                            <Button>Upload</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                }

            {manualupload &&
                <Row>
                    <Col md={12}>
                        <Card>
                            {/* <Card.Header className='pb-0'>
                                <Card.Title>Card Title</Card.Title>
                            </Card.Header> */}
                            <Card.Body>
                                <Form>
                                    <Form.Row className="justify-content-center">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Executive Name</Form.Label>
                                                <Form.Control as="select">
                                                    <option value="0">---Select---</option>
                                                    <option value="1">Anil</option>
                                                    <option value="2">Sunil</option>
                                                    <option value="3">Manish</option>
                                                    <option value="4">Pankaj</option>
                                                    <option value="5">Suresh</option>
                                                </Form.Control>
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
                                                <Form.Control as="select">
                                                    <option>---select---</option>
                                                    <option value="1">Web</option>
                                                    <option value="2">Social Media</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Source Name</Form.Label>
                                                <Form.Control as="select">
                                                    <option>---select---</option>
                                                    <option>Missed Call</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>

                                    <Jexcel />

                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                            <Button>Upload</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            }


        </Container>
        </>
    )
}

export default UploadCalls;