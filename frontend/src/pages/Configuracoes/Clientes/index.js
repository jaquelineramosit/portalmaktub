import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Clientes() {
    const [nomecliente, setNomeCliente] = useState('');
    const [nomeresponsavel, setNomeResponsavel] = useState('');
    const [razaosocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefonefixo, setTelefoneFixo] = useState('');
    const [telefonecelular, setTelefoneCelular] = useState('');
    const [telefoneresponsavel, setTelefoneResponsavel] = useState('');
    const [parceiroid, setParceiroId] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



    async function handleClientes(e) {
        e.preventDefault();

        const data = {
            nomecliente,
            razaosocial,
            cnpj,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
            telefonefixo,
            telefonecelular,
            telefoneresponsavel,
            parceiroid,
            nomeresponsavel,
            ativo
        };

        try {
            const response = await api.post('clientes', data, {
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
            <Form onSubmit={handleClientes}>
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
                                            value={nomecliente}
                                            onChange={e => setNomeCliente(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o Nome do responsável"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeResponsavel(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="parceiroId">Parceiro</Label>
                                        <Input required type="select" name="select" id="cboParceiroId"
                                            value={parceiroid}
                                            onChange={e => setParceiroId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Parceiro1</option>
                                            <option value={2}>Parceiro2</option>

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                     <Col md="3">
                                        <Label htmlFor="razaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite o nome do Cliente"
                                            value={razaosocial}
                                            onChange={e => setRazaoSocial(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="number" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                value={cnpj}
                                                onChange={e => setCnpj(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>    
                                    <Col md="3">
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
                                        <Input id="txtCep" size="16" required type="number" placeholder="00000-000"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="number" required id="txtNumero" placeholder="0000"
                                        value={numero}
                                        onChange={e => setNumero(e.target.value)} />       
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="estado">UF</Label>    
                                            <Input type="select" required name="select" id="cboEstado"
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
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="telefonefixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="number" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                onChange={e => setTelefoneFixo(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                                        <InputGroup>
                                            <Input type="number" id="txtTelefoneCelular" placeholder="(11) 9999-9999"
                                                value={telefonecelular}
                                                onChange={e => setTelefoneCelular(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
                                        <InputGroup>
                                            <Input type="number" id="txtTelefoneResponsavel" placeholder="(11) 9999-9999"
                                                value={telefoneresponsavel}
                                                onChange={e => setTelefoneResponsavel(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
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