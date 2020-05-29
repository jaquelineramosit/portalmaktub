import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Tipotecnico() {   
    const [nometipotecnico, setNomeTipoTecnico] = useState('');
    const [desctipotecnico, setDescTipoTecnico] = useState('');
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

    async function handleTipoTecnico(e) {
        e.preventDefault();

        const data = {
            nometipotecnico, 
            desctipotecnico,
            ativo
        }
        try {
            const response = await api.post('tipo-tecnico', data, {
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
            <Form onSubmit={handleTipoTecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipo de Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeTipoTecnico">Nome do Tipo de Técnico</Label>
                                        <Input type="text" required id="txtNomeTipoTecnico" placeholder="Digite o Tipo de Técnico"
                                            value={nometipotecnico}
                                            onChange={e => setNomeTipoTecnico(e.target.value)} />
                                    </Col>
                                </FormGroup>                
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5"  placeholder="Descreva o Tipo de Técnico inserido"
                                            value={desctipotecnico}
                                            onChange={e => setDescTipoTecnico(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                 {/*<FormGroup>    
                                 <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                       onChange={handleSwitch}
                                        />                                    
                                    </Col>                                
                                 </FormGroup>*/}
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