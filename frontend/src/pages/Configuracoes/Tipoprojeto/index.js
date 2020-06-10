import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup , CardFooter, Form, InputGroupAddon } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import {reaisMask} from '../../../mask'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function TipoProjeto() {
    const [nometipoprojeto, setNomeTipoProjeto] = useState('');
    const [receita, setReceita] = useState('');
    const [despesa, setDespesa] = useState('');
    const [horas, setHoras] = useState('');  
    const [valorhoracobrado, setValorHoraCobrado] = useState('');
    const [valorhoratecnico, setValorHoraTecnico] = useState('');
    const [ativo, setAtivo] = useState(1);
    const usuarioId = localStorage.getItem('userId');

    function handleSwitch(e) {
        if (ativo === 1) {
            setAtivo(0);
        }
        else {
            setAtivo(1);
        }
    }

    async function handleTipoProjeto(e) {
        e.preventDefault();

        const data = {
            nometipoprojeto,
            receita,
            despesa,
            horas,
            valorhoracobrado,
            valorhoratecnico,
            ativo,
        };

        try {
            const response = await api.post('tipo-projeto', data, {
                headers: {
                    Authorization: 1,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleTipoProjeto}>
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
                                            value={nometipoprojeto}
                                            onChange={e => setNomeTipoProjeto(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="despesa">Despesa</Label>
                                        <Input type="text" required id="txtDespesa" placeholder="R$00,00"
                                            value={despesa}
                                            onChange={e => setDespesa(reaisMask(e.target.value))}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="receita">Receita</Label>
                                        <Input type="text" required id="txtReceita" placeholder="R$00,00"
                                            value={receita}
                                            onChange={e => setReceita(reaisMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horas">Horas Total do projeto</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHoras"                                             
                                                value={horas}
                                                onChange={e => setHoras(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraCobrado">Valor hora Cobrado</Label>
                                        <InputGroup>    
                                            <Input type="text" required id="txtValorHoraCobrado" placeholder="R$00,00"
                                            value={valorhoracobrado}
                                            onChange={e => setValorHoraCobrado(reaisMask(e.target.value))} />
                                           <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraTecnico">Valor hora Técnico</Label>
                                        <InputGroup>
                                            <Input id="txtValorHoraTecnico" required type="text" placeholder="R$00,00"
                                            value={valorhoratecnico}
                                            onChange={e => setValorHoraTecnico(reaisMask(e.target.value))} /> 
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-money"></Button>
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