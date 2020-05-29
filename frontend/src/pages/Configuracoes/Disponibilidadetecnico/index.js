import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form,  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function DisponibilidadeTecnico() {   
    const [disponibilidadeId, setDisponibilidadeId] = useState('');
    const [disponibilidades, setDisponibilidades] = useState([]);
    const [tecnicoId, setTecnicoId] = useState('');
    const [tecnicos, setTecnicos] = useState([]);
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

    useEffect(() => {
        api.get('disponibilidade').then(response => {            
            setDisponibilidades(response.data);
        })
    }, [usuarioId]); 

    useEffect(() => {
        api.get('tecnico').then(response => {            
            setTecnicos(response.data);
        })
    }, [usuarioId]); 

    async function handleDisponibilidadeTecnico(e) {
        e.preventDefault();

        const data = {
            disponibilidadeId,
            tecnicoId,
            ativo,
        }
        try {
            const response = await api.post('disponibilidade-tecnico', data, {
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
            <Form onSubmit={handleDisponibilidadeTecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Disponibilidade do Técnico</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="disponibilidadeId">Disponibilidade</Label>
                                        <Input type="select" required name="select" id="cboDisponibilidadeId" multiple = {false}
                                            value={disponibilidadeId}
                                            onChange={e => setDisponibilidadeId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {disponibilidades.map(disponibilidade => (                                                
                                                <option value={disponibilidade.id}>{disponibilidade.nomedisponibilidade}</option>
                                                ))}                                            
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTecnicoId" multiple = {false}
                                            value={tecnicoId}
                                            onChange={e => setTecnicoId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tecnicos.map(tecnico => (                                                
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                                ))}                                            
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                       onChange={handleSwitch} 
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