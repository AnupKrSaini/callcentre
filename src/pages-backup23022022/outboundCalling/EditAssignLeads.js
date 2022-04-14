import React from 'react';
import Breadcrumb from '../../components/common/breadcrumb';


const EditAssignLeads = () => {
    return (
        <>
            <Breadcrumb title="Assigned Call" parent="Outbound Calling" />
            <div className='container-fluid'>

                <div className='row'>
                    <div className='col-md-12 text-right'>
                        <button className="btn btn-secondary"><i className='fa fa-headphones'></i> Click to Call</button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className="card">
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Executive Name</label>
                                            <input className="form-control" type="text" value="Anil" disabled />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Date</label>
                                            <input className="form-control" type="text" value="10/1/2022" disabled />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Customer Name</label>
                                            <input className="form-control" type="text" value="Shiv" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Mobile</label>
                                            <input className="form-control" type="tel"  value="7982563259" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Email Id</label>
                                            <input className="form-control" type="email" value="shiv@pratyaksh.com"  />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Gender</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1" selected>Male</option>
                                                <option value="2">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Date of Birth</label>
                                            <input className="form-control digits" type="date" defaultValue="1982-01-01" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Age</label>
                                            <input className="form-control" type="text" value="39" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">State</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1" selected>State 1</option>
                                                <option value="2">State 2</option>
                                                <option value="3">State 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">City</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1" selected>City 1</option>
                                                <option value="2">City 2</option>
                                                <option value="3">City 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Area</label>
                                            <input className="form-control" type="text" value="Ghaziabad" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Pincode</label>
                                            <input className="form-control" type="text"  value="201009" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Address</label>
                                            <input className="form-control" type="text"  value="Vijay Nagar" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Query</label>
                                            <input className="form-control" type="text"  value="lorem ipsum" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Solution</label>
                                            <input className="form-control" type="text" value="lorem ipsum" />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Call Type</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1" selected>Dumped</option>
                                                <option value="2">Warm</option>
                                                <option value="3">Cold</option>
                                                <option value="4">Hot</option>
                                                <option value="5">Success</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-lg-3 col-md-12'>
                                        <label className="col-form-label">Status</label>
                                        <div className="form-group animate-chk">
                                            <div className="form-check form-check-inline">
                                                <label className="col-form-label d-block" htmlFor="rd1">
                                                    <input className="radio_animated" id="rd1" type="radio" name="rdo-ani" checked />
                                                    Pending
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="col-form-label d-block" htmlFor="rd2">
                                                    <input className="radio_animated" id="rd2" type="radio" name="rdo-ani" />
                                                    Resolved
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Priorty</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1" selected>High</option>
                                                <option value="2">Medium</option>
                                                <option value="3">Low</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Follow Up Date</label>
                                            <input className="form-control digits" type="date" defaultValue="2022-01-20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-secondary mr-1">Cancel</button>
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='row'>
                    <div className='col-md-12 text-center'>
                        <button className="btn btn-secondary mr-1">Cancel</button>
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div> */}

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <h5>Previous History</h5>
                            </div>
                            <div className='card-body'>
                                <div className='row justify-content-center'>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Executive Name</label>
                                            <input className="form-control" type="text" value="Anil" disabled />
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="form-group">
                                            <label className="col-form-label">Date</label>
                                            <input className="form-control" type="text" value="10/1/2022" disabled />
                                        </div>
                                    </div>
                                    <div className='w-100'></div>
                                    <div className='col-md-12'>
                                        <div className="form-group">
                                            <label className="col-form-label">Query</label>
                                            <textarea className="form-control" rows="4" disabled>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className="form-group">
                                            <label className="col-form-label">Tests</label>
                                            <textarea className="form-control" rows="4" disabled>
                                                blood count, blood typing, bone marrow aspiration, cephalin-cholesterol flocculation
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EditAssignLeads;