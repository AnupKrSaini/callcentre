import React from 'react';
import Breadcrumb from '../components/common/breadcrumb';
//import Paging from '../components/common/paging/paging';
import UnassignedLists from './commonComponent/UnassignedLists';
import AssignedLists from './commonComponent/AssignedLists';
import CustomerFollowupLists from './commonComponent/CustomerFollowupLists';


const unAssignedViewHandler = () => {
    window.location.href = `${process.env.PUBLIC_URL}/pages/outboundCalling/UnassignedLeads`;
}
const assignedViewHandler = () => {
    window.location.href = `${process.env.PUBLIC_URL}/pages/outboundCalling/AssignedLeads`;
}
const followupViewHandler = () => {
    window.location.href = `${process.env.PUBLIC_URL}/pages/outboundCalling/CustomerFollowUp`;
}
const dumpedViewHandler = () => {
    window.location.href = `${process.env.PUBLIC_URL}/pages/outboundCalling/CallTypeStatus`;
}


const Dashboard = () => {
    return (
        <>
            <Breadcrumb title="Dashboard" parent="" />
            <div className="container-fluid">

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Unassigned Outbound Calls</h5>
                            </div>
                            <div className='card-body'>
                                <UnassignedLists />
                                <p className='text-center mt15'>
                                    <button className='btn btn-primary' onClick="#">View All</button>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Assigned Outbound Calls</h5>
                            </div>
                            <div className='card-body'>
                                <AssignedLists />
                                <p className='text-center mt15'>
                                    <button className='btn btn-primary' onClick={assignedViewHandler}>View All</button>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Outbound Calling Follow up</h5>
                            </div>
                            <div className='card-body'>
                                <CustomerFollowupLists />
                                <p className='text-center mt15'>
                                    <button className='btn btn-primary' onClick={followupViewHandler}>View All</button>
                                </p>
                            </div>

                        </div>
                    </div>
                </div> */}

                <div className='row justify-content-center'>
                    {/* <div className='col-lg-6'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Dumped Callings</h5>
                            </div>
                            <div className='card-body'>

                            </div>

                        </div>
                    </div> */}
{/* 
                    <div class="col-lg-4 col-md-6 text-center">
                        <div class="card server-card-bg">
                            <div class="card-body server-widgets">
                                <div>
                                    <h6 class="mb-0">Dumped Calling</h6>
                                </div>
                                <div class="bottom-server">
                                    <h5 class="mb-0">10</h5>
                                </div>
                                <div>
                                    <button className='btn btn-secondary btn-sm' onClick={dumpedViewHandler}>View All</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div class="col-lg-4 col-md-6 text-center">
                        <div class="card server-card-bg">
                            <div class="card-body server-widgets">
                                <div>
                                    <h6 class="mb-0">Successful Calling</h6>
                                </div>
                                <div class="bottom-server">
                                    <h5 class="mb-0">50</h5>
                                </div>
                                <div>
                                    <button className='btn btn-secondary btn-sm'>View All</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>


            </div>
        </>
    )
}

export default Dashboard;