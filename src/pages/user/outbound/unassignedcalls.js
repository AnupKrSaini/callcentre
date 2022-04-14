import React, { useState } from 'react';
import SweetAlert from 'sweetalert2';
import Breadcrumb from '../../commonComponent/common/breadcrumb';
import UnassignedLists from '../../commonComponent/Usecomponent/Userunassignedlists';
import Paging from '../../../components/common/paging/paging';

const Unassignedcalls = () => {
    const successAlert = () => {
        SweetAlert.fire({ title: "Success", text: "Calls have been pushed successfully!", icon: "success" });
    }

    const [leads, setLeads] = useState(true);

    const pushLeadsHandler = () => {
        setLeads(false);
        successAlert();
    }


    return (
        <>
            <Breadcrumb title="Unassign Calls" parent="Admin" />
            <div className='container-fluid'>

                {/* <div className='row'>
                    <div className='col-md-12 text-center'>
                        <button className="btn btn-primary" onClick={pushLeadsHandler}>Push Leads</button>
                    </div>
                </div> */}

                <div className='row mt15'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-12 text-center'>
                                        <button className="btn btn-primary" onClick={pushLeadsHandler}>Push Calls</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {leads ?
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='card-header pb-0'>
                                    <h5>Unassign Calls List</h5>
                                </div>
                                <div className='card-body'>
                                    <UnassignedLists />
                                    <Paging />
                                </div>

                            </div>
                        </div>
                    </div>
                    : null}





            </div>
        </>
    )
}

export default Unassignedcalls;