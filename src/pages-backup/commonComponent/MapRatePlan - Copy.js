import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
//import ModalConfirm from "./ModalConfirm";

const MapRatePlan = () => {

    /*
    const [modalIsOpen, setModalIsOpen] = useState(false);
*/


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteHandler() {
        //alert('test');
        handleShow();
    }

    return (
        <>
            <div className="row align-items-center justify-content-start">
                <div className='col-auto'>
                    <div className='icRight'>
                        <label className="d-block">
                            <input className="radio_animated" type="radio" name="rdo-ani" />
                        </label>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4">
                    <div className="form-group">
                        <label className="col-form-label">Rate Plan Type</label>
                        <select className="form-control" >
                            <option value="1">General</option>
                            <option value="2">Corporate</option>
                            <option value="3">Government</option>
                            <option value="4">B2B</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4">
                    <div className="form-group">
                        <label className="col-form-label">Rate Plan</label>
                        <select className="form-control">
                            <option value="0">---Select---</option>
                            <option value="1">Rate Plan 1</option>
                            <option value="2">Rate Plan 2</option>
                            <option value="3">Rate Plan 3</option>
                            <option value="4">Rate Plan 4</option>
                        </select>
                    </div>
                </div>
                <div className="col-auto">
                    <div className="icRight">
                        <i className="fa fa-plus"></i> <i className="fa fa-minus" onClick={deleteHandler}></i>
                    </div>
                </div>

            </div>

            {/** ModalDelete */}
            {/*{modalIsOpen ? <ModalConfirm /> : null}*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{padding:'20px 0px'}}>
                        <h4 className="text-center my-auto">Are you sure?</h4>
                    </div>
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

export default MapRatePlan;