import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Funcao() {
    const [subpaginaid, setSubPaginaId] = useState('');
    const [paginaid, setPaginaId] = useState('');
    const [nomefuncao, setNomeFuncao] = useState(''); 
    const [descricao, setDescricao] = useState('');    
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');
   const [subPaginas, setSubPaginas] = useState([]);
    const [paginas, setPaginas] = useState([]);  

    
    useEffect(() => {
        api.get('paginas').then(response => {            
            setPaginas(response.data);
        })
    }, [usuarioId]);  

    useEffect(() => {
        api.get('sub-paginas').then(response => {            
            setSubPaginas(response.data);
        })
    }, [usuarioId]);

    async function handleFuncao(e) {
        e.preventDefault();
        
        const data = {
            subpaginaid,
            paginaid,
            nomefuncao,
            descricao, 
            ativo,     
        };
        

        try {
            const response = await api.post('/funcao', data, {
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
                                    <Col md="3">
                                        <Label htmlFor="subPaginaId">Qual a Sub Página?</Label>
                                        <Input type="select" required id="cboSubPaginaId"
                                        value={subpaginaid}
                                        onChange={ e => setSubPaginaId(e.target.value)}>
                                        <option value={undefined} defaultValue> Selecione...</option>
                                            {subPaginas.map(subPagina => (                                                
                                            <option value={subPagina.id}>{subPagina.nomesubpagina}</option>
                                            ))}  
                                        </Input>                                      
                                    </Col>
                                    <Col md="3">
                                    <Label htmlFor="pagina">Qual a Página?</Label>
                                    <Input type="select" required name="select" id="cboPagina"
                                        value={paginaid}
                                        onChange={ e => setPaginaId(e.target.value)}>
                                        <option value={undefined} defaultValue> Selecione...</option>
                                            {paginas.map(pagina => (                                                
                                            <option value={pagina.id}>{pagina.nomepagina}</option>
                                            ))}                                            
                                        </Input>                                          
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeFuncao">Nome da Função</Label>
                                        <Input type="text" id="txtNomeFuncao" multiple placeholder="Digite o nome da Função"
                                        value={nomefuncao}
                                        onChange={ e => setNomeFuncao(e.target.value)}
                                        />
                                    </Col> 
                                </FormGroup> 
                                <FormGroup row>          
                                    <Col md="9">
                                            <Label htmlFor="descricao">Descrião</Label>
                                            <Input type="textarea" rows="5" id="txtDescricao" multiple placeholder="Digite a Descrição"
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