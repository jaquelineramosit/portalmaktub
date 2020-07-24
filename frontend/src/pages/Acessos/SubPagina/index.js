import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Subpagina(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var statusIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [paginaid, setPaginaid] = useState('');
    const [nomesubpagina, setNomesubpagina] = useState('');
    const [descricao, setDescricao] = useState('');
    const [paginasid, setPaginasid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('paginas').then(response => {
            setPaginasid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && statusIdParam !== '') {
            api.get(`sub-paginas/${statusIdParam}`).then(response => {
                setPaginaid(response.data.paginaid);
                setNomesubpagina(response.data.nomesubpagina);
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

    async function handleStatus(e) {
        e.preventDefault();

        const data = {
            paginaid,
            nomesubpagina,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/sub-paginas/${statusIdParam}`, data, {
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
                    const response = await api.post('sub-paginas', data, {
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
            {redirect && <Redirect to="/lista-sub-paginas" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Sub Página</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="pagina">Qual a Página?</Label>
                                        <Input type="select" required name="select" id="cboPagina"
                                            name="paginaid"
                                            value={paginaid}
                                            onChange={e => setPaginaid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {paginasid.map(pagina => (
                                                <option value={pagina.id}>{pagina.nomepagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nomeSubPagina">Nome da SubPágina</Label>
                                        <Input type="text" id="txtNomeSubPagina" multiple placeholder="Digite o nome da Sub Página"
                                            name="nomesubpagina"
                                            value={nomesubpagina}
                                            onChange={e => setNomesubpagina(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="10">
                                        <Label htmlFor="descricao">Descrião</Label>
                                        <Input type="textarea" id="txtDescricao" multiple placeholder="Digite a Descrição"
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
