import React from 'react';
import SweetAlert from 'sweetalert2';
import Breadcrumb from '../../components/common/breadcrumb';
import Paging from '../../components/common/paging/paging';
import ViewToolTip from '../UI/ToolTips/ViewToolTip';
import DeleteToolTip from '../UI/ToolTips/DeleteToolTip';


const CallTypeStatus = () => {

    const DUMMY_DATA_CallType = [
        {
            id: 'u1',
            SNo: '1',
            ExecutiveName: 'Anil',
            ExecutiveMobile: '8565458956',
            CustomerName: 'Shiv',
            CustomerMobile: '7982563259',
            Source: 'Web',
            CallType: 'Dumped',
        },
        {
            id: 'u2',
            SNo: '2',
            ExecutiveName: 'Sunil',
            ExecutiveMobile: '9856489568',
            CustomerName: 'Anup',
            CustomerMobile: '8895632598',
            Source: 'Social Media',
            CallType: 'Dumped',
        },
        {
            id: 'u3',
            SNo: '3',
            ExecutiveName: 'Manish',
            ExecutiveMobile: '7894568789',
            CustomerName: 'Zahid',
            CustomerMobile: '8869523156',
            Source: 'Missed Call',
            CallType: 'Dumped',
        },
        {
            id: 'u4',
            SNo: '4',
            ExecutiveName: 'Pankaj',
            ExecutiveMobile: '9956878952',
            CustomerName: 'Shahid',
            CustomerMobile: '7895641236',
            Source: 'Social Media',
            CallType: 'Dumped',
        },
        {
            id: 'u5',
            SNo: '5',
            ExecutiveName: 'Suresh',
            ExecutiveMobile: '8859642158',
            CustomerName: 'kavish',
            CustomerMobile: '8596545232',
            Source: 'Web',
            CallType: 'Dumped',
        },

    ];

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
                        'Data has been deleted successfully.',
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

    // const EditLeadsHandler = () => {
    //     window.location.href = `${process.env.PUBLIC_URL}/pages/outboundCalling/EditAssignLeads`;
    // }
    const DeleteLeadsHandler = () => {
        Displayalert();
    }


    return (
        <>
            <Breadcrumb title="Call Type Status" parent="Outbound Calling" />
            <div className='container-fluid'>


                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            {/* <div className='card-header pb-0'>
                                <h5>Call Type Status</h5>
                            </div> */}
                            <div className='card-body'>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Executive Name</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Customer Mobile</th>
                                                <th scope="col">Source</th>
                                                <th scope="col">Call Type</th>
                                                <th scope="col" className='text-center'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DUMMY_DATA_CallType.map((tb) => {
                                                return (
                                                    <>
                                                        <tr key={tb.id}>
                                                            <th>{tb.SNo}</th>
                                                            <td>{tb.ExecutiveName}</td>
                                                            <td>{tb.CustomerName}</td>
                                                            <td>{tb.CustomerMobile}</td>
                                                            <td>{tb.Source}</td>
                                                            <td>{tb.CallType}</td>
                                                            <td className='text-center'>
                                                                <ViewToolTip title="View" placement="top" />
                                                                <DeleteToolTip title="Delete" placement="top" onClick={DeleteLeadsHandler} />
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                                <Paging />
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default CallTypeStatus;