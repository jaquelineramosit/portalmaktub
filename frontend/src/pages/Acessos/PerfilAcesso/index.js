import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Perfilacesso(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var perfilacessoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomeperfil, setNomeperfil] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && perfilacessoIdParam !== '') {
            api.get(`perfis-acesso/${perfilacessoIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setNomeperfil(response.data.nomeperfil);
                setDescricao(response.data.descricao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [perfilacessoIdParam]);

    function handleInputChange(event) {
        var { name } = event.target;

        if (name === 'ativo') {
            if (ativo === 1) {
                setAtivo(0);
            } else {
                setAtivo(1);
            }
        }
    };

    function handleReset() {
        setRedirect(true);
    };

    async function handleStatus(e) {
        e.preventDefault();

        const data = {
            nomeperfil,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/perfis-acesso/${perfilacessoIdParam}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                alert(`Cadastro atualizado com sucesso.`);
                setRedirect(true);
            } catch (err) {
                alert('Erro na atualização, tente novamente.');
            }
        } else {
            if (action === 'novo') {
                try {
                    const response = await api.post('perfis-acesso', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert('Cadastro realizado com sucesso.');
                    setRedirect(true);
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }
    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-perfis-acesso" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Perfil de Acesso</strong>
                                <small id="txtSmall"> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomePerfilAccesso">Nome do Perfil de Acesso</Label>
                                        <Input type="text" id="txtPerfilAcesso" multiple placeholder="Digite o nome do Perfil de Acesso"
                                            name="nomeperfil"
                                            value={nomeperfil}
                                            onChange={e => setNomeperfil(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="descricao">Descrião</Label>
                                        <Input type="textarea" id="txtDescricao" multiple placeholder="Digite a Descrição"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>                                     
                                    <Col md="2">
                                        <Label htmlFor="ativo">Ativo</Label>
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                             onChange={handleSwitch} />
                                    </Col>                                                           
                                </FormGroup>*/}
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
