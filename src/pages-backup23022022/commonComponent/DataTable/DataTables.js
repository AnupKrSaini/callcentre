import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


import NoRecordFounds from './NoRecordFounds';

const DataTables = ({ keyField, tableData, columns, paginationOptions, ...props }) => {
    if (!keyField) {
        console.error("keyField is required.")
        return null;
    }
    else if (!tableData) {
        console.error("TableData is required.")
        return null;
    }
    else if (!columns) {
        console.error("columns is required.")
        return null;
    }

    return (
        <React.Fragment>

            <BootstrapTable
              remote
                keyField={keyField}
                data={tableData}
                columns={columns}
                pagination={paginationOptions ? paginationFactory(paginationOptions) : null}
                {...props}
                bootstrap4
                headerWrapperClasses="thead-light"
                bordered={false}
                noDataIndication={<NoRecordFounds/>}
            />




        </React.Fragment>
    )
}

export default DataTables
