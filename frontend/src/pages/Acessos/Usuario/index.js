import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Usuario() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNasc, setDataNasc] = useState('0000-00-00');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [genero, setGenero] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senhaForm, setSenhaForm] = useState('');
    const [senhaConfirmaForm, setsenhaConfirmaForm] = useState('');
    const [ativo, setAtivo] = useState("true");
    const [perfilAcessoId, setperfilAcessoId] = useState(true);
    const history = useHistory();


    async function handleRegister(e) {
        e.preventDefault();
        
        const data = {
          nome,
          sobrenome,
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
          email,
          login,
          senhaForm,
          ativo
        };
    
        try {
            console.log(data);
            const response = await api.post('/usuarios', data);
            console.log(response);
            alert(`Seu login de acesso: ${response.data.login}`);      
            history.push('/');
            
        } catch (err) {
    
            alert('Erro no cadastro, tente novamente.');    
        }
    }

    return (        
        <div className="animated fadeIn">
            <Form onSubmit={handleRegister}>
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
                                        value={nome}
                                        onChange={ e => setNome(e.target.value)}/>                                        
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Sobrenome">Sobrenome</Label>
                                        <Input type="text" required id="txtSobrenome" placeholder="Digite o Sobrenome"
                                        value={sobrenome}
                                        onChange={ e => setSobrenome(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="DataNasc">Data de Nasc.</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataNasc" className="date" 
                                            placeholder="Digite a Data de Nascimento"
                                            value={dataNasc}
                                            onChange={ e => setDataNasc(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-calendar"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Genero">Genero</Label>
                                        <Input required type="select" name="select" id="ddlGenero"
                                        value={genero}
                                        onChange={ e => setGenero(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value="F">Feminino</option>
                                            <option value="M">Masculino</option>                                        
                                        </Input>
                                    </Col>                               
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="CEP">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCEP" size="16" required type="text" placeholder="00000-000"
                                            value={cep}
                                            onChange={ e => setCep(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>                                    
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <Input type="text" required id="txtLogradouro" placeholder="Digite o Logradouro"
                                        value={logradouro}
                                        onChange={ e => setLogradouro(e.target.value)}
                                         />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                        value={numero}
                                        onChange={ e => setNumero(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento" 
                                        value={complemento}
                                        onChange={ e => setComplemento(e.target.value)}/>
                                    </Col>                               
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                        value={bairro}
                                        onChange={ e => setBairro(e.target.value)} />                                    
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite o Cidade"
                                        value={cidade}
                                        onChange={ e => setCidade(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Estado">Estado</Label>
                                        <Input type="select" required name="select" id="ddlEstado"
                                        value={estado}
                                        onChange={ e => setEstado(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">São Paulo</option>
                                            <option value="2">Rio de Janeiro</option>
                                            <option value="3">Minas Gerais</option>
                                            <option value="4">Paraná</option>
                                            <option value="5">Santa Catarina</option>
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={ e => setAtivo(e.target.value)}
                                        />                                    
                                    </Col>                                                      
                                </FormGroup>                        
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="RG">Documento RG</Label>
                                        <Input type="text" id="txtRG" placeholder="Digite o número do RG"
                                        value={rg}
                                        onChange={ e => setRg(e.target.value)} />
                                    </Col>                               
                                    <Col md="4">
                                        <Label htmlFor="CPF">CPF</Label>
                                        <Input type="text" required id="txtCPF" placeholder="Digite o número do CPF"
                                        value={cpf}
                                        onChange={ e => setCpf(e.target.value)} />                                    
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="TelefoneFixo">Telefone Fixo</Label>                                        
                                        <InputGroup>
                                            <Input type="text"  id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                            value={telefone}
                                            onChange={ e => setTelefone(e.target.value)} />
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
                                            onChange={ e => setCelular(e.target.value)} />  
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-screen-smartphone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                                                        
                                    </Col>                                                                                                                       
                                </FormGroup>
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
                                        value={email}
                                        onChange={ e => setEmail(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-envelope"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="PerfilAcesso">Perfil de Acesso</Label>
                                        <Input type="select" required name="select" id="ddlPerfilAcesso"
                                        value={perfilAcessoId}
                                        onChange={ e => setperfilAcessoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">Administrador</option>
                                            <option value="2">Vendedor</option>
                                            <option value="3">Gerente</option>                                        
                                        </Input>
                                    </Col>                                                                                                                                    
                                </FormGroup>
                                <FormGroup row>                                
                                    <Col md="4">
                                        <Label htmlFor="NomeUsuario">Nome de Usuário</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeUsuario" placeholder="Digite o nome de usuário"
                                            value={login}
                                            onChange={ e => setLogin(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-user"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>                                                                        
                                    </Col>                               
                                    <Col md="4">
                                        <Label htmlFor="SenhaForm">Senha</Label>
                                        <InputGroup>
                                            <Input type="password" required id="txtSenhaForm" placeholder="Digite a senha com letras e números"
                                            value={senhaForm}
                                            onChange={ e => setSenhaForm(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-lock"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="ConfirmarSenha">Confirme a senha</Label>
                                        <InputGroup>
                                            <Input type="password" id="txtConfirmarSenha" placeholder="Confirme a senha"
                                            value={senhaConfirmaForm}
                                            onChange={ e => setsenhaConfirmaForm(e.target.value)} />  
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