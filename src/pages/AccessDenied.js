import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert2';

import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Spinner } from 'react-bootstrap';
import logo from '../assets/images/logo-atulaya.png';
const UserType=localStorage.UserType == undefined && localStorage.UserType ==null? "" : localStorage.getItem('UserType');
const AccessDenied = () => {
   
    const [LoginId, setLoginId] = useState(localStorage.LoggedInUser == undefined ? "" : localStorage.LoggedInUser);
    useEffect(() => { 

     }, []);
 
    const ErrorFunction = async (ErrorCode) => {
        if (ErrorCode == "400")
            SweetAlert.fire({ title: "Error 400", text: "Bad request", icon: "error" })
        else if (ErrorCode == "401")
            SweetAlert.fire({ title: "Error 401", text: "Unauthorized", icon: "error" })
        else if (ErrorCode == "403")
            SweetAlert.fire({ title: "Error 403", text: "Forbidden", icon: "error" })
        else if (ErrorCode == "404")
            SweetAlert.fire({ title: "Error 404", text: "Page not found", icon: "error" })
        else if (ErrorCode == "500")
            SweetAlert.fire({ title: "Error 500", text: "Internal Server Error", icon: "error" })
        else if (ErrorCode == "503")
            SweetAlert.fire({ title: "Error 503", text: "Service Unavailable", icon: "error" })
    }
     const backhandler=()=>{
         if(LoginId!="" && LoginId!=null)
         {
            if (UserType === "0" || UserType === "2" ||UserType === "1") {
                window.location.assign(`${process.env.PUBLIC_URL}/admin/dashboard`);
            }
            else if (UserType === "3") {
                window.location.assign(`${process.env.PUBLIC_URL}/user/dashboard`);
            }
         }
          else
          {
            window.location.assign(`${process.env.PUBLIC_URL}/login`);
          }
         

     }
   
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                            <div className="authentication-box  mt175">
                                            <div className="signinLogoHeader">
                                                <img src={logo} alt="" />
                                                <div className='logoTagLine'>Imaging <span>&amp;</span> Laboratories</div>
                                            </div>
                                            
                                        </div>
                                <Form.Row className="justify-content-center " style={{height : "30vh"}}>
                                    <Col lg={12} md={6}>
                                    <div class="text-center mt50" > <h1> Access Denied</h1></div>
                                    <div class="text-center mt15" ><h5>You don't have permission to view this.
🚫🚫🚫</h5>
<div class="text-center mt15" ><button type="submit" class="btn btn-primary" onClick={backhandler}> back your journey </button></div></div>
                                    </Col>
                                    
                                </Form.Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
              
            </Container>
        </React.Fragment>
    )
}

export default AccessDenied;