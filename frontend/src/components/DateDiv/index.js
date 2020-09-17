/*
Autor: Jaqueline Ramos da Silva
Em: 19/08/2020
Objetivo: Esse controle tem o objetivo de criar uma div nas data tables para exibir e tratar os campos da data
Formato:
Label: 00/00/0000
*/
import React, { Fragment } from 'react';
const dateFormat = require('dateformat');

const DataFormatadaComLabel = (props) => {
    return (
        <div key={`dt${props.controleId}`} className="small text-muted">
            <strong>{props.label}</strong> {props.data}
        </div>
    )
}

const DataFormatadaSemLabel = (props) => {
    return (
        <div key={`dt${props.index}${props.controleId}`} >
            {props.data}
        </div>
    )
}

const DateDiv = (props, index) => {
    const data = props.data === undefined || props.data === '0000-00-00 00:00:00' ? "00/00/0000" : dateFormat(props.data, "dd/mm/yyyy");
    const label = props.label;
    const isLabel = props.isLabel;
    const controleId = props.id;
    return (
        <Fragment>
            {isLabel ? (
                    <DataFormatadaComLabel controleId={controleId} label={label} data={data}></DataFormatadaComLabel>
             ) : (
                    <DataFormatadaSemLabel controleId={controleId} data={data}></DataFormatadaSemLabel>
             )
            }
        </Fragment>
    )
}

export default DateDiv;