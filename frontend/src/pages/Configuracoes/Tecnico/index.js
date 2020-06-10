import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {cpfMask, rgMask, telMask, celMask, cepMask,numMask } from '../../../mask'
import api from '../../../../src/services/api';

export default function Tecnico() {
    const [nometecnico, setNomeTecnico] = useState('');
    const [tipotecnicoid, setTipoTecnicoId] = useState('');
    const [tipoTecnicos, setTipoTecnicos] = useState([]);
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');  
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefonefixo, setTelefoneFixo] = useState('');
    const [telefonecelular, setTelefoneCelular] = useState('');
    const [ativo, setAtivo] = useState(1);
    const usuarioId = localStorage.getItem('userId');

    function handleSwitch(e) {
        if (ativo === 1) {
            setAtivo(0);
        }
        else {
            setAtivo(1);
        }
    }
    useEffect(() => {
        api.get('tipo-tecnico').then(response => {            
            setTipoTecnicos(response.data);
        })
    }, [usuarioId]);

    async function handleTecnico(e) {
        e.preventDefault();

        const data = {
            tipotecnicoid, 
            nometecnico,
            rg,
            cpf,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
            telefonefixo,
            telefonecelular,        
            ativo
        };

        try {
            const response = await api.post('tecnico', data, {
                headers: {
                    Authorization: 1,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleTecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeTecnico">Nome Técnico</Label>
                                        <Input type="number" required id="txtNomeTecnico" placeholder="Digite o nome do Técnico"
                                            value={nometecnico}
                                            onChange={e => setNomeTecnico(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="rg">RG</Label>
                                        <Input type="text" required id="txtRg" placeholder="Digite o RG do Técnico"
                                            value={rg}
                                            onChange={e => setRg(rgMask(e.target.value))}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input type="text" required id="txtCpf" placeholder="Digite o CPF do Técnico"
                                            value={cpf}
                                            onChange={e => setCpf(cpfMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="logradouro">Logradouro</Label>
                                            <Input type="text" required id="txtLogradouro"
                                                placeholder="Digite o Logradouro"
                                                value={logradouro}
                                                onChange={e => setLogradouro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                            <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                                value={bairro}
                                                onChange={e => setBairro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                onChange={e => setCep(cepMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={numero}
                                            onChange={e => setNumero(numMask(e.target.value))} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado" multiple={false}
                                            value={estado}
                                            onChange={e => setEstado(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">São Paulo</option>
                                            <option value="2">Rio de Janeiro</option>
                                            <option value="3">Minas Gerais</option>
                                            <option value="4">Paraná</option>
                                            <option value="5">Santa Catarina</option>
                                        </Input>
                                    </Col>
                                    </FormGroup>                              
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                onChange={e => setTelefoneFixo(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneCelular" placeholder="(11) 9999-9999"
                                                value={telefonecelular}
                                                onChange={e => setTelefoneCelular(celMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tipoTecnicoId">Tipo do Técnico</Label>
                                        <Input type="select" required name="select" id="cboTipoTecnicoId"
                                            value={tipotecnicoid}
                                            onChange={e => setTipoTecnicoId(e.target.value)}>
                                                 <option value={undefined} defaultValue>Selecione...</option>
                                                {tipoTecnicos.map(tipoTecnico => (                                                
                                                <option value={tipoTecnico.id}>{tipoTecnico.nometipotecnico}</option>
                                                ))}                                           
                                        </Input>
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup row>    
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch} />
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