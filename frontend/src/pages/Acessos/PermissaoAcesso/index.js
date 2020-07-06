import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Permissaoacesso = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var permissaoacessoIdParam = props.match.params.id;

    const [perfilacessos, setPerfilAcessos] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [paginas, setPaginas] = useState([]);
    const [subpaginas, setSubPaginas] = useState([]);
    const [funcaos, setFuncaos] = useState([]);

    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        perfilacessoid: 1,
        moduloid: 1,
        paginaid: 1,
        subpaginaid: 1,
        funcaoid: 1,
        ativo: 1
    });

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
        if (action === 'edit' && permissaoacessoIdParam !== '') {
            api.get(`permissao-acesso/${permissaoacessoIdParam}`).then(response => {
                document.getElementById('cboPerfilAcesso').value = response.data.perfilacessoid;
                document.getElementById('cboModuloId').value = response.data.moduloid;
                document.getElementById('cboPaginaId').value = response.data.paginaid;
                document.getElementById('cboSubPaginaId').value = response.data.subpaginaid;
                document.getElementById('cboFuncaoId').value = response.data.funcaoid;

                setFormData({
                    ...formData,
                    perfilacessoid: response.data.perfilacessoid,
                    moduloid: response.data.moduloid,
                    paginaid: response.data.paginaid,
                    subpaginaid: response.data.subpaginaid,
                    funcaoid: response.data.funcaoid,
                })
            });
        } else {
            return;
        }
    }, [permissaoacessoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handlePermissaoAcesso(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/permissao-acesso/${permissaoacessoIdParam}`, data, {
                    headers: {
                        Authorization: 1,
                    }
                });
                alert(`Cadastro atualizado com sucesso.`);
            } catch (err) {

                alert('Erro na atualização, tente novamente.');
            }

        } else {

            if (action === 'novo') {
                try {
                    const response = await api.post('permissao-acesso', data, {
                        headers: {
                            Authorization: 1,
                        }
                    });
                    alert(`Cadastro realizado com sucesso.`);
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }
    return (
        <div className="animated fadeIn">
            <Form onSubmit={handlePermissaoAcesso}>
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
                                            onChange={handleInputChange} >
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
                                            onChange={handleInputChange} >

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
                                            onChange={handleInputChange} >

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
                                            onChange={handleInputChange} >

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
                                            onChange={handleInputChange} >

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
export default Permissaoacesso;