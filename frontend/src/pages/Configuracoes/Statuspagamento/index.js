import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function StatusPagamento() {   
    const [status, setStatus] = useState('');
    const [descstatus, setDescStatus] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');



    async function handleStatusPagamento(e) {
        e.preventDefault();

        const data = {
            status,
            descstatus, 
            ativo,
        }
        try {
            const response = await api.post('status-pagamento', data, {
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
            <Form onSubmit={handleStatusPagamento}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Status de Pagamento</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="status">Status de Pagamento</Label>
                                        <Input type="text" required id="txtStatus" placeholder="Inisira o Status"
                                            value={status}
                                            onChange={e => setStatus(e.target.value)} />
                                    </Col>
                                </FormGroup>    
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5"  placeholder="Descreva o Status inserido" id="txtDescstatus"
                                            value={descstatus}
                                            onChange={e => setDescStatus(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md="1">
                                            <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
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