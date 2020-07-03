import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { cpfMask, rgMask, telMask, celMask, cepMask, numMask } from '../../../mask'
import api from '../../../../src/services/api';
const dateFormat = require('dateformat');

const Usuario = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var usuarioIdParam = props.match.params.id;

    const [telefone, setTelefone] = useState();
    const [celular, setCelular] = useState();
    const [cep, setCep] = useState();
    const [numero, setNum] = useState();
    const [rg, setRg] = useState();
    const [cpf, setCpf] = useState();
    const [perfilAcessos, setPerfilAcessos] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        dataNasc: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        telefone: '',
        celular: '',
        cpf: '',
        rg: '',
        genero: '',
        email:'',
        login: '',
        senhaForm: '',
        ativo: 1
    });

  useEffect(() => {
        api.get('perfis-acesso').then(response => {            
            setPerfilAcessos(response.data);
        })
    }, [usuarioId]); 

    useEffect(() => {
        if (action === 'edit' && usuarioIdParam !== '') {
            api.get(`usuarios/${usuarioIdParam}`).then(response => {
                document.getElementById('txtNome').value = response.data.nome;
                document.getElementById('txtSobrenome').value = response.data.sobrenome;
                document.getElementById('txtDataNasc').value =  dateFormat(response.data.dataNasc, "yyyy-mm-dd");
                document.getElementById('cboGenero').value = response.data.genero;
                document.getElementById('txtCep').value = response.data.cep;
                document.getElementById('txtLogradouro').value = response.data.logradouro;
                document.getElementById('txtNumero').value = response.data.numero;
                document.getElementById('txtComplemento').value = response.data.complemento;
                document.getElementById('txtBairro').value = response.data.bairro;
                document.getElementById('txtCidade').value = response.data.cidade;
                document.getElementById('cboEstado').value = response.data.estado;
                document.getElementById('txtRG').value = response.data.rg;
                document.getElementById('txtCpf').value = response.data.cpf;
                document.getElementById('txtTelefoneFixo').value = response.data.telefone;
                document.getElementById('txtCelular').value = response.data.celular;
                document.getElementById('txtEmail').value = response.data.email;
                document.getElementById('txtNomeUsuario').value = response.data.login;
                document.getElementById('txtSenhaForm').value = response.data.senhaForm;

                setFormData({
                    ...formData,
                    nome: response.data.nome,
                    sobrenome: response.data.sobrenome,
                    dataNasc: response.data.dataNasc,
                    logradouro: response.data.logradouro,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    bairro: response.data.bairro,
                    cep: response.data.cep,
                    cidade: response.data.cidade,
                    estado: response.data.estado,
                    telefone: response.data.telefone,
                    celular: response.data.celular,
                    cpf: response.data.cpf,
                    rg: response.data.rg,
                    genero: response.data.genero,
                    email: response.data.email,
                    login: response.data.login,
                    senhaForm: response.data.senhaForm,

                })
            });
        } else {
            return;
        }
    }, [usuarioIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'cpf':
                setCpf(cpfMask(event.target.value));
                break
            case 'rg':
                setRg(rgMask(event.target.value));
                break;
            case 'cep':
                setCep(cepMask(event.target.value));
                break;
            case 'numero':
                setNum(numMask(event.target.value));
                break;
            case 'telefone':
                setTelefone(telMask(event.target.value));
                break;
            case 'celular':
                setCelular(celMask(event.target.value));
                break;
        };

        setFormData({ ...formData, [name]: value });
    };
console.log(formData)
    async function handleUsuario(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/usuarios/${usuarioIdParam}`, data, {
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
                    const response = await api.post('usuarios', data, {
                        headers: {
                            Authorization: 1,
                        }
                    });
                     alert(`Seu login de acesso: ${response.data.login}`);      
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }
    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleUsuario}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Usuário</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Nome">Nome</Label>
                                        <Input type="text" required id="txtNome" placeholder="Digite o primeiro Nome"
                                            name="nome"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Sobrenome">Sobrenome</Label>
                                        <Input type="text" required id="txtSobrenome" placeholder="Digite o Sobrenome"
                                            name="sobrenome"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="DataNasc">Data de Nasc.</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataNasc" className="date"
                                                placeholder="Digite a Data de Nascimento"
                                                name="dataNasc"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-calendar"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>

                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Genero">Genero</Label>
                                        <Input required type="select" name="select" id="cboGenero"
                                            name="genero"
                                            onChange={handleInputChange}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value="F">Feminino</option>
                                            <option value="M">Masculino</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="Cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                name="cep"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <Input type="text" required id="txtLogradouro" placeholder="Digite o Logradouro"
                                            name="logradouro"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={numero}
                                            name="numero"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite o Cidade"
                                            name="cidade"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Estado">Estado</Label>
                                        <Input type="select" required name="select" id="cboEstado"
                                            name="estado"
                                            onChange={handleInputChange}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PR">Paraná</option>
                                            <option value="AC">Acre</option>
                                            <option value="Al">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BH">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="GO">Goiás</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MG">Mato Grosso</option>
                                            <option value="MT">Mato Grosso do Sul</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piau</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RR">Rondônia</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="RG">Documento RG</Label>
                                        <Input type="text" id="txtRG" placeholder="Digite o número do RG"
                                            value={rg}
                                            name="rg"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Cpf">CPF</Label>
                                        <Input type="text" required id="txtCpf" placeholder="Digite o número do CPF"
                                            value={cpf}
                                            name="cpf"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="TelefoneFixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefone}
                                                name="telefone"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>

                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Celular">Celular</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCelular" placeholder="(11) 99999-9999"
                                                value={celular}
                                                name="celular"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-screen-smartphone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
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
                                <strong>Dados de Acesso</strong>
                            </CardHeader>
                            <CardBody className="">
                                <FormGroup row>
                                    <Col md="8">
                                        <Label htmlFor="E-mail">E-mail</Label>
                                        <InputGroup>
                                            <Input type="email" required id="txtEmail" placeholder="Digite o e-mail"
                                                name="email"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-envelope"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>

                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="PerfilAcesso">Perfil de Acesso</Label>
                                        <Input type="select" required name="select" id="cboPerfilAcesso"
                                            name=""
                                            onChange={handleInputChange}>
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
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-user"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="SenhaForm">Senha</Label>
                                        <InputGroup>
                                            <Input type="password" required id="txtSenhaForm" placeholder="Digite a senha com letras e números"
                                                name="senhaForm"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-lock"></Button>
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
export default Usuario;