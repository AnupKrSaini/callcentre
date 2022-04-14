import React from "react";
import CallToolTip from '../UI/ToolTips/CallToolTip';

const DUMMY_DATA_Assigned = [
    {
        id: 'u1',
        SNo: '1',
        ExecutiveName: 'Anil',
        ExecutiveNumber: '111',
        CustomerName: 'Shiv',
        CustomerMobile: '7982563259',
        SourceType:'Web',
        Source: 'Social Media',
        Purpose:'Package',
        Team:'Default'
        //SourceDate: '2/12/2021',
    },
    {
        id: 'u2',
        SNo: '2',
        ExecutiveName: 'Sunil',
        ExecutiveNumber: '112',
        CustomerName: 'Anup',
        CustomerMobile: '8895632598',
        SourceType:'Inbound Call',
        Source: 'test',
        Purpose:'Payment Issue',
        Team:'Deafault 2'
        //SourceDate: '4/12/2021',
    },
    {
        id: 'u3',
        SNo: '3',
        ExecutiveName: 'Manish',
        ExecutiveNumber: '113',
        CustomerName: 'Zahid',
        CustomerMobile: '8869523156',
        SourceType:'PABX',
        Source: 'Test2',
        Purpose:'Package',
        Team:'Deafault 2'
        //SourceDate: '6/12/2021',
    },
    {
        id: 'u4',
        SNo: '4',
        ExecutiveName: 'Pankaj',
        ExecutiveNumber: '114',
        CustomerName: 'Shahid',
        CustomerMobile: '7895641236',
        SourceType:'PABX',
        Source: 'Test',
        Purpose:'Package',
        Team:'Deafault 2'
        //SourceDate: '6/12/2021',
    },
    {
        id: 'u5',
        SNo: '5',
        ExecutiveName: 'Suresh',
        ExecutiveNumber: '111',
        CustomerName: 'kavish',
        CustomerMobile: '8596545232',
        SourceType:'Internal Platform',
        Source: 'Missed Call',
        Purpose:'Package',
        Team:'Deafault 2'
        //SourceDate: '6/12/2021',
    },

];

const AddLeadsHandler = () => {
    window.location.href = `${process.env.PUBLIC_URL}/pages/outboundCalling/AddAssignLeads`;
}

const AssignedLists = () => {
    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            {/* <th scope="col">Executive Name</th>
                            <th scope="col">Executive Number</th> */}
                            <th scope="col">Customer Name</th>
                            <th scope="col">Customer Mobile</th>
                            <th scope="col">Source Type</th>
                            <th scope="col">Source Name</th>
                            <th scope="col">Purpose</th>
                            <th scope="col">Team</th>
                            <th scope="col" className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DUMMY_DATA_Assigned.map((tb) => {
                            return (
                                <>
                                    <tr key={tb.id}>
                                        <th>{tb.SNo}</th>
                                        {/* <td>{tb.ExecutiveName}</td>
                                        <td>{tb.ExecutiveNumber}</td> */}
                                        <td>{tb.CustomerName}</td>
                                        <td>{tb.CustomerMobile}</td>
                                        <td>{tb.SourceType}</td>
                                        <td>{tb.Source} </td>
                                        <td>{tb.Purpose} </td>
                                        <td>{tb.Team} </td>
                                        <td className='text-center'>
                                            <CallToolTip title="Call" placement="top" id={`call${tb.SNo}`} onClick={AddLeadsHandler} />
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

export default AssignedLists