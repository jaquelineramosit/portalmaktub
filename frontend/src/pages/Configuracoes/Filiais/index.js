import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Filiais() {
    const [bandeiraid, setBandeiraid] = useState('');
    const [clienteid, setClienteid] = useState('');
    const [ced, setCed] = useState('');
    const [nomefilial, setNomefilial] = useState('');
    const [nomeresponsavel, setNomeresponsavel] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefonefixo, setTelefonefixo] = useState('');
    const [telefoneresponsavel, setTelefoneresponsavel] = useState('');
    const [horarioiniciosemana, setHorarioiniciosemana] = useState('');
    const [horariofimsemana, setHorariofimsemana] = useState('');
    const [horarioiniciosabado, setHorarioiniciosabado] = useState('');
    const [horariofimsabado, setHorariofimsabado] = useState('');
    const [horarioiniciodomingo, setHorarioiniciodomingo] = useState('');
    const [horariofimdomingo, setHorariofimdomingo] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



    async function handleFiliais(e) {
        e.preventDefault();

        const data = {
            bandeiraid,
            clienteid,
            ced,
            nomefilial,
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
            telefoneresponsavel,
            nomeresponsavel,
            horarioiniciosemana,
            horariofimsemana,
            horarioiniciosabado,
            horariofimsabado,
            horarioiniciodomingo,
            horariofimdomingo,
            ativo
        };

        try {
            const response = await api.post('filiais', data, {
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
            <Form onSubmit={handleFiliais}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Filiais</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Nomecliente">Nome Filial</Label>
                                        <Input type="text" required id="txtNomefilial" placeholder="Digite o nome da Filial"
                                            value={nomefilial}
                                            onChange={e => setNomefilial(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Bairro">Nome Responsável</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Nome do responsável"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeresponsavel(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Razaosocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaosocial" placeholder="Digite o nome do Cliente"
                                            value={razaosocial}
                                            onChange={e => setRazaosocial(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="CEP">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCEP" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                onChange={e => setCep(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtLogradouro"
                                                placeholder="Digite o Logradouro"
                                                value={logradouro}
                                                onChange={e => setLogradouro(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Cidade">Cidade</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite a Cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)} />
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="Numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={numero}
                                            onChange={e => setNumero(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                value={cnpj}
                                                onChange={e => setCnpj(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="UF">UF</Label>
                                        <Input type="select" required name="select" id="ddlUF"
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
                                        <Label htmlFor="Tipopessoa">Cliente</Label>
                                        <Input required type="select" name="select" id="txtClienteid"
                                            value={clienteid}
                                            onChange={e => setClienteid(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Cliente1</option>
                                            <option value={2}>Cliente2</option>

                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Telefone">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                onChange={e => setTelefonefixo(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Telefone">Telefone Responsável</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneresponsavel" placeholder="(11) 9999-9999"
                                                value={telefoneresponsavel}
                                                onChange={e => setTelefoneresponsavel(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="Tipopessoa">Bandeira</Label>
                                        <Input required type="select" name="select" id="txtBandeira"
                                            value={bandeiraid}
                                            onChange={e => setBandeiraid(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Bandeira1</option>
                                            <option value={2}>Bandeira2</option>

                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Ced</Label>
                                        <Input type="text" required id="txtCed"
                                            value={ced}
                                            onChange={e => setCed(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={ativo}
                                            onChange={e => setAtivo(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Horario Início da semana</Label>
                                        <Input type="time" required id="txtHorarioiniciosemana"
                                            value={horarioiniciosemana}
                                            onChange={e => setHorarioiniciosemana(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Horario Fim da semana</Label>
                                        <Input type="time" required id="txtHorariofimsemana"
                                            value={horariofimsemana}
                                            onChange={e => setHorariofimsemana(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Horario Início do Sábado</Label>
                                        <Input type="time" required id="txtHorarioiniciosabado"
                                            value={horarioiniciosabado}
                                            onChange={e => setHorarioiniciosabado(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Horario Fim do Sábado</Label>
                                        <Input type="time" required id="txtHorariofimsabado"
                                            value={horariofimsabado}
                                            onChange={e => setHorariofimsabado(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Horario Início do Domingo</Label>
                                        <Input type="time" required id="horarioiniciodomingo"
                                            value={horarioiniciodomingo}
                                            onChange={e => setHorarioiniciodomingo(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Horario Fim do Domingo</Label>
                                        <Input type="time" required id="txtHorariofimdomgingo"
                                            value={horariofimdomingo}
                                            onChange={e => setHorariofimdomingo(e.target.value)} />
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