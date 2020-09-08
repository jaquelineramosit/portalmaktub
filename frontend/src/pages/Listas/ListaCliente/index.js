import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import '../../../global.css';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';


export default function ListaCliente() {
    const [clientes, setClientes] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('clientesCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('clientes', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setClientes(response.data);
        })
    }, [usuarioId]);

    const data = clientes;

    const columns = [
        {
            name: 'Clientes',
            selector: 'nomecliente',
            sortable: true,


        },
        {
            name: 'Parceiros',
            selector: 'nomeparceiro',
            sortable: true,
            center: true,

        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
            center: true,

        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`clientes/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i> Clientes
                        <Link to={`clientes?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Clientes"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}