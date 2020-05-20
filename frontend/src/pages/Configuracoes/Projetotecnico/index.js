import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function ProjetoTecnico() {   
    const [tecnicoid, setTecnicoId] = useState('');
    const [tecnicos, setTecnicos] = useState([]);
    const [tipoprojetoid, setTipoProjetoId] = useState('');
    const [tipoProjetos, setTipoProjetos] = useState([]);
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('tecnico').then(response => {            
            setTecnicos(response.data);
        })
    }, [usuarioId]);  

    useEffect(() => {
        api.get('tipo-projeto').then(response => {            
            setTipoProjetos(response.data);
        })
    }, [usuarioId]);  

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
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tecnicos.map(tecnico => (                                                
                                                    <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                                ))}                                           
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tipoTrojetoId">Tipo de Projeto</Label>
                                        <Input type="select" required name="select" id="cboTipoProjetoId"  multiple={false}
                                            value={tipoprojetoid}
                                            onChange={e => setTipoProjetoId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tipoProjetos.map(tipoProjeto => (                                                
                                                    <option value={tipoProjeto.id}>{tipoProjeto.nometipoprojeto}</option>
                                                ))}                                          
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