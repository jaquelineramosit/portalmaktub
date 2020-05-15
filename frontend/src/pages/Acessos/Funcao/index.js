import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Funcao() {
    const [subPaginaId, setSubPaginaId] = useState('');
    const [paginaId, setPaginaId] = useState('');
    const [nomefuncao, setNomeFuncao] = useState(''); 
    const [descricao, setDescricao] = useState('');    
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');    

    async function handleFuncao(e) {
        e.preventDefault();
        
        const data = {
            subPaginaId,
            paginaId,
            nomefuncao,
            descricao, 
            ativo,     
        };
        

        try {
            const response = await api.post('/funcao', data, {
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
            <Form onSubmit={handleFuncao}>
                <Row>                              
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Função</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="subPaginaId">Qual a Sub Página?</Label>
                                        <Input type="select" required id="cboSubPaginaId"
                                        value={subPaginaId}
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
                                        <Label htmlFor="paginaId">Qual a Página?</Label>
                                        <Input type="select" required id="cboPaginaId"
                                        value={paginaId}
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
                                        <Label htmlFor="nomeFuncao">Nome da Função</Label>
                                        <Input type="text" id="txtNomeFuncao" multiple placeholder="Digite o nome da Função"
                                        value={nomefuncao}
                                        onChange={ e => setNomeFuncao(e.target.value)}
                                        />
                                    </Col> 
                                </FormGroup> 
                                <FormGroup row>          
                                    <Col md="10">
                                            <Label htmlFor="descricao">Descrião</Label>
                                            <Input type="textarea" id="txtDescricao" multiple placeholder="Digite a Descrição"
                                            value={descricao}
                                            onChange={ e => setDescricao(e.target.value)}
                                            />
                                    </Col>                                                                       
                                </FormGroup>
                                <FormGroup row>                                     
                                    <Col md="2">
                                        <Label htmlFor="DataNasc">Ativo</Label>
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