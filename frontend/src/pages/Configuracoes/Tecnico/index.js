import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import { cpfMask, rgMask, telMask, celMask, cepMask, numMask } from '../../../mask'
import api from '../../../../src/services/api';
import axios from 'axios';

export default function Tecnico(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var statusIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [tipotecnicoid, setTipotecnicoid] = useState('');
    const [nometecnico, setNometecnico] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cities, setCities] = useState([]);
    const [estado, setEstado] = useState('0');
    const [estados, setEstados] = useState([]);
    const [telefonefixo, setTelefonefixo] = useState('');
    const [telefonecelular, setTelefonecelular] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [nomecontatoemergencial, setNomecontatoemergencial] = useState('');
    const [telefonecttoemergencial, setTelefonecttoemergencial] = useState('');
    const [tipoTecnicosid, setTipoTecnicosid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('tipo-tecnico').then(response => {
            setTipoTecnicosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setEstados(ufInitials);
        });

    }, []);

    useEffect(() => {
        if (estado === '0') {
            return;
        }
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });

    }, [estado]);

    useEffect(() => {
        if (action === 'edit' && statusIdParam !== '') {
            api.get(`tecnico/${statusIdParam}`).then(response => {
                setTipotecnicoid(response.data.tipotecnicoid);
                setNometecnico(response.data.nometecnico);
                setLogradouro(response.data.logradouro);
                setComplemento(response.data.complemento);
                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setTelefonefixo(response.data.telefonefixo);
                setTelefonecelular(response.data.telefonecelular);
                setCep(response.data.cep);
                setNumero(response.data.numero);
                setRg(response.data.rg);
                setCpf(response.data.cpf);
                setNomecontatoemergencial(response.data.nomecontatoemergencial);
                setTelefonecttoemergencial(response.data.telefonecttoemergencial);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [statusIdParam]);

    function handleSelectUf(event) {
        const uf = event.target.value;

        setEstado(uf);

    }

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
            nomecontatoemergencial,
            telefonecttoemergencial,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/tecnico/${statusIdParam}`, data, {
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
                    const response = await api.post('tecnico', data, {
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
            {redirect && <Redirect to="/lista-tecnicos" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>

                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-user-circle-o"></i>
                                <strong>Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeTecnico">Nome Técnico</Label>
                                        <Input type="text" required id="txtNomeTecnico" placeholder="Digite o nome do Técnico"
                                            name="nometecnico"
                                            value={nometecnico}
                                            onChange={e => setNometecnico(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="rg">RG</Label>
                                        <Input type="text" required id="txtRg" placeholder="Digite o RG do Técnico"
                                            value={rg}
                                            name="rg"
                                            onChange={e => setRg(rgMask(e.target.value))} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input type="text" required id="txtCpf" placeholder="Digite o CPF do Técnico"
                                            name="cpf"
                                            value={cpf}
                                            onChange={e => setCpf(cpfMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="tipoTecnicoId">Tipo do Técnico</Label>
                                        <Input type="select" required name="select" id="cboTipoTecnicoId"
                                            name="tipotecnicoid"
                                            value={tipotecnicoid}
                                            onChange={e => setTipotecnicoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tipoTecnicosid.map(tipoTecnico => (
                                                <option value={tipoTecnico.id}>{tipoTecnico.nometipotecnico}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                name="telefonefixo"
                                                onChange={e => setTelefonefixo(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled icon-phone"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneCelular" placeholder="(11) 9999-9999"
                                                value={telefonecelular}
                                                name="telefonecelular"
                                                onChange={e => setTelefonecelular(celMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled icon-phone"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Nome">Nome Contato Emergencial</Label>
                                        <Input type="text" required id="txtNome" placeholder="Digite o Nome"
                                            name="nomecontatoemergencial"
                                            value={nomecontatoemergencial}
                                            onChange={e => setNomecontatoemergencial(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="TelefoneFixo">Telefone Emergencial</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonecttoemergencial}
                                                name="telefonecttoemergencial"
                                                onChange={e => setTelefonecttoemergencial(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled icon-phone"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        <CardHeader>
                            <i className="fa fa-map-marker"></i>
                            <strong>Endereço</strong>
                        </CardHeader>
                        <Card>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                name="cep"
                                                onChange={e => setCep(cepMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-truck"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="logradouro">Endereço</Label>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o Endereço"
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={e => setLogradouro(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={numero}
                                            name="numero"
                                            onChange={e => setNumero(numMask(e.target.value))} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado"
                                            name="estado"
                                            value={estado}
                                            onChange={handleSelectUf} >
                                            <option value="0">Selecione</option>
                                            {estados.map(uf => (
                                                <option key={uf} value={uf}>{uf}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="select" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)}>
                                            <option value="0">Selecione</option>
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
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
