import React, { useState } from 'react';
import SweetAlert from 'sweetalert2';
import Breadcrumb from '../../components/common/breadcrumb';

import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';



const AutomationCalls = () => {

    const DUMMY_DATA = [
        {
            id: 'u1',
            SNo: '1',
            CustomerName: 'Shiv',
            CustomerMobile: '7982563259',
            Source: 'Social Media',
            Purpose: 'Package',
            SourceDate: '2/12/2021',
        },
        {
            id: 'u2',
            SNo: '2',
            CustomerName: 'Anup',
            CustomerMobile: '8895632598',
            Source: 'Web',
            Purpose: 'Payment Issue',
            SourceDate: '4/12/2021',
        },
        {
            id: 'u3',
            SNo: '3',
            CustomerName: 'Zahid',
            CustomerMobile: '8869523156',
            Source: 'Social Media',
            Purpose: 'Package',
            SourceDate: '6/12/2021',
        },
        {
            id: 'u4',
            SNo: '4',
            CustomerName: 'Shahid',
            CustomerMobile: '7895641236',
            Source: 'Social Media',
            Purpose: 'Package',
            SourceDate: '6/12/2021',
        },
        {
            id: 'u5',
            SNo: '5',
            CustomerName: 'kavish',
            CustomerMobile: '8596545232',
            Source: 'Missed Call',
            Purpose: 'Payment Issue',
            SourceDate: '6/12/2021',
        },
    ];

    const [visible, setVisible] = useState(false);

    const [value, setValue] = useState('0');

    const changeHandler = (e) => {
        setValue(e.target.value);
        //alert(e.target.value);
        const s1 = e.target.value;
        if (s1 === "1" || s1 === "2" || s1 === "3") {
            setVisible(true);
        }
        if (s1 === "0") {
            setVisible(false);
        }
    }

    const searchHandler = (event) => {
        event.preventDefault();
        setVisible(true);
    }

    const assignHandler = () => {
        SweetAlert.fire({ title: "Success!", text: "Calls have been Assigned Successfully!", icon: "success" });
    }


    return (
        <>
            <Breadcrumb title="Automation Calls" parent="Admin" />

            <Container fluid>

                <Row>
                    <Col md={12}>
                        <Card>
                            {/* <Card.Header className='pb-0'>
                                <Card.Title>Card Title</Card.Title>
                            </Card.Header> */}
                            <Card.Body>
                                <Form>
                                    <Form.Row className="justify-content-around">
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control type="date" />
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
                                                <Form.Control as="select" value={value} onChange={changeHandler}>
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
                                    <Form.Row className='mt15'>
                                        <Col md={12} className='text-center'>
                                            <Button onClick={searchHandler}>Search</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {visible &&
                    <Row>
                        <Col md={12}>
                            <Card>
                                <Card.Body>
                                    <Form.Row className='justify-content-center'>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label><b>Assign by Executive Name</b></Form.Label>
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
                                    </Form.Row>

                                    <div className="table-responsive mt15">
                                        <Table>
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Customer Name</th>
                                                    <th scope="col">Customer Mobile</th>
                                                    <th scope="col">Source</th>
                                                    <th scope="col">Purpose</th>
                                                    <th scope="col">Follow up Date</th>
                                                    <th scope="col">
                                                        <Form.Check type="checkbox" label="Mark All" />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {DUMMY_DATA.map((tb) => {
                                                    return (
                                                        <>
                                                            <tr key={tb.id}>
                                                                <th>{tb.SNo}</th>
                                                                <td>{tb.CustomerName}</td>
                                                                <td>{tb.CustomerMobile}</td>
                                                                <td>{tb.Source} </td>
                                                                <td>{tb.Purpose} </td>
                                                                <td>{tb.SourceDate} </td>
                                                                <td>
                                                                    <Form.Group className='animate-chk'>
                                                                        <Form.Label>
                                                                            <Form.Check type="checkbox" controlId="chk2" />
                                                                        </Form.Label>
                                                                    </Form.Group>
                                                                    {/* <label className="d-block" for="chk-ani">
                                                                        <input className="checkbox_animated" id="chk-ani" type="checkbox" />
                                                                    </label> */}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}

                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='mt15 text-center'>
                                        <Button variant='secondary' onClick={assignHandler}>Assign Calls</Button>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }


            </Container>
        </>
    )
}

export default AutomationCalls;