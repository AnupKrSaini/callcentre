import React, { Fragment, useState } from 'react';
//import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Breadcrumb from '../../components/common/breadcrumb';
import Paging from '../../components/common/paging/paging';

import EditToolTip from '../UI/ToolTips/EditToolTip';
import DeleteToolTip from '../UI/ToolTips/DeleteToolTip';
import ActiveToolTip from '../UI/ToolTips/ActiveToolTip';
import InactiveToolTip from '../UI/ToolTips/InactiveToolTip';



const MachineMaster = () => {

    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }

    const Displayalert = () => {
        SweetAlert.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        })
            .then((result) => {
                if (result.value) {
                    SweetAlert.fire(
                        'Deleted!',
                        'Data has been deleted.',
                        'success'
                    )
                }
                else {
                    SweetAlert.fire(
                        'Your data is safe!'
                    )
                }
            })
    }

    const setActiveAlert = () => {
        SweetAlert.fire({ title: "Success", text: "Status has been changed!", icon: "success" });
    }

    const updateHandler = () => {
        setModal(!modal);
        SweetAlert.fire({ title: "Success!", text: "Data has been updated!", icon: "success" });
    }

    return (
        <Fragment>
            <Breadcrumb title="Machine Master" parent="Master" />
            <div className='container-fluid'>

                <form className="theme-form">
                    {/**Contact Person Detail */}
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card">
                                <div className="card-header">
                                    <h5>Machine</h5>
                                </div>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label className="col-form-label">Centre</label>
                                                <select class="form-control">
                                                    <option value="0">---Select---</option>
                                                    <option value="1">Centre 1</option>
                                                    <option value="2">Centre 2</option>
                                                    <option value="3">Centre 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label className="col-form-label">Service Subgroup</label>
                                                <select class="form-control">
                                                    <option value="0">---Select---</option>
                                                    <option value="1">Service Subgroup 1</option>
                                                    <option value="2">Service Subgroup 2</option>
                                                    <option value="3">Service Subgroup 3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label className="col-form-label">Machine Name</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label className="col-form-label">Working Time-In</label>
                                                <input className="form-control digits" type="time" defaultValue="09:45:00" />
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className="form-group">
                                                <label className="col-form-label">Working Time-Out</label>
                                                <input className="form-control digits" type="time" defaultValue="20:30:00" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button className="btn btn-secondary mr-1">Cancel</button>
                                    <button className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='col-md-12'>
                            <div className="card">
                                <div className="card-header">
                                    <h5>List</h5>
                                </div>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='table-responsive'>
                                                <table className='table'>
                                                    <thead className='thead-light'>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Centre</th>
                                                            <th scope="col">Service Group</th>
                                                            <th scope="col">Machine Name</th>
                                                            <th scope="col">Working Time-In</th>
                                                            <th scope="col">Working Time-Out</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr>
                                                            <th>1</th>
                                                            <td>Super Medical Hall</td>
                                                            <td>Head Plain</td>
                                                            <td>Dual City Scan	</td>
                                                            <td>9:30 AM	</td>
                                                            <td>5:20 PM	</td>
                                                            <td>
                                                                <EditToolTip title="Edit" placement="top" onClick={toggleModal} />
                                                                <DeleteToolTip title="Delete" placement="top" onClick={Displayalert} />
                                                                <ActiveToolTip title="Active" placement="top" onClick={setActiveAlert} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>2</th>
                                                            <td>Super Medical Hall</td>
                                                            <td>Head Plain</td>
                                                            <td>Dual City Scan	</td>
                                                            <td>9:30 AM	</td>
                                                            <td>5:20 PM	</td>
                                                            <td>
                                                                <EditToolTip title="Edit" placement="top" onClick={toggleModal} />
                                                                <DeleteToolTip title="Delete" placement="top" onClick={Displayalert} />
                                                                <InactiveToolTip title="Inactive" placement="top" onClick={setActiveAlert} />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>3</th>
                                                            <td>Super Medical Hall</td>
                                                            <td>Head Plain</td>
                                                            <td>Dual City Scan	</td>
                                                            <td>9:30 AM	</td>
                                                            <td>5:20 PM	</td>
                                                            <td>
                                                                <EditToolTip title="Edit" placement="top" onClick={toggleModal} />
                                                                <DeleteToolTip title="Delete" placement="top" onClick={Displayalert} />
                                                                <ActiveToolTip title="Active" placement="top" onClick={setActiveAlert} />
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                            <Paging />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>

            </div>


            <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                <ModalHeader toggle={toggleModal}>Edit</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="recipient-name">Centre:</label>
                            <select class="form-control">
                                <option value="0">---Select---</option>
                                <option value="1" selected>Centre 1</option>
                                <option value="2">Centre 2</option>
                                <option value="3">Centre 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="message-text">Service Subgroup:</label>
                            <select class="form-control">
                                <option value="0">---Select---</option>
                                <option value="1" selected>Service Subgroup 1</option>
                                <option value="2">Service Subgroup 2</option>
                                <option value="3">Service Subgroup 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="message-text">Machine Name:</label>
                            <input className="form-control" type="text" value="Dual City Scan" />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="message-text">Working Time-In:</label>
                            <input className="form-control digits" type="time" defaultValue="09:45:00" />
                        </div>
                        <div className="form-group">
                            <label className="col-form-label" htmlFor="message-text">Working Time-Out:</label>
                            <input className="form-control digits" type="time" defaultValue="20:30:00" />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    <Button color="primary" onClick={updateHandler}>Update</Button>
                </ModalFooter>
            </Modal>

        </Fragment>
    )
}

export default MachineMaster;