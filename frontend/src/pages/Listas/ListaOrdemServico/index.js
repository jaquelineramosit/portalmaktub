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
    
    const DivData = (props) => {
        return (
            <div>
                <DateDiv data={props.dataatendimento} controleId={props.id}></DateDiv>
            </div>
        )
    }

    const data = ordemservico;

    const columns = [
        {
            name: 'OS',
            selector: 'numeroos',
            sortable: true,
            width: '8%',
        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            width: '15%',            
        },
        {
            name: 'Cliente Final',
            selector: 'nomeclientefinal',            
            sortable: true,
            width: '15%',            
        },
        {
            name: 'Técnico',
            selector: 'nometecnico',
            sortable: true,
            center: false,
            width: '18%',
        },
        {
            name: 'Data Atendimeto',
            sortable: true,
            selector: 'dataatendimento',
            width: '16%',
            center:true,
            cell: row => <DivData key={`divData${row.id}`} dataatendimento={row.dataatendimento} ordemservicoId={row.id}></DivData>,
        },
        {
            name: 'Projeto',
            selector: 'nometipoprojeto',
            sortable: true,            
            width: '18%',
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