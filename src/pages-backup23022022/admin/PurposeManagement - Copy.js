import React from 'react';
import Breadcrumb from '../../components/common/breadcrumb';

import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';




const PurposeManagement = () => {
    
    const DUMMY_DATA = [
        {
            id: 'u1',
            SNo: '1',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u2',
            SNo: '2',
            CallType: 'Follow up Call',
            Purpose: 'Package',
        },
        {
            id: 'u3',
            SNo: '3',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u4',
            SNo: '4',
            CallType: 'Follow up Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '5',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '6',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '7',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '8',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '9',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '10',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '11',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '12',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '13',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '14',
            CallType: 'New Call',
            Purpose: 'Package',
        },
        {
            id: 'u5',
            SNo: '15',
            CallType: 'New Call',
            Purpose: 'Package',
        },
    
    ];
    
    
    
    const columns = [{
        dataField: 'SNo',
        text: 'SNo.'
    }, {
        dataField: 'CallType',
        text: 'Call Type',
        sort: true,
    }, {
        dataField: 'Purpose',
        text: 'Purpose'
    }];


    const paginationOptions = {
        sizePerPage: 5,
        showTotal: true,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        onSizePerPageChange: (sizePerPage, page) => {
            console.log('Size per page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
        },
        onPageChange: (page, sizePerPage) => {
            console.log('Page change!!!');
            console.log('Newest size per page:' + sizePerPage);
            console.log('Newest page:' + page);
        }
    };


    return (
        <>
            <Breadcrumb title="Purpose Management" parent="Admin" />
            <div className='container-fluid'>
                {/* <div className='row'>
                    <div className='col-md-12'>
                        <BootstrapTable keyField='id' data={products} columns={columns} />
                    </div>
                </div> */}
            </div>

            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Row className="justify-content-center">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Call Type</Form.Label>
                                                <Form.Control as="select">
                                                    <option>---select---</option>
                                                    <option>New Call</option>
                                                    <option>Follow up Call</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Purpose</Form.Label>
                                                <Form.Control type="text" />
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                            <Button variant='primary'>Save</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header className='pb-0'>
                                <Card.Title>Purpose Lists</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <BootstrapTable
                                    bootstrap4
                                    headerWrapperClasses="thead-light"
                                    bordered={false}
                                    keyField='id' data={DUMMY_DATA} columns={columns} pagination={paginationFactory()} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Container>

        </>
    )
}

export default PurposeManagement;