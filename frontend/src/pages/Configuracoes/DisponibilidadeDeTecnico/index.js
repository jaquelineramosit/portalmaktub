import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../services/api';

export default function DisponibilidaDeTecnico(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var dispotecIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [disponibilidadeId, setDisponibilidade] = useState('');
    const [disponibilidadesId, setDisponibilidades] = useState([]);
    const [tecnicoId, setTecnico] = useState('');
    const [tecnicosId, setTecnicos] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('disponibilidade').then(response => {
            setDisponibilidades(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && dispotecIdParam !== '') {
            api.get(`disponibilidade-tecnico/${dispotecIdParam}`).then(response => {
                setDisponibilidade(response.data.disponibilidadeId);
                setTecnico(response.data.tecnicoId);
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
            disponibilidadeId,
            tecnicoId,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/disponibilidade-tecnico/${dispotecIdParam}`, data, {
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
                    const response = await api.post('disponibilidade-tecnico', data, {
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
            {redirect && <Redirect to="/lista-disponibilidade-tecnico" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Disponibilidade do Técnico</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="disponibilidadeId">Disponibilidade</Label>
                                        <Input type="select" required name="select" id="cboDisponibilidadeId" multiple={false}
                                            name="disponibilidadeId"
                                            value={disponibilidadeId}
                                            onChange={e => setDisponibilidade(e.target.value)} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {disponibilidadesId.map(disponibilidade => (
                                                <option value={disponibilidade.id}>{disponibilidade.nomedisponibilidade}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTecnicoId" multiple={false}
                                            name="tecnicoId"
                                            value={tecnicoId}
                                            onChange={e => setTecnico(e.target.value)} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tecnicosId.map(tecnico => (
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}
                                        </Input>
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
