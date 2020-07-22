import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';

import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Modulos(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var ModuloIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomemodulo, setNomemodulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && ModuloIdParam !== '') {
            api.get(`modulos/${ModuloIdParam}`).then(response => {
                setNomemodulo(response.data.nomemodulo);
                setDescricao(response.data.descricao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [ModuloIdParam]);

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
            nomemodulo,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/modulos/${ModuloIdParam}`, data, {
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
                    const response = await api.post('modulos', data, {
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
            {redirect && <Redirect to="/lista-modulos" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Módulo</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="NomeModulo">Nome Módulo</Label>
                                        <Input type="text" required id="txtNomeModulo" placeholder="Digite Nome do Módulo"
                                            name="nomemodulo"
                                            value={nomemodulo}
                                            onChange={e => setNomemodulo(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label htmlFor="Descricao">Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao" multiple placeholder="Digite a Descrição do Módulo"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>                                     
                                    <Col md="2">
                                        <Label htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} 
                                            defaultChecked 
                                            onChange={handleSwitch}
                                            size={'sm'} />
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
