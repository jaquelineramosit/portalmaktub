import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup , CardFooter, Form, InputGroupAddon } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function TipoProjeto() {
    const [nometipoprojeto, setNomeTipoProjeto] = useState('');
    const [receita, setReceita] = useState('');
    const [despesa, setDespesa] = useState('');
    const [horas, setHoras] = useState('');  
    const [valorhoracobrado, setValorHoraCobrado] = useState('');
    const [valorhoratecnico, setValorHoraTecnico] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



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
                    Authorization: usuarioId,
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
                                        <Input type="number" required id="txtDespesa" placeholder="insira a despesa do projeto"
                                            value={despesa}
                                            onChange={e => setDespesa(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="receita">Receita</Label>
                                        <Input type="number" required id="txtReceita" placeholder="Digite a receita do projeto"
                                            value={receita}
                                            onChange={e => setReceita(e.target.value)} />
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
                                            <Input type="number" required id="txtValorHoraCobrado" placeholder="00,00"
                                            value={valorhoracobrado}
                                            onChange={e => setValorHoraCobrado(e.target.value)} />
                                           <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraTecnico">Valor hora Técnico</Label>
                                        <InputGroup>
                                            <Input id="txtValorHoraTecnico" required type="number" placeholder="00,00"
                                            value={valorhoratecnico}
                                            onChange={e => setValorHoraTecnico(e.target.value)} /> 
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>    
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={ativo}
                                            onChange={e => setAtivo(e.target.value)}
                                        />
                                    </Col>
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