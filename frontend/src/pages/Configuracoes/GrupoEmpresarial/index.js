import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroupAddon, CardFooter, Form, InputGroup } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function StatusGrupoEmpresarial(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var statusIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomegrupoempresarial, setNomegrupoempresarial] = useState('');
    const [clienteid, setClienteid] = useState('');
    const [clientesid, setClientesid] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('clientes').then(response => {
            setClientesid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && statusIdParam !== '') {
            api.get(`grupo-empresarial/${statusIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setNomegrupoempresarial(response.data.nomegrupoempresarial);
                setClienteid(response.data.clienteid);
                setDescricao(response.data.descricao);
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

    async function handleParceiro(e) {
        e.preventDefault();

        const data = {
            nomegrupoempresarial,
            clienteid,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/grupo-empresarial/${statusIdParam}`, data, {
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
                    const response = await api.post('grupo-empresarial', data, {
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
            {redirect && <Redirect to="/lista-grupo-empresarial" />}
            <Form onSubmit={handleParceiro} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Grupo Empresarial</strong>
                                <small id="txtSmall"> Novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeParceiro">Grupo Empresarial</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeParceiro" placeholder="Digite o nome do Grupo Empresarial"
                                                name="nomegrupoempresarial"
                                                value={nomegrupoempresarial}
                                                onChange={e => setNomegrupoempresarial(e.target.value)} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                            <span className="btn btn-secondary disabled fa fa-handshake-o"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input required type="select" name="select" id="cboClienteid" multiple={false}
                                            name="clienteid"
                                            value={clienteid}
                                            onChange={e => setClienteid(e.target.value)}>
                                            <option value="" defaultValue>Selecione o Cliente...</option>
                                            {clientesid.map(cliente => (
                                                <option key={`cliente${cliente.id}`} value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="12">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" id="txtDescricao" rows="5" placeholder="Descreva o Grupo Empresarial"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                         onChange={handleSwitch}
                                        />                                    
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
