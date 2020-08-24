import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, ListGroup, ListGroupItem, } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Movimentacaoos(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var ordemservicoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [ordemservicoid, setOrdemServicoid] = useState('');
    const [statusatendimentoid, setStatusAtendimentoid] = useState('');
    const [statuspagamentoid, setStatusPagamentoid] = useState('');
    const [statuscobrancaid, setStatusCobrancaid] = useState('');
    const [observacao, setObservacao] = useState('');
    const [ordemservicosid, setOrdemServicosid] = useState([]);
    const [statusatendimentosid, setStatusAtendimentosid] = useState([]);
    const [statuspagamentosid, setStatusPagamentosid] = useState([]);
    const [statuscobrancasid, setStatusCobrancasid] = useState([]);
    const [movimentacaoLogId, setMovimentacaoLogId] = useState([]);
    
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('ordem-servico').then(response => {
            setOrdemServicosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-atendimento').then(response => {
            setStatusAtendimentosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-cobranca').then(response => {
            setStatusCobrancasid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-pagamento').then(response => {
            setStatusPagamentosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get(`movimentacao-os-log-todos-por-os/${ordemservicoIdParam}`).then(response => {
            setMovimentacaoLogId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && ordemservicoIdParam !== '') {
            api.get(`movimentacao-os-osid/${ordemservicoIdParam}`).then(response => {
                setOrdemServicoid(response.data.ordemservicoid);
                setStatusAtendimentoid(response.data.statusatendimentoid);
                setStatusPagamentoid(response.data.statuspagamentoid);
                setStatusCobrancaid(response.data.statuscobrancaid);
                setObservacao(response.data.observacao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [ordemservicoIdParam]);

    function handleInputChange(event) {
        var { name } = event.target;

        if (name === 'ativo') {
            if (ativo === 1) {
                setAtivo(0);
            } else {
                setAtivo(1);
            }
        }
    };

    function handleReset() {
        setRedirect(true);
    };

    async function handleStatus(e) {
        e.preventDefault();

        const data = {
            ordemservicoid,
            statusatendimentoid,
            statuspagamentoid,
            statuscobrancaid,
            observacao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/movimentacao-os/${ordemservicoIdParam}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                alert(`Cadastro atualizado com sucesso.`);
                setRedirect(true);
            } catch (err) {
                alert('Erro na atualização, tente novamente.');
            }
        } else {
            if (action === 'novo') {
                try {
                    const response = await api.post('movimentacao-os', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert('Cadastro realizado com sucesso.');
                    setRedirect(true);
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }

    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-movimentacao-os" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col md="9">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-arrows"></i>
                                <strong>Movimentação de OS</strong>
                                {action === 'novo' ? <small> nova</small> : <small> editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="ordemServicoId">Ordem de Serviço</Label>
                                        <Input type="select" required name="select" id="cboOrdemServicoId" multiple={false}
                                            name="ordemservicoid"
                                            value={ordemservicoid}
                                            onChange={e => setOrdemServicoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {ordemservicosid.map(ordemservico => (
                                                <option key={ordemservico.id} value={ordemservico.id}>{ordemservico.numeroos}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="statusAtendimentoId">Status Atendimento</Label>
                                        <Input type="select" required name="select" id="cboStatusAtendimentoId" multiple={false}
                                            name="statusatendimentoid"
                                            value={statusatendimentoid}
                                            onChange={e => setStatusAtendimentoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statusatendimentosid.map(statusatendimento => (
                                                <option key={statusatendimento.id} value={statusatendimento.id}>{statusatendimento.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusCobrancaId">Status Cobrança</Label>
                                        <Input type="select" required name="select" id="cboStatusCobrancaId" multiple={false}
                                            name="statuscobrancaid"
                                            value={statuscobrancaid}
                                            onChange={e => setStatusCobrancaid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statuscobrancasid.map(statuscobranca => (
                                                <option key={statuscobranca.id} value={statuscobranca.id}>{statuscobranca.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusPagamentoId">Status Pagamento</Label>
                                        <Input type="select" required name="select" id="cboStatuspPagamentoId" multiple={false}
                                            name="statuspagamentoid"
                                            value={statuspagamentoid}
                                            onChange={e => setStatusPagamentoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statuspagamentosid.map(statuspagamento => (
                                                <option key={statuspagamento.id} value={statuspagamento.id}>{statuspagamento.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="12">
                                        <Label>Observação</Label>
                                        <Input type="textarea" rows="5" placeholder="Digite a obsevação" required id="txtObservacao"
                                            name="observacao"
                                            value={observacao}
                                            onChange={e => setObservacao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        onChange={handleSwitch} />                                    
                                    </Col>                             
                                </FormGroup>*/}
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="submit" size="sm" color="success" className=" mr-3"><i className="fa fa-check"></i> Salvar</Button>
                                <Button type="reset" size="sm" color="danger" className="ml-3"><i className="fa fa-ban "></i> Cancelar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card>
                            <CardHeader>                            
                                <i className="fa fa-history"></i>
                                <strong>Timeline</strong>                                
                            </CardHeader>
                            <CardBody className="p-0"> 
                                <ListGroup className="list-group-accent" tag={'div'}>
                                    {/* // {items.map((value) => { */}
                                    {/* <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</ListGroupItem> */}
                                    {movimentacaoLogId.map((movimentacaolog) => {
                                        return(
                                            <Fragment>
                                                <ListGroupItem className="list-group-item-accent-warning list-group-item-divider text-grey p-2">
                                                    <div className="avatar float-right">
                                                        <img className="img-avatar" src="assets/img/avatars/7.jpg" alt="Usuário"></img>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted mr-2">
                                                            <i className="icon-layers"></i>
                                                        </small>
                                                        <strong>{movimentacaolog.statusAtendimento}</strong> 
                                                    </div>
                                                    <div>
                                                        <small className="text-muted mr-2">
                                                            <i className="icon-user"></i>                                                            
                                                        </small>
                                                        <small className="text-muted">
                                                            {movimentacaolog.nome}&nbsp;{movimentacaolog.sobrenome}
                                                        </small>                                        
                                                    </div>
                                                    <small className="text-muted mr-3">
                                                        <i className="icon-calendar"></i>&nbsp; Em: 01/08/2020 às 12:23h
                                                    </small>                                        
                                                </ListGroupItem>
                                                {/* <ListGroupItem className="list-group-item-accent-info list-group-item-divider text-grey p-2">
                                                    <div className="avatar float-right">
                                                        <img className="img-avatar" src="assets/img/avatars/4.jpg" alt="Usuário"></img>
                                                    </div>
                                                    <div>
                                                        <small className="text-muted mr-2">
                                                            <i className="icon-layers"></i>
                                                        </small>
                                                        <strong>Título do Status</strong> 
                                                    </div>
                                                    <div>
                                                        <small className="text-muted mr-2">
                                                            <i className="icon-user"></i>
                                                            
                                                        </small>
                                                        <small className="text-muted">
                                                            Nome de Usuário
                                                        </small>                                        
                                                    </div>
                                                    <small className="text-muted mr-3">
                                                        <i className="icon-calendar"></i>&nbsp; Em: 01/08/2020 às 12:23h
                                                    </small> 
                                                </ListGroupItem> */}
                                            </Fragment>
                                        )
                                    })}
                                    
                                    
                                    {/* <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Yesterday</ListGroupItem>
                                    <ListGroupItem action tag="a" href="#" className="list-group-item-accent-danger list-group-item-divider">
                                        <div>New UI Project - <strong>deadline</strong></div>
                                        <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
                                        <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                                        <div className="avatars-stack mt-2">
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem action tag="a" href="#" className="list-group-item-accent-success list-group-item-divider">
                                        <div><strong>#10 Startups.Garden</strong> Meetup</div>
                                        <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
                                        <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA</small>
                                    </ListGroupItem>
                                    <ListGroupItem action tag="a" href="#" className="list-group-item-accent-primary list-group-item-divider">
                                        <div><strong>Team meeting</strong></div>
                                        <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 6pm</small>
                                        <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                                        <div className="avatars-stack mt-2">
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        <div className="avatar avatar-xs">
                                            <img src={'assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                        </div>
                                        </div>
                                    </ListGroupItem> */}
                                </ListGroup>                                
                            </CardBody>
                            <CardFooter>
                                <div className="small text-muted"><strong>Atualizado em:</strong> 13/08/2020 às 13:12</div>                                
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
