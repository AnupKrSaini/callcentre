import React, { useRef, useEffect,forwardRef  } from 'react';

import jspreadsheet from 'jspreadsheet-ce';

import "../../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import UploadCalls from '../../admin/UploadCalls-backup20022022';

const Jexcel =({tableData, colHeaders, ...props},jRef) => {

    // const jRef = useRef(null);
    // const options = {
    //     data: tableData,
    //     minDimensions: [5, 5],
    //     contextMenu: false,
    //     defaultColWidth:200,
    //     tableWidth: "1000px",
    //     colHeaders:colHeaders,
    //     ...props
    //    // colHeaders: ['Customer Name', 'Customer Mobile', 'Source Type', 'Source Name', 'Purpose', 'Executive Name'],
    //     //colWidths: [180,180,180,180,180,180]

    // };
   
    // useEffect(() => {
    //     if (!jRef.current.jspreadsheet) {
    //         jspreadsheet(jRef.current, options);
    //     }
    // }, [options]);
    // const addRow = () => {
    //     const table1 = jRef.current.jexcel.getData();
    //     jRef.current.jexcel.insertRow();
    // };
    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='table-responsive1'>
                        <div ref={jRef} style={{ marginTop: '30px' }}></div>
                       
                        {/*
                        <br />
                         <input type="button" onClick={addRow} value="Add new row" /> 
                         */}
                    </div>
                </div>
            </div>

        </>
    )
}
export default forwardRef(Jexcel);