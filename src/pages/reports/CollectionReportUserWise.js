import React, { Fragment } from 'react';
import Breadcrumb from '../../components/common/breadcrumb';

const CollectionReportUserWise = () => {
    return (
        <Fragment>
            <Breadcrumb title="Collection Report User Wise" parent="Reports" />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h5>Collection Repor tUser Wise</h5>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CollectionReportUserWise;