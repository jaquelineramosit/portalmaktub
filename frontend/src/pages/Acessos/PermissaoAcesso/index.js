import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Permissaoacesso(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var statusIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [perfilacessoid, setPerfilacessoid] = useState('');
    const [moduloid, setModuloid] = useState('');
    const [paginaid, setPaginaid] = useState('');
    const [subpaginaid, setSubpaginaid] = useState('');
    const [funcaoid, setFuncaoid] = useState('');
    const [perfilacessos, setPerfilAcessos] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [paginas, setPaginas] = useState([]);
    const [subpaginas, setSubPaginas] = useState([]);
    const [funcaos, setFuncaos] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('perfis-acesso').then(response => {
            setPerfilAcessos(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('modulos').then(response => {
            setModulos(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('paginas').then(response => {
            setPaginas(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('sub-paginas').then(response => {
            setSubPaginas(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('funcao').then(response => {
            setFuncaos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && statusIdParam !== '') {
            api.get(`permissao-acesso/${statusIdParam}`).then(response => {
                setPerfilacessoid(response.data.perfilacessoid);
                setModuloid(response.data.moduloid);
                setPaginaid(response.data.paginaid);
                setSubpaginaid(response.data.subpaginaid);
                setFuncaoid(response.data.funcaoid);
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
            perfilacessoid,
            moduloid,
            paginaid,
            subpaginaid,
            funcaoid,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/permissao-acesso/${statusIdParam}`, data, {
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
                    const response = await api.post('permissao-acesso', data, {
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
            {redirect && <Redirect to="/lista-permissao-acesso" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Permissão de Acesso</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="perfilAcessoId">Qual o Perfil de Acesso?</Label>
                                        <Input type="select" required id="cboPerfilAcesso"
                                            name="perfilacessoid"
                                            value={perfilacessoid}
                                            onChange={e => setPerfilacessoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {perfilacessos.map(perfilacesso => (
                                                <option value={perfilacesso.id}>{perfilacesso.nomeperfil}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="moduloId">Qual o Módulo?</Label>
                                        <Input type="select" required id="cboModuloId"
                                            name="moduloid"
                                            value={moduloid}
                                            onChange={e => setModuloid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {modulos.map(modulo => (
                                                <option value={modulo.id}>{modulo.nomemodulo}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="paginaId">Qual a Página?</Label>
                                        <Input type="select" required id="cboPaginaId"
                                            name="paginaid"
                                            value={paginaid}
                                            onChange={e => setPaginaid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {paginas.map(pagina => (
                                                <option value={pagina.id}>{pagina.nomepagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="subPaginaId">Qual a Sub Página?</Label>
                                        <Input type="select" required id="cboSubPaginaId"
                                            name="subpaginaid"
                                            value={subpaginaid}
                                            onChange={e => setSubpaginaid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {subpaginas.map(subpagina => (
                                                <option value={subpagina.id}>{subpagina.nomesubpagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="funcaoId">Qual a Função?</Label>
                                        <Input type="select" required id="cboFuncaoId"
                                            name="funcaoid"
                                            value={funcaoid}
                                            onChange={e => setFuncaoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {funcaos.map(funcao => (
                                                <option value={funcao.id}>{funcao.nomefuncao}</option>
                                            ))}
                                        </Input>
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
