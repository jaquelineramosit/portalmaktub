import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import { messagePorStatus, message } from '../../../utils/messages';
import api from '../../../../src/services/api';

export default function Disponibilidade(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var disponibilidadeIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomedisponibilidade, setNomedisponibilidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && disponibilidadeIdParam !== '') {
            api.get(`disponibilidade/${disponibilidadeIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setNomedisponibilidade(response.data.nomedisponibilidade);
                setDescricao(response.data.descricao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [disponibilidadeIdParam]);

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
            nomedisponibilidade,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/disponibilidade/${disponibilidadeIdParam}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                setRedirect(messagePorStatus(response.status));
            } catch (err) {
                message('error', "Ocorreu um erro. Favor contatar o administrador do sistema.");
            }
        } else {
            if (action === 'novo') {
                try {
                    const response = await api.post('disponibilidade', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    setRedirect(messagePorStatus(response.status));
                } catch (err) {
                    message('error', "Ocorreu um erro. Favor contatar o administrador do sistema.");
                }
            }
        }
    }


    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-disponibilidade" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Disponibilidade</strong>
                                <small id="txtSmall"> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeDisponibilidade">Disponibilidade</Label>
                                        <Input type="text" required id="txtDisponibilidade" placeholder="Digite a Disponibilidade"
                                            name="nomedisponibilidade"
                                            value={nomedisponibilidade}
                                            onChange={e => setNomedisponibilidade(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" placeholder="Descreva o Tipo de Técnico inserido" id="txtDescricao"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                         onChange={handleSwitch} />                                    
                                    </Col>  
                                 </FormGroup> */}
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
