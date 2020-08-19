import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';
import DateDiv from '../../../components/DateDiv'
import BadgeStatus from '../../../components/BadgeStatus'

export default function ListaOrdemServico(props) {
    const [ordemservico, setOrdemservico] = useState([]);
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

    const DivClienteFilial = (props) => {
        const cliente = props.cliente;
        const filial = props.filial;
        const ordemservicoId = props.id;
        return (
            <div>
                <div key={`cliente${ordemservicoId}`}>
                    <i className="fa fa-handshake-o mr-2" title="Cliente"></i>
                    {cliente}
                </div>
                <div key={`filial${ordemservicoId}`} className="small text-muted">
                    <i className="fa fa-building mr-1" title="Filial"></i>
                    {filial}
                </div>
            </div>
        )
    }

    const DivData = (props) => {
        return (
            <div>
                <DateDiv data={props.dataatendimento} controleId={props.id} isLabel={true} label="Atendimento:"></DateDiv>
                <DateDiv data={props.datasolicitacao} controleId={props.id} isLabel={true} label="Solicitação:"></DateDiv>
            </div>
        )
    }

    const data = ordemservico;

    const columns = [
        {
            name: 'Número de OS',
            selector: 'numeroos',
            sortable: true,
            width: '12%',
        },
        {
            name: 'Cliente / Filial',
            selector: 'nomecliente',
            sortable: true,
            width: '14%',
            cell: row => <DivClienteFilial key={`divFilial${row.id}`} cliente={row.nomecliente} filial={row.nomefilial} ordemservicoId={row.id}> </DivClienteFilial>,
        },
        {
            name: 'Técnico',
            selector: 'nometecnico',
            sortable: true,
            center: false,
            width: '26%',
        },
        {
            name: 'Data',
            sortable: true,
            selector: 'dataatendimento',
            width: '14%',
            cell: row => <DivData key={`divData${row.id}`} dataatendimento={row.dataatendimento} datasolicitacao={row.datasolicitacao} ordemservicoId={row.id}></DivData>,
        },
        {
            name: 'Projeto',
            selector: 'nometipoprojeto',
            sortable: true,
            center: true,
            width: '16%',
        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            width: '8%',
            cell: row => <BadgeStatus key={`badge${row.id}`} status={row.statusAtendimento}></BadgeStatus>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '10%',
            cell: row => <Link to={`ordem-servico/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
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