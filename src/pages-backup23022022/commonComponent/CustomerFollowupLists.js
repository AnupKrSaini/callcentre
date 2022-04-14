import React from "react";
import SweetAlert from 'sweetalert2';
import EditToolTip from '../UI/ToolTips/EditToolTip';
import DeleteToolTip from '../UI/ToolTips/DeleteToolTip';

const CustomerFollowupLists = () => {
    
    const DUMMY_DATA_Followup = [
        {
            id: 'u1',
            SNo: '1',
            ExecutiveName: 'Anil',
            ExecutiveMobile: '8565458956',
            CustomerName: 'Shiv',
            CustomerMobile: '7982563259',
            Status: 'Pending',
            FollowupDate: '2/12/2021',
        },
        {
            id: 'u2',
            SNo: '2',
            ExecutiveName: 'Sunil',
            ExecutiveMobile: '9856489568',
            CustomerName: 'Anup',
            CustomerMobile: '8895632598',
            Status: 'Pending',
            FollowupDate: '4/12/2021',
        },
        {
            id: 'u3',
            SNo: '3',
            ExecutiveName: 'Manish',
            ExecutiveMobile: '7894568789',
            CustomerName: 'Zahid',
            CustomerMobile: '8869523156',
            Status: 'Pending',
            FollowupDate: '6/12/2021',
        },
        {
            id: 'u4',
            SNo: '4',
            ExecutiveName: 'Pankaj',
            ExecutiveMobile: '9956878952',
            CustomerName: 'Shahid',
            CustomerMobile: '7895641236',
            Status: 'Pending',
            FollowupDate: '6/12/2021',
        },
        {
            id: 'u5',
            SNo: '5',
            ExecutiveName: 'Suresh',
            ExecutiveMobile: '8859642158',
            CustomerName: 'kavish',
            CustomerMobile: '8596545232',
            Status: 'Pending',
            FollowupDate: '6/12/2021',
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
    
    const EditLeadsHandler = () =>{
        window.location.href = `${process.env.PUBLIC_URL}/pages/outboundCalling/EditAssignLeads`;
    }
    const DeleteLeadsHandler = () =>{
        Displayalert();
    }
    
    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Executive Name</th>
                            <th scope="col">Executive Mobile</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Customer Mobile</th>
                            <th scope="col">Follow up Date</th>
                            <th scope="col">Status</th>
                            <th scope="col" className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DUMMY_DATA_Followup.map((tb) => {
                            return (
                                <>
                                    <tr key={tb.id}>
                                        <th>{tb.SNo}</th>
                                        <td>{tb.ExecutiveName}</td>
                                        <td>{tb.ExecutiveMobile}</td>
                                        <td>{tb.CustomerName}</td>
                                        <td>{tb.CustomerMobile}</td>
                                        <td>{tb.FollowupDate} </td>
                                        <td>{tb.Status} </td>
                                        <td className='text-center'>
                                            <EditToolTip title="Edit" placement="top" onClick={EditLeadsHandler} />
                                            <DeleteToolTip title="Delete" placement="top" onClick={DeleteLeadsHandler} />
                                        </td>
                                    </tr>
                                </>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CustomerFollowupLists