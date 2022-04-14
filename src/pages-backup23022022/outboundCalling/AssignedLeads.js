import React from 'react';
//import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/common/breadcrumb';
import Paging from '../../components/common/paging/paging';
import AssignedLists from '../commonComponent/AssignedLists';



const AssignedLeads = () => {

    return (
        <>
            <Breadcrumb title="Assigned Calls" parent="Outbound Calling" />
            <div className='container-fluid'>

                {/* <div className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className="form-group mb-0">
                            <label className="col-form-label">Search By Executive Name</label>
                            <select className="form-control">
                                <option value="0">---Select---</option>
                                <option value="1">Anil</option>
                                <option value="2">Sunil</option>
                                <option value="3">Manish</option>
                                <option value="4">Pankaj</option>
                                <option value="5">Suresh</option>
                            </select>
                        </div>
                    </div>
                </div> */}

                <div className='row mt15'>
                    <div className='col-md-12'>
                        <div className='card'>
                            {/* <div className='card-header pb-0'>
                                <h5>Follow up Leads</h5>
                            </div> */}
                            <div className='card-body'>
                                <div className='row justify-content-center'>
                                    <div className='col-md-4'>
                                        <div className="form-group mb-0">
                                            <label className="col-form-label"><strong>Search By Team</strong></label>
                                            <select className="form-control">
                                                <option value="0">---Select---</option>
                                                <option value="1">Default1</option>
                                                <option value="2">Default2</option>
                                                <option value="3">Default3</option>
                                                <option value="4">Default4</option>
                                                <option value="5">Default5</option>
                                            </select>
                                        </div>
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
                                <h5>Assigned Calls List</h5>
                            </div>
                            <div className='card-body'>
                                <AssignedLists />
                                <Paging />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AssignedLeads;