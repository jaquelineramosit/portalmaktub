import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Modulo() {
    const [nomeModulo, setnomeModulo] = useState('');
    const [descricao, setdescricao] = useState('');  
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');    
  

    async function handleModulo(e) {
        e.preventDefault();
        
        const data = {
          nomeModulo,
          descricao,          
          ativo,           
        };
        
        console.log(data);

        try {
            
            const response = await api.post('/modulos', data, {
                headers: {
                    Authorization : usuarioId,
                }

            });
            alert(`Módulo cadastrado com sucesso`);      
                
        } catch (err) {
    
            alert('Erro no cadastro, tente novamente.');    
        }
    }
    return (        
        <div className="animated fadeIn">
            <Form onSubmit={handleModulo}>
                <Row>                              
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Módulo</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="12">
                                        <Label htmlFor="Nome">Nome Módulo</Label>
                                        <Input type="text" required id="txtNomeModulo" placeholder="Digite Nome do Módulo"
                                        value={nomeModulo}
                                        onChange={ e => setnomeModulo(e.target.value)}
                                        />                                        
                                    </Col>
                                </FormGroup> 
                                <FormGroup row> 
                                    <Col md="12">
                                        <Label htmlFor="Descricao">Descrição</Label>
                                        <Input type="text" id="txtDescricao" multiple placeholder="Digite a Descrição do Módulo"
                                        value={descricao}
                                        onChange={ e => setdescricao(e.target.value)}
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