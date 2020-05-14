import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form,  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Disponibilidadetecnico() {   
    const [disponibilidadeId, setDisponibilidadeId] = useState('');
    const [tecnicoId, setTecnicoId] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');



    async function handleDisponibilidadetecnico(e) {
        e.preventDefault();

        const data = {
            disponibilidadeId,
            tecnicoId,
            ativo,
        }
        try {
            const response = await api.post('disponibilidade-tecnico', data, {
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
            <Form onSubmit={handleDisponibilidadetecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Disponibilidade do Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                <Col md="2">
                                        <Label htmlFor="disponibilidadeId">Disponibilidade</Label>
                                        <Input type="select" required name="select" id="cboDisponibilidadeId"
                                            value={disponibilidadeId}
                                            onChange={e => setDisponibilidadeId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Disponibilidade1</option>
                                            <option value="2">Disponibilidade2</option>                                          
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="UF">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTecnicoId"
                                            value={tecnicoId}
                                            onChange={e => setTecnicoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Técnico1</option>
                                            <option value="2">Técnico2</option>                                           
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