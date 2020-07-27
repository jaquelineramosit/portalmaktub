import React, { useState, useEffect, Component, Fragment } from 'react';
import { Row, Collapse, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import '../../../global.css';
import { numMask, reaisMask } from '../../../mask'
import api from '../../../services/api';
import moment from 'moment';
const dateFormat = require('dateformat');
let clienteFilialIdInicial;
let clienteIdInicial;
let tipoProjetoIdInicial;

const OrdemServico = (props) => {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var cadosdIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    // informacoes OS
    const [numeroos, setNumeroos] = useState('');
    const [datasolicitacao, setDatasolicitacao] = useState('');
    const [dataatendimento, setDataAtendimento] = useState('');
    const [clienteid, setClienteid] = useState('');
    const [clientefilialid, setClientefilialid] = useState('');
    const [tipoprojetoid, setTipoprojetoid] = useState('');
    const [descricaoservico, setDescricaoservico] = useState('');
    const [tecnicoid, setTecnicoid] = useState('');
    const [observacaoos, setObservacaoos] = useState('');
    const [datafechamento, setDatafechamento] = useState('');    
    const [nomediasemana, setNomediasemana] = useState('');
    const [horaentrada, setHoraentrada] = useState('');
    const [horasaida, setHorasaida] = useState('');
    const [totalapagar, setTotalapagar] = useState('');
    const [totalareceber, setTotalareceber] = useState('');
    const [diadasemana, setDiadasemana] = useState(0);
    const [custoadicional, setCustoadicional] = useState('');
    const [ativo, setAtivo] = useState(1);

    // informacoes servico
    const [qtdehoras, setQtdehoras] = useState('');
    const [horaextra, setHoraextra] = useState('');
    const [valorapagar, setValorapagar] = useState('');
    const [valorareceber, setValorareceber] = useState('');    

    // informacoes filial
    const [dadosFilial, setDadosFilial] = useState({
        nomebandeira : '',
        telefonefixo : '',
        telefoneresponsavel : '',
        ced : '',
        cep : '',
        logradouro : '',
        numero : '',
        complemento : '',
        bairro : '',
        estado : '',
        cidade : '',
        horarioiniciosemana : '00:00',
        horarioiniciosabado : '00:00',
        horarioiniciodomingo : '00:00',
        horariofimsemana : '00:00',
        horariofimsabado : '00:00',
        horariofimdomingo : '00:00'
    });

    //combos dinamicos
    const [clienteFiliais, setClienteFiliais] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [tipoProjeto, setTipoProjeto] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);

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
                setNumeroos(response.data.numeroos);
                setDatasolicitacao(dateFormat(response.data.datasolicitacao, "yyyy-mm-dd"));
                setDataAtendimento(dateFormat(response.data.dataatendimento, "yyyy-mm-dd"));
                setNomediasemana(getDateNameOfWeekDay(response.data.dataatendimento));
                setClienteid(response.data.clienteid);
                clienteIdInicial = response.data.clienteid;
                setClientefilialid(response.data.clientefilialid);
                clienteFilialIdInicial = response.data.clientefilialid;
                setTipoprojetoid(response.data.tipoprojetoid);
                tipoProjetoIdInicial = response.data.tipoprojetoid;                
                setDescricaoservico(response.data.descricaoservico);
                setTotalapagar(response.data.totalapagar);
                setTotalareceber(response.data.totalareceber);
                setCustoadicional(response.data.custoadicional);
                setObservacaoos(response.data.observacaoos);
                setDatafechamento(response.data.datafechamento);
                setHoraentrada(response.data.horaentrada);
                setTecnicoid(response.data.tecnicoid);
                setHorasaida(response.data.horasaida);                
                setTipoprojetoid(response.data.tipoprojetoid);
                setTecnicoid(response.data.tecnicoid);
                setDescricaoservico(response.data.descricaoservico);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
                document.getElementById('txtDataAtendimento').value = dateFormat(response.data.dataatendimento, "yyyy-mm-dd");

                api.get(`filiais?clienteId=${clienteIdInicial}`).then(response => {
                    setClienteFiliais(response.data);
                });

                api.get(`filiais/${clienteFilialIdInicial}`).then(response => {
                    setDadosFilial(response.data);
                });

                api.get(`tecnico?tipoProjetoId=${tipoProjetoIdInicial}`).then(response => {
                    setTecnicos(response.data);
                });

                api.get(`tipo-projeto/${tipoProjetoIdInicial}`).then(response => {
                    setQtdehoras(response.data.horas);
                    setHoraextra(response.data.valorhoraextra);
                    setValorapagar(response.data.despesa);
                    setValorareceber(response.data.receita);                    
                });
            });
        } else {
            return;
        }
    }, [cadosdIdParam]);

    function handleReset() {
        setRedirect(true);
    };

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

    function zerarDadosFilial() {
        setDadosFilial({
            nomebandeira : '',
            telefonefixo : '',
            telefoneresponsavel : '',
            ced : '',
            cep : '',
            logradouro : '',
            numero : '',
            complemento : '',
            bairro : '',
            estado : '',
            cidade : '',
            horarioiniciosemana : '00:00',
            horarioiniciosabado : '00:00',
            horarioiniciodomingo : '00:00',
            horariofimsemana : '00:00',
            horariofimsabado : '00:00',
            horariofimdomingo : '00:00'
        });
    }

    function zeraDadosServico(){
        setQtdehoras('');
        setHoraextra('');
        setValorapagar('');
        setValorareceber('');
    }

    function getDateNameOfWeekDay(data) {
        var data = String(moment(data));

        var date = new Date(data);

        var diaNumero = date.getDay();
        setDiadasemana(parseInt(diaNumero));

        var diasDaSemana = new Array(7);
        diasDaSemana[0] = "Domingo";
        diasDaSemana[1] = "Segunda-feira";
        diasDaSemana[2] = "Terça-feira";
        diasDaSemana[3] = "Quarta-feira";
        diasDaSemana[4] = "Quinta-feira";
        diasDaSemana[5] = "Sexta-feira";
        diasDaSemana[6] = "Sábado";

        var nomeDiaDaSemana = diasDaSemana[date.getDay()];

        return nomeDiaDaSemana;
    }

    function handleInputChange(event) {
        event.preventDefault();

        const { name, value } = event.target;

        switch (name) {
            case 'dataatendimento':
                if ('dataatendimento' != "") {
                    setDataAtendimento(value);
                    let nomeDiaDaSemana = getDateNameOfWeekDay(value);
                    setNomediasemana(nomeDiaDaSemana);
                } 
                break;
            case 'numeroos':
                setNumeroos(numMask(event.target.value));
                break;
            case 'valorapagar':
                setValorapagar(reaisMask(event.target.value));
                break;
            case 'valorareceber':
                setValorareceber(reaisMask(event.target.value));
                break;
            case 'totalapagar':
                setTotalapagar(reaisMask(event.target.value));
                break;
            case 'totalareceber':
                setTotalareceber(reaisMask(event.target.value));
                break;
            case 'custoadicional':
                setCustoadicional(reaisMask(event.target.value));
                break;
            case 'clientefilialid':
                if( value !== 'Selecione...' ) {
                    setClientefilialid(value);
                    api.get(`filiais/${value}`).then(response => {
                        setDadosFilial(response.data);
                    });
                } else {
                    setClientefilialid('');
                    zerarDadosFilial();
                }
                break;
            case 'clienteid':
                if( value !== 'Selecione...' ) {
                    setClienteid(value);
                    setClientefilialid('');
                    api.get(`filiais?clienteId=${value}`).then(response => {
                        setClienteFiliais(response.data);                        
                        zerarDadosFilial();
                    });
                } else {
                    setClienteFiliais([]);
                    setClienteid('');
                    zerarDadosFilial();
                }                
                break;
            case 'tipoprojetoid':
                if( value !== 'Selecione...' ) {
                    setTipoprojetoid(value);
                    setTecnicoid('');
                    api.get(`tecnico?tipoProjetoId=${value}`).then(response => {
                        setTecnicos(response.data);
                    });
                    api.get(`tipo-projeto/${value}`).then(response => {
                        setQtdehoras(response.data.horas);
                        setHoraextra(response.data.valorhoraextra);
                        setValorapagar(response.data.despesa);
                        setValorareceber(response.data.receita);                    
                    });
                } else {
                    setTipoprojetoid('');
                    setTecnicoid('');
                    setTecnicos([]);
                    zeraDadosServico();
                }
        }
    };

    async function handleOs(e) {
        e.preventDefault();

        const data = {
            numeroos,
            datasolicitacao,
            dataatendimento,
            clientefilialid,
            tipoprojetoid,
            descricaoservico,
            tecnicoid,
            observacaoos,
            datafechamento,
            horaentrada,
            horasaida,
            qtdehoras,
            horaextra,
            valorapagar,
            valorareceber,
            totalapagar,
            totalareceber,
            diadasemana,
            custoadicional,
            ativo
        };

        if (action === 'edit') {

            try {
                const response = await api.put(`/ordem-servico/${cadosdIdParam}`, data, {
                    headers: {
                        Authorization: 1,
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
                    const response = await api.post('ordem-servico', data, {
                        headers: {
                            Authorization: 1,
                        }
                    });
                    alert(`Cadastro realizado com sucesso.`);
                    setRedirect(true);
                } catch (err) {
                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }
    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-ordem-servico" /> }
            <Form onSubmit={handleOs} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="icon-wrench"></i>
                                <strong>Ordem de Serviço</strong>
                                {action === 'novo' ? <small> nova</small> : <small> editar</small>}
                            </CardHeader>
                            <CardBody className="border-bottom">
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="numeroOs">Número da OS</Label>
                                        <Input type="text" required id="txtNumeroOs" placeholder="Numero OS"
                                            value={numeroos}
                                            name="numeroos"
                                            onChange={e => setNumeroos(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="dataSolicitacao">Data da Solicitação</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataSolicitacao"
                                                value={datasolicitacao}
                                                name="datasolicitacao"
                                                onChange={e => setDatasolicitacao(e.target.value)}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-calendar fa-lg"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="dataatendimento">Data atendimento</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataAtendimento"
                                                value={dataatendimento}
                                                name="dataatendimento"
                                                onChange={handleInputChange}
                                            />

                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-calendar fa-lg"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="didasemana">Dia Da semana</Label>
                                        <Input type="text" required id="txtDiasemana" disabled
                                            name="nomediasemana"
                                            value={nomediasemana}
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
                                                <Input type="select" id="cboCliente"
                                                    value={clienteid}
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
                                                <Input required type="select" id="cboClienteFilial"
                                                    value={clientefilialid}
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
                                                <Input type="text" id="txtBandeira" readOnly
                                                    value={dadosFilial.nomebandeira}
                                                    name="nomebandeira"
                                                />                                               
                                            </InputGroup>
                                        </Col>                                        
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtTelefoneFixo" readOnly
                                                    value={dadosFilial.telefonefixo}
                                                    name="telefonefixo"                                                    
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="telefoneResponsavel">Tel. Responsável</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtTelefoneResponsavel" readOnly
                                                    value={dadosFilial.telefoneresponsavel}
                                                    name="telefoneresponsavel"
                                                />
                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblCed">CED</Label>
                                            <Input type="text" readOnly required id="txtCed"
                                                value={dadosFilial.ced}
                                                name="ced" 
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblCep">CEP</Label>
                                            <Input type="text" readOnly required id="txtCep"
                                                value={dadosFilial.cep}
                                                name="cep"
                                            />
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblLogradouro">Logradouro</Label>
                                            <InputGroup>
                                                <Input required type="text" readOnly id="txtLogradouro"
                                                    value={dadosFilial.logradouro}                                                    
                                                    name="logradouro"
                                                />
                                                </InputGroup>
                                        </Col>
                                        
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="2">
                                            <Label htmlFor="lblNumero">Nº</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtNumero" readOnly
                                                    value={dadosFilial.numero}
                                                    name="numero"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblComplemento">Complemento</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtComplemento" readOnly
                                                    value={dadosFilial.complemento}
                                                    name="complemento"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblBairro">Bairro</Label>
                                            <Input type="text" required id="txtBairro" readOnly
                                                value={dadosFilial.bairro}
                                                name="bairro"
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Label htmlFor="lblEstado">Estado</Label>
                                            <InputGroup>
                                                <Input required type="text" id="txtEstado" readOnly
                                                    value={dadosFilial.estado}
                                                    name="estado"                                                     
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblCidade">Cidade</Label>
                                            <Input type="text" required id="txtCidade" readOnly
                                                value={dadosFilial.cidade}
                                                name="cidade"
                                            />
                                        </Col>
                                        </FormGroup>                           
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioInicioSemana">Horario Início da semana</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioInicioSemana" readOnly
                                                    value={dadosFilial.horarioiniciosemana}
                                                    name="horarioiniciosemana"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioInicioSabado">Horario Início do Sábado</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioInicioSabado" readOnly
                                                    value={dadosFilial.horarioiniciosabado}
                                                    name="horarioiniciosabado"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioInicioSabado">Horario Início do Domingo</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioInicioDomingo" readOnly
                                                    value={dadosFilial.horarioiniciodomingo}
                                                    name="horarioiniciodomingo"
                                                />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioFimSemana">Horario Fim da semana</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioFimSemana" readOnly
                                                    value={dadosFilial.horariofimsemana}
                                                    name="horariofimsemana"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioFimSabado">Horario Fim do Sábado</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioFimSabado" readOnly
                                                    value={dadosFilial.horariofimsabado}
                                                    name="horariofimsabado"
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="lblHorarioFimDomingo">Horario Fim do Domingo</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHorarioFimDomingo" readOnly
                                                    value={dadosFilial.horariofimdomingo}
                                                    name="horariofimdomingo"
                                                />
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
                                                <Input required type="select" id="cboTipoServico"
                                                    value={tipoprojetoid}
                                                    name="tipoprojetoid"
                                                    onChange={handleInputChange}>
                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {tipoProjeto.map(tipoProjeto => (
                                                        <option key={`tipoProjeto${tipoProjeto.id}`} value={tipoProjeto.id}>{tipoProjeto.nometipoprojeto}</option>
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
                                                <Input required type="select" id="cobTecnico"
                                                    value={tecnicoid}
                                                    name="tecnicoid"
                                                    onChange={e => setTecnicoid(e.target.value)} >
                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {tecnicos.map(tecnico => (
                                                        <option key={`tecnicoid${tecnico.id}`} value={tecnico.id}>{tecnico.nometecnico}</option>
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
                                                    value={descricaoservico}
                                                    name="descricaoservico"
                                                    onChange={e => setDescricaoservico(e.target.value)}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="horaEntrada">Hora de Entrada</Label>
                                            <InputGroup>
                                                <Input type="time" required id="txtHoraEntrada"
                                                    placeholder="00:00:00"
                                                    value={horaentrada}
                                                    name="horaentrada"
                                                    onChange={e => setHoraentrada(e.target.value)}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="horaSaida">Hora de Saída</Label>
                                            <InputGroup>
                                                <Input type="time" required name="time" id="txtHoraSaida"
                                                    value={horasaida}
                                                    name="horasaida"
                                                    onChange={e => setHorasaida(e.target.value)}
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="qtHoras">Quantidade de Horas</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtqtdHoras" placeholder="00:00"
                                                    value={qtdehoras}
                                                    name="qtdehoras"
                                                    onChange={e => setQtdehoras(e.target.value)}
                                                />
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
                                                    onChange={e => setValorapagar(e.target.value)}
                                                />
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
                                                    onChange={e => setValorareceber(e.target.value)} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color="secondary fa fa-money"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="horaextra">Hora Extra</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtHoraExtra" placeholder="00:00"
                                                    value={horaextra}
                                                    name="horaextra"
                                                    onChange={e => setHoraextra(e.target.value)}
                                                />
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
                                                onChange={e => setTotalapagar(e.target.value)}
                                            />
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
                                                onChange={e => setTotalareceber(e.target.value)}
                                            />
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
                                                onChange={e => setCustoadicional(e.target.value)} />
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