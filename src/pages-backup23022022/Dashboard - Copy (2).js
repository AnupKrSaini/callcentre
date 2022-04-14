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

const Dashboard = () => {
    return (
        <>
            <Breadcrumb title="Dashboard" parent="" />
            <div className="container-fluid">

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Unassigned Outbound Callings</h5>
                            </div>
                            <div className='card-body'>
                                <UnassignedLists />
                                <p className='text-center mt15'>
                                    <button className='btn btn-primary' onClick={unAssignedViewHandler}>View All</button>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Assigned Outbound Callings</h5>
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

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Outbound Callings Follow up</h5>
                            </div>
                            <div className='card-body'>
                                <CustomerFollowupLists />
                                <p className='text-center mt15'>
                                    <button className='btn btn-primary' onClick={followupViewHandler}>View All</button>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

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

                    <div class="col-lg-4 col-md-6 text-center">
                        <div class="card server-card-bg">
                            <div class="card-body server-widgets">
                                <div>
                                    <h6 class="mb-0">Dumped Callings</h6>
                                </div>
                                <div class="bottom-server">
                                    {/* <h5 class="mb-0">10 / <span>100</span></h5> */}
                                    <h5 class="mb-0">10</h5>
                                </div>
                                <div>
                                    <button className='btn btn-secondary btn-sm'>View All</button>
                                </div>
                                {/* <div class="progress">
                                    <div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{ width: '55%' }}></div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6">
                        <div class="card server-card-bg">
                            <div class="card-body server-widgets">
                                <div>
                                    <h6 class="mb-0">Successful Callings</h6>
                                </div>
                                <div class="bottom-server">
                                    <h5 class="mb-0">50 / <span>120</span></h5>
                                </div>
                                {/* <div class="progress">
                                    <div class="progress-bar-animated bg-primary progress-bar-striped" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{ width: '55%' }}></div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default Dashboard;