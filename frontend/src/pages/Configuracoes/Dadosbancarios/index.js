import React, { useState, useEffect, AppSwitch } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, CardFooter, Form } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import '../../../global.css';
import api from '../../../services/api';

export default function DadosBancarios(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var dadosbancariosIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [tecnicoid, setTecnicoid] = useState('');
    const [bancoid, setBancoid] = useState('');
    const [tipocontaid, setTipoContaid] = useState('');
    const [agencia, setAgencia] = useState('');
    const [conta, setConta] = useState('');
    const [titularconta, setTitularconta] = useState('');
    const [doctitular, setDoctitular] = useState('');
    const [bancosid, setBancosid] = useState([]);
    const [tipocontasid, setTipoContasid] = useState([]);
    const [tecnicosid, setTecnicosid] = useState([]);
    const [ativo, setAtivo] = useState(1);


    useEffect(() => {
        if (action === 'edit' && dadosbancariosIdParam !== '') {
            api.get(`dados-bancarios/${dadosbancariosIdParam}`).then(response => {
                setTecnicoid(response.data.tecnicoid);
                setBancoid(response.data.bancoid);
                setTipoContaid(response.data.tipocontaid);
                setAgencia(response.data.agencia);
                setConta(response.data.conta);
                setTitularconta(response.data.titularconta);
                setDoctitular(response.data.doctitular);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [dadosbancariosIdParam]);
    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicosid(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('banco').then(response => {
            setBancosid(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('tipo-conta').then(response => {
            setTipoContasid(response.data);
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
            tecnicoid,
            bancoid,
            tipocontaid,
            agencia,
            conta,
            titularconta,
            doctitular,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/dados-bancarios/${dadosbancariosIdParam}`, data, {
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
                    const response = await api.post('dados-bancarios', data, {
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
            {redirect && <Redirect to="/lista-dados-bancarios" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Conta de Tecnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input required type="select" name="select" id="cboTecnicoId"
                                            name="tecnicoid"
                                            value={tecnicoid}
                                            onChange={e => setTecnicoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tecnicosid.map(tecnico => (
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}

                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="bancoId">Banco</Label>
                                        <Input required type="select" name="select" id="cboBancoId"
                                            name="bancoid"
                                            value={bancoid}
                                            onChange={e => setBancoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {bancosid.map(banco => (
                                                <option value={banco.id}>{banco.nomebanco}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tipoContaId">Tipo de Conta</Label>
                                        <Input required type="select" name="select" id="cboTipoContaId"
                                            name="tipocontaid"
                                            value={tipocontaid}
                                            onChange={e => setTipoContaid(e.target.value)} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tipocontasid.map(tipoconta => (
                                                <option value={tipoconta.id}>{tipoconta.nometipoconta}</option>
                                            ))}

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="agencia">Agência</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtAgencia" placeholder="Agência"
                                                name="agencia"
                                                value={agencia}
                                                onChange={e => setAgencia(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="conta">Conta</Label>
                                        <Input type="text" required id="txtConta" placeholder="Conta"
                                            name="conta"
                                            value={conta}
                                            onChange={e => setConta(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="titularConta">Titular da Conta</Label>
                                        <InputGroup>
                                            <Input id="txtTitularConta" required type="text" placeholder="Insira o titular da conta"
                                                name="titularconta"
                                                value={titularconta}
                                                onChange={e => setTitularconta(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="docTitular">Documento do Titular</Label>
                                        <InputGroup>
                                            <Input id="txtDocTitular" required type="text" placeholder="CPF ou CNPJ"
                                                name="doctitular"
                                                value={doctitular}
                                                onChange={e => setDoctitular(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup>    
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />
                                    </Col>
                               </FormGroup>  */}
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