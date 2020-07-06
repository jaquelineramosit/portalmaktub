import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const Dadosbancarios = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var dadosbancariosIdParam = props.match.params.id;

    const [tecnicos, setTecnicos] = useState([]);
    const [bancos, setBancos] = useState([]);
    const [tipocontas, setTipoContas] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        tecnicoid: 0,
        bancoid: 0,
        tipocontaid: 0,
        agencia: '',
        conta: '',
        titularconta: '',
        doctitular: '',
        contapadrao: '1',
        ativo: '1'
    });

    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicos(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('banco').then(response => {
            setBancos(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('tipo-conta').then(response => {
            setTipoContas(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        if (action === 'edit' && dadosbancariosIdParam !== '') {
            api.get(`dados-bancarios/${dadosbancariosIdParam}`).then(response => {
                document.getElementById('cboTecnicoId').value = response.data.tecnicoid;
                document.getElementById('cboBancoId').value = response.data.bancoid;
                document.getElementById('cboTipoContaId').value = response.data.tipocontaid;
                document.getElementById('txtAgencia').value = response.data.agencia;
                document.getElementById('txtConta').value = response.data.conta;
                document.getElementById('txtTitularConta').value = response.data.titularconta;
                document.getElementById('txtDocTitular').value = response.data.doctitular;
                setFormData({
                    ...formData,
                    tecnicoid: response.data.tecnicoid,
                    bancoid: response.data.bancoid,
                    tipocontaid: response.data.tipocontaid,
                    agencia: response.data.agencia,
                    conta: response.data.conta,
                    titularconta: response.data.titularconta,
                    doctitular: response.data.doctitular,
                })
            });
        } else {
            return;
        }
    }, [dadosbancariosIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleDadosBancarios(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/dados-bancarios/${dadosbancariosIdParam}`, data, {
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
                    const response = await api.post('dados-bancarios', data, {
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
            <Form onSubmit={handleDadosBancarios}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Conta de Tecnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input required type="select" name="select" id="cboTecnicoId"
                                            name="tecnicoid"
                                            onChange={handleInputChange} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tecnicos.map(tecnico => (
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}

                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bancoId">Banco</Label>
                                        <Input required type="select" name="select" id="cboBancoId"
                                            name="bancoid"
                                            onChange={handleInputChange} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {bancos.map(banco => (
                                                <option value={banco.id}>{banco.nomebanco}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tipoContaId">Tipo de Conta</Label>
                                        <Input required type="select" name="select" id="cboTipoContaId"
                                            name="tipocontaid"
                                            onChange={handleInputChange} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tipocontas.map(tipoconta => (
                                                <option value={tipoconta.id}>{tipoconta.nometipoconta}</option>
                                            ))}

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="agencia">Agência</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtAgencia" placeholder="Agência"
                                                name="agencia"
                                                onChange={handleInputChange} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="conta">Conta</Label>
                                        <Input type="text" required id="txtConta" placeholder="Conta"
                                            name="conta"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="titularConta">Titular da Conta</Label>
                                        <InputGroup>
                                            <Input id="txtTitularConta" required type="text" placeholder="Insira o titular da conta"
                                                name="titularconta"
                                                onChange={handleInputChange} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="docTitular">Documento do Titular</Label>
                                        <InputGroup>
                                            <Input id="txtDocTitular" required type="text"
                                                name="doctitular"
                                                onChange={handleInputChange} />
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
export default Dadosbancarios;