import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, CardFooter, Form, InputGroupAddon } from 'reactstrap';
import { reaisMask } from '../../../mask'
import { Redirect } from "react-router-dom";
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Tipoprojeto(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var tipoprojetoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nometipoprojeto, setNometipoprojeto] = useState('');
    const [receita, setReceita] = useState('');
    const [despesa, setDespesa] = useState('');
    const [horas, setHoras] = useState('');
    const [valorhoracobrado, setValorhoracobrado] = useState('');
    const [valorhoratecnico, setValorhoratecnico] = useState('');
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && tipoprojetoIdParam !== '') {
            api.get(`tipo-projeto/${tipoprojetoIdParam}`).then(response => {
                setNometipoprojeto(response.data.nometipoprojeto);
                setReceita(response.data.receita);
                setDespesa(response.data.despesa);
                setHoras(response.data.horas);
                setValorhoracobrado(response.data.valorhoracobrado);
                setValorhoratecnico(response.data.valorhoratecnico);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [tipoprojetoIdParam]);

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
            nometipoprojeto,
            receita,
            despesa,
            horas,
            valorhoracobrado,
            valorhoratecnico,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/tipo-projeto/${tipoprojetoIdParam}`, data, {
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
                    const response = await api.post('tipo-projeto', data, {
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
            {redirect && <Redirect to="/lista-tipo-projeto" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipo de Projeto</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="nomeTipoProjeto">Nome do Projeto</Label>
                                        <Input type="text" required id="txtNomeTipoProjeto" placeholder="Digite o nome do projeto"
                                            name="nometipoprojeto"
                                            value={nometipoprojeto}
                                            onChange={e => setNometipoprojeto(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="despesa">Despesa</Label>
                                        <Input type="text" required id="txtDespesa" placeholder="R$00,00"
                                            value={despesa}
                                            name="despesa"
                                            onChange={e => setDespesa(reaisMask(e.target.value))} />
                                        
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="receita">Receita</Label>
                                        <Input type="text" required id="txtReceita" placeholder="R$00,00"
                                            value={receita}
                                            name="receita"
                                            onChange={e => setReceita(reaisMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horas">Horas Total do projeto</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHoras" required id="txtHorastotal"
                                                name="horas"
                                                value={horas}
                                                onChange={e => setHoras((e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraCobrado">Valor hora Cobrado</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtValorHoraCobrado" placeholder="R$00,00" required id="txtValorhora"
                                                value={valorhoracobrado}
                                                name="valorhoracobrado"
                                                onChange={e => setValorhoracobrado(reaisMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraTecnico">Valor hora Técnico</Label>
                                        <InputGroup>
                                            <Input id="txtValorHoraTecnico" required type="text" placeholder="R$00,00" required id="txtValorhoraTecnico"
                                                value={valorhoratecnico}
                                                name="valorhoratecnico"
                                                onChange={e => setValorhoratecnico(reaisMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup>    
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />
                                    </Col>
                                </FormGroup> */}
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