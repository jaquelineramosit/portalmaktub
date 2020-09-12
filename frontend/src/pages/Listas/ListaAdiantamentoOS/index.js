import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';
import DateDiv from '../../../components/DateDiv';
import BadgeStatus from '../../../components/BadgeStatus'
import '../../../global.css';


export default function ListaAdiantamentoOS() {

    const [adiantamentoos, setAdiantamentoos] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('adiantamentoCount', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('adiantamento-os', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setAdiantamentoos(response.data);
        })
    }, [usuarioId]);

    const data = adiantamentoos;

    const columns = [
        {
            name: 'OS',
            selector: 'numeroos',
            sortable: true,
            width: '15%'
        },
        {
            name: 'Valor Adiantamento',
            selector: 'valoradiantamento',
            sortable: true,
            center: true,
            width: '19%'
        },
        {
            name: 'Data Adiantamento',
            selector: 'dataadiantamento',
            sortable: true,
            center: true,
            width: '19%',
            cell: row => <DateDiv data={row.dataadiantamento} controleId={row.id} isLabel={false} label=""></DateDiv>
        },
        {
            name: 'Data Quitação',
            selector: 'dataquitacao',
            sortable: true,
            center: true,
            width: '19%',
            cell: row => <DateDiv data={row.dataquitacao} controleId={row.id} isLabel={false} label=""></DateDiv>
        },
        {
            name: 'Status de Adiantamento',
            selector: 'status',
            sortable: true,
            center: true,
            width: '19%',
            cell: row => <BadgeStatus key={`badge${row.id}`} status={row.statusAdiantamento}></BadgeStatus>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`adiantamento-os/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>,
            width: '9%',
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
            },
        },
    };

    const customRowsPerPageText = {
        rowsPerPageText: 'Linhas por página:',
        rangeSeparatorText: 'de',
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos'
    }

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i> Adiantamento de OS
                            <Link to={`adiantamento-os?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Adiantamento de OS"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}