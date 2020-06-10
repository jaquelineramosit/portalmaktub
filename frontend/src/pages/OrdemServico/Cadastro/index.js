import React, { useState, useEffect, Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {numMask,reaisMask} from '../../../mask'
import api from '../../../services/api';
import moment from 'moment';

export default function OrdemServico() {
    
    const [numeroos, setNumeroOs] = useState('');
    const [datasolicitacao, setDataSolicitacao] = useState('');
    const [dataatendimento, setDataAtendimento] = useState('');
    const [clientefilialid, setClienteFilialId] = useState('');
    const [clienteFiliais, setClienteFiliais] = useState([]);
    const [tipoprojetoid, setTipoProjetoId] = useState('');
    const [tipoProjeto, setTipoProjeto] = useState([]);
    const [descricaoservico, setDescricaoServico] = useState('');
    const [tecnicoid, setTecnicoId] = useState('');
    const [tecnicos, setTecnicos] = useState([]);
    const [observacaoos, setObservacaoOs] = useState('');
    const [datafechamento, setDataFechamento] = useState('');
    const [horaentrada, setHoraEntrada] = useState('');
    const [horasaida, setHoraSaida] = useState('');
    const [qtdehoras, setQtdeHoras] = useState('');
    const [horaextra, setHoraExtra] = useState('');
    const [valorapagar, setValorPagar] = useState('');
    const [valorareceber, setValorReceber] = useState('');
    const [totalareceber, setTotalaReceber] = useState('');
    const [totalapagar, setTotalPagar,] = useState('');
    const [diadasemana, setDiaSemana] = useState('');
    const [custoadicional, setCustoAdicional] = useState('');
    const [ativo, setAtivo] = useState(1);
    const usuarioId = localStorage.getItem('userId');
    
    

    
    function handleSwitch(e) {
        if (ativo === 1) {
            setAtivo(0);
        }
        else {
            setAtivo(1);
        }
    }
    
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

    function handleDataAtendimento(e) {
        e.preventDefault();

        setDataAtendimento(e.currentTarget.value);     

        var dataAtendimento = String(moment(e.currentTarget.value));   
        
        var date = new Date(dataAtendimento);

        console.log(dataAtendimento);

        var diasDaSemana = new Array(7);
        diasDaSemana[0] = "Domingo";
        diasDaSemana[1] = "Segunda-feira";
        diasDaSemana[2] = "Terça-feira";
        diasDaSemana[3] = "Quarta-feira";
        diasDaSemana[4] = "Quinta-feira";
        diasDaSemana[5] = "Sexta-feira";
        diasDaSemana[6] = "Sábado";

        var diaDaSemana = diasDaSemana[date.getDay()];

        setDiaSemana(diaDaSemana);
    }

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
            ativo,
       };
       console.log(data);
        try {
            const response = await api.post('ordem-servico', data, {
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
                                            value={numeroos}
                                            onChange={e => setNumeroOs(numMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="dataSolicitacao">Data da Solicitação</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataSolicitacao"
                                                value={datasolicitacao}
                                                onChange={e => setDataSolicitacao(e.target.value)} />
                                                        <InputGroupAddon addonType="append">
                                                            <Button type="button" color= "secondary  fa fa-calendar fa-lg"></Button>
                                                        </InputGroupAddon>
                                            </InputGroup>            
                                    </Col>
                                    <Col md="3 ">
                                        <Label htmlFor="dataatendimento">Data atendimento</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataAtendimento" 
                                                value={dataatendimento}
                                                onChange={handleDataAtendimento} />

                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary  fa fa-calendar fa-lg"></Button>
                                                </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                    <Label htmlFor="didasemana">Dia Da semana</Label>
                                        <Input type="text" required id="txtDiasemana" disabled
                                            value={diadasemana}
                                            // onChange={e => setDiaSemana(e.target.value)}
                                        />
                                    </Col>
                                   
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="clienteFilialId">Filial do Cliente</Label>
                                        <InputGroup>
                                            <Input required type="select" name="select" id="cboClienteFilial"
                                                    value={clientefilialid}
                                                    onChange={e => setClienteFilialId(e.target.value)} >
                                        
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {clienteFiliais.map(clienteFilial => (                                                
                                                    <option value={clienteFilial.id}>{clienteFilial.nomefilial}</option>
                                                ))}  
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary  fa fa-building-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tiposervicoid">Tipo de Serviço</Label>
                                        <InputGroup>
                                            <Input required type="select" name="select" id="cboTipoServico"
                                                value={tipoprojetoid}
                                                onChange={e => setTipoProjetoId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tipoProjeto.map(tipoProjeto => (                                                
                                                    <option value={tipoProjeto.id}>{tipoProjeto.nometipoprojeto}</option>
                                                ))}  
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary icon-wrench"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tecnicoId"> Técnico</Label>
                                        <InputGroup>
                                            <Input required type="select" name="select" id="cobTecnico"
                                                value={tecnicoid}
                                                onChange={e => setTecnicoId(e.target.value)} >
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tecnicos.map(tecnico => (                                                
                                                    <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                                ))}  
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary  fa fa-user-md"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="9">
                                        <Label htmlFor="observacaoSs">Observações OS</Label>
                                        <Input type="textarea" size="16" rows="5" required id="txtObservacaoOs" placeholder="Observações"
                                            value={observacaoos}
                                            onChange={e => setObservacaoOs(e.target.value)} />
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
                                                value={descricaoservico}
                                                onChange={e => setDescricaoServico(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horaEntrada">Hora de Entrada</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHoraEntrada"
                                                placeholder="00:00:00"
                                                value={horaentrada}
                                                onChange={e => setHoraEntrada(e.target.value)} />
                                                 <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horaSaida">Hora de Saída</Label>
                                        <InputGroup>
                                            <Input type="time" required name="time" id="txtHoraSaida"
                                                value={horasaida}
                                                onChange={e => setHoraSaida(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>   
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="qtHoras">Quantidade de Horas</Label>
                                        <InputGroup>
                                            <Input type="time" id="txtqtdHoras" placeholder="00:00"
                                                value={qtdehoras}
                                                onChange={e => setQtdeHoras(e.target.value)} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-clock-o"></Button>
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
                                                    onChange={e => setValorPagar(reaisMask(e.target.value))} />                                                 
                                                    <InputGroupAddon addonType="append">                                                
                                                        <Button type="button" color= "secondary fa fa-money"></Button>
                                                    </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorReceber">Valor a Receber</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtValorReceber" placeholder="R$00,00"
                                                value={valorareceber}
                                                onChange={e => setValorReceber(reaisMask(e.target.value))} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-money"></Button>
                                                </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horaextra">Hora Extra</Label>
                                        <InputGroup>
                                            <Input type="time" id="txtHoraExtra" placeholder="00:00"
                                                value={horaextra}
                                                onChange={e => setHoraExtra(e.target.value)} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-clock-o"></Button>
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
                                                onChange={e => setTotalPagar(reaisMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                        <Col md="3">
                                            <Label htmlFor="totalreceber">Total a Receber</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtTotalReceber" placeholder="R$00,00"
                                                    value={totalareceber}
                                                    onChange={e => setTotalaReceber(reaisMask(e.target.value))} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-money"></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    <Col md="3">
                                            <Label htmlFor="custoAdicional">Custo Adicional</Label>
                                            <InputGroup>
                                                <Input type="text" id="txtCrustoAdicional" placeholder="R$00,00"
                                                    value={custoadicional}
                                                    onChange={e => setCustoAdicional(reaisMask(e.target.value))} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-money"></Button>
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