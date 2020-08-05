import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaDisponibilidade() {
    const [disponibilidade, setDisponibilidade] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('disponibilidadeCount', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('disponibilidade', {
            headers: {
                Authorization: 1,
            },
        }).then(response => {
            setDisponibilidade(response.data);
        })
    }, [usuarioId]);
    const data = disponibilidade;

    const columns = [
        {
            name: 'Disponibilidade',
            selector: 'nomedisponibilidade',
            sortable: true,


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
            cell: row => <Link to={`disponibilidade/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Disponibilidade
                            <Link to={`disponibilidade?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Disponibilidade"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
