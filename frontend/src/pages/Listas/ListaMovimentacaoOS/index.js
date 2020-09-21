import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DateDiv from '../../../components/DateDiv'
import DataTableGenerica from '../../../components/DataTableGenerica';
import BadgeStatus from '../../../components/BadgeStatus'

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
    const DivData = (props) => {
        return (
            <div>
                <DateDiv data={props.datasolicitacao} controleId={props.id}></DateDiv>
            </div>
        )
    }


    const columns = [
        {
            name: 'OS',
            selector: 'numeroos',
            sortable: true,
            width: '5%',
        },
        {
            name: 'Cliente Final',
            selector: 'nomeclientefinal',
            sortable: true,
            width: '17%',
        },
        {
            name: 'Data Solicitação',
            selector: 'datasolicitacao',
            sortable: true,
            width: '10%',
            cell: row => <DivData key={`divData${row.id}`} datasolicitacao={row.datasolicitacao} ordemservicoId={row.id}></DivData>,

        },
        {
            name: 'Nome do Técnico',
            selector: 'nometecnico',
            sortable: true,
            width: '19%',
        },
        {
            name: 'Status de Atendimento',
            selector: 'statusAtendimento',
            sortable: true,
            width: '14%',
            cell: row => <BadgeStatus key={`badge${row.id}`} status={row.statusAtendimento}></BadgeStatus>,
        },
        {
            name: 'Status de Pagamento',
            selector: 'statusPagamento',
            sortable: true,
            width: '15%',
            cell: row => <BadgeStatus key={`badge${row.id}`} status={row.statusPagamento}></BadgeStatus>,
        },
        {
            name: 'Status de Cobrança',
            selector: 'statusCobranca',
            sortable: true,
            center: true,
            width: '7%',
            cell: row => <BadgeStatus key={`badge${row.id}`} status={row.statusCobranca}></BadgeStatus>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
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
