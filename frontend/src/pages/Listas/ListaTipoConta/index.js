import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaTipoConta() {
    const [tipoconta, setTipoconta] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

      //logica para pegar o total
      useEffect(() => {
        api.get('tipocontaCount', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);
    
    useEffect(() => {
        api.get('tipo-conta', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTipoconta(response.data);
        })
    }, [usuarioId]);
    const data = tipoconta;

    const columns = [
        {
            name: 'Nome Tipo da Conta',
            selector: 'nometipoconta',
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
            cell: row => <Link to={`tipo-conta/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Tipo da Conta
                            <Link to={`tipo-conta?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>
                        </CardHeader>
                        <CardBody>
                        <DataTable className="mt-n3"
                                title="Tipo da Conta"
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