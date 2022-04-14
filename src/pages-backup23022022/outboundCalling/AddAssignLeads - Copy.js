import React, { useState } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';


const AddAssignLeads = () => {

    const [visible, setVisible] = useState(false);

   

    const [value, setValue] = useState('0');

    const changeHandler = (e) => {
        setValue(e.target.value);
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
                    <div className='col-md-12 text-right'>
                        <button className="btn btn-secondary"><i className='fa fa-headphones'></i> Click to Call</button>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-8'>
                        <div className="card">
                            <div className="card-body">
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Executive Name</label>
                                            <input className="form-control" type="text" value="Anil" disabled />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Date</label>
                                            <input className="form-control" type="text" value="10/1/2022" disabled />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Customer Name</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Mobile</label>
                                            <input className="form-control" type="tel" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Email Id</label>
                                            <input className="form-control" type="email" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Gender</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Date of Birth</label>
                                            <input className="form-control digits" type="date" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Age</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">State</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1">State 1</option>
                                                <option value="2">State 2</option>
                                                <option value="3">State 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">City</label>
                                            <select class="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1">City 1</option>
                                                <option value="2">City 2</option>
                                                <option value="3">City 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Area</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Pincode</label>
                                            <input className="form-control" type="text" />
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Address</label>
                                            <textarea className="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Query</label>
                                            <textarea className="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Solution</label>
                                            <textarea className="form-control" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group">
                                            <label className="col-form-label">Call Type</label>
                                            <select class="form-control" value={value} onChange={changeHandler}>
                                                <option value="0">---Select---</option>
                                                <option value="1" >Follow Up</option>
                                                <option value="2">Successfull</option>
                                                <option value="3">Pending</option>
                                                <option value="4">Interested</option>
                                                <option value="5">Not Interested</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {visible &&
                                        <>
                                            <div className='col-md-4'>
                                                <div className="form-group">
                                                    <label className="col-form-label">Priorty</label>
                                                    <select class="form-control">
                                                        <option value="0">---Select---</option>
                                                        <option value="1">High</option>
                                                        <option value="2">Medium</option>
                                                        <option value="3">Low</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className="form-group">
                                                    <label className="col-form-label">Follow Up Date</label>
                                                    <input className="form-control digits" type="date" defaultValue="2022-01-20" />
                                                </div>
                                            </div>
                                        </>
                                    }

                                    {/* <div className='col-lg-4 col-md-12'>
                                        <label className="col-form-label">Status</label>
                                        <div className="form-group animate-chk">
                                            <div className="form-check form-check-inline">
                                                <label className="col-form-label d-block" htmlFor="rd1">
                                                    <input className="radio_animated" id="rd1" type="radio" name="rdo-ani" />
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
                                    </div> */}

                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-secondary mr-1">Cancel</button>
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-4'>
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
                                                <p className='mb-0'><em><b>Query:</b> Report Status Requested</em></p>
                                                <p className='mb-0 text-success'><b>Solution:</b> Report has been collected</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6"><strong>Alok</strong></div>
                                            <div className="col-md-6 text-right text-muted">01 Jan 2022</div>
                                            <div className="col-md-12 m-t-5">
                                                <p className='mb-0'><em><b>Query:</b> Refund Related Query</em></p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6"><strong>Manish</strong></div>
                                            <div className="col-md-6 text-right text-muted">03 Jan 2022</div>
                                            <div className="col-md-12 m-t-5">
                                                <p className='mb-0'><em><b>Query:</b> Home Collection Appointment</em></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div class="col-md-12">
                                <div className="form-group">
                                    <label className="col-form-label">Query</label>
                                    <textarea className="form-control" rows="3"></textarea>
                                </div>
                                <div class="col-md-12 text-right">
                                    <button class="btn btn-secondary btn-sm" type="button">Submit</button>
                                </div>
                            </div>
                        </div> */}

                        {/** 
                        <div class="card"><div class="card-header"><h5>Timeline Danger color</h5></div><div class="card-body"><div class="timeline-small"><div class="media"><div class="timeline-round m-r-30 timeline-line-1 bg-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div><div class="media-body"><h6>New Sale <span class="pull-right f-14">New</span></h6><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p></div></div><div class="media"><div class="timeline-round m-r-30 timeline-line-1 bg-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg></div><div class="media-body"><h6>New Message <span class="pull-right f-14">14m Ago</span></h6><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p></div></div><div class="media"><div class="timeline-round m-r-30 small-line bg-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg></div><div class="media-body"><h6>New Report <span class="pull-right f-14">14m Ago</span></h6><p>Lorem Ipsum is simply dummy text.</p></div></div><div class="media"><div class="timeline-round m-r-30 timeline-line-1 bg-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div><div class="media-body"><h6>New Sale <span class="pull-right f-14">14m Ago</span></h6><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p></div></div><div class="media"><div class="timeline-round m-r-30 medium-line bg-danger"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></div><div class="media-body"><h6>New Visits <span class="pull-right f-14">14m Ago</span></h6><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry.</p></div></div></div></div></div>
                        */}
                    </div>
                </div>

                {/* <div className='row'>
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
                </div> */}

            </div>
        </>
    )
}

export default AddAssignLeads;