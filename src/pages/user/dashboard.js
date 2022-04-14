import React, { useEffect } from 'react';
import Breadcrumb from '../commonComponent/common/breadcrumb';
import UnassignedLists from '../commonComponent/Usecomponent/Userunassignedlists';
import UserAssignedLists from '../commonComponent/Usecomponent/userassignedlists';
import { useHistory } from 'react-router';




const Dashboard = () => {
    // console.log("Session" + localStorage.getItem('Session'));
    // let navigate = useHistory();
    // useEffect(() => {
    //     debugger;
    //     if (localStorage.getItem('Session') === null) {
    //         navigate.push('/');
    //     }
    // }, [])


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
                                <UserAssignedLists />

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