import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Disponibilidade() {   
    const [nomedisponibilidade, setNomeDisponibilidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');



    async function handleDisponibilidade(e) {
        e.preventDefault();

        const data = {
            nomedisponibilidade,
            descricao,
            ativo,
        }
        try {
            const response = await api.post('disponibilidade', data, {
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
            <Form onSubmit={handleDisponibilidade}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Disponibilidade</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeDisponibilidade">Disponibilidade</Label>
                                        <Input type="text" required id="txtDisponibilidade" placeholder="Digite a Disponibilidade"
                                            value={nomedisponibilidade}
                                            onChange={e => setNomeDisponibilidade(e.target.value)} />
                                    </Col>                              
                                </FormGroup>                
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5"  placeholder="Descreva o Tipo de Técnico inserido"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={ e => setAtivo(e.target.value)} />                                    
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