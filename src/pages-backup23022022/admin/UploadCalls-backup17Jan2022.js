import React, { useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';
import SweetAlert from 'sweetalert2';

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import Jexcel from '../commonComponent/Jexcel';



const UploadCalls = () => {


    const successAlert = () => {
        SweetAlert.fire({ title: "Success", text: "Data has been uploaded successfully!", icon: "success" });
    }

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
                                        <Col xs={12} className='animate-chk'>
                                            {/** Jexcel Component */}
                                            <Jexcel />
                                        </Col>
                                        <Col xs={12} className='text-center'>
                                            <Button onClick={successAlert}>Upload</Button>
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