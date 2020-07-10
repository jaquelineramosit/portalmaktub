import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row,Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaMovimentacaoOS() {
    const [movimentacaoos, setMovimentacaoos] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('movimentacaoCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);
   
    useEffect(() => {
        api.get('movimentacao-os', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setMovimentacaoos(response.data);
        })
    }, [usuarioId]);
    const data = movimentacaoos;

    const columns = [
        {
            name: 'Ordem de Serviço',
            selector: 'numeroos',
            sortable: true,

        },
        {
            name: 'Status de Atendimento',
            selector: 'status',
            sortable: true,
            center: true,

        },
        {
            name: 'Status de Pagamento',
            selector: 'status',
            sortable: true,
            center: true,
        },
        {
            name: 'Status de Cobrança',
            selector: 'status',
            sortable: true,
            center: true,

        },
        {
            name: 'Observação',
            selector: 'observacao',
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
            cell: row => <Link to={`movimentacao-os/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Movimentação de OS

                        <Link to={`movimentacao-os?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>

                        </CardHeader>
                        <CardBody>
                        <DataTable className="mt-n3"
                                title="Movimentação de OS"
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