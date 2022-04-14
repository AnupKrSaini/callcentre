import React, { Fragment } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';

const CancelReport = () => {
    return (
        <Fragment>
            <Breadcrumb title="Cancel Report" parent="Reports" />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h5>Cancel Report</h5>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CancelReport;