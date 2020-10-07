import {Tabs, Tab, TabContainer } from 'react-bootstrap'
import React, { useState, useEffect, history, Component, Fragment } from 'react';
import '../global.css';
import FormValidator from '../components/Validator/FormValidator';
import Toaster from '../components/Toaster'
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, ListGroup, ListGroupItem, } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import api from '../services/api';
const dateFormat = require('dateformat');

const TesteMensagens = (props) => {

    const [redirect, setRedirect] = useState(false);
    const [statuscobrancaid, setStatusCobrancaid] = useState('');
    const [dataOs, setDataOs] = useState('');
    const [descricao, setDescricao] = useState('');    
    const [statuscobrancasid, setStatusCobrancasid] = useState([]);
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('status-cobranca').then(response => {
            setStatusCobrancasid(response.data);
        })
    }, [usuarioId]);

    function exibirMaiorEMenorSoma() {       

        let v = [10, -8, 4, 1, 0, 3, -5]
        let n = 7;

        let vOrderCresc = v.sort(compararNumeros);        
        
        console.log(`O vetor ordenado é: ${vOrderCresc}`)

        let menorSoma = 0;
        
        for (let index = 0; index < n - 1; index++) {
            menorSoma = menorSoma + vOrderCresc[index];            
        }

        let maiorSoma = 0;
        for (let index = n - 1; index > 0; index--) {
            maiorSoma = maiorSoma + vOrderCresc[index];            
        }
        
        console.log(`Resultado: ${menorSoma} ${maiorSoma}`);        
    }

    function compararNumeros(a, b) {
        return a - b;
    }

    async function handleOs(e) {
        e.preventDefault();
        const data = {
            statuscobrancaid,
            dataOs,          
            descricao,           
        };
  
        try {

            //chamar o método Valida
            const validador = new FormValidator([    
                {
                    campo: 'statuscobrancaid',
                    metodo: 'isEmpty',
                    validoQuando: false,
                    mensagem: 'Selecione o campo Status de Cobrança!'
                },
                {
                    campo: 'dataOs',
                    metodo: 'isEmpty',
                    validoQuando: false,
                    mensagem: 'Informe uma data válida de serviço!'
                },
                {
                    campo: 'descricao',
                    metodo: 'isEmpty',
                    validoQuando: false,
                    mensagem: 'Informe uma descrição para o serviço!'
                }
            ]);
                          
            const validacao = validador.valida(data);

            if(validacao.isValid) {
                // const response = await api.post('/modulos', data, {
                //     headers: {
                //         Authorization : usuarioId,
                //     }
                // });
                Toaster.exibeMensagem('success', "Módulo adicionado com sucesso!");    
                //history.push('/consulta-modulos');
            } else {
                const { statuscobrancaid, dataOs, descricao} = validacao;
                const campos = [statuscobrancaid, dataOs, descricao];
                const camposInvalidos = campos.filter(elem => {
                    
                    return elem.isInvalid
                });
                camposInvalidos.forEach(campo => {
                    Toaster.exibeMensagem('error', campo.message);                    
                });
            }
        } catch (ex) {
            Toaster.exibeMensagem('error', "Erro no cadastro, tente novamente.");               
        }
    }
    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-ordem-servico" />}
            <Form onSubmit={handleOs}>
                
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
                                        <Label htmlFor="statuscobrancaid">Status Cobrança</Label>
                                        <Input type="select" required id="statuscobrancaid" multiple={false}
                                            name="statuscobrancaid"
                                            value={statuscobrancaid}
                                            onChange={e => setStatusCobrancaid(e.target.value)}>
                                            <option value={""} defaultValue>Selecione...</option>
                                            {statuscobrancasid.map(statuscobranca => (
                                                <option key={statuscobranca.id} value={statuscobranca.id}>{statuscobranca.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="dataOs">Data Os</Label>
                                        <Input type="date" id="dataOs"                                          
                                            name="dataOs"                                            
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="descricao">Desc Serviço</Label>
                                        <Input type="text" id="descricao"                                             
                                            name="descricao"                                            
                                        />
                                    </Col>
                                </FormGroup>                            
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="button" size="sm" color="success" className="mr-3" onClick={exibirMaiorEMenorSoma}><i className="fa fa-check"></i> TESTE</Button>
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