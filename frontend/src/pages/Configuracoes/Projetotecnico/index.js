import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../services/api';

export default function ProjetoTecnico(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var dispotecIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [tipoprojetoid, setTipoProjeto] = useState('');
    const [tecnicoid, setTecnico] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipoprojetosid, setTipoProjetos] = useState([]);
    const [tecnicosid, setTecnicos] = useState([]);

    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('tipo-projeto').then(response => {
            setTipoProjetos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && dispotecIdParam !== '') {
            api.get(`projeto-tecnico/${dispotecIdParam}`).then(response => {
                setTipoProjeto(response.data.tipoprojetoid);
                setTecnico(response.data.tecnicoid);
                setDescricao(response.data.descricao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [dispotecIdParam]);

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
            tipoprojetoid,
            tecnicoid,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/projeto-tecnico/${dispotecIdParam}`, data, {
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
                    const response = await api.post('projeto-tecnico', data, {
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
            {redirect && <Redirect to="/lista-projeto-tecnico" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Projeto X Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required id="cboTécnicoId" multiple={false}
                                            name="tecnicoid"
                                            value={tecnicoid}
                                            onChange={e => setTecnico(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tecnicosid.map(tecnico => (
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tipoTrojetoId">Tipo de Projeto</Label>
                                        <Input type="select" required id="cboTipoProjetoId" multiple={false} key
                                            name="tipoprojetoid"
                                            value={tipoprojetoid}
                                            onChange={e => setTipoProjeto(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tipoprojetosid.map(tipoProjeto => (
                                                <option value={tipoProjeto.id}>{tipoProjeto.nometipoprojeto}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" placeholder="Descreva o Tipo de Técnico inserido" id="txtDescrição"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>

                                {/* <FormGroup row>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                         onChange={handleSwitch}
                                        />                                    
                                    </Col>                           
                                </FormGroup>   */}
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
