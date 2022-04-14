import React,{useState,useEffect} from 'react';
 import Breadcrumb from '../commonComponent/common/breadcrumb';
import UnassignedLists from '../commonComponent/Usecomponent/unassignedlists';
import AssignedLists from '../commonComponent/Usecomponent/assignedlists';
import ComplaintLists from '../commonComponent/Usecomponent/complaintlists';
import DatePicker from "react-datepicker";
const unAssignedViewHandler = () => {
    window.location.href = `${process.env.PUBLIC_URL}/admin/outbound/unassignedcalls`;
}

const Dashboard = () => {
   
    
    return (
        <>
            <Breadcrumb title="Dashboard" parent="" />
            <div className="container-fluid">
{/* 
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Unassigned Outbound Calls</h5>
                            </div>
                            <div className='card-body'>
                                <UnassignedLists />
                               
                            </div>

                        </div>
                    </div>
                </div> */}

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header pb-0'>
                                <h5>Assigned Outbound Calls</h5>
                            </div>
                            <div className='card-body'>
                                <AssignedLists />
                                
                            </div>

                        </div>
                    </div>
                </div>

                <div className='row justify-content-center'>
                   
                </div>


            </div>
        </>
    )
}

export default Dashboard;