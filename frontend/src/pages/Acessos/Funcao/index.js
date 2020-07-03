import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const Funcao = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var funcaoIdParam = props.match.params.id;


    const [subPaginas, setSubPaginas] = useState([]);
    const [paginas, setPaginas] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        subpaginaid: 1,
        paginaid: 1,
        nomefuncao: '',
        descricao: '',
        ativo: 1
    });

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
        if (action === 'edit' && funcaoIdParam !== '') {
            api.get(`funcao/${funcaoIdParam}`).then(response => {
                document.getElementById('cboSubPaginaId').value = response.data.subpaginaid;
                document.getElementById('cboPagina').value = response.data.paginaid;
                document.getElementById('txtNomeFuncao').value = response.data.nomefuncao;
                document.getElementById('txtDescricao').value = response.data.descricao;

                setFormData({
                    ...formData,
                    subpaginaid: response.data.subpaginaid,
                    paginaid: response.data.paginaid,
                    nomefuncao: response.data.nomefuncao,
                    descricao: response.data.descricao,

                })
            });
        } else {
            return;
        }
    }, [funcaoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };
    console.log(formData)
    async function handleFuncao(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/funcao/${funcaoIdParam}`, data, {
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
                    const response = await api.post('funcao', data, {
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
            <Form onSubmit={handleFuncao}>
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
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue> Selecione...</option>
                                            {subPaginas.map(subPagina => (
                                                <option value={subPagina.id}>{subPagina.nomesubpagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="pagina">Qual a Página?</Label>
                                        <Input type="select" required name="select" id="cboPagina"
                                            name="paginaid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue> Selecione...</option>
                                            {paginas.map(pagina => (
                                                <option value={pagina.id}>{pagina.nomepagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeFuncao">Nome da Função</Label>
                                        <Input type="text" id="txtNomeFuncao" multiple placeholder="Digite o nome da Função"
                                            name="nomefuncao"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="9">
                                        <Label htmlFor="descricao">Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao" multiple placeholder="Digite a Descrição"
                                            name="descricao"
                                            onChange={handleInputChange}
                                        />
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
export default Funcao;