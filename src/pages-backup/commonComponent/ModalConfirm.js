import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";


const ModalConfirm = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

    return (
        <>
            {/** 
            <div className="modal fade show" id="mdConfirm" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure to delete
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
            */}
            {/***/}
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
             

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center">Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default ModalConfirm;