import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../services/api';

export default function Bandeiras() {
    const [nomebandeira, setNomeBandeira] = useState('');
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
    async function handleBandeiras(e) {
        e.preventDefault();

        const data = {
            nomebandeira,
            ativo
        }
        try {
            const response = await api.post('bandeira', data, {
                headers: {
                    Authorization: 1,
                }
            });
            console.log(response);
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleBandeiras}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Bandeira</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeBandeira">Nome da Bandeira</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeBandeira" placeholder="Digite o nome da Bandeira"
                                                value={nomebandeira}
                                                onChange={e => setNomeBandeira(e.target.value)} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-flag"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>              
                                    </Col>
                                </FormGroup>
                                <FormGroup>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                         onChange={handleSwitch} />                                  
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