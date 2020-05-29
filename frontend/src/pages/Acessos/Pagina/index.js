import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';
import Modulo from '../Modulo';

export default function Pagina() {
    const [moduloId, setModuloId] = useState('');
    const [modulos, setModulos] = useState([]);
    const [nomePagina, setNomePagina] = useState('');
    const [descricao, setDescricao] = useState('');    
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
        api.get('modulos').then(response => {            
            setModulos(response.data);
        })
    }, [usuarioId]);   

    async function handlePagina(e) {
        e.preventDefault();
        
        const data = {
            moduloId,
            nomePagina,
            descricao, 
            ativo,         
        };
        

        try {
            const response = await api.post('/paginas', data, {
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
            <Form onSubmit={handlePagina}>
                <Row>                              
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Página</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="moduloId">Qual o Módulo</Label>
                                        <Input type="select" required id="cboModuloId"
                                        value={moduloId}
                                        onChange={ e => setModuloId(e.target.value)}>
                                        <option value={undefined} defaultValue>Selecione...</option>
                                        {modulos.map(modulo=> (                                                
                                                <option value={modulo.id}>{modulo.nomemodulo}</option>
                                            ))}                                           
                                        </Input>                                     
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nomePagina">Nome da Página</Label>
                                        <Input type="text" id="txtNomePagina" multiple placeholder="Digite o nome da Página"
                                        value={nomePagina}
                                        onChange={ e => setNomePagina(e.target.value)}
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
                                        <Label htmlFor="Ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} 
                                            defaultChecked 
                                            onChange={handleSwitch}
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