import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import { telMask, cepMask, numMask, cnpjMask, celMask, cpfMask } from '../../../mask'
import api from '../../../../src/services/api';

export default function Cliente(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var clienteIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomecliente, setNomecliente] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [nomeresponsavel, setNomeresponsavel] = useState('');
    const [telefoneresponsavel, setTelefoneresponsavel] = useState('');
    const [telefonefixo, setTelefonefixo] = useState('');
    const [telefonecelular, setTelefonecelular] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [parceiroid, setParceiroid] = useState('');
    const [parceirosid, setParceirosid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('parceiro').then(response => {
            setParceirosid(response.data);
        })
    }, [usuarioId]);



    useEffect(() => {
        if (action === 'edit' && clienteIdParam !== '') {
            api.get(`clientes/${clienteIdParam}`).then(response => {
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
            numero,
            parceiroid,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/clientes/${clienteIdParam}`, data, {
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
                    const response = await api.post('clientes', data, {
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
            {redirect && <Redirect to="/lista-cliente" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Cliente</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="nomeCliente">Nome Cliente</Label>
                                        <Input type="text" required id="txtNomeCliente" placeholder="Digite o nome do Cliente"
                                            name="nomecliente"
                                            value={nomecliente}
                                            onChange={e => setNomecliente(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o Nome do responsável"
                                            name="nomeresponsavel"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeresponsavel(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="parceiroId">Parceiro</Label>
                                        <Input required type="select" name="select" id="cboParceiroId"
                                            name="parceiroid"
                                            value={parceiroid}
                                            onChange={e => setParceiroid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {parceirosid.map(parceiro => (
                                                <option value={parceiro.id}>{parceiro.nomeparceiro}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="razaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite o nome do Cliente"
                                            name="razaosocial"
                                            value={razaosocial}
                                            onChange={e => setRazaosocial(e.target.value)} />
                                    </Col>
                                    <Col md="3">
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
                                    <Col md="3">
                                        <Label htmlFor="logradouro">Logradouro</Label>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o Logradouro"
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={e => setLogradouro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cep">CEP</Label>
                                        <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                            value={cep}
                                            name="cep"
                                            onChange={e => setCep(cepMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite Apenas Números"
                                            value={numero}
                                            name="numero"
                                            onChange={e => setNumero(numMask(e.target.value))} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado"
                                            name="estado"
                                            value={estado}
                                            onChange={e => setEstado(e.target.value)} >
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
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="estado"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="telefonefixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                name="telefonefixo"
                                                onChange={e => setTelefonefixo(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
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
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneResponsavel" placeholder="(11) 9999-9999"
                                                value={telefoneresponsavel}
                                                name="telefoneresponsavel"
                                                onChange={e => setTelefoneresponsavel(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>    
                                <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />                                    
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

