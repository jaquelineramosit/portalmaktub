import React, { useState, useEffect, Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { numMask, reaisMask } from '../../../mask'
import api from '../../../services/api';
import moment from 'moment';
const dateFormat = require('dateformat');



const Cadastroos = (props) => {

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
    const [nomediadasemana, setNomeDiaSemana] = useState();
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
        ativo: 1,
    });
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
                document.getElementById('txtObservacaoOs').value = response.data.observacaoos;
                document.getElementById('txtDescricaoServico').value = response.data.descricaoservico;
                document.getElementById('txtHoraEntrada').value = response.data.horaentrada;
                document.getElementById('txtHoraSaida').value = response.data.horasaida;
                document.getElementById('txtqtdHoras').value = response.data.qtdehoras;
                document.getElementById('txtValorPagar').value = response.data.valorapagar;
                document.getElementById('txtValorReceber').value = response.data.valorareceber;
                document.getElementById('txtHoraExtra').value = response.data.horaextra;
                document.getElementById('txtTotalPagar').value = response.data.totalapagar;
                document.getElementById('txtTotalReceber').value = response.data.totalareceber;
                document.getElementById('txtCrustoAdicional').value = response.data.custoadicional;
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
                })
            });
        } else {
            return;
        }
    }, [cadosdIdParam])
    
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

        if ( name === 'dataatendimento' ) {
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
                                <strong>Ordem de Serviço</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="numeroOs">Número da OS</Label>
                                        <Input type="text" required id="txtNumeroOs" placeholder="Numero OS"
                                            // value={numeroos}
                                            name="numeroos"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
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
                                    <Col md="3 ">
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
                                    <Col md="3">
                                        <Label htmlFor="didasemana">Dia Da semana</Label>
                                        <Input type="text" required id="txtDiasemana" disabled
                                            value={nomediadasemana}
                                        // onChange={e => setDiaSemana(e.target.value)}
                                        />
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="clienteFilialId">Filial do Cliente</Label>
                                        <InputGroup>
                                            <Input required type="select" name="select" id="cboClienteFilial"
                                                name="clientefilialid"
                                                onChange={handleInputChange} >

                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {clienteFiliais.map(clienteFilial => (
                                                    <option value={clienteFilial.id}>{clienteFilial.nomefilial}</option>
                                                ))}
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-building-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tiposervicoid">Tipo de Serviço</Label>
                                        <InputGroup>
                                            <Input required type="select" name="select" id="cboTipoServico"
                                                name="tipoprojetoid"
                                                onChange={handleInputChange}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tipoProjeto.map(tipoProjeto => (
                                                    <option value={tipoProjeto.id}>{tipoProjeto.nometipoprojeto}</option>
                                                ))}
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-wrench"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tecnicoId"> Técnico</Label>
                                        <InputGroup>
                                            <Input required type="select" name="select" id="cobTecnico"
                                                name="tecnicoid"
                                                onChange={handleInputChange} >
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tecnicos.map(tecnico => (
                                                    <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                                ))}
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-user-md"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="9">
                                        <Label htmlFor="observacaoSs">Observações OS</Label>
                                        <Input type="textarea" size="16" rows="5" required id="txtObservacaoOs" placeholder="Observações"
                                            name="observacaoos"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>


                                {/*<FormGroup row>
                                    <Col md="3">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}/>
                                    </Col>
                                </FormGroup>*/}
                            </CardBody>
                            <CardHeader><strong>Informações Do Serviço</strong></CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="9">
                                        <Label htmlFor="descricaoservico">Descrição do Serviço</Label>
                                        <InputGroup>
                                            <Input id="txtDescricaoServico" rows="5" required type="textarea" placeholder="Descrição do Serviço"
                                                name="descricaoservico"
                                                onChange={handleInputChange} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
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
                                    <Col md="3">
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
                                    <Col md="3">
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
                                    <Col md="3">
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
                                    <Col md="3">
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
                                    <Col md="3">
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
                                    <Col md="3">
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
                                    <Col md="3">
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
                                    <Col md="3">
                                        <Label htmlFor="custoAdicional">Custo Adicional</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtCrustoAdicional" placeholder="R$00,00"
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
export default Cadastroos;



