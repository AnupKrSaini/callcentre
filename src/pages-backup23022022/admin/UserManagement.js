import React from 'react';
import Breadcrumb from '../../components/common/breadcrumb';

import BootstrapTable from 'react-bootstrap-table-next';

const products = [
    {
        id: 'u1',
        SNo: '1',
        ExecutiveName: 'Anil',
        ExecutiveNumber: '111',
        CustomerName: 'Shiv',
        CustomerMobile: '7982563259',
        Source: 'Social Media',
        //SourceDate: '2/12/2021',
    },
    {
        id: 'u2',
        SNo: '2',
        ExecutiveName: 'Sunil',
        ExecutiveNumber: '112',
        CustomerName: 'Anup',
        CustomerMobile: '8895632598',
        Source: 'Web',
        //SourceDate: '4/12/2021',
    },
    {
        id: 'u3',
        SNo: '3',
        ExecutiveName: 'Manish',
        ExecutiveNumber: '113',
        CustomerName: 'Zahid',
        CustomerMobile: '8869523156',
        Source: 'Social Media',
        //SourceDate: '6/12/2021',
    },
    {
        id: 'u4',
        SNo: '4',
        ExecutiveName: 'Pankaj',
        ExecutiveNumber: '114',
        CustomerName: 'Shahid',
        CustomerMobile: '7895641236',
        Source: 'Social Media',
        //SourceDate: '6/12/2021',
    },
    {
        id: 'u5',
        SNo: '5',
        ExecutiveName: 'Suresh',
        ExecutiveNumber: '111',
        CustomerName: 'kavish',
        CustomerMobile: '8596545232',
        Source: 'Missed Call',
        //SourceDate: '6/12/2021',
    },

];


const UserManagement = () => {
    const columns = [{
        dataField: 'SNo',
        text: 'Product ID'
      }, {
        dataField: 'ExecutiveName',
        text: 'Executive Name'
      }, {
        dataField: 'CustomerName',
        text: 'Customer Name'
      }];

    return (
        <>
            <Breadcrumb title="User Management" parent="Admin" />
            <div className='container-fluid'>

                {/* <div className='row'>
                    <div className='col-md-12'>
                        <BootstrapTable keyField='id' data={products} columns={columns} />
                    </div>
                </div> */}



            </div>
        </>
    )
}

export default UserManagement;