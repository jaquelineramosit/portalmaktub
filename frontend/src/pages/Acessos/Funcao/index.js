import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import { Redirect } from "react-router-dom";
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Funcao(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var funcaoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [subpaginaid, setSubpaginaid] = useState('');
    const [paginaid, setPaginaid] = useState('');
    const [nomefuncao, setNomefuncao] = useState('');
    const [descricao, setDescricao] = useState('');
    const [subpaginasid, setSubPaginasid] = useState([]);
    const [paginasid, setPaginasid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('paginas').then(response => {
            setPaginasid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('sub-paginas').then(response => {
            setSubPaginasid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && funcaoIdParam !== '') {
            api.get(`funcao/${funcaoIdParam}`).then(response => {
                setSubpaginaid(response.data.subpaginaid);
                setPaginaid(response.data.paginaid);
                setNomefuncao(response.data.nomefuncao);
                setDescricao(response.data.descricao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [funcaoIdParam]);

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
            subpaginaid,
            paginaid,
            nomefuncao,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/funcao/${funcaoIdParam}`, data, {
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
                    const response = await api.post('funcao', data, {
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
            {redirect && <Redirect to="/lista-funcoes" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Função</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="subPaginaId">Qual a Sub Página?</Label>
                                        <Input type="select" required id="cboSubPaginaId"
                                            name="subpaginaid"
                                            value={subpaginaid}
                                            onChange={e => setSubpaginaid(e.target.value)}>
                                            <option value="" defaultValue> Selecione...</option>
                                            {subpaginasid.map(subPagina => (
                                                <option value={subPagina.id}>{subPagina.nomesubpagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="pagina">Qual a Página?</Label>
                                        <Input type="select" required name="select" id="cboPagina"
                                            name="paginaid"
                                            value={paginaid}
                                            onChange={e => setPaginaid(e.target.value)}>
                                            <option value="" defaultValue> Selecione...</option>
                                            {paginasid.map(pagina => (
                                                <option value={pagina.id}>{pagina.nomepagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeFuncao">Nome da Função</Label>
                                        <Input type="text" id="txtNomeFuncao" multiple placeholder="Digite o nome da Função"
                                            name="nomefuncao"
                                            value={nomefuncao}
                                            onChange={e => setNomefuncao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="9">
                                        <Label htmlFor="descricao">Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao" multiple placeholder="Digite a Descrição"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>                                     
                                    <Col md="2">
                                        <Label htmlFor="Ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} 
                                            defaultChecked 
                                            onChange={handleSwitch}
                                            size={'sm'} />
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
