import {Tabs, Tab, TabContainer } from 'react-bootstrap'
import React, { useState, useEffect, Component, Fragment } from 'react';
import '../global.css';
import FormValidator from '../components/Validator/FormValidator';
import Toaster from '../components/Toaster';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, ListGroup, ListGroupItem, } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import api from '../services/api';
const dateFormat = require('dateformat');

const validaFormulario = {

    //quais os campos precisam de uma validação?

}
const TesteMensagens = (props) => {

    const [redirect, setRedirect] = useState(false);
    const [statuscobrancaid, setStatusCobrancaid] = useState('');
    const [statuscobrancasid, setStatusCobrancasid] = useState([]);
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('status-cobranca').then(response => {
            setStatusCobrancasid(response.data);
        })
    }, [usuarioId]);

    async function handleOs(e) {
        e.preventDefault();

        // const data = {
        //     nomeModulo,
        //     descricao,          
        //     ativo,           
        //   };
  
        //   try {
            
        //     if(validaFormulario) {
        //         //faz o que tem que fazer para salvar os registros
        //     } 
        //       //chamar o método Valida
        //       const validador = new FormValidator([    
        //           {
        //               campo: 'nomeModulo',
        //               metodo: 'isEmpty',
        //               validoQuando: false,
        //               mensagem: 'Informe um nome para o módulo'
        //           },
        //           {
        //               campo: 'descricao',
        //               metodo: 'isEmpty',
        //               validoQuando: false,
        //               mensagem: 'Informe um nome para a descrição do módulo'
        //           }
        //       ]);
                          
        //       const validacao = validador.valida(data);
        //       console.log(validacao);
  
  
        //       if(validacao.isValid) {
        //           const response = await api.post('/modulos', data, {
        //               headers: {
        //                   Authorization : usuarioId,
        //               }
      
        //           });
        //           Toaster.exibeMensagem('success', "Módulo adicionado com sucesso!");    
        //           history.push('/consulta-modulos');
        //       } else {
        //           const { nomeModulo, descricao} = validacao;
        //           const campos = [nomeModulo, descricao];
        //           const camposInvalidos = campos.filter(elem => {
        //               return elem.isInvalid
        //            });
        //           camposInvalidos.forEach(campo => {
        //               Toaster.exibeMensagem('error', campo.message);                    
        //           });
                  
        //       }
        //   } catch (err) {
              
        //       Toaster.exibeMensagem('error', "Erro no cadastro, tente novamente.");               
        //   }


    }
    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-ordem-servico" />}
            <Form>
                <Row>
                    <Col xs="12" md="12">
                        <Card className="mb-0">
                            {/* card Ordem Serviço */}
                            <CardHeader>
                                <i className="icon-wrench"></i>
                                <strong>Ordem de Serviço</strong>                               
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="statusCobrancaId">Status Cobrança</Label>
                                        <Input type="select" required name="select" id="cboStatusCobrancaId" multiple={false}
                                            name="statuscobrancaid"
                                            value={statuscobrancaid}
                                            onChange={e => setStatusCobrancaid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statuscobrancasid.map(statuscobranca => (
                                                <option key={statuscobranca.id} value={statuscobranca.id}>{statuscobranca.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="data">Data Os</Label>
                                        <Input type="text" id="txtData" required                                          
                                            name="data"                                            
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="descServ">Desc Serviço</Label>
                                        <Input type="text" id="txtdescServ"  required                                            
                                            name="descServ"                                            
                                        />
                                    </Col>
                                </FormGroup>                            
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="submit" size="sm" color="success" className="mr-3"><i className="fa fa-check"></i> Salvar</Button>
                                <Button type="reset" size="sm" color="danger" className="ml-3"><i className="fa fa-ban "></i> Cancelar</Button>
                            </CardFooter>                   
                        </Card>
                        
                    </Col>    
                </Row>
            </Form>
        </div>
    );
  }
  
  export default TesteMensagens;