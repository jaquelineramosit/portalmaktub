import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from 'react-router-dom';
import { messagePorStatus, message } from '../../../utils/messages';
import api from '../../../services/api';

export default function Tipotecnico(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var statusIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nometipotecnico, setNometecnico] = useState('');
    const [desctipotecnico, setDesctipotecnico] = useState('');
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && statusIdParam !== '') {
            api.get(`tipo-tecnico/${statusIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setNometecnico(response.data.nometipotecnico);
                setDesctipotecnico(response.data.desctipotecnico);
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
            nometipotecnico,
            desctipotecnico,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/tipo-tecnico/${statusIdParam}`, data, {
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
                    const response = await api.post('tipo-tecnico', data, {
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
            {redirect && <Redirect to="/lista-tipo-tecnicos" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipo de Técnico</strong>
                                <small id="txtSmall"> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeTipoTecnico">Nome do Tipo de Técnico</Label>
                                        <Input type="text" required id="txtNomeTipoTecnico" placeholder="Digite o Tipo de Técnico"
                                            name="nometipotecnico"
                                            value={nometipotecnico}
                                            onChange={e => setNometecnico(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" placeholder="Descreva o Tipo de Técnico inserido"  id="txtDescricao"
                                            name="desctipotecnico"
                                            value={desctipotecnico}
                                            onChange={e => setDesctipotecnico(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>    
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
}
