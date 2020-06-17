import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import '../../../global.css';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';


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
            cell: row => <Link to={`clientes/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i> Clientes
                        <Link to={`clientes`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                            Novo
                        </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Clientes"
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