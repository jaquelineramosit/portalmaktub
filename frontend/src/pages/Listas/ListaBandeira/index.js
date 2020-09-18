import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import '../../../global.css';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaBandeira() {
    const [bandeira, setBandeira] = useState([]);
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('bandeira', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setBandeira(response.data);
        })
    }, [usuarioId]);
    //Paginação
    const data = bandeira;

    const columns = [
        {
            name: 'Nome Bandeira',
            selector: 'nomebandeira',
            sortable: true,
            width: '30%',
        },
        {
            name: 'Grupo Empresarial',
            selector: 'nomegrupoempresarial',
            sortable: true,
            width: '25%',
        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            width: '25%',
        },

        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => <Badge color="success">Ativo</Badge>,
            width: '10%',
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`bandeira/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>,
            width: '10%',
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Bandeira

                            <Link to={`bandeira?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Bandeiras"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}