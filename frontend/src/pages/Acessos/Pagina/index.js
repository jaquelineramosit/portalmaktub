import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { messagePorStatus, message } from '../../../utils/messages';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Pagina(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var bancoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [moduloid, setModuloid] = useState('');
    const [nomepagina, setNomepagina] = useState('');
    const [descricao, setDescricao] = useState('');
    const [modulos, setModulos] = useState([]);
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && bancoIdParam !== '') {
            api.get(`paginas/${bancoIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setModuloid(response.data.moduloid);
                setNomepagina(response.data.nomepagina);
                setDescricao(response.data.descricao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [bancoIdParam]);

    useEffect(() => {
        api.get('modulos').then(response => {
            setModulos(response.data);
        })
    }, [usuarioId]);

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
            moduloid,
            nomepagina,
            descricao,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/paginas/${bancoIdParam}`, data, {
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
                    const response = await api.post('paginas', data, {
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
            {redirect && <Redirect to="/lista-paginas" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Página</strong>
                                <small id="txtSmall"> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="moduloId">Qual o Módulo</Label>
                                        <Input type="select" required id="cboModuloId"
                                            name="moduloId"
                                            value={moduloid}
                                            onChange={e => setModuloid(e.target.value)}>
                                            <option value="" defaultValue>Selecione...</option>
                                            {modulos.map(modulo => (
                                                <option value={modulo.id}>{modulo.nomemodulo}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nomepagina">Nome da Página</Label>
                                        <Input type="text" id="txtNomePagina" multiple placeholder="Digite o nome da Página"
                                            name="nomepagina"
                                            value={nomepagina}
                                            onChange={e => setNomepagina(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label htmlFor="descricao">Descrição</Label>
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
