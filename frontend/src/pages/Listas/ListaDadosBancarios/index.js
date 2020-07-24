import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaDadosbancarios() {
    const [dadosbancarios, setDosbancarios] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('dadosbancariosCount', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('dados-bancarios', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setDosbancarios(response.data);
        })
    }, [usuarioId]);
    const data = dadosbancarios;

    const columns = [
        {
            name: 'Técnico',
            selector: 'nometecnico',
            sortable: true,


        },
        {
            name: 'Titular da Conta',
            selector: 'titularconta',
            sortable: true,
            center: true,

        },
        {
            name: 'Banco',
            selector: 'nomebanco',
            sortable: true,
            center: true,

        },
        {
            name: 'Tipo de Conta',
            selector: 'nometipoconta',
            sortable: true,
            center: true,

        },
        {
            name: 'Agência',
            selector: 'agencia',
            sortable: true,
            center: true,

        },
        {
            name: 'Conta',
            selector: 'conta',
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
            cell: row => <Link to={`dados-bancarios/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Dados Bancários

                        <Link to={`dados-bancarios?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Dados Bancários"
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