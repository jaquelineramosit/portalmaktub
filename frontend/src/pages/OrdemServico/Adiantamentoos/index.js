import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { reaisMask } from '../../../mask'
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';
const dateFormat = require('dateformat');

export default function Adiantamentoos(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var adiantamentoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [ordemservicoid, setOrdemservicoid] = useState('');
    const [valoradiantamento, setValoradiantamento] = useState('');
    const [dataadiantamento, setDataadiantamento] = useState('');
    const [dataquitacao, setDataquitacao] = useState('');
    const [statusadiantamentoid, setStatusadiantamentoid] = useState('');
    const [ordemservicosid, setOrdemServicosid] = useState([]);
    const [statusAdiantamentosid, setStatusAdiantamentosid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('ordem-servico').then(response => {
            setOrdemServicosid(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('status-adiantamento').then(response => {
            setStatusAdiantamentosid(response.data);
        })
    }, [usuarioId]);


    useEffect(() => {
        if (action === 'edit' && adiantamentoIdParam !== '') {
            api.get(`adiantamento-os/${adiantamentoIdParam}`).then(response => {
                setOrdemservicoid(response.data.ordemservicoid);
                setValoradiantamento(response.data.valoradiantamento);
                setDataadiantamento(dateFormat(response.data.dataadiantamento, "yyyy-mm-dd"));
                setDataquitacao(dateFormat(response.data.dataquitacao, "yyyy-mm-dd"));
                setStatusadiantamentoid(response.data.statusadiantamentoid);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [adiantamentoIdParam]);

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
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/adiantamento-os/${adiantamentoIdParam}`, data, {
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
                    const response = await api.post('adiantamento-os', data, {
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
            {redirect && <Redirect to="/lista-adiantamento-os" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Adiantamento de OS</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="ordemServicoId">Ordem de Serviço</Label>
                                        <Input type="select" required name="select" id="cboOrdemServicoId" multiple={false}
                                            name="ordemservicoid"
                                            value={ordemservicoid}
                                            onChange={e => setOrdemservicoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {ordemservicosid.map(ordemservico => (
                                                <option value={ordemservico.id}>{ordemservico.numeroos}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="statusAtendimentoId">Status do Adiantamento</Label>
                                        <Input type="select" required name="select" id="cboStatusAdiantamentoId" multiple={false}
                                            name="statusadiantamentoid"
                                            value={statusadiantamentoid}
                                            onChange={e => setStatusadiantamentoid(e.target.value)}>
                                            <option value="" defaultValue>Selecione...</option>
                                            {statusAdiantamentosid.map(statusAdiantamento => (
                                                <option value={statusAdiantamento.id}>{statusAdiantamento.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="valorAdiantamento">Valor do Adiantamento</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtValorAdiantamento" placeholder="00,00"
                                                value={valoradiantamento}
                                                name="valoradiantamento"
                                                onChange={e => setValoradiantamento(reaisMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-money"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="dataAdiantamento">Data do Adiantamento</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataAdiantamento"
                                                name="dataadiantamento"
                                                value={dataadiantamento}
                                                onChange={e => setDataadiantamento(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-calendar"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="dataquitacao">Data da quitacao</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataquitacao"
                                                name="dataquitacao"
                                                value={dataquitacao}
                                                onChange={e => setDataquitacao(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-calendar"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    {/*<Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />
                                        </Col>*/}
                                </FormGroup>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="submit" size="sm" color="success" className=" mr-3"><i className="fa fa-check"></i> Salvar</Button>
                                <Button type="reset" size="sm" color="danger" className="ml-3"><i className="fa fa-ban "></i> Cancelar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
