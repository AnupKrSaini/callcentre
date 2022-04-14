import React from "react";

const DUMMY_DATA_Unassigned = [
    {
        id: 'u1',
        SNo: '1',
        CustomerName: 'Shiv',
        CustomerMobile: '7982563259',
        SourceType:'Web',
        Source: 'Social Media',
        Prupose: 'Package',
    },
    {
        id: 'u2',
        SNo: '2',
        CustomerName: 'Anup',
        CustomerMobile: '8895632598',
        SourceType:'Inbound Call',
        Source: 'Web',
        Prupose: 'Package',
    },
    {
        id: 'u3',
        SNo: '3',
        CustomerName: 'Zahid',
        CustomerMobile: '8869523156',
        SourceType:'Inbound Call',
        Source: 'Social Media',
        Prupose: 'Payment Issue',
    },
    {
        id: 'u4',
        SNo: '4',
        CustomerName: 'Shahid',
        CustomerMobile: '7895641236',
        SourceType:'PABX',
        Source: 'Test',
        Prupose: 'Payment Issue',
    },
    {
        id: 'u5',
        SNo: '5',
        CustomerName: 'kavish',
        CustomerMobile: '8596545232',
        SourceType:'Web',
        Source: 'Missed Call',
        Prupose: 'Payment Issue',
    },
];

const UnassignedLists = () => {
    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Customer Mobile</th>
                            <th>Source Type</th>
                            <th scope="col">Source</th>
                            <th scope="col">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DUMMY_DATA_Unassigned.map((tb) => {
                            return (
                                <>
                                    <tr key={tb.id}>
                                        <th>{tb.SNo}</th>
                                        <td>{tb.CustomerName}</td>
                                        <td>{tb.CustomerMobile}</td>
                                        <td>{tb.SourceType} </td>
                                        <td>{tb.Source} </td>
                                        <td>{tb.Prupose} </td>
                                    </tr>
                                </>
                            )
                        })}

                    </tbody>
                </table>
            </div>
            <p className='text-center mt15'>
                                    <button className='btn btn-primary' onClick="#">View All</button>
                                </p>
        </>
    )
}

export default UnassignedLists