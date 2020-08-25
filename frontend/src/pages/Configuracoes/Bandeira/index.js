import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../services/api';

export default function Bandeira(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var BandeiraIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomebandeira, setBandeira] = useState('');
    const [descricao, setDescricao] = useState('');
    const [parceiroid, setParceiroid] = useState('');
    const [parceirosid, setParceirosid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('parceiro').then(response => {
            setParceirosid(response.data);
        })
    }, [usuarioId]);


    useEffect(() => {
        if (action === 'edit' && BandeiraIdParam !== '') {
            api.get(`bandeira/${BandeiraIdParam}`).then(response => {
                setBandeira(response.data.nomebandeira);
                setDescricao(response.data.descricao);
                setParceiroid(response.data.parceiroid);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [BandeiraIdParam]);

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
            nomebandeira,
            descricao,
            parceiroid,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/bandeira/${BandeiraIdParam}`, data, {
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
                    const response = await api.post('bandeira', data, {
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
            {redirect && <Redirect to="/lista-bandeira" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Bandeira</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeBandeira">Nome da Bandeira</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeBandeira" placeholder="Digite o nome da Bandeira"
                                                name="nomebandeira"
                                                value={nomebandeira}
                                                onChange={e => setBandeira(e.target.value)} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                            <span className="btn btn-secondary disabled fa fa-flag"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="parceiroId">Parceiro</Label>
                                        <Input required type="select" name="select" id="cboParceiroId"
                                            name="parceiroid"
                                            value={parceiroid}
                                            onChange={e => setParceiroid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {parceirosid.map(parceiro => (
                                                <option value={parceiro.id}>{parceiro.nomeparceiro}</option>
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
                                {/*} <FormGroup>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                         onChange={handleSwitch} />                                  
                                    </Col>     
                                </FormGroup>*/ }
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
