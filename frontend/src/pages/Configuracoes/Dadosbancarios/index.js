import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, CardFooter, Form} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function DadosBancarios() {
    const [tecnicoid, setTecnicoId] = useState('');
    const [bancoid, setBancoId] = useState('');
    const [tipocontaid, setTipoContaId] = useState('');
    const [agencia, setAgencia] = useState('');  
    const [conta, setConta] = useState('');
    const [titularconta, setTitularConta] = useState('');
    const [doctitular, setDocTitular] = useState('');
    const [contapadrao, setContaPadrao] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



    async function handleDadosBancarios(e) {
        e.preventDefault();

        const data = {
            tecnicoid,
            bancoid,
            tipocontaid,
            agencia,
            conta,
            titularconta,
            doctitular,
            contapadrao,
            ativo,
        };

        try {
            const response = await api.post('dados-bancarios', data, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
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
                                            value={tecnicoid}
                                            onChange={e => setTecnicoId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Técnico1</option>
                                            <option value={2}>Técnico2</option>

                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bancoId">Banco</Label>
                                        <Input required type="select" name="select" id="cboBancoId"
                                            value={bancoid}
                                            onChange={e => setBancoId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Banco1</option>
                                            <option value={2}>Banco2</option>

                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tipoContaId">Tipo de Conta</Label>
                                        <Input required type="select" name="select" id="cboTipoContaId"
                                            value={tipocontaid}
                                            onChange={e => setTipoContaId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Tipo de Conta1</option>
                                            <option value={2}>Tipo de Conta2</option>

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="agencia">Agência</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtAgencia"  placeholder="Agência"                                          
                                                value={agencia}
                                                onChange={e => setAgencia(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="conta">Conta</Label>
                                        <Input type="text" required id="txtConta" placeholder="Conta"  
                                            value={conta}
                                            onChange={e => setConta(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="titularConta">Titular da Conta</Label>
                                        <InputGroup>
                                            <Input id="txtTitularConta" required type="text"  placeholder="Insira o titular da conta"
                                                value={titularconta}
                                                onChange={e => setTitularConta(e.target.value)} />                                           
                                        </InputGroup>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="docTitular">Documento do Titular</Label>
                                        <InputGroup>
                                            <Input id="txtDocTitular" required type="text"
                                                value={doctitular}
                                                onChange={e => setDocTitular(e.target.value)} />                                           
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="contaPadrao">Conta Padrão</Label>
                                        <InputGroup>
                                            <Input id="txtContaPadrao" required type="text" 
                                                value={contapadrao}
                                                onChange={e => setContaPadrao(e.target.value)} />                                           
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>    
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={ativo}
                                            onChange={e => setAtivo(e.target.value)}
                                        />
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