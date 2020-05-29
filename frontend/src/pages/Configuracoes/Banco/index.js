import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Banco() {   
    const [codbanco, setCodBanco] = useState('');
    const [nomebanco, setNomeBanco] = useState('');
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
    

    async function handleBanco(e) {
        e.preventDefault();

        const data = {
            codbanco,
            nomebanco, 
            ativo,
        }
        try {
            const response = await api.post('banco', data, {
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
            <Form onSubmit={handleBanco}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Banco</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="codBanco">Código do Banco</Label>
                                        <Input type="text" required id="txtCodBanco" placeholder="Digite o Código do banco"
                                            value={codbanco}
                                            onChange={e => setCodBanco(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="codBanco">Nome do Banco</Label>
                                        <Input type="text" required id="txtNomeBanco" placeholder="Digite o Nome do Banco"
                                            value={nomebanco}
                                            onChange={e => setNomeBanco(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
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