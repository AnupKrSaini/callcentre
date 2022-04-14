import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import NoRecordFound from './NoRecordFound';

const DataTable = ({keyField, tableData, columns, paginationOptions, ...props}) => {
    if(!keyField){
        console.error("keyField is required.")
        return null;
    }
    else if(!tableData){
        console.error("TableData is required.")
        return null;
    }
    else if(!columns){
        console.error("columns is required.")
        return null;
    }
    return (
        <React.Fragment>

            <BootstrapTable 
            keyField={keyField} 
            data={ tableData } 
            columns={ columns } 
            pagination={ paginationOptions ? paginationFactory(paginationOptions) :null } 
            {...props}
          
            />
        </React.Fragment>
    )
}

export default DataTable
