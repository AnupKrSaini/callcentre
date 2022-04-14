import React, { useRef, useEffect,forwardRef  } from 'react';

import jspreadsheet from 'jspreadsheet-ce';

import "../../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import UploadCalls from '../../admin/UploadCalls-backup20022022';

const Jexcel =({tableData, colHeaders, ...props},jRef) => {

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='table-responsive1'>
                        <div ref={jRef} style={{ marginTop: '30px' }}></div>
                       
                       
                    </div>
                </div>
            </div>

        </>
    )
}
export default forwardRef(Jexcel);