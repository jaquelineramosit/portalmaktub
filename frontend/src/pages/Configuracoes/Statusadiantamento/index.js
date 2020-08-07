import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../services/api';

export default function StatusAdiantamento(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var statusIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [status, setStatusAdi] = useState('');
    const [descstatus, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && statusIdParam !== '') {
            api.get(`status-adiantamento/${statusIdParam}`).then(response => {
                setStatusAdi(response.data.status);
                setDescricao(response.data.descstatus);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [statusIdParam]);

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
            status,
            descstatus,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/status-adiantamento/${statusIdParam}`, data, {
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
                    const response = await api.post('status-adiantamento', data, {
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
            {redirect && <Redirect to="/lista-status-adiantamento" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Status de Adiantamento</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="status">Status de Adiantamento</Label>
                                        <Input type="text" required id="txtStatus" placeholder="Inisira o Status"
                                            name="status"
                                            value={status}
                                            onChange={e => setStatusAdi(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" placeholder="Descreva o Status inserido" id="txtDescstatus"
                                            name="descstatus"
                                            value={descstatus}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>
                                <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        onChange={handleSwitch}
                                        />                                    
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
};
