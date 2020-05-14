import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup , CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Adiantamentoos() {
    const [ordemservicoid, setOrdemservicoid] = useState('');
    const [valoradiantamento, setValoradiantamento] = useState('');
    const [dataadiantamento, setDataadiantamento] = useState('');
    const [dataquitacao, setDataquitacao] = useState('');  
    const [statusadiantamentoid, setStatusadiantamentoid] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



    async function handleAdiantamentoos(e) {
        e.preventDefault();

        const data = {
            ordemservicoid,
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
        };

        try {
            const response = await api.post('adiantamento-os', data, {
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
            <Form onSubmit={handleAdiantamentoos}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Adiantamento de OS</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                <Col md="2">
                                        <Label htmlFor="ordemservicoid">Ordem de Serviço</Label>
                                        <Input type="select" required name="select" id="cboOrdemservicoid" multiple = {false}
                                            value={ordemservicoid}
                                            onChange={e => setOrdemservicoid(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">OS1</option>
                                            <option value="2">OS2</option>                                          
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="statusatendimentoid">Status do Adiantamento</Label>
                                        <Input type="select" required name="select" id="cboStatusadiantamentoid" multiple = {false}
                                            value={statusadiantamentoid}
                                            onChange={e => setStatusadiantamentoid(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Status1</option>
                                            <option value="2">Status2</option>                                           
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="valoradiantamento">Valor do Adiantamento</Label>
                                        <Input type="text" required id="txtValoradiantamento" 
                                            value={valoradiantamento}
                                            onChange={e => setValoradiantamento(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="dataadiantamento">Data do Adiantamento</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataadiantamento"                                             
                                                value={dataadiantamento}
                                                onChange={e => setDataadiantamento(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="dataquitacao">Data da quitacao</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataquitacao"                                             
                                                value={dataquitacao}
                                                onChange={e => setDataquitacao(e.target.value)} />
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