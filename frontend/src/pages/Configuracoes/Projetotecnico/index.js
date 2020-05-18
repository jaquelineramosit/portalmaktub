import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function ProjetoTecnico() {   
    const [tecnicoid, setTecnicoId] = useState('');
    const [tipoprojetoid, setTipoProjetoId] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');



    async function handleProjetoTecnico(e) {
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
            <Form onSubmit={handleProjetoTecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Projeto X Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTécnicoId" multiple={false}
                                            value={tecnicoid}
                                            onChange={e => setTecnicoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Técnico1</option>
                                            <option value="2">Técnico2</option>                                          
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tipoTrojetoId">Tipo de Projeto</Label>
                                        <Input type="select" required name="select" id="cboTipoProjetoId"  multiple={false}
                                            value={tipoprojetoid}
                                            onChange={e => setTipoProjetoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Projeto1</option>
                                            <option value="2">Projeto2</option>                                           
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={ e => setAtivo(e.target.value)}
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