import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../services/api';

export default function Oportunidades() {
    const [numeroos, setNumeroOs] = useState('');
    const [datasolicitacao, setDataSolicitacao] = useState('');
    const [dataatendimento, setDataAtendimento] = useState('');
    const [clientefilialid, setClienteFilialId] = useState('');
    const [tiposervicoid, setTipoServicoId] = useState('');
    const [descricaoservico, setDescricaoServico] = useState('');
    const [tecnicoid, setTecnicoId] = useState('');
    const [observacaoos, setObservacaoOs] = useState('');
    const [datafechamento, setDataFechamento] = useState('');
    const [horaentrada, setHoraEntrada] = useState('');
    const [horasaida, setHoraSaida] = useState('');
    const [qtdehoras, setQtdeHoras] = useState('');
    const [horaextra, setHoraExtra] = useState('');
    const [valorapagar, setValorApagar] = useState('');
    const [valorareceber, setValorareceber] = useState('');
    const [totalareceber, setTotalareceber] = useState('');
    const [totalapagar, setTotalApagar,] = useState('');
    const [diadasemana, setDiadasemana] = useState('');
    const [custoadicional, setCustoadicional] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



    async function handleClientes(e) {
        e.preventDefault();

        const data = {
            numeroos,
            datasolicitacao,
            dataatendimento,
            clientefilialid,
            tiposervicoid,
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

        try {
            const response = await api.post('oportunidades', data, {
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
                                <strong>Onrdem de Serviço</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="numeroos">Numero da OS</Label>
                                        <Input type="text" required id="txtNomecliente" placeholder="Numero OS"
                                            value={numeroos}
                                            onChange={e => setNumeroOs(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="datasolicitacao">Data da Solicitação</Label>
                                        <Input type="date" required id="txtBairro"
                                            value={datasolicitacao}
                                            onChange={e => setDataSolicitacao(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3 ">
                                        <Label htmlFor="dataatendimento">Data atendimento</Label>
                                        <Input type="date" required id="txtRazaosocial" 
                                            value={dataatendimento}
                                            onChange={e => setDataAtendimento(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="clientefilialid">Filial do Cliente</Label>
                                        <Input required type="select" name="select" id="txtParceiroid"
                                            value={clientefilialid}
                                            onChange={e => setTecnicoId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Filial1</option>
                                            <option value={2}>Filial2</option>

                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tiposervicoid">Tipo de Serviço</Label>
                                        <Input required type="select" name="select" id="txtParceiroid"
                                            value={tiposervicoid}
                                            onChange={e => setTecnicoId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Tiposervico1</option>
                                            <option value={2}>Tiposervico2</option>

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="10">
                                            <Label htmlFor="descricaoservico">Descrição do Serviço</Label>
                                            <InputGroup>
                                                <Input id="txtCEP" size="16" required type="text"
                                                    value={descricaoservico}
                                                    onChange={e => setDescricaoServico(e.target.value)} />
                                            </InputGroup>
                                        </Col>
                                </FormGroup>    
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="tecnicoid"> Tecinico</Label>
                                        <Input required type="select" name="select" id="txtParceiroid"
                                            value={tecnicoid}
                                            onChange={e => setTecnicoId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Tecnico1</option>
                                            <option value={2}>Tecnico2</option>
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="datafechamento">Data de Fechamento</Label>
                                        <Input type="date" required id="txtBairro" placeholder="Digite a Cidade"
                                            value={datafechamento}
                                            onChange={e => setDataFechamento(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="horaentrada">Hora de Entrada</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                value={horaentrada}
                                                onChange={e => setHoraEntrada(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="horasaida">Hora de Saida</Label>
                                        <Input type="time" required name="time" id="ddlUF"
                                            value={horasaida}
                                            onChange={e => setHoraSaida(e.target.value)}>
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                    <Label htmlFor="qtdehoras">Qtd de Horas</Label>
                                        <InputGroup>
                                            <Input type="time" id="txtTelefoneFixo" placeholder="00:00"
                                                value={qtdehoras}
                                                onChange={e => setQtdeHoras(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="horaextra">Hora Extra</Label>
                                        <InputGroup>
                                            <Input type="time" id="txtTelefoneCelular" placeholder="00:00"
                                                value={horaextra}
                                                onChange={e => setHoraExtra(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="2">
                                        <Label htmlFor="totalapagar">Total a Pagar</Label>
                                        <InputGroup>
                                            <Input type="number" id="txtTelefoneresponsavel" placeholder="00,00"
                                                value={totalapagar}
                                                onChange={e => setTotalApagar(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="valorareceber">Total a Pagar</Label>
                                        <InputGroup>
                                            <Input type="number" id="txtTelefoneresponsavel" placeholder="00,00"
                                                value={valorareceber}
                                                onChange={e => setValorareceber(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="valorapagar">Valor a pagar</Label>
                                        <InputGroup>
                                            <Input type="number" id="txtTelefoneresponsavel" placeholder="00,00"
                                                value={valorapagar}
                                                onChange={e => setValorApagar(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="10">
                                        <Label htmlFor="observacaoos">Observação OS</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={observacaoos}
                                            onChange={e => setObservacaoOs(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={ativo}
                                            onChange={e => setAtivo(e.target.value)}/>
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