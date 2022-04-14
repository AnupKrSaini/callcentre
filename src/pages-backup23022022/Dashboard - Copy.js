import React from 'react';
import Breadcrumb from '../components/common/breadcrumb';
import Paging from '../components/common/paging/paging';
//import CentreType from './commonComponent/CentreType';
//import Centre from './commonComponent/Centre';


const DUMMY_DATA = [
    {
        id: 1,
        Centre: 'Super Medical Hall',
        CentreType: 'B2B',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 2,
        Centre: 'Kumar & Company',
        CentreType: 'B2B',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 3,
        Centre: 'Baba Bilasgar Lab',
        CentreType: 'Collection Centre',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 4,
        Centre: 'Sai Chemist',
        CentreType: 'Collection Centre',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 5,
        Centre: 'Kandeel Complex',
        CentreType: 'Franchise Lab',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 6,
        Centre: 'Recharge Medical Hall',
        CentreType: 'Franchise Lab',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 7,
        Centre: 'Avinash Chemist',
        CentreType: 'Satellite Lab',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 8,
        Centre: 'Khanna Lab',
        CentreType: 'Satellite Lab',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 9,
        Centre: 'Kukreja Lab',
        CentreType: 'B2B',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },
    {
        id: 10,
        Centre: 'Sunil Chemist',
        CentreType: 'Collection Centre',
        CreditLimit: '50,0000',
        RemainingCL: '2,25000',
        BookingCutOff: '10,000',
        PrintingCutOff: '2,25000',
    },

];



const DUMMY_DATA_CenterType = [
    {
        id: 'ct1',
        title: 'Collection Centre',
    },
    {
        id: 'ct2',
        title: 'B2B',
    },
    {
        id: 'ct3',
        title: 'Franchise',
    },
    {
        id: 'ct4',
        title: 'Franchise Lab',
    },
    {
        id: 'ct5',
        title: 'Satellite Lab',
    },
];


const DUMMY_DATA_Centre = [
    {
        id: 'c1',
        title: 'Super Medical Hall',
    },
    {
        id: 'c2',
        title: 'Kumar & Company',
    },
    {
        id: 'c3',
        title: 'Baba Bilasgar Lab',
    },
    {
        id: 'c4',
        title: 'Sai Chemist',
    },
    {
        id: 'c5',
        title: 'Kandeel Complex',
    },
    {
        id: 'c6',
        title: 'Recharge Medical Hall',
    },
    {
        id: 'c7',
        title: 'Avinash Chemist',
    },
    {
        id: 'c8',
        title: 'Khanna Lab',
    },
    {
        id: 'c9',
        title: 'Kukreja Lab',
    },
    {
        id: 'c10',
        title: 'Sunil Chemist',
    },
];

const Dashboard = () => {
    return (
        <>
            <Breadcrumb title="Dashboard" parent=""  />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h5>Credit Limit</h5>
                    </div>
                </div>
                <form className="theme-form">
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Centre Type</label>
                                <select className="form-control">
                                    <option>---select---</option>
                                    {DUMMY_DATA_CenterType.map((cType) => {
                                        return <option key={cType.id}>{cType.title}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label >Centre</label>
                                <select className="form-control p-0">
                                    <option>---select---</option>
                                    {DUMMY_DATA_Centre.map((cntr) => {
                                        return <option key={cntr.id}>{cntr.title}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-sm-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Centre</th>
                                        <th scope="col">Centre Type	</th>
                                        <th scope="col">Credit Limit</th>
                                        <th scope="col">Remaining CL</th>
                                        <th scope="col">Booking Cut-Off</th>
                                        <th scope="col">Printing Cut-Off</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DUMMY_DATA.map((tb) => {
                                        return (
                                            <>
                                                <tr key={tb.id}>
                                                    <th>{tb.id}</th>
                                                    <td>{tb.Centre}</td>
                                                    <td>{tb.CentreType}</td>
                                                    <td><i className="fa fa-inr"></i> {tb.CreditLimit} </td>
                                                    <td><i className="fa fa-inr"></i> {tb.RemainingCL} </td>
                                                    <td><i className="fa fa-inr"></i> {tb.BookingCutOff} </td>
                                                    <td><i className="fa fa-inr"></i> {tb.PrintingCutOff} </td>
                                                </tr>
                                            </>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <Paging />

            </div>
        </>
    )
}

export default Dashboard;