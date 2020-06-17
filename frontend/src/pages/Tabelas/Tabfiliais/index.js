import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaFiliais() {
    const [filiais, setFiliais] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('filiaisCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('filiais', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setFiliais(response.data);
        })
    }, [usuarioId]);

    const data = filiais;

    const columns = [
        {
            name: 'Nome Filial',
            selector: 'nomefilial',
            sortable: true,


        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            left: true,

        },
        {
            name: 'Bandeira',
            selector: 'nomebandeira',
            sortable: true,
            left: true,

        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
            left: true,

        },
        {
            name: 'Cidade',
            selector: 'cidade',
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
            cell: row => <Link to={`filiais/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i> Filiais

                        <Link to={`filiais`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Filiais"
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