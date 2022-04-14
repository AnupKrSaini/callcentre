import React, { useState } from 'react';
import SweetAlert from 'sweetalert2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Breadcrumb from '../../components/common/breadcrumb';
import bookingImage from '../../assets/images/booking.jpg'; 

const AddAssignLeads = () => {
    const [visible, setVisible] = useState(false);
    const [modify, setModify] = useState(false);
    const [sms, setSms] = useState(false);
    const [booking, setBooking] = useState(false);

    const [modal, setModal] = useState();
    const toggleModal = () => {
        setModal(!modal)
    }

    const updateHandler = () => {
        setModal(!modal);
        SweetAlert.fire({ title: "Success!", text: "Data has been updated!", icon: "success" });
    }

    const modifyHandler = () => {
        setModal(!modal);
        setModify(true);
        setSms(false);
        setBooking(false);
    }

    const smsHandler = () => {
        setModal(!modal);
        setModify(false);
        setSms(true);
        setBooking(false);
    }

    const bookHandler = () => {
        setModal(!modal);
        setModify(false);
        setSms(false);
        setBooking(true);
    }

    

    // const getInitialState = () => {
    //     const value = "0";
    //     return value;
    // };

    const [value, setValue] = useState('0');

    const changeHandler = (e) => {
        setValue(e.target.value);
        //alert(e.target.value);
        const s1 = e.target.value;
        if (s1 === "1" || s1 === "3" || s1 === "4") {
            setVisible(true);
        }
        if (s1 === "2" || s1 === "5") {
            setVisible(false);
        }
    }


    return (
        <>
            <Breadcrumb title="Assigned Call" parent="Outbound Calling" />
            <div className='container-fluid'>


                <div className='row'>
                    <div className='col-md-8'>
                        <div className="card">
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Customer Name</b></label>
                                            <input className="form-control-plaintext" type="text" value="Manish" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Mobile</b></label>
                                            <input className="form-control-plaintext" type="tel" value="9953685212" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Source</b></label>
                                            <input className="form-control-plaintext" type="text" value="Missed Call" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label"><b>Purpose</b></label>
                                            <input className="form-control-plaintext" type="text" value="New Call" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-primary mr-1"><i className='fa fa-headphones'></i> Click to Call</button>
                                {/* <button className="btn btn-secondary" onClick={modifyHandler}>Modify Personal Detail</button> */}
                            </div>
                        </div>

                        <div className="card">
                            <div className='card-header pb-0'>
                                <h5>Home Collection</h5>
                            </div>
                            <div className="card-body">
                                <div className='row justify-content-between'>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Location</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                        <div className="form-group text-center">
                                            <button class="btn btn-secondary btn-sm" type="button" onClick={bookHandler}>Book Appointment</button>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Radiology Location</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                        <div className="form-group text-center">
                                            <button class="btn btn-secondary btn-sm" type="button" onClick={bookHandler}>Book Appointment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className='card-header pb-0'>
                                <h5>Report</h5>
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className='thead-light'>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>UHID/Lab No.</th>
                                                        <th>Patient</th>
                                                        <th>Invoice No./ Invoice Date </th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center' colSpan="6">No Data Found</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className='card-header pb-0'>
                                <h5>Sample Quotation</h5>
                            </div>
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Patient Type</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1">Walk-in</option>
                                                <option value="2">Corporate</option>
                                                <option value="3">Government</option>
                                                <option value="4">Insurance</option>
                                                <option value="5">B2B</option>
                                                <option value="6">IPD</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Rate Type</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1">Standard</option>
                                                <option value="2">Rate 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Add Test</label>
                                            {/* <input className="form-control" type="text" /> */}
                                            <div className="input-group mb-3">
                                                <input type="text" class="form-control" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-secondary" type="button"><i class="fa fa-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* <div className='auto'>
                                        <div className="form-group">
                                            <label className="col-form-label">&nbsp;</label>
                                            <div><i class="fa fa-plus-square icRight"></i></div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className='row' style={{ marginTop: '30px' }}>
                                    <div className="col-md-12 text-right">
                                        <b>Total Test: <span className='text-danger'>3</span>  &nbsp;  Total Amount: <span className='text-danger'><i class="fa fa-inr"></i> 6000</span></b>
                                    </div>
                                    <div className='col-md-12 mt15'>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className='thead-light'>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Code</th>
                                                        <th>Item</th>
                                                        <th>Modality</th>
                                                        <th>Amt</th>
                                                        <th>Delivery Date</th>
                                                        {/* <th>Precautions</th>
                                                        <th>Prerequisite</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>1235</td>
                                                        <td>Head Plain</td>
                                                        <td>Biochemistry</td>
                                                        <td><i className="fa fa-inr"></i> 2500</td>
                                                        <td>20 July 2017</td>
                                                        {/* <td> Fasting </td>
                                                        <td></td> */}
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>2598</td>
                                                        <td>3D Reconstruction Face</td>
                                                        <td>Biochemistry</td>
                                                        <td><i className="fa fa-inr"></i> 1300</td>
                                                        <td>02 Aug 2017</td>
                                                        {/* <td></td>
                                                        <td></td> */}
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>3568</td>
                                                        <td>TempoRal Bone (Hrct) Plain</td>
                                                        <td>Ultrasound</td>
                                                        <td><i className="fa fa-inr"></i> 2200</td>
                                                        <td>20 Aug 2017</td>
                                                        {/* <td><div>Fasting</div>
                                                            <div>Bladder Full</div></td>
                                                        <td><div>Prescription</div>
                                                            <div>Aaddhar Copy</div></td> */}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>{/** en col-md-8 */}

                    <div className='col-md-4'>
                    <div className='row'>
                            <div class="col-md-12">
                                <div className='card'>
                                    <div className='card-header pb-0'>
                                        <h5>Call Summary</h5>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <div className="form-group">
                                                    <label className="col-form-label">Notes</label>
                                                    <textarea className="form-control" rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>

                                            <div className='col-md-12'>
                                                <div className="form-group">
                                                    <label className="col-form-label">Call Status</label>
                                                    <select class="form-control" value={value} onChange={changeHandler}>
                                                        <option value="0">---Select---</option>
                                                        <option value="1" >Follow Up</option>
                                                        <option value="2">Successfull</option>
                                                        <option value="5">Not Interested</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* <div className='col-md-6 text-right'>
                                                <button class="btn btn-primary btn-sm btn-block" type="button">Send SMS</button>
                                            </div> */}

                                            {visible &&
                                                <>
                                                    {/* <div className='col-md-4'>
                                                        <div className="form-group">
                                                            <label className="col-form-label">Priorty</label>
                                                            <select class="form-control">
                                                                <option value="0">---Select---</option>
                                                                <option value="1">High</option>
                                                                <option value="2">Medium</option>
                                                                <option value="3">Low</option>
                                                            </select>
                                                        </div>
                                                    </div> */}
                                                    <div className='col-md-12'>
                                                        <div className="form-group">
                                                            <label className="col-form-label">Follow Up Date</label>
                                                            <input className="form-control digits" type="date" defaultValue="2022-01-12" />
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                        </div>
                                        <div className='row text-center'>
                                            <div class="col-md-12">
                                            <button class="btn btn-primary btn-sm" type="button">Update and Close Call</button>
                                                {/* <button class="btn btn-primary btn-sm mr-1" type="button" onClick={smsHandler}>Send SMS</button>
                                                <button class="btn btn-secondary btn-sm" type="button">Submit</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-header pb-0'>
                                        <h5>Previous Interactions</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6"><strong>Shiv</strong></div>
                                            <div className="col-md-6 text-right text-muted">30 Dec 2021</div>
                                            <div className="col-md-12 m-t-5">
                                                <p className='mb-0'><em><b>Notes:</b> Report Status Requested</em></p>
                                                {/* <p className='mb-0 text-success'><b>Solution:</b> Report has been collected</p> */}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6"><strong>Alok</strong></div>
                                            <div className="col-md-6 text-right text-muted">01 Jan 2022</div>
                                            <div className="col-md-12 m-t-5">
                                                <p className='mb-0'><em><b>Notes:</b> Refund Related Query</em></p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6"><strong>Manish</strong></div>
                                            <div className="col-md-6 text-right text-muted">03 Jan 2022</div>
                                            <div className="col-md-12 m-t-5">
                                                <p className='mb-0'><em><b>Notes:</b> Home Collection Appointment</em></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>


            </div>



            <Modal isOpen={modal} toggle={toggleModal} centered={true}>
                {modify ?
                    <>
                        <ModalHeader toggle={toggleModal}>Edit Personal Detail</ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label">Customer Name:</label>
                                    <input className="form-control" type="text" value="Manish" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Mobile:</label>
                                    <input className="form-control" type="text" value="9953685212" disabled />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label" htmlFor="recipient-name">Gender:</label>
                                    <select class="form-control">
                                        <option value="0">---Select---</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">State:</label>
                                    <select class="form-control">
                                        <option value="0">---Select---</option>
                                        <option value="1">State 1</option>
                                        <option value="2">State 2</option>
                                        <option value="3">State 3</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">City:</label>
                                    <select class="form-control">
                                        <option value="0">---Select---</option>
                                        <option value="1">City 1</option>
                                        <option value="2">City 2</option>
                                        <option value="3">City 3</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Pincode:</label>
                                    <input className="form-control" type="text" />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button color="primary" onClick={updateHandler}>Update</Button>
                        </ModalFooter>
                    </>
                    : null}

                {sms ?
                    <>
                        <ModalHeader toggle={toggleModal}>Send SMS</ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label">Message:</label>
                                    <textarea className="form-control" rows="5"></textarea>
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button color="primary" onClick={toggleModal}>Send SMS</Button>
                        </ModalFooter>
                    </>
                    : null}

                {booking ?
                    <>
                        <ModalHeader toggle={toggleModal}>Book Appointment</ModalHeader>
                        <ModalBody>
                            <p>
                                <img className="img-fluid" src={bookingImage} alt="" />
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            <Button color="primary" onClick={toggleModal}>Submit</Button>
                        </ModalFooter>
                    </>
                    : null}

            </Modal>

        </>
    )
}

export default AddAssignLeads;