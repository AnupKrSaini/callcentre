import React, { Fragment } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';


const LogReport = () => {
    return (
        <Fragment>
            <Breadcrumb title="Log Report" parent="Reports" />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h5>Log Report</h5>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LogReport;