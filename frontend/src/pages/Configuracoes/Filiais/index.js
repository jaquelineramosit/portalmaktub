import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import { telMask, cepMask, numMask, cnpjMask } from '../../../mask'
import api from '../../../../src/services/api';

export default function Filiais(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var filiaisIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [bandeiraid, setBandeiraid] = useState('');
    const [clienteid, setClienteid] = useState('');
    const [ced, setCed] = useState('');
    const [nomefilial, setNomefilial] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [nomeresponsavel, setNomeresponsavel] = useState('');
    const [telefoneresponsavel, setTelefoneresponsavel] = useState('');
    const [horarioiniciosemana, setHorarioiniciosemana] = useState('');
    const [horariofimsemana, setHorariofimsemana] = useState('');
    const [horarioiniciosabado, setHorarioiniciosabado] = useState('');
    const [horariofimsabado, setHorariofimsabado] = useState('');
    const [horarioiniciodomingo, setHorarioiniciodomingo] = useState('');
    const [horariofimdomingo, setHorariofimdomingo] = useState('');
    const [telefonefixo, setTelefonefixo] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [bandeirasid, setBandeirasid] = useState([]);
    const [clientesid, setClientesid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        api.get('clientes').then(response => {
            setClientesid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('bandeira').then(response => {
            setBandeirasid(response.data);
        })
    }, [usuarioId]);



    useEffect(() => {
        if (action === 'edit' && filiaisIdParam !== '') {
            api.get(`filiais/${filiaisIdParam}`).then(response => {
                setBandeiraid(response.data.bandeiraid);
                setClienteid(response.data.clienteid);
                setCed(response.data.ced);
                setNomefilial(response.data.nomefilial);
                setRazaosocial(response.data.razaosocial);
                setLogradouro(response.data.logradouro);
                setComplemento(response.data.complemento);
                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setNomeresponsavel(response.data.nomeresponsavel);
                setTelefoneresponsavel(response.data.telefoneresponsavel);
                setHorarioiniciosemana(response.data.horarioiniciosemana);
                setHorariofimsemana(response.data.horariofimsemana);
                setHorarioiniciosabado(response.data.horarioiniciosabado);
                setHorariofimsabado(response.data.horariofimsabado);
                setHorarioiniciodomingo(response.data.horarioiniciodomingo);
                setHorariofimdomingo(response.data.horariofimdomingo);
                setTelefonefixo(response.data.telefonefixo);
                setCep(response.data.cep);
                setNumero(response.data.numero);
                setCnpj(response.data.cnpj)
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [filiaisIdParam]);

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
            bandeiraid,
            clienteid,
            ced,
            nomefilial,
            cnpj,
            razaosocial,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            telefonefixo,
            nomeresponsavel,
            telefoneresponsavel,
            horarioiniciosemana,
            horariofimsemana,
            horarioiniciosabado,
            horariofimsabado,
            horarioiniciodomingo,
            horariofimdomingo,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/filiais/${filiaisIdParam}`, data, {
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
                    const response = await api.post('filiais', data, {
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
            {redirect && <Redirect to="/lista-filiais" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-building"></i>
                                <strong>Filial</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input required type="select" name="select" id="cboClienteid" multiple={false}
                                            name="clienteid"
                                            value={clienteid}
                                            onChange={e => setClienteid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {clientesid.map(cliente => (
                                                <option value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite a razão social"
                                            name="razaosocial"
                                            value={razaosocial}
                                            onChange={e => setRazaosocial(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeFilial">Nome Filial</Label>
                                        <Input type="text" required id="txtNomeFilial" placeholder="Digite o nome da filial"
                                            name="nomefilial"
                                            value={nomefilial}
                                            onChange={e => setNomefilial(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o nome do responsável"
                                            name="nomeresponsavel"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeresponsavel(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
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
                                    <Col md="3">
                                        <Label htmlFor="bandeiraId">Bandeira</Label>
                                        <Input required type="select" name="select" id="cboBandeiraId" multiple={false}
                                            name="bandeiraid"
                                            value={bandeiraid}
                                            onChange={e => setBandeiraid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {bandeirasid.map(bandeira => (
                                                <option value={bandeira.id}>{bandeira.nomebandeira}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="ced">CED</Label>
                                        <Input type="text" required id="txtCed"
                                            name="ced"
                                            value={ced}
                                            onChange={e => setCed(e.target.value)} />
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
                                    <Col md="2">
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
                                        <InputGroup>
                                            <Input type="text" required id="txtLogradouro"
                                                placeholder="Digite o Endereço"
                                                name="logradouro"
                                                value={logradouro}
                                                onChange={e => setLogradouro(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite o Números"
                                            value={numero}
                                            name="numero"
                                            onChange={e => setNumero(numMask(e.target.value))} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado" multiple={false}
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
                                            <option value="São Paulo">São Paulo</option>
                                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                                            <option value=">Minas Gerais">Minas Gerais</option>
                                            <option value="Paraná">Paraná</option>
                                            <option value="Santa Catarina">Santa Catarina</option>
                                        </Input>
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
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
                                        <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneResponsavel" placeholder="(11) 9999-9999"
                                                value={telefoneresponsavel}
                                                name="telefoneresponsavel"
                                                onChange={e => setTelefoneresponsavel(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled icon-phone"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        <CardHeader>
                            <i className="fa fa-clock-o"></i>
                            <strong>Horários</strong>
                        </CardHeader>
                        <Card>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioSemana">Horario Início da semana</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioInicioSemana"
                                                name="horarioiniciosemana"
                                                value={horarioiniciosemana}
                                                onChange={e => setHorarioiniciosemana(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-clock-o"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioDomingo">Horario Início do Domingo</Label>
                                        <InputGroup>
                                            <Input type="time" required id="horarioInicioDomingo"
                                                name="horarioiniciodomingo"
                                                value={horarioiniciodomingo}
                                                onChange={e => setHorarioiniciodomingo(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-clock-o"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioSabado">Horario Início do Sábado</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioInicioSabado"
                                                name="horarioiniciosabado"
                                                value={horarioiniciosabado}
                                                onChange={e => setHorarioiniciosabado(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-clock-o"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimSemana">Horario Fim da semana</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimSemana"
                                                name="horariofimsemana"
                                                value={horariofimsemana}
                                                onChange={e => setHorariofimsemana(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-clock-o"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimDomingo">Horario Fim do Domingo</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimDomgingo"
                                                name="horariofimdomingo"
                                                value={horariofimdomingo}
                                                onChange={e => setHorariofimdomingo(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-clock-o"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimSabado">Horario Fim do Sábado</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimSabado"
                                                name="horariofimsabado"
                                                value={horariofimsabado}
                                                onChange={e => setHorariofimsabado(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-clock-o"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>
                                    <Col md="3">
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
