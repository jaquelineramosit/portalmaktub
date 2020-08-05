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
            width: '35%',
        },
        {
            name: 'Parceiros',
            selector: 'nomeparceiro',
            sortable: true,
            width: '34%',


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
            cell: row => <Link to={`bandeira/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i></Link>
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