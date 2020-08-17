import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

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
        api.get('movimentacao-os-lista', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setMovimentacaoos(response.data);
        })
    }, [usuarioId]);
    const data = movimentacaoos;
    console.log(data);
    const columns = [
        {
            name: 'Ordem de Serviço',
            selector: 'numeroos',
            sortable: true,
            width: '15%'
        },
        {
            name: 'Status de Atendimento',
            selector: 'statusAtendimento',
            sortable: true,
            center: true,
            width: '19%'
        },
        {
            name: 'Status de Pagamento',
            selector: 'statusPagamento',
            sortable: true,
            center: true,
            width: '19%'
        },
        {
            name: 'Status de Cobrança',
            selector: 'statusCobranca',
            sortable: true,
            center: true,
            width: '19%'
        },
        {
            name: 'Observação',
            selector: 'observacao',
            sortable: true,
            center: true,
            width: '10%'
        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            width: '9%',
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '9%',
            cell: row => <Link to={`movimentacao-os/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Movimentação de OS
                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Movimentação de OS"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
