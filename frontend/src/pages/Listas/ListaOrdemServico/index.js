import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaOrdemServico(props) {
    const [ordemservico, setOrdemservico] = useState(['']);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('ordemservicoCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [usuarioId]);


    useEffect(() => {
        api.get('ordem-servico', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setOrdemservico(response.data);
        })
    }, [usuarioId]);

    const data = ordemservico;

    const columns = [
        {
            name: 'Número de OS',
            selector: 'numeroos',
            sortable: true,

        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,

        },
        {
            name: 'Filial',
            selector: 'nomefilial',
            sortable: true,

        },
        {
            name: 'Data Solicitação',
            selector: 'datasolicitacao',
            sortable: true,

        },
        {
            name: 'Data Atendimento',
            selector: 'dataatendimento',
            sortable: true,

        },
        {
            name: 'Técnico',
            selector: 'nometecnico',
            sortable: true,
            center: true,

        },
        {
            name: 'Tipo de Serviço',
            selector: 'nometipoprojeto',
            sortable: true,
            center: true,
        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            cell: row => <Badge color="warning">Em andamento</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`ordem-servico/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i> Ordem de Serviço
                            <Link to={`ordem-servico?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>

                            </Link>
                        </CardHeader>
                        <CardBody  >
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Ordem de Serviço"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}