import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';

function  DataTableGenerica (props) {

    const columns = props.columns;
    const data = props.data;
    const title = props.title;

    const customRowsPerPageText = {
        rowsPerPageText: 'Linhas por página: ', 
        rangeSeparatorText: 'de ', 
        noRowsPerPage: false, 
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos '
    }

    const customStyles = {
        headCells: {
            style: {              
                fontWeight: 'bold',              
            },
        },
    };

    return (
        <Fragment>
            <DataTable className="mt-n3"
                noHeader={true}
                title={title}
                columns={columns}
                data={data}
                striped={true}
                highlightOnHover={true}
                responsive={true}
                pagination={true}
                customStyles={customStyles}
                paginationComponentOptions={customRowsPerPageText}                           
            />
        </Fragment>
    )
}
export default DataTableGenerica;