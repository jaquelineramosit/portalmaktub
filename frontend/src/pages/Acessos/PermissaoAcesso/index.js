import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function PerfilAcesso() {
    const [perfilacessoid, setPerfilAcessoId] = useState('');
    const [moduloid, setModuloId] = useState('');
    const [paginaid, setPaginaId] = useState('');
    const [subpaginaid, setSubPaginaId] = useState('');
    const [funcaoid, setFuncaoId] = useState('');    
    const [ativo, setAtivo] = useState(true);
    const usuarioId = localStorage.getItem('userId');    


    async function handlePermissaoAcesso(e) {
        e.preventDefault();
        
        const data = {
            perfilacessoid,
            moduloid,
            paginaid,
            subpaginaid,
            funcaoid,
            ativo,      
        };
        

        try {
            const response = await api.post('/permissao-acesso', data, {
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
            <Form onSubmit={handlePermissaoAcesso}>
                <Row>                              
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Permissão de Acesso</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                            <Label htmlFor="perfilAcessoId">Qual o Perfil de Acesso?</Label>
                                            <Input type="select" required id="cboPerfilAcesso"
                                            value={perfilacessoid}
                                            onChange={ e => setPerfilAcessoId(e.target.value)} >

                                                <option value={undefined}>Selecione...</option>
                                                <option value={1}>Domingo</option>
                                                <option value={2}>Segunda-Feira</option>
                                                <option value={3}>Terça-Feira</option>
                                                <option value={4}>Quarta-Feria</option>
                                                <option value={5}>Quinta-Feira</option>
                                                <option value={6}>Sexta-Feira</option>
                                                <option value={7}>Sabado</option>  
                                            </Input>                                      
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="moduloId">Qual o Módulo?</Label>
                                            <Input type="select" required id="cboModuloId"
                                            value={moduloid}
                                            onChange={ e => setModuloId(e.target.value)} >

                                                <option value={undefined}>Selecione...</option>
                                                <option value={1}>Domingo</option>
                                                <option value={2}>Segunda-Feira</option>
                                                <option value={3}>Terça-Feira</option>
                                                <option value={4}>Quarta-Feria</option>
                                                <option value={5}>Quinta-Feira</option>
                                                <option value={6}>Sexta-Feira</option>
                                                <option value={7}>Sabado</option>  
                                            </Input>                                      
                                        </Col>
                                     </FormGroup>   
                                     <FormGroup row>   
                                        <Col md="4">
                                            <Label htmlFor="paginaId">Qual a Página?</Label>
                                            <Input type="select" required id="cboPaginaId"
                                            value={paginaid}
                                            onChange={ e => setPaginaId(e.target.value)} >

                                                <option value={undefined}>Selecione...</option>
                                                <option value={1}>Domingo</option>
                                                <option value={2}>Segunda-Feira</option>
                                                <option value={3}>Terça-Feira</option>
                                                <option value={4}>Quarta-Feria</option>
                                                <option value={5}>Quinta-Feira</option>
                                                <option value={6}>Sexta-Feira</option>
                                                <option value={7}>Sabado</option>  
                                            </Input>                                      
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="subPaginaId">Qual a Sub Página?</Label>
                                            <Input type="select" required id="cboSubPaginaId"
                                            value={subpaginaid}
                                            onChange={ e => setSubPaginaId(e.target.value)} >

                                                <option value={undefined}>Selecione...</option>
                                                <option value={1}>Domingo</option>
                                                <option value={2}>Segunda-Feira</option>
                                                <option value={3}>Terça-Feira</option>
                                                <option value={4}>Quarta-Feria</option>
                                                <option value={5}>Quinta-Feira</option>
                                                <option value={6}>Sexta-Feira</option>
                                                <option value={7}>Sabado</option>  
                                            </Input>                                      
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="funcaoId">Qual a Função?</Label>
                                            <Input type="select" required id="cboFuncaoId"
                                            value={funcaoid}
                                            onChange={ e => setFuncaoId(e.target.value)} >

                                                <option value={undefined}>Selecione...</option>
                                                <option value={1}>Domingo</option>
                                                <option value={2}>Segunda-Feira</option>
                                                <option value={3}>Terça-Feira</option>
                                                <option value={4}>Quarta-Feria</option>
                                                <option value={5}>Quinta-Feira</option>
                                                <option value={6}>Sexta-Feira</option>
                                                <option value={7}>Sabado</option>  
                                            </Input>                                      
                                        </Col>
                                </FormGroup>
                                <FormGroup row>                                     
                                <Col md="2">
                                        <Label htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} 
                                            defaultChecked 
                                            value={ativo}
                                            onChange={ e => setAtivo(e.target.value)}
                                            size={'sm'} />
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