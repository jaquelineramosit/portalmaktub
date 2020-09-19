import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaClienteFinal() {
    const [clientefinal, setClienteFinal] = useState([]);
    
    const usuarioId = localStorage.getItem('userId');
    
    useEffect(() => {
        api.get('cliente-final', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setClienteFinal(response.data);
        })
    }, [usuarioId]);

    const data = clientefinal;

    const columns = [
        {
            name: 'Cliente Final',
            selector: 'nomeclientefinal',
            sortable: true,
            width: '18%'
        },
        {
            name: 'Grupo Empresarial',
            selector: 'nomegrupoempresarial',
            sortable: true,
            width: '14%'
        },
        {
            name: 'Bandeira',
            selector: 'nomebandeira',
            sortable: true,
            left: true,
            width: '14%'
        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            left: true,
            width: '14%'
        },        
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
            left: true,
            width: '8%'
        },
        {
            name: 'Cidade',
            selector: 'cidade',
            sortable: true,
            left: true,
            width: '18%'
        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => <Badge color="success">Ativo</Badge>,
            width: '6%'
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`cliente-final/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>,
            width: '8%'
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i> Cliente Final
                            <Link to={`cliente-final?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="ClienteFinal"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}