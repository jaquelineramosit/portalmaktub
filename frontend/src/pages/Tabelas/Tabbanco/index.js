import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaBanco() {
    const [banco, setBanco] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('bancoCount', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);
    useEffect(() => {
        api.get('banco', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setBanco(response.data);
        })
    }, [usuarioId]);
    const data = banco;

    const columns = [
        {
            name: 'Codigo do Banco',
            selector: 'codbanco',
            sortable: true,


        },
        {
            name: 'Nome do Banco',
            selector: 'nomebanco',
            sortable: true,
            left: true,

        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`banco/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Bancos
                            <Link to={`banco/action=novo`} className="banco btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Bancos"
                                columns={columns}
                                data={data}
                                striped={true}
                                highlightOnHover={true}
                                responsive={true}
                                pagination={true}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
