import React, { useState, useEffect, Component, Fragment } from 'react';
import { Row, Collapse, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../../global.css';
import { numMask, reaisMask } from '../../../mask'
import api from '../../../services/api';
import moment from 'moment';
const dateFormat = require('dateformat');

const OrdemServico = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var cadosdIdParam = props.match.params.id;

    const [diadasemana, setDiaSemana] = useState(0);
    const [dataatendimento, setDataAtendimento] = useState();
    const [numeroos, setNumos] = useState();
    const [valorapagar, setValorPagar] = useState();
    const [valorareceber, setValorReceber] = useState();
    const [totalapagar, setTotalPagar] = useState();
    const [totalareceber, setTotalaReceber] = useState();
    const [custoadicional, setCustoAdicional] = useState();
    const [nomediadasemana, setNomeDiaSemana] = useState('');
    const [clientes, setClientes] = useState([]);
    const [clienteFiliais, setClienteFiliais] = useState([]);
    const [tipoProjeto, setTipoProjeto] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        numeroos: '',
        datasolicitacao: '',
        dataatendimento: '',
        clientefilialid: 1,
        tipoprojetoid: 1,
        descricaoservico: '',
        tecnicoid: 1,
        observacaoos: '',
        datafechamento: '',
        horaentrada: '',
        horasaida: '',
        qtdehoras: '',
        horaextra: '',
        valorapagar: '',
        valorareceber: '',
        totalapagar: '',
        totalareceber: '',
        diadasemana: '',
        custoadicional: '',
        telefonefixo: '',
        telefoneresponsavel: '',
        ativo: 1,
    });

    useEffect(() => {
        api.get('clientes').then(response => {
            setClientes(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('filiais').then(response => {
            setClienteFiliais(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('tipo-projeto').then(response => {
            setTipoProjeto(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        if (action === 'edit' && cadosdIdParam !== '') {
            api.get(`ordem-servico/${cadosdIdParam}`).then(response => {
                document.getElementById('txtNumeroOs').value = response.data.numeroos;
                document.getElementById('txtDiasemana').value = response.data.diadasemana;
                document.getElementById('cboClienteFilial').value = response.data.clientefilialid;
                document.getElementById('cboTipoServico').value = response.data.tipoprojetoid;
                document.getElementById('cobTecnico').value = response.data.tecnicoid;
                //document.getElementById('txtObservacaoOs').value = response.data.observacaoos;
                document.getElementById('txtDescricaoServico').value = response.data.descricaoservico;
                document.getElementById('txtHoraEntrada').value = response.data.horaentrada;
                document.getElementById('txtHoraSaida').value = response.data.horasaida;
                document.getElementById('txtqtdHoras').value = response.data.qtdehoras;
                document.getElementById('txtValorPagar').value = response.data.valorapagar;
                document.getElementById('txtValorReceber').value = response.data.valorareceber;
                document.getElementById('txtHoraExtra').value = response.data.horaextra;
                document.getElementById('txtTotalPagar').value = response.data.totalapagar;
                document.getElementById('txtTotalReceber').value = response.data.totalareceber;
                document.getElementById('txtCustoAdicional').value = response.data.custoadicional;
                document.getElementById('txtTelefoneFixo').value = response.data.telefonefixo;
                document.getElementById('txtTelefoneResponsavel').value = response.data.telefoneresponsavel;
                document.getElementById('txtDataSolicitacao').value = dateFormat(response.data.datasolicitacao, "yyyy-mm-dd");
                document.getElementById('txtDataAtendimento').value = dateFormat(response.data.dataatendimento, "yyyy-mm-dd");
                setNomeDiaSemana(getNameOfTheDay(response.data.diadasemana));



                setFormData({
                    ...formData,
                    numeroos: response.data.numeroos,
                    datasolicitacao: response.data.datasolicitacao,
                    dataatendimento: response.data.dataatendimento,
                    diadasemana: response.data.diadasemana,
                    clientefilialid: response.data.clientefilialid,
                    tipoprojetoid: response.data.tipoprojetoid,
                    tecnicoid: response.data.tecnicoid,
                    observacaoos: response.data.observacaoos,
                    descricaoservico: response.data.descricaoservico,
                    horaentrada: response.data.horaentrada,
                    horasaida: response.data.horasaida,
                    qtdehoras: response.data.qtdehoras,
                    valorapagar: response.data.valorapagar,
                    valorareceber: response.data.valorareceber,
                    totalapagar: response.data.totalapagar,
                    totalareceber: response.data.totalareceber,
                    custoadicional: response.data.custoadicional,
                    horaextra: response.data.horaextra,
                    telefonefixo: response.data.telefonefixo,
                    telefoneresponsavel: response.data.telefoneresponsavel,
                })
            });
        } else {
            return;
        }
    }, [cadosdIdParam])

    const [collapseMulti, setCollapseMulti] = useState([true, true])
    const [openMulti, setOpenMulti] = useState([true, true]);
    const [open, setOpen] = useState(true);

    // //testar com o multiplo toggle
    const toggleMulti = (type) => {
        let newCollapse = collapseMulti.slice()
        switch (type) {
          case "clientes":
            newCollapse[0] = !collapseMulti[0];
            break;
          case "servicos":
            newCollapse[1] = !collapseMulti[1];
            break;
          case "both":
            newCollapse[0] = !collapseMulti[0];
            newCollapse[1] = !collapseMulti[1];
            break;
          default:
        }
        setCollapseMulti(newCollapse)
    }
    
    const IconOpenClose = (type) => {

        let tipo = props.type;
        let newCollapse = openMulti.slice();
        let iconUp = "fa fa-chevron-up";
        
        if(!openMulti[0]) {
            iconUp = "fa fa-chevron-down"
        } 
        return(
            <Fragment>
                <Button className="card-header-action" onClick={()=>{toggleMulti('servicos')}}>
                    <i className="fa fa-chevron-up"></i>
                </Button>
            </Fragment>
        )
    }

    function getNameOfTheDay(dayNumber) {
        var diasDaSemana = new Array(7);
        diasDaSemana[0] = "Domingo";
        diasDaSemana[1] = "Segunda-feira";
        diasDaSemana[2] = "Terça-feira";
        diasDaSemana[3] = "Quarta-feira";
        diasDaSemana[4] = "Quinta-feira";
        diasDaSemana[5] = "Sexta-feira";
        diasDaSemana[6] = "Sábado";

        var nomeDiaDaSemana = diasDaSemana[dayNumber];

        return nomeDiaDaSemana;
    }

    function handleInputChange(event) {
        event.preventDefault();

        const { name, value } = event.target;

        if (name === 'dataatendimento') {
            if ('dataatendimento' != "") {
                setDataAtendimento(value);

                var dataAtendimento = String(moment(value));

                var date = new Date(dataAtendimento);

                var diaNumero = date.getDay();
                setDiaSemana(parseInt(diaNumero));

                var diasDaSemana = new Array(7);
                diasDaSemana[0] = "Domingo";
                diasDaSemana[1] = "Segunda-feira";
                diasDaSemana[2] = "Terça-feira";
                diasDaSemana[3] = "Quarta-feira";
                diasDaSemana[4] = "Quinta-feira";
                diasDaSemana[5] = "Sexta-feira";
                diasDaSemana[6] = "Sábado";

                var nomeDiaDaSemana = diasDaSemana[date.getDay()];

                setNomeDiaSemana(nomeDiaDaSemana);
            }
        }
        switch (name) {
            case 'numeroos':
                setNumos(numMask(event.target.value));
                break;
            case 'valorapagar':
                setValorPagar(reaisMask(event.target.value));
                break;
            case 'valorareceber':
                setValorReceber(reaisMask(event.target.value));
                break;
            case 'totalapagar':
                setTotalPagar(reaisMask(event.target.value));
                break;
            case 'totalareceber':
                setTotalaReceber(reaisMask(event.target.value));
                break;
            case 'custoadicional':
                setCustoAdicional(reaisMask(event.target.value));
                break;

        }

        setFormData({ ...formData, [name]: value });
    };

    async function handleOs(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/ordem-servico/${cadosdIdParam}`, data, {
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
                    const response = await api.post('ordem-servico', data, {
                        headers: {
                            Authorization: 1,
                        }
                    });
                    alert(`Cadastro realizado com sucesso.`);
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }
    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleOs}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="icon-wrench"></i>
                                <strong>Ordem de Serviço</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody className="border-bottom">
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="numeroOs">Número da OS</Label>
                                        <Input type="text" required id="txtNumeroOs" placeholder="Numero OS"
                                            // value={numeroos}
                                            name="numeroos"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="dataSolicitacao">Data da Solicitação</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataSolicitacao"
                                                name="datasolicitacao"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-calendar fa-lg"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="dataatendimento">Data atendimento</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataAtendimento"
                                                // value={dataatendimento}
                                                name="dataatendimento"
                                                onChange={handleInputChange} />

                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-calendar fa-lg"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="didasemana">Dia Da semana</Label>
                                        <Input type="text" required id="txtDiasemana" disabled
                                            value={nomediadasemana}
                                        // onChange={e => setDiaSemana(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardHeader>
                                <i className="fa fa-handshake-o"></i>
                                <strong>Cliente / Filial</strong>
                                <div className="card-header-actions">
                                    {/* <Button className="card-header-action" onClick={()=>{toggleMulti('clientes')}}>                                       
                                        abre
                                    </Button> */}
                                    <IconOpenClose isOpen={openMulti[0]}></IconOpenClose>
                                </div>
                            </CardHeader>
                            <Collapse isOpen={collapseMulti[0]}>
                                <CardBody className="border-bottom">
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="clienteId">Cliente</Label>
                                            <InputGroup>
                                                <Input type="select" name="select" id="cboCliente"
                                                    name="clienteid"
                                                    onChange={handleInputChange} 
                                                >
                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {clientes.map(cliente => (
                                                        <option key={`cliente${cliente.id}`} value={cliente.id}>{cliente.nomecliente}</option>
                                                    ))}
                                                </Input>
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-handshake-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="clienteFilialId">Filial do Cliente</Label>
                                            <InputGroup>
                                                <Input required type="select" name="select" id="cboClienteFilial"
                                                    name="clientefilialid"
                                                    onChange={handleInputChange} 
                                                >
                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {clienteFiliais.map(clienteFilial => (
                                                        <option key={clienteFilial.id} value={clienteFilial.id}>{clienteFilial.nomefilial}</option>
                                                    ))}
                                                </Input>
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary  fa fa-building-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="bandeiraId">Bandeira</Label>
                                            <InputGroup>
                                                <Input type="text" name="select" id="txtBandeira" readOnly
                                                    name="txtBandeira"
                                                    onChange={handleInputChange} 
                                                />                                               
                                            </InputGroup>
                                        </Col>                                        
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                    name="txtTelefoneFixo" readOnly
                                                    onChange={handleInputChange} />
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="telefoneResponsavel">Tel. Responsável</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtTelefoneResponsavel" placeholder="(11) 9999-9999"
                                                    name="txtTelefoneResponsavel" readOnly
                                                    onChange={handleInputChange} />
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblCed">CED</Label>
                                            <Input type="text" required id="txtCed"
                                                name="ced" readOnly
                                                onChange={handleInputChange} />
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblCep">CEP</Label>
                                            <Input type="text" required id="txtCep"
                                                name="cep" readOnly
                                                onChange={handleInputChange} />
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblLogradouro">Logradouro</Label>
                                            <InputGroup>
                                                <Input required type="text" name="txtLogradouro" id="txtLogradouro"
                                                    onChange={handleInputChange} readOnly
                                                />
                                                </InputGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="lblNumero">Nº</Label>
                                            <InputGroup>
                                                <Input type="text" name="select" id="txtNumero" readOnly
                                                    name="txtNumero"
                                                    onChange={handleInputChange} 
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblComplemento">Complemento</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtComplemento" readOnly
                                                    name="txtComplemento"
                                                    onChange={handleInputChange} 
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblBairro">Bairro</Label>
                                            <Input type="text" required id="txtBairro"
                                                name="txtBairro" readOnly
                                                onChange={handleInputChange} />
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblEstado">Estado</Label>
                                            <InputGroup>
                                                <Input required type="text" name="txtEstado" id="txtEstado"
                                                    onChange={handleInputChange} readOnly
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblCidade">Cidade</Label>
                                            <Input type="text" required id="txtCidade"
                                                name="txtCidade" readOnly
                                                onChange={handleInputChange} />
                                        </Col>
                                        </FormGroup>                           
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioInicioSemana">Horario Início da semana</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioInicioSemana"
                                                    name="txtHorarioInicioSemana" readOnly
                                                    onChange={handleInputChange} />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioInicioDomingo">Horario Início do Domingo</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioInicioDomingo"
                                                    name="txtHorarioInicioDomingo" readOnly
                                                    onChange={handleInputChange} />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioInicioSabado">Horario Início do Sábado</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioInicioSabado"
                                                    name="txtHorarioInicioSabado" readOnly
                                                    onChange={handleInputChange} />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioFimSemana">Horario Fim da semana</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioFimSemana"
                                                    name="txtHorarioFimSemana" readOnly
                                                    onChange={handleInputChange} />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioFimDomingo">Horario Fim do Domingo</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioFimDomingo"
                                                    name="txtHorarioFimDomingo" readOnly
                                                    onChange={handleInputChange} />
                                                </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioFimSabado">Horario Fim do Sábado</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioFimSabado"
                                                    name="txtHorarioFimSabado" readOnly
                                                    onChange={handleInputChange} />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                </CardBody>
                            </Collapse>
                            <CardHeader>
                                <i className="fa fa-clipboard"></i>
                                <strong>Informações Do Serviço</strong>
                                <div className="card-header-actions">
                                    <Button className="card-header-action" onClick={()=>{toggleMulti('servicos')}}>
                                        <i className="fa fa-chevron-up"></i>
                                    </Button>
                                </div>
                            </CardHeader>
                            <Collapse isOpen={collapseMulti[1]}>                        
                                <CardBody>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="tiposervicoid">Tipo de Serviço</Label>
                                            <InputGroup>
                                                <Input required type="select" name="select" id="cboTipoServico"
                                                    name="tipoprojetoid"
                                                    onChange={handleInputChange}>
                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {tipoProjeto.map(tipoProjeto => (
                                                        <option key={tipoProjeto.id} value={tipoProjeto.id}>{tipoProjeto.nometipoprojeto}</option>
                                                    ))}
                                                </Input>
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary icon-wrench"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="tecnicoId"> Técnico</Label>
                                            <InputGroup>
                                                <Input required type="select" name="select" id="cobTecnico"
                                                    name="tecnicoid"
                                                    onChange={handleInputChange} >
                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {tecnicos.map(tecnico => (
                                                        <option key={tecnico.id} value={tecnico.id}>{tecnico.nometecnico}</option>
                                                    ))}
                                                </Input>
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary  fa fa-user-md"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="12">
                                            <Label htmlFor="descricaoservico">Descrição do Serviço</Label>
                                            <InputGroup>
                                                <Input id="txtDescricaoServico" rows="5" required type="textarea" placeholder="Descrição do Serviço"
                                                    name="descricaoservico"
                                                    onChange={handleInputChange} />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="horaEntrada">Hora de Entrada</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHoraEntrada"
                                                    placeholder="00:00:00"
                                                    name="horaentrada"
                                                    onChange={handleInputChange} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="horaSaida">Hora de Saída</Label>
                                            <InputGroup>
                                                <Input type="time" required name="time" id="txtHoraSaida"
                                                    name="horasaida"
                                                    onChange={handleInputChange} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="qtHoras">Quantidade de Horas</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtqtdHoras" placeholder="00:00"
                                                    name="qtdehoras"
                                                    onChange={handleInputChange} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="valorPpagar">Valor a Pagar</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtValorPagar" placeholder="R$00,00"
                                                    value={valorapagar}
                                                    name="valorapagar"
                                                    onChange={handleInputChange} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-money"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="valorReceber">Valor a Receber</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtValorReceber" placeholder="R$00,00"
                                                    value={valorareceber}
                                                    name="valorareceber"
                                                    onChange={handleInputChange} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-money"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="horaextra">Hora Extra</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtHoraExtra" placeholder="00:00"
                                                    name="horaextra"
                                                    onChange={handleInputChange} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="totalpagar">Total a pagar</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTotalPagar" placeholder="R$00,00"
                                                value={totalapagar}
                                                name="totalapagar"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="totalreceber">Total a Receber</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTotalReceber" placeholder="R$00,00"
                                                value={totalareceber}
                                                name="totalareceber"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="custoAdicional">Custo Adicional</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtCustoAdicional" placeholder="R$00,00"
                                                value={custoadicional}
                                                name="custoadicional"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                </CardBody>
                            </Collapse>  
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
export default OrdemServico;