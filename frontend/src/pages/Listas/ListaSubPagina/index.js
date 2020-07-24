import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaSubPagina() {
    const [subpaginas, setSubpaginas] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('subpaginasCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('sub-paginas', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setSubpaginas(response.data);
        })
    }, [usuarioId]);
    const data = subpaginas;

    const columns = [
        {
            name: 'Nome da Sub Página',
            selector: 'nomesubpagina',
            sortable: true,
            left: true,
            width: '35%',

        },
        {
            name: 'Nome da Página',
            selector: 'nomepagina',
            sortable: true,
            width: '33%',


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
            cell: row => <Link to={`sub-paginas/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Sub Páginas

                        <Link to={`sub-paginas?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Sub Páginas"
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
