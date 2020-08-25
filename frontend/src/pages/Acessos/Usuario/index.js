import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import { cpfMask, rgMask, telMask, celMask, cepMask, numMask } from '../../../mask'
import api from '../../../../src/services/api';
import axios from 'axios';
const dateFormat = require('dateformat');

export default function Usuario(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var usuariosIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');


    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNasc, setDatanasc] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cities, setCities] = useState([]);
    const [estado, setEstado] = useState('0');
    const [estados, setEstados] = useState([]);
    const [genero, setGenero] = useState('');
    const [contatoemergencia, setContatoemergencial] = useState('');
    const [telefonecttoemergencia, settelefonecttoemergencia] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senhaForm, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNum] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [perfilacessoid, setPerfilacessoid] = useState('');
    const [perfilAcessos, setPerfilAcessos] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('perfis-acesso').then(response => {
            setPerfilAcessos(response.data);
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
        if (action === 'edit' && usuariosIdParam !== '') {
            api.get(`usuarios/${usuariosIdParam}`).then(response => {
                setNome(response.data.nome);
                setSobrenome(response.data.sobrenome);
                setDatanasc(dateFormat(response.data.datanasc, "yyyy-mm-dd"));
                setLogradouro(response.data.logradouro);
                setComplemento(response.data.complemento);
                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setGenero(response.data.genero);
                setContatoemergencial(response.data.contatoemergencia);
                settelefonecttoemergencia(response.data.telefonecttoemergencia);
                setEmail(response.data.email);
                setLogin(response.data.login);
                setSenha(response.data.senha);
                setTelefone(response.data.telefone);
                setCelular(response.data.celular);
                setCep(response.data.cep);
                setNum(response.data.numero);
                setRg(response.data.rg);
                setCpf(response.data.cpf);
                setPerfilacessoid(response.data.perfilacessoid);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [usuariosIdParam]);

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
            nome,
            sobrenome,
            contatoemergencia,
            telefonecttoemergencia,
            dataNasc,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
            telefone,
            celular,
            cpf,
            rg,
            genero,
            senhaForm,
            email,
            login,
            perfilacessoid,
            ativo

        };
        console.log(data)

        if (action === 'edit') {
            try {
                const response = await api.put(`/usuarios/${usuariosIdParam}`, data, {
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
                    const response = await api.post('usuarios', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert(`Seu login de acesso: ${response.data.login}`);
                    setRedirect(true);
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }


    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-usuarios" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-user-circle-o"></i>
                                <strong>Usuário</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Nome">Nome</Label>
                                        <Input type="text" required id="txtNome" placeholder="Digite o primeiro Nome"
                                            name="nome"
                                            value={nome}
                                            onChange={e => setNome(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Sobrenome">Sobrenome</Label>
                                        <Input type="text" required id="txtSobrenome" placeholder="Digite o Sobrenome"
                                            name="sobrenome"
                                            value={sobrenome}
                                            onChange={e => setSobrenome(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="DataNasc">Data de Nasc.</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataNasc" className="date"
                                                placeholder="Digite a Data de Nascimento"
                                                name="dataNasc"
                                                value={dataNasc}
                                                onChange={e => setDatanasc(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-calendar"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Genero">Genero</Label>
                                        <Input required type="select" name="select" id="cboGenero"
                                            name="genero"
                                            value={genero}
                                            onChange={e => setGenero(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="F">Feminino</option>
                                            <option value="M">Masculino</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="RG">Documento RG</Label>
                                        <Input type="text" id="txtRG" placeholder="Digite o número do RG"
                                            value={rg}
                                            name="rg"
                                            onChange={e => setRg(rgMask(e.target.value))} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Cpf">CPF</Label>
                                        <Input type="text" required id="txtCpf" placeholder="Digite o número do CPF"
                                            value={cpf}
                                            name="cpf"
                                            onChange={e => setCpf(cpfMask(e.target.value))} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="TelefoneFixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefone}
                                                name="telefone"
                                                onChange={e => setTelefone(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-phone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>

                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Celular">Celular</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCelular" placeholder="(11) 99999-9999"
                                                value={celular}
                                                name="celular"
                                                onChange={e => setCelular(celMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-screen-smartphone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Nome">Nome Contato Emergencial</Label>
                                        <Input type="text" required id="txtNome" placeholder="Digite o Nome"
                                            name="contatoemergencia"
                                            value={contatoemergencia}
                                            onChange={e => setContatoemergencial(e.target.value)} />
                                    </Col>

                                    <Col md="4">
                                        <Label htmlFor="TelefoneFixo">Celular Emergencial</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonecttoemergencia}
                                                name="telefonecttoemergencia"
                                                onChange={e => settelefonecttoemergencia(celMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-screen-smartphone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>

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
                                        <Label htmlFor="Cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                name="cep"
                                                onChange={e => setCep(cepMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-truck"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="Logradouro">Endereço</Label>
                                        <Input type="text" required id="txtLogradouro" placeholder="Digite o Endereço"
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={e => setLogradouro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={numero}
                                            name="numero"
                                            onChange={e => setNum(numMask(e.target.value))} />
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
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
                                {/*<FormGroup row>
                                   <Col md="2">
                                            <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                            <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                            />
                                </Col>
                                </FormGroup>*/}
                            </CardBody>
                            <CardHeader className="border-top">
                                <i className="fa fa-envelope"></i>
                                <strong>Dados de Acesso</strong>
                            </CardHeader>
                            <CardBody className="">
                                <FormGroup row>
                                    <Col md="8">
                                        <Label htmlFor="E-mail">E-mail</Label>
                                        <InputGroup>
                                            <Input type="email" required id="txtEmail" placeholder="Digite o e-mail"
                                                name="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-envelope"></span>
                                            </InputGroupAddon>
                                        </InputGroup>

                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="PerfilAcesso">Perfil de Acesso</Label>
                                        <Input type="select" required name="select" id="cboPerfilAcesso"
                                            name="perfilacessoid"
                                            value={perfilacessoid}
                                            onChange={e => setPerfilacessoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {perfilAcessos.map(perfilAcesso => (
                                                <option value={perfilAcesso.id}>{perfilAcesso.nomeperfil}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="NomeUsuario">Nome de Usuário</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeUsuario" placeholder="Digite o nome de usuário"
                                                name="login"
                                                value={login}
                                                onChange={e => setLogin(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-user"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="SenhaForm">Senha</Label>
                                        <InputGroup>
                                            <Input type="password" required id="txtSenhaForm" placeholder="Digite a senha com letras e números"
                                                name="senhaForm"
                                                value={senhaForm}
                                                onChange={e => setSenha(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-lock"></span>
                                            </InputGroupAddon>
                                        </InputGroup>

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
