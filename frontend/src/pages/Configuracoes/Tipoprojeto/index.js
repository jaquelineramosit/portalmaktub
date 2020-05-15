import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup , CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Tipoprojeto() {
    const [nometipoprojeto, setNometipoprojeto] = useState('');
    const [receita, setReceita] = useState('');
    const [despesa, setDespesa] = useState('');
    const [horas, setHoras] = useState('');  
    const [valorhoracobrado, setValorhoracobrado] = useState('');
    const [valorhoratecnico, setValorhoratecnico] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



    async function handleTipoprojeto(e) {
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
            <Form onSubmit={handleTipoprojeto}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipo de Projeto</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nometipoprojeto">Nome do Projeto</Label>
                                        <Input type="text" required id="txtNometipoprojeto" placeholder="Digite o nome do projeto"
                                            value={nometipoprojeto}
                                            onChange={e => setNometipoprojeto(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="despesa">Despesa</Label>
                                        <Input type="text" required id="txtdespesa" placeholder="insira a despesa do projeto"
                                            value={despesa}
                                            onChange={e => setDespesa(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="receita">Receita</Label>
                                        <Input type="text" required id="txtReceita" placeholder="Digite a receita do projeto"
                                            value={receita}
                                            onChange={e => setReceita(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="horas">Horas Total do projeto</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHoras"                                             
                                                value={horas}
                                                onChange={e => setHoras(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="valorhoracobrado">Valor hora Cobrado</Label>
                                        <Input type="time" required id="txtValorhoracobrado"
                                            value={valorhoracobrado}
                                            onChange={e => setValorhoracobrado(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="valorhoratecnico">Valor hora Técnico</Label>
                                        <InputGroup>
                                            <Input id="txtValorhoratecnico" required type="time"
                                                value={valorhoratecnico}
                                                onChange={e => setValorhoratecnico(e.target.value)} />                                           
                                        </InputGroup>
                                    </Col>
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