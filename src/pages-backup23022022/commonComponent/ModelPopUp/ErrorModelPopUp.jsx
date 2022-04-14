
import React, { useState,useEffect} from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { setGlobalCssModule } from 'reactstrap/es/utils';

export const ErrorModelPopUp = (modal,toggleModal,ModalBodyHtml,...props) => {
  return (
   
    <div>
        <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                    <ModalHeader toggle={toggleModal}>Errors</ModalHeader>
                    <ModalBody>
                       {ModalBodyHtml}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
                        <Button variant="primary" onClick={toggleModal}>Ok</Button>
                    </ModalFooter>
                    
                </Modal>
                </div>
  )
}
