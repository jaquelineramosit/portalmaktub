import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaPagina() {
    const [paginas, setPaginas] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('paginasCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('paginas', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setPaginas(response.data);
        })
    }, [usuarioId]);

    const data = paginas;

    const columns = [
        {
            name: 'Nome da Página',
            selector: 'nomepagina',
            sortable: true,
            left: true,
            width: '35%',

        },
        {
            name: 'Módulo',
            selector: 'nomemodulo',
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
            cell: row => <Link to={`paginas/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Páginas

                        <Link to={`paginas?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Páginas"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}