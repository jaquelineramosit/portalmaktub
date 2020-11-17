import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import { telMask, cepMask, numMask, cnpjMask } from '../../../mask'
import { valorNulo } from '../../../utils/functions'
import api from '../../../services/api';
import { messagePorStatus, message } from '../../../utils/messages';
import axios from 'axios';

let clienteIdInicial;
let grupoEmpresarialIdInicial;
let bandeiraIdInicial;

export default function Filiais(props) {
    //Estado que controla o redirecionamento da página
    const [redirect, setRedirect] = useState(false);
    //Fim

    //Parametros vindos do formulário
    //#region 
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var clienteFinalIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');
    //#endregion

    //Estados que controlam as propriedades do formulário
    //#region 
    const [bandeiraid, setBandeiraid] = useState('');
    const [clienteid, setClienteid] = useState('');
    const [grupoempresarialid, setGrupoEmpresarialid] = useState('');
    const [ced, setCed] = useState('');
    const [nomeclientefinal, setNomefilial] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cities, setCities] = useState([]);
    const [estado, setEstado] = useState('0');
    const [estados, setEstados] = useState([]);
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
    const [ativo, setAtivo] = useState(1);
    //#endregion

    //Estados que controlam as propriedades dos combos do formulário
    //#region 
    const [bandeiras, setBandeiras] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [gruposempresariais, setGruposEmpresariais] = useState([]);
    //#endregion

    //UseEffect responsável por popular os combos do formulário
    //#region 
    useEffect(() => {
        api.get('clientes').then(response => {
            setClientes(response.data);
        })
    }, [usuarioId]);
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
        if (action === 'edit' && clienteFinalIdParam !== '') {
            api.get(`cliente-final/${clienteFinalIdParam}`).then(response => {

                //No edit é necessário alterar as propriedades dos estados dos combos
                //#region 
                setBandeiraid(response.data.bandeiraid);
                bandeiraIdInicial = response.data.bandeiraid;
                setClienteid(response.data.clienteid);
                clienteIdInicial = response.data.clienteid;
                setGrupoEmpresarialid(response.data.grupoempresarialid);
                grupoEmpresarialIdInicial = response.data.grupoempresarialid;
                //#endregion

                //Este trecho atualiza as os estados das propriedades dos campos do formulário.
                //#region 
                setCed(response.data.ced);
                setNomefilial(response.data.nomeclientefinal);
                setRazaosocial(response.data.razaosocial);
                setLogradouro(response.data.logradouro);
                setComplemento(valorNulo(response.data.complemento));
                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setNomeresponsavel(valorNulo(response.data.nomeresponsavel));
                setTelefoneresponsavel(valorNulo(response.data.telefoneresponsavel));
                setHorarioiniciosemana(response.data.horarioiniciosemana);
                setHorariofimsemana(response.data.horariofimsemana);
                setHorarioiniciosabado(response.data.horarioiniciosabado);
                setHorariofimsabado(response.data.horariofimsabado);
                setHorarioiniciodomingo(response.data.horarioiniciodomingo);
                setHorariofimdomingo(response.data.horariofimdomingo);
                setTelefonefixo(valorNulo(response.data.telefonefixo));
                setCep(response.data.cep);
                setNumero(response.data.numero);
                setCnpj(response.data.cnpj)
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
                //#endregion

                //#region 
                //Carrega os combos do formulário a partir dos carregados no edit
                api.get(`grupo-empresarial?clienteId=${clienteIdInicial}`).then(response => {
                    setGruposEmpresariais(response.data);
                });

                api.get(`bandeira?grupoempresarialId=${grupoEmpresarialIdInicial}`).then(response => {
                    setBandeiras(response.data);
                });
                //#endregion
            });
        } else {
            return;
        }
    }, [clienteFinalIdParam]);
    //#endregion

    //Função responsável por atalizar o estado ao ser selecionado
    function handleSelectUf(event) {
        const uf = event.target.value;
        setEstado(uf);
    }
    //FIM
    function onBlurCep (event){
        const {value} = event.target;
        if(value.length !== 9){
          return;
        }
        fetch(`http://viacep.com.br/ws/${value}/json/`)
        .then((res) => res.json())
        .then((data)=>{
        setBairro(data.bairro)
        setLogradouro( data.logradouro)
        setEstado(data.uf)
        setCidade(data.localidade)
        });

    }

    //Função responsável por atualizar os dados do formulário após o algum campo ter o seu valor alterado onChange() ser selecionado
    //#region 
    function handleInputChange(event) {
        event.preventDefault();

        const { name, value } = event.target;
        switch (name) {
            case 'ativo':
                if (ativo === 1) {
                    setAtivo(0);
                } else {
                    setAtivo(1);
                };
                break;
            case 'clienteid':
                if (value !== '') {
                    setClienteid(value);
                    setGrupoEmpresarialid('')
                    setGruposEmpresariais([])
                    api.get(`grupo-empresarial?clienteId=${value}`).then(response => {
                        setGruposEmpresariais(response.data);
                    });
                } else {
                    setClienteid('')
                    setGrupoEmpresarialid('')
                    setGruposEmpresariais([])
                }
                break;
            case 'grupoempresarialid':
                if (value !== '') {
                    setGrupoEmpresarialid(value);
                    setBandeiraid('')
                    api.get(`bandeira?grupoempresarialId=${value}`).then(response => {
                        grupoEmpresarialIdInicial = value;
                        setBandeiras(response.data);
                    });
                } else {
                    setGrupoEmpresarialid('')
                }
                break;
            case 'bandeiraid':
                if (value !== '') {
                    setBandeiraid(value)
                } else {
                    setBandeiraid('')
                }
                break;
        }
    };
    //#endregion

    //Função responsável por atualizar o estado da propriedade de redirecionamento da página
    function handleReset() {
        setRedirect(true);
    };
    //FIM

    //Função responsável por atualizar os dados do formulário
    //#region
    async function handleStatus(e) {
        e.preventDefault();

        const data = {
            bandeiraid,
            ced,
            nomeclientefinal,
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
                const response = await api.put(`/cliente-final/${clienteFinalIdParam}`, data, {
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
                    const response = await api.post('cliente-final', data, {
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
            {redirect && <Redirect to="/lista-cliente-final" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-building"></i>
                                <strong>Cliente Final</strong>
                                {action === 'novo' ? <small> nova</small> : <small> editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeclientefinal">Nome Cliente Final</Label>
                                        <Input type="text" required id="txtNomeClienteFinal" placeholder="Digite o nome do Cliente Final"
                                            name="nomeclientefinal"
                                            value={nomeclientefinal}
                                            onChange={e => setNomefilial(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite a razão social"
                                            name="razaosocial"
                                            value={razaosocial}
                                            onChange={e => setRazaosocial(e.target.value)} />
                                    </Col>
                                    <Col md="4">
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
                                    <Col md="4">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input required type="select" name="select" id="cboClienteid" multiple={false}
                                            name="clienteid"
                                            value={clienteid}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" defaultValue>Selecione...</option>
                                            {clientes.map(cliente => (
                                                <option key={`cliente${cliente.id}`} value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="grupoempresarialid">Grupo Empresarial</Label>
                                        <Input required type="select" name="select" id="cboGrupoEmpresarialId" multiple={false}
                                            name="grupoempresarialid"
                                            value={grupoempresarialid}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" defaultValue>Selecione...</option>
                                            {gruposempresariais.map(grupoempresarial => (
                                                <option key={`grupoempresarial${grupoempresarial.id}`} value={grupoempresarial.id}>{grupoempresarial.nomegrupoempresarial}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="bandeiraId">Bandeira</Label>
                                        <Input required type="select" name="select" id="cboBandeiraId" multiple={false}
                                            name="bandeiraid"
                                            value={bandeiraid}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" defaultValue>Selecione...</option>
                                            {bandeiras.map(bandeira => (
                                                <option key={`bandeira${bandeira.id}`} value={bandeira.id}>{bandeira.nomebandeira}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="ced">CED</Label>
                                        <Input type="text" required id="txtCed" placeholder="Insira o CED"
                                            name="ced"
                                            value={ced}
                                            onChange={e => setCed(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
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
                                    <Col md="4">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o nome do responsável"
                                            name="nomeresponsavel"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeresponsavel(e.target.value)} />
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
                                        <InputGroup>
                                            <Input type="text" required readOnly id="txtLogradouro"
                                                name="endereco"
                                                value={logradouro}
                                                onChange={e => setLogradouro(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite o Número"
                                            value={numero}
                                            name="numero"
                                            onChange={e => setNumero(numMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" readOnly 
                                            name="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)} />
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
                                        <Input type="select" required name="select" readOnly id="cboEstado"
                                            name="estado"
                                            value={estado}
                                            onChange={handleSelectUf} >
                                            <option value="0"></option>
                                            {estados.map(uf => (
                                                <option key={`uf${uf}`} value={uf}>{uf}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="select" required id="txtCidade"  readOnly placeholder="Digite a Cidade"
                                            name="cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)}>
                                            <option value="0"></option>
                                            {cities.map(city => (
                                                <option key={`city${city}`} value={city}>{city}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardHeader>
                                <i className="fa fa-clock-o"></i>
                                <strong>Horários</strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="horarioInicioSemana">Horario Início da semana</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioInicioSemana"
                                                name="horarioiniciosemana"
                                                value={horarioiniciosemana}
                                                onChange={e => setHorarioiniciosemana(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="horarioInicioDomingo">Horario Início do Domingo</Label>
                                        <InputGroup>
                                            <Input type="time" required id="horarioInicioDomingo"
                                                name="horarioiniciodomingo"
                                                value={horarioiniciodomingo}
                                                onChange={e => setHorarioiniciodomingo(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="horarioInicioSabado">Horario Início do Sábado</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioInicioSabado"
                                                name="horarioiniciosabado"
                                                value={horarioiniciosabado}
                                                onChange={e => setHorarioiniciosabado(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="horarioFimSemana">Horario Fim da semana</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimSemana"
                                                name="horariofimsemana"
                                                value={horariofimsemana}
                                                onChange={e => setHorariofimsemana(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="horarioFimDomingo">Horario Fim do Domingo</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimDomgingo"
                                                name="horariofimdomingo"
                                                value={horariofimdomingo}
                                                onChange={e => setHorariofimdomingo(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="horarioFimSabado">Horario Fim do Sábado</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimSabado"
                                                name="horariofimsabado"
                                                value={horariofimsabado}
                                                onChange={e => setHorariofimsabado(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-clock-o"></span>
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
