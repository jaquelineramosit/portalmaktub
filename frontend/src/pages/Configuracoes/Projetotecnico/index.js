import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Projetotecnico() {   
    const [tecnicoid, setTecnicoid] = useState('');
    const [tipoprojetoid, setTipoprojetoid] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');



    async function handleProjetotecnico(e) {
        e.preventDefault();

        const data = {
            tecnicoid,
            tipoprojetoid, 
            ativo,
        }
        try {
            const response = await api.post('projeto-tecnico', data, {
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
            <Form onSubmit={handleProjetotecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Projeto X Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                <Col md="2">
                                        <Label htmlFor="tecnicoid">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTécnicoid" multiple={false}
                                            value={tecnicoid}
                                            onChange={e => setTecnicoid(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Técnico1</option>
                                            <option value="2">Técnico2</option>                                          
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="tipoprojetoid">Tipo de Projeto</Label>
                                        <Input type="select" required name="select" id="cboTipoprojetoid"  multiple={false}
                                            value={tipoprojetoid}
                                            onChange={e => setTipoprojetoid(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Projeto1</option>
                                            <option value="2">Projeto2</option>                                           
                                        </Input>
                                    </Col>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={ e => setAtivo(e.target.value)}
                                        />                                    
                                    </Col>                                
                                </FormGroup>
                                <FormGroup row>                             
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