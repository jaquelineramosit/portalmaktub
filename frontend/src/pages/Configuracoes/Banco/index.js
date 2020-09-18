import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import FormValidator from '../../../components/Validator/FormValidator';
import Toaster from '../../../components/Toaster'
import { messagePorStatus, message } from '../../../utils/messages';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Banco(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var bancoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [codbanco, setCodbanco] = useState('');
    const [nomebanco, setNomebanco] = useState('');
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && bancoIdParam !== '') {
            api.get(`banco/${bancoIdParam}`).then(response => {
                setCodbanco(response.data.codbanco);
                setNomebanco(response.data.nomebanco);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [bancoIdParam]);

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
            codbanco,
            nomebanco,
            ativo
        };
        try {

            //chamar o método Valida
            const validador = new FormValidator([
                {
                    campo: 'codbanco',
                    metodo: 'isEmpty',
                    args: [{ignore_whitespace:true}],
                    validoQuando: false,
                    mensagem: 'Informe o código do banco!'
                },
                {
                    campo: 'nomebanco',
                    metodo: 'isEmpty',
                    args: [{ignore_whitespace:true}],
                    validoQuando: false,
                    mensagem: 'Informe o nome do banco!'
                },
                {
                    campo: 'codbanco',
                    metodo: 'isLength',
                    args: [{min:1, max:3}],
                    validoQuando: true,
                    mensagem: 'Informe o código do banco com 3 caracteres!'
                },
                {
                    campo: 'nomebanco',
                    metodo: 'isLength',
                    args: [{min:5, max:50}],
                    validoQuando: true,
                    mensagem: 'Informe o nome do banco de 5 a no máximo 50 caracteres!'
                },
            ]);
                          
            const validacao = validador.valida(data);

            if(validacao.isValid) {
                if (action === 'edit') {
                    try {
                        const response = await api.put(`/banco/${bancoIdParam}`, data, {
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
                            const response = await api.post('banco', data, {
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
            } else {
                const { codbanco, nomebanco} = validacao;
                const campos = [codbanco, nomebanco];
                const camposInvalidos = campos.filter(elem => {
                    
                    return elem.isInvalid
                });
                camposInvalidos.forEach(campo => {                    
                    message('error',  campo.message);                 
                });
            }
        } catch (ex) {
            message('error', "Ocorreu um erro. Favor contatar o administrador do sistema.");           
        }
    }

    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-banco" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Banco</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="codBanco">Código do Banco</Label>
                                        <Input type="text" required id="codbanco" placeholder="Digite o Código do banco"
                                            name="codbanco"
                                            value={codbanco}
                                            onChange={e => setCodbanco(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="codBanco">Nome do Banco</Label>
                                        <Input type="text" required id="nomebanco" placeholder="Digite o Nome do Banco"
                                            name="nomebanco"
                                            value={nomebanco}
                                            onChange={e => setNomebanco(e.target.value)} />
                                    </Col>
                                </FormGroup>                                
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
