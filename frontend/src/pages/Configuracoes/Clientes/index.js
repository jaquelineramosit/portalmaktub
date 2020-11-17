import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import './styles.css';
import { AppSwitch } from '@coreui/react'
import { Redirect } from "react-router-dom";
import { telMask, cepMask, numMask, cnpjMask, celMask, cpfMask } from '../../../mask'
import axios from 'axios';
import { messagePorStatus, message } from '../../../utils/messages';
import api from '../../../../src/services/api';

export default function Cliente(props) {

    //Estado que controla o redirecionamento da página
    const [redirect, setRedirect] = useState(false);

    //Fim
    //Parametros vindos do formulário
    //#region 
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var clienteIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');
    //#endregion

    //Estados que controlam as propriedades do formulário
    //#region 
    const [nomecliente, setNomecliente] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('0');
    const [estados, setEstados] = useState([]);
    const [nomeresponsavel, setNomeresponsavel] = useState('');
    const [telefoneresponsavel, setTelefoneresponsavel] = useState('');
    const [telefonefixo, setTelefonefixo] = useState('');
    const [telefonecelular, setTelefonecelular] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [parceiroid, setParceiroid] = useState('');
    const [parceirosid, setParceirosid] = useState([]);
    const [cities, setCities] = useState([]);
    const [ativo, setAtivo] = useState(1);
    //#endregion        

    //UseEffect responsável por atualizar os dados do estado usando um api do ibge
    //#region 
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
    //#endregion

    //UseEffect responsável por popular os dados do formulário no action EDITAR
    //#region
    useEffect(() => {
        if (action === 'edit' && clienteIdParam !== '') {
            api.get(`clientes/${clienteIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setNomecliente(response.data.nomecliente);
                setRazaosocial(response.data.razaosocial);
                setLogradouro(response.data.logradouro);
                setComplemento(response.data.complemento);
                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setNomeresponsavel(response.data.nomeresponsavel);
                setTelefoneresponsavel(response.data.telefoneresponsavel);
                setTelefonefixo(response.data.telefonefixo);
                setTelefonecelular(response.data.telefonecelular);
                setCep(response.data.cep);
                setNumero(response.data.numero);
                setCnpj(response.data.cnpj);
                setParceiroid(response.data.parceiroid);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [clienteIdParam]);
    //#endregion

    //Função responsável por atalizar o estado ao ser selecionado
    function handleSelectUf(event) {
        const uf = event.target.value;
        setEstado(uf);
    }
    //FIM

    function onBlurCep(event) {
        const { value } = event.target;
        if (value.length !== 9) {
            return;
        }
        fetch(`http://viacep.com.br/ws/${value}/json/`)
            .then((res) => res.json())
            .then((data) => {
                setBairro(data.bairro)
                setLogradouro(data.logradouro)
                setEstado(data.uf)
                setCidade(data.localidade)
            });

    }


    //Função do Botão ativar e desativar
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


    //Função responsável por atualizar o estado da propriedade de redirecionamento da página
    function handleReset() {
        setRedirect(true);
    };
    //FIM

    //Função responsável por atualizar os dados do cliente
    //#region 
    async function handleStatus(e) {
        e.preventDefault();

        const data = {
            nomecliente,
            razaosocial,
            logradouro,
            complemento,
            bairro,
            cidade,
            estado,
            nomeresponsavel,
            telefoneresponsavel,
            telefonefixo,
            telefonecelular,
            cep,
            cnpj,
            numero,
            ativo
        };


        if (action === 'edit') {
            try {
                const response = await api.put(`/clientes/${clienteIdParam}`, data, {
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
                    const response = await api.post('clientes', data, {
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
    //#endregion

    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-cliente" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card >
                            <CardHeader>
                                <i className="fa fa-handshake-o"></i>
                                <strong>Cliente</strong>
                                <small id="txtSmall" > novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeCliente">Nome Cliente</Label>
                                        <Input type="text" required id="txtNomeCliente" placeholder="Digite o nome do Cliente"
                                            name="nomecliente"
                                            value={nomecliente}
                                            onChange={e => setNomecliente(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="razaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite o nome do Cliente"
                                            name="razaosocial"
                                            value={razaosocial}
                                            onChange={e => setRazaosocial(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o Nome do responsável"
                                            name="nomeresponsavel"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeresponsavel(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                value={cnpj}
                                                name="cnpj"
                                                onChange={e => setCnpj(cnpjMask(e.target.value))} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="telefonefixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                name="telefonefixo"
                                                onChange={e => setTelefonefixo(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-phone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneCelular" placeholder="(11) 9999-9999" cnpjMask="true"
                                                value={telefonecelular}
                                                name="telefonecelular"
                                                onChange={e => setTelefonecelular(celMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-phone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneResponsavel" placeholder="(11) 9999-9999"
                                                value={telefoneresponsavel}
                                                name="telefoneresponsavel"
                                                onChange={e => setTelefoneresponsavel(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-phone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} size={'sm'}
                                            onChange={handleInputChange}
                                            checked={ativo === 1 ? true : false}
                                            name="ativo"
                                        />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardHeader>
                                <i className="fa fa-map-marker"></i>
                                <strong>Endereço</strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                onBlur={onBlurCep}
                                                onChange={e => setCep(cepMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-truck"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>

                                    <Col md="6">
                                        <Label htmlFor="logradouro">Endereço</Label>
                                        <Input type="text" required readOnly id="txtLogradouro"
                                            name="logradouro"
                                            value={logradouro}

                                            onChange={e => setLogradouro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite Apenas Números"
                                            value={numero}
                                            name="numero"
                                            onChange={e => setNumero(numMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" readOnly placeholder="Digite o Bairro"

                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="estado"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required readOnly name="select" id="cboEstado"
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
                                        <Input type="select" required id="txtCidade" readOnly placeholder="Digite a Cidade"
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

