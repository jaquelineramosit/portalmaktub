import {Tabs, Tab, TabContainer } from 'react-bootstrap'
import React, { useState, useEffect, Component, Fragment } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, ListGroup, ListGroupItem, } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { FaHandshake, FaProjectDiagram, FaArrowsAlt } from 'react-icons/fa';
import { } from 'react-icons/fi'
import '../global.css';
import { numMask } from '../mask'
import api from '../services/api';
import moment from 'moment';
import CardListaStatus from '../components/CardListaStatus'
const dateFormat = require('dateformat');
let clienteFilialIdInicial = '';
let clienteIdInicial = '';
let tipoProjetoIdInicial = '';
let valorFimInicial = 0;
let valorInicioInicial = 0;
let valorPagarInicial = 0;
let valorReceberInicial = 0;
let qtdeHorasInicial = 0;
let horasProjeto = 0;
let custoAdicionalInicial = '';
let qdeHoras = 0;
let qdeHorasExtra = 0;
var now = new Date();

const MultiTabs = (props) => {

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
    const [nomediasemana, setNomediasemana] = useState('');
    const [horadecimal, setHoraDecimal] = useState(0);
    const [horaentrada, setHoraentrada] = useState('00:00');
    const [horasaida, setHorasaida] = useState('00:00');
    const [totalapagar, setTotalapagar] = useState(0);
    const [totalareceber, setTotalareceber] = useState(0);
    const [diadasemana, setDiadasemana] = useState(0);
    const [custoadicional, setCustoadicional] = useState(0);
    const [custoadicionalFormatado, setCustoadicionalFormatado] = useState(0);
    const [ativo, setAtivo] = useState(1);

    // informacoes servico
    const [qtdehoras, setQtdehoras] = useState(0);
    const [horaextra, setHoraextra] = useState(0);
    const [valorapagar, setValorapagar] = useState(0);
    const [valorapagarFormatado, setValorapagarFormatado] = useState(0);
    const [valorareceber, setValorareceber] = useState(0);    
    const [valorareceberFormatado, setValorareceberFormatado] = useState(0); 

    //informacoes movimentacao os
    const [statusatendimentoid, setStatusAtendimentoid] = useState('');
    const [statuspagamentoid, setStatusPagamentoid] = useState('');
    const [statuscobrancaid, setStatusCobrancaid] = useState('');
    const [observacao, setObservacao] = useState('');
    const [statusatendimentosid, setStatusAtendimentosid] = useState([]);
    const [statuspagamentosid, setStatusPagamentosid] = useState([]);
    const [statuscobrancasid, setStatusCobrancasid] = useState([]);
    const [movimentacaoLogId, setMovimentacaoLogId] = useState([]);

    // informacoes filial
    const [dadosFilial, setDadosFilial] = useState({
        nomebandeira: '',
        telefonefixo: '',
        telefoneresponsavel: '',
        ced: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        estado: '',
        cidade: '',
        horarioiniciosemana: '00:00',
        horarioiniciosabado: '00:00',
        horarioiniciodomingo: '00:00',
        horariofimsemana: '00:00',
        horariofimsabado: '00:00',
        horariofimdomingo: '00:00'
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
        api.get('status-atendimento').then(response => {
            setStatusAtendimentosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-cobranca').then(response => {
            setStatusCobrancasid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-pagamento').then(response => {
            setStatusPagamentosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get(`movimentacao-os-log-todos-por-os/${cadosdIdParam}`).then(response => {
            setMovimentacaoLogId(response.data);
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
                setCustoadicionalFormatado(response.data.custoadicional);
                custoAdicionalInicial = response.data.custoadicional;
                setObservacaoos(response.data.observacaoos);
                setHoraentrada(response.data.horaentrada);
                valorInicioInicial = new Date("2020-08-29 " + response.data.horaentrada).getHours();
                setTecnicoid(response.data.tecnicoid);
                setHorasaida(response.data.horasaida);   
                valorFimInicial = new Date("2020-08-29 " + response.data.horasaida).getHours();          
                setTipoprojetoid(response.data.tipoprojetoid);
                setTecnicoid(response.data.tecnicoid);
                setDescricaoservico(response.data.descricaoservico);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
                document.getElementById('txtDataAtendimento').value = dateFormat(response.data.dataatendimento, "yyyy-mm-dd");

                //dados projeto
                setQtdehoras(response.data.qtdehoras);
                qtdeHorasInicial = response.data.qtdehoras;
                setValorapagar(response.data.valorapagar);
                setValorapagarFormatado(response.data.valorapagar);
                valorPagarInicial = response.data.valorapagar;
                setValorareceber(response.data.valorareceber);    
                setValorareceberFormatado(response.data.valorareceber);    
                valorReceberInicial = response.data.valorareceber;
                
                api.get(`filiais?clienteId=${clienteIdInicial}`).then(response => {
                    setClienteFiliais(response.data);
                });
    
                api.get(`filiais/${clienteFilialIdInicial}`).then(response => {
                    setDadosFilial(response.data);
                });
    
                api.get(`tecnico?tipoProjetoId=${tipoProjetoIdInicial}`).then(response => {
                    setTecnicos(response.data);
                });
                    
                qdeHoras = valorFimInicial - valorInicioInicial;
                qdeHorasExtra =  qdeHoras - qtdeHorasInicial;

                api.get(`tipo-projeto/${tipoProjetoIdInicial}`).then(response => {
                    setHoraDecimal(response.data.horadecimal); 

                    if( qdeHorasExtra  > 0 ) {                        
                        setHoraextra(qdeHorasExtra);
                        setTotalapagar((response.data.horadecimal * qdeHorasExtra) + valorPagarInicial + custoAdicionalInicial);
                        setTotalareceber((response.data.horadecimal * qdeHorasExtra) + valorReceberInicial + custoAdicionalInicial);
                    } else {
                        setHoraextra(0);
                        setTotalapagar(valorPagarInicial + custoAdicionalInicial);
                        setTotalareceber(valorReceberInicial + custoAdicionalInicial);
                    }
                });
            });
        } else {
            return;
        }
    }, [cadosdIdParam]);

    useEffect(() => {
        if (action === 'edit' && cadosdIdParam !== '') {
            api.get(`movimentacao-os-osid/${cadosdIdParam}`).then(response => {
                setStatusAtendimentoid(response.data.statusatendimentoid);
                setStatusPagamentoid(response.data.statuspagamentoid);
                setStatusCobrancaid(response.data.statuscobrancaid);
                setObservacao(response.data.observacao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [cadosdIdParam]);

    function handleReset() {
        setRedirect(true);
    };

    function TotaisPagarReceber() {        
        qdeHoras = valorFimInicial - valorInicioInicial;
        qdeHorasExtra =  qdeHoras - qtdehoras;

        if( qdeHorasExtra  > 0 ) {
            setHoraextra(qdeHorasExtra);
            setTotalapagar((horadecimal * qdeHorasExtra) + valorPagarInicial + Number(custoAdicionalInicial));
            setTotalareceber((horadecimal * qdeHorasExtra) + valorReceberInicial + Number(custoAdicionalInicial));
        } else {
            setHoraextra(0);
            setTotalapagar(valorPagarInicial + Number(custoAdicionalInicial));
            setTotalareceber(valorReceberInicial + Number(custoAdicionalInicial));
        }
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

    function zerarDadosFilial() {
      setDadosFilial({
          nomebandeira: '',
          telefonefixo: '',
          telefoneresponsavel: '',
          ced: '',
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          estado: '',
          cidade: '',
          horarioiniciosemana: '00:00',
          horarioiniciosabado: '00:00',
          horarioiniciodomingo: '00:00',
          horariofimsemana: '00:00',
          horariofimsabado: '00:00',
          horariofimdomingo: '00:00'
      });
    }

    function zeraDadosServico() {
      setQtdehoras('');
      setHoraextra('');
      setValorapagar('');
      setValorapagarFormatado('');
      setValorareceber('');
      setValorareceberFormatado('');
      setTotalareceber('');
      setTotalapagar('');
      setCustoadicional('');
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
          // case 'custoadicional':
          //     setCustoadicional(reaisMask(event.target.value));
          //     break;
          case 'clientefilialid':
              if (value !== 'Selecione...') {
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
              if (value !== 'Selecione...') {
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
              if (value !== 'Selecione...') {
                  setTipoprojetoid(value);
                  setTecnicoid('');
                  api.get(`tecnico?tipoProjetoId=${value}`).then(response => {
                      setTecnicos(response.data);
                  });
                  api.get(`tipo-projeto/${value}`).then(response => {
                      setQtdehoras(response.data.horas);
                      horasProjeto = response.data.horas;
                      setValorapagar(response.data.despesa);
                      setValorapagarFormatado(response.data.despesa);
                      valorPagarInicial = response.data.despesa;
                      setValorareceber(response.data.receita);    
                      setValorareceberFormatado(response.data.receita);    
                      valorReceberInicial = response.data.receita;
                      setHoraDecimal(response.data.horadecimal);
                      TotaisPagarReceber();
                  });
              } else {
                  setTipoprojetoid('');
                  setTecnicoid('');
                  setTecnicos([]);
                  zeraDadosServico();
              }
              break;
          case 'horaentrada':
              setHoraentrada(value);
              valorInicioInicial = new Date("2020-08-29 " + value).getHours();
              TotaisPagarReceber();
              break;
          case 'horasaida':
              setHorasaida(value);
              valorFimInicial = new Date("2020-08-29 " + value).getHours();
              TotaisPagarReceber();
              break;
      }
  };

  async function handleAtualizaMovimentacao(e) {
    e.preventDefault();
    alert('oi');
    const dataMovimentacao = {
        statusatendimentoid, 
        statuscobrancaid,
        statuspagamentoid,
        observacao,
        ativo: true
    }

    try {
        const response = await api.put(`/movimentacao-os/${cadosdIdParam}`, dataMovimentacao, {
            headers: {
                Authorization: 1,
            }
        });
        alert(`Movimentação atualizada com sucesso.`);
        setRedirect(true);
    } catch (err) {

        alert('Erro na atualização, tente novamente.');
    }
  }

  async function handleOs(e) {
      e.preventDefault();

      const data = {
          datasolicitacao,
          dataatendimento,
          clientefilialid,
          tipoprojetoid,
          descricaoservico,
          tecnicoid,
          observacaoos,
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
          ativo,
          statusatendimentoid,
          statuspagamentoid, 
          statuscobrancaid, 
          observacao
      };

      console.log(action)

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
    const [key, setKey] = useState('clientefilial');
  
    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-ordem-servico" />}
            <Form onSubmit={handleOs} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card className="mb-0">
                            {/* card Ordem Serviço */}
                            <CardHeader>
                                <i className="icon-wrench"></i>
                                <strong>Ordem de Serviço</strong>
                                {action === 'novo' ? <small> nova</small> : <small> editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="numeroOs">Número da OS</Label>
                                        <Input type="text" id="txtNumeroOs" readOnly
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
                                                <span className="btn btn-secondary disabled fa fa-calendar fa-lg"></span>
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
                                                <span className="btn btn-secondary disabled fa fa-calendar fa-lg"></span>
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
                        </Card>
                        <Card>
                            <CardBody>                                                          
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                >
                                    {/* Tab1. CLiente / Filial */}
                                    <Tab 
                                        eventKey="clientefilial" 
                                        title={
                                            <Fragment>
                                                <i className="fa fa-handshake-o"></i><strong><span className="ml-2">Cliente / Filial </span> </strong>                                                                                  
                                            </Fragment>
                                        }                                 
                                    >
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
                                                        <span className="btn btn-secondary disabled fa fa-handshake-o"></span>
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
                                                        <span className="btn btn-secondary disabled fa fa-building-o "></span>
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
                                    </Tab>
                                    {/* Tab2. Informações do Projeto< */}
                                    <Tab 
                                        eventKey="projetos" 
                                        title={
                                        <Fragment>
                                            <i className="icon-note"></i><strong><span className="ml-2">Informações do Projeto</span></strong>
                                        </Fragment>
                                        } 
                                    >
                                        <FormGroup row>
                                            <Col md="4">
                                                <Label htmlFor="tiposervicoid">Tipo de Projeto</Label>
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
                                                        <span className="btn btn-secondary disabled fa icon-wrench"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="tecnicoId">Técnico</Label>
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
                                                        <span className="btn btn-secondary disabled fa fa-user-md"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="12">
                                                <Label htmlFor="descricaoservico">Descrição do Projeto</Label>
                                                <InputGroup>
                                                    <Input id="txtDescricaoServico" rows="5" required type="textarea" placeholder="Descrição do Projeto"
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
                                                        onChange={handleInputChange}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="horaSaida">Hora de Saída</Label>
                                                <InputGroup>
                                                    <Input type="time" required name="time" id="txtHoraSaida"
                                                        value={horasaida}
                                                        name="horasaida"
                                                        onChange={handleInputChange}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="qtHoras">Quantidade de Horas</Label>
                                                <InputGroup>
                                                    <Input type="text" id="txtqtdHoras" readOnly
                                                        value={qtdehoras}
                                                        name="qtdehoras"
                                                        placeholder="00:00"
                                                        // onChange={handleInputChange}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="4">
                                                <Label htmlFor="valorPpagar">Valor a Pagar</Label>
                                                <InputGroup>
                                                    {/* <Input type="text" id="txtValorPagar" placeholder="R$00,00"
                                                        value={valorapagar}
                                                        name="valorapagar"
                                                        onChange={e => setValorapagar(e.target.value)}
                                                    /> */}
                                                    <NumberFormat
                                                        id={'txtValorPagar'}
                                                        name={'valorapagar'}
                                                        className={'form-control'}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        thousandSeparator={'.'}
                                                        decimalSeparator={','}
                                                        prefix={'R$ '}
                                                        placeholder={'R$ 0,00'}
                                                        value={valorapagarFormatado}
                                                        onValueChange={(values) => {
                                                            const {formattedValue, value} = values;
                                                            setValorapagar(values.value);
                                                            setValorapagarFormatado(values.formattedValue);
                                                            valorPagarInicial = values.value;
                                                            TotaisPagarReceber();
                                                        }}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <span className="btn btn-secondary disabled fa fa-money"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="valorReceber">Valor a Receber</Label>
                                                <InputGroup>
                                                    {/* <Input type="text" id="txtValorReceber" placeholder="R$00,00"
                                                        value={valorareceber}
                                                        name="valorareceber"
                                                        onChange={e => setValorareceber(e.target.value)}
                                                    /> */}
                                                    <NumberFormat
                                                        id={'txtValorReceber'}
                                                        name={'valorareceber'}
                                                        className={'form-control'}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        thousandSeparator={'.'}
                                                        decimalSeparator={','}
                                                        prefix={'R$ '}
                                                        placeholder={'R$ 0,00'}
                                                        value={valorareceberFormatado}
                                                        onValueChange={(values) => {
                                                            const {formattedValue, value} = values;
                                                            setValorareceber(values.value);
                                                            setValorareceberFormatado(values.formattedValue);
                                                            valorReceberInicial = values.value;
                                                            TotaisPagarReceber();
                                                        }}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <span className="btn btn-secondary disabled fa fa-money"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="horaextra">Hora Extra</Label>
                                                <InputGroup>
                                                    <Input type="text" id="txtHoraExtra" placeholder="00:00" readOnly
                                                        value={horaextra}
                                                        name="horaextra"
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="4">
                                                <Label htmlFor="totalpagar">Total a pagar</Label>
                                                <InputGroup>
                                                    <Input type="text" id="txtTotalPagar" readOnly
                                                        value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalapagar)}
                                                        name="totalapagar"
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <Button type="button" color="secondary fa fa-money"></Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="totalreceber">Total a Receber</Label>
                                                <InputGroup>
                                                    <Input type="text" id="txtTotalReceber" readOnly
                                                        value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalareceber)}
                                                        name="totalareceber"
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <Button type="button" color="secondary fa fa-money"></Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="custoAdicional">Custo Adicional</Label>
                                                <InputGroup>
                                                    {/* <Input type="text" id="txtCustoAdicional" placeholder="R$00,00"
                                                        value={custoadicional}
                                                        name="custoadicional"
                                                        onChange={e => setCustoadicional(reaisMask(e.target.value))}
                                                    /> */}
                                                    <NumberFormat
                                                        id={'txtCustoAdicional'}
                                                        name={'custoadicional'}
                                                        className={'form-control'}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        thousandSeparator={'.'}
                                                        decimalSeparator={','}
                                                        prefix={'R$ '}
                                                        value={custoadicionalFormatado}
                                                        onValueChange={(values) => {
                                                            const {formattedValue, value} = values;
                                                            setCustoadicional(values.value);
                                                            setCustoadicionalFormatado(values.formattedValue);
                                                            custoAdicionalInicial = values.value;
                                                            TotaisPagarReceber();
                                                        }}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <Button type="button" color="secondary fa fa-money"></Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                    </Tab>
                                    {/* Tab3. Movimentação de OS */}
                                    <Tab 
                                        eventKey="movimentacao" 
                                        title={
                                        <Fragment>
                                            <i className="fa fa-arrows"></i><strong><span className="ml-2">Movimentação de OS</span></strong>
                                        </Fragment>
                                    } 
                                    >
                                        <Row>
                                            <Col md="8">
                                                <FormGroup row>
                                                    <Col md="4">
                                                        <Label htmlFor="statusAtendimentoId">Status Atendimento</Label>
                                                        <Input type="select" required name="select" id="cboStatusAtendimentoId" multiple={false}
                                                            name="statusatendimentoid"
                                                            value={statusatendimentoid}
                                                            onChange={e => setStatusAtendimentoid(e.target.value)}>
                                                            <option value={undefined} defaultValue>Selecione...</option>
                                                            {statusatendimentosid.map(statusatendimento => (
                                                                <option key={statusatendimento.id} value={statusatendimento.id}>{statusatendimento.status}</option>
                                                            ))}
                                                        </Input>
                                                    </Col>
                                                    <Col md="4">
                                                        <Label htmlFor="statusCobrancaId">Status Cobrança</Label>
                                                        <Input type="select" required name="select" id="cboStatusCobrancaId" multiple={false}
                                                            name="statuscobrancaid"
                                                            value={statuscobrancaid}
                                                            onChange={e => setStatusCobrancaid(e.target.value)}>
                                                            <option value={undefined} defaultValue>Selecione...</option>
                                                            {statuscobrancasid.map(statuscobranca => (
                                                                <option key={statuscobranca.id} value={statuscobranca.id}>{statuscobranca.status}</option>
                                                            ))}
                                                        </Input>
                                                    </Col>
                                                    <Col md="4">
                                                        <Label htmlFor="statusPagamentoId">Status Pagamento</Label>
                                                        <Input type="select" required name="select" id="cboStatuspPagamentoId" multiple={false}
                                                            name="statuspagamentoid"
                                                            value={statuspagamentoid}
                                                            onChange={e => setStatusPagamentoid(e.target.value)}>
                                                            <option value={undefined} defaultValue>Selecione...</option>
                                                            {statuspagamentosid.map(statuspagamento => (
                                                                <option key={statuspagamento.id} value={statuspagamento.id}>{statuspagamento.status}</option>
                                                            ))}
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Col md="12">
                                                        <Label>Observação</Label>
                                                        <Input type="textarea" rows="5" placeholder="Digite a obsevação" id="txtObservacaoMovimentacao"
                                                            name="observacao"
                                                            value={observacao}
                                                            onChange={e => setObservacao(e.target.value)} />
                                                    </Col>
                                                </FormGroup>
                                                {action !== 'editar' ? (
                                                    <FormGroup className="text-left">
                                                        <Button type="button" size="sm" color="info" className="text-white mr-3" onClick={handleAtualizaMovimentacao}><i className="fa fa-check"></i> Atualizar Movimentação</Button>
                                                    </FormGroup>
                                                ) : ""}
                                                
                                            </Col>
                                            <Col md="4">
                                                <CardHeader>                            
                                                    <i className="fa fa-history"></i>
                                                    <strong>Timeline</strong>                                
                                                </CardHeader>
                                                <CardBody className="p-0"> 
                                                    <ListGroup className="list-group-accent" tag={'div'}>
                                                        {/* // {items.map((value) => { */}
                                                        {/* <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Today</ListGroupItem> */}
                                                        {movimentacaoLogId.map((movimentacaolog) => {
                                                            return(
                                                                <CardListaStatus key={movimentacaolog.id} movimentacaolog={movimentacaolog}></CardListaStatus>
                                                            )
                                                        })}
                                                    </ListGroup>                                
                                                </CardBody>
                                                <CardFooter>
                                                    <div className="small text-muted"><strong>Atualizado em:</strong> {dateFormat(now, "dd/mm/yyyy")} às {dateFormat(now, "HH:MM")}</div>                                
                                                </CardFooter>
                                            </Col>
                                        </Row>
                                    </Tab>
                                </Tabs>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="submit" size="sm" color="success" className="mr-3"><i className="fa fa-check"></i> Salvar</Button>
                                <Button type="reset" size="sm" color="danger" className="ml-3"><i className="fa fa-ban "></i> Cancelar</Button>
                            </CardFooter>
                        </Card>
                    </Col>    
                </Row>
            </Form>
        </div>
    );
  }
  
  export default MultiTabs;