import React, { Component, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import './style.css';
import ImgLogon from '../../../assets/img/logon.jpg';
import api from '../../../../src/services/api';

export default function Logon() {
         
        const [login, setLogin] = useState('');
        const [senhaForm, setSenhaForm] = useState('');

        const history = useHistory();

        async function handleLogin(e) {
            e.preventDefault();

            const data = {
                login,
                senhaForm
            };

            try {
                const response = await api.post('/logon', data);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('nomeUsuario', response.data.nome);
                history.push('/dashboardv1');

            } catch (err) {
                alert('Usuário e/ou senha inválido(s). Tente novamente.');
            }
        }

        return (  
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={handleLogin}>
                                            <h1>Logon</h1>
                                            <p className="text-muted">Informe os dados da sua conta</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Usuário"
                                                value={login}
                                                onChange={ e => setLogin(e.target.value)}
                                                autoComplete="username" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Senha" 
                                                value={senhaForm}
                                                onChange={ e => setSenhaForm(e.target.value)}
                                                autoComplete="current-password" />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="4">                                                    
                                                    <Button color="primary" type="submit" className="px-4">Entrar</Button>                                                    
                                                </Col>
                                                <Col xs="8" className="text-right">
                                                    <Link to="/register">
                                                        <i className="icone-sign fa fa-sign-in"></i>
                                                        <Button color="link" className="px-0">                                                        
                                                            Não tenho cadastro
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-white m-0 p-0">                                    
                                    <CardBody className="card-logon">
                                        <img className="imagem-logon" src={ImgLogon} alt="Imagem de Logon" />                                         
                                    </CardBody>                                                                            
                                </Card>                                
                            </CardGroup>                            
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
