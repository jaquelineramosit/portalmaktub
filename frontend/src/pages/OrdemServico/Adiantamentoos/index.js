import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { reaisMask } from '../../../mask';
import NumberFormat from 'react-number-format';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';
import BadgeStatus from '../../../components/BadgeStatus';

const dateFormat = require('dateformat');

let SerializedOs = [];
let ossDoAdiant = [];

export default function Adiantamentoos(props) {
    const [redirect, setRedirect] = useState(false);
    const [toggledClearRows, setToggledClearRows] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var adiantamentoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [ordemservicoid, setOrdemservicoid] = useState(0);
    const [tecnicoid, setTecnicoid] = useState(0);
    const [valoradiantamento, setValoradiantamento] = useState(0);
    const [valoradiantamentoFormatado, setValoradiantamentoFormatado] = useState(0);
    const [dataadiantamento, setDataadiantamento] = useState('');
    const [dataquitacao, setDataquitacao] = useState('');
    const [statusadiantamentoid, setStatusadiantamentoid] = useState('');
    const [ordemservicos, setOrdemservicos] = useState([]);
    const [tecnicosid, setTecnicosid] = useState([]);
    const [statusAdiantamentosid, setStatusAdiantamentosid] = useState([]);
    const [ativo, setAtivo] = useState(1);
    const [ossasalvar, setOssasalvar] = useState([]);

    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-adiantamento').then(response => {
            setStatusAdiantamentosid(response.data);
        })
    }, [usuarioId]);


    useEffect(() => {
        if (action === 'edit' && adiantamentoIdParam !== '') {
            api.get(`adiantamento-os/${adiantamentoIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setValoradiantamento(response.data.adiantamentoos.valoradiantamento);
                setValoradiantamentoFormatado(response.data.adiantamentoos.valoradiantamento);
                setDataadiantamento(dateFormat(response.data.adiantamentoos.dataadiantamento, "yyyy-mm-dd"));
                setDataquitacao(dateFormat(response.data.adiantamentoos.dataquitacao, "yyyy-mm-dd"));
                setStatusadiantamentoid(response.data.adiantamentoos.statusadiantamentoid);
                setTecnicoid(response.data.ossDoAdiant[0].tecnicoid);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
                setOrdemservicos(response.data.ossDoAdiant)
            });
        } else {
            return;
        }
    }, [adiantamentoIdParam]);

    function handleInputChange(event) {
        const { name, value } = event.target;

        switch (name) {
            case 'ativo':
                if (ativo === 1) {
                    setAtivo(0);
                } else {
                    setAtivo(1);
                }
                break;
            case 'tecnicoid':
                setOrdemservicos([]);
                if (value !== 'Selecione...') {
                    api.get(`ordem-servico-tecnico/${value}`).then(response => {
                        clearSelectedRows();
                        setValoradiantamento(0);
                        setValoradiantamentoFormatado(0);
                        setOrdemservicos(response.data);
                        setTecnicoid(value);
                    });
                } else {
                    clearSelectedRows();
                    setValoradiantamentoFormatado(0);
                    setTecnicoid(0);
                }
                break;
        }
    };

    //função para limpar as linhas selecionadas da tabela
    function clearSelectedRows() {
        if ( toggledClearRows === false ) {
            setToggledClearRows(true);
        } else {
            setToggledClearRows(false);
        }
    }

    function handleTableSelect(event) {
        SerializedOs = event.selectedRows;

        //pega o resultado da selecão das linhas da tabela e mapeia para pegar o valor da OS e o valor do adiantamento
        SerializedOs = SerializedOs.map (os => {
            return {
                id: os.id,
                valorapagar: os.valorapagar
            }
        });

        //zera o valor do adiantamento e refaz o cálculo para a nova seleção
        let valorAdiantamentoTemp = 0;
        for (let i = 0; i < SerializedOs.length; i++) {
            valorAdiantamentoTemp = valorAdiantamentoTemp + SerializedOs[i].valorapagar;
        }
        setValoradiantamento(valorAdiantamentoTemp);
        setValoradiantamentoFormatado(valorAdiantamentoTemp)
        setOssasalvar(SerializedOs);

    }
 
    function handleReset() {
        setRedirect(true);
    };

    async function handleStatus(e) {
        e.preventDefault();

        if (ossasalvar.length === 0 && action === 'novo') {
            alert('É necessário escolher uma OS para adiantamento');
            return
        }


        const data = {
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
            ossasalvar
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/adiantamento-os/${adiantamentoIdParam}`, data, {
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
                    const response = await api.post('adiantamento-os', data, {
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

    const DivClienteFilial = (props) => {
        const cliente = props.cliente;
        const filial = props.filial;
        const ordemservicoId = props.id;
        return (
            <div>
                <div key={`cliente${ordemservicoId}`}>
                    <i className="fa fa-handshake-o mr-2" title="Cliente"></i>
                    {cliente}
                </div>
                <div key={`filial${ordemservicoId}`} className="small text-muted">
                    <i className="fa fa-building mr-1" title="Filial"></i>
                    {filial}
                </div>
            </div>
        )
    }

    const tableData = ordemservicos;

    const columns = [
        {
            name: 'Nº de OS',
            selector: 'numeroos',
            sortable: true,
            center: true,
            width: '12%',
        },
        {
            name: 'Filial',
            selector: 'nomefilial',
            name: 'Cliente / Filial',
            selector: 'nomecliente',
            sortable: true,
            width: '20%',
            cell: row => <DivClienteFilial key={`divFilial${row.id}`} cliente={row.nomecliente} filial={row.nomefilial} ordemservicoId={row.id}> </DivClienteFilial>,
        },
        {
            name: 'Técnico',
            selector: 'nometecnico',
            sortable: true,
            center: false,
            width: '25%',
        },
        {
            name: 'Projeto',
            selector: 'nometipoprojeto',
            sortable: true,
            center: true,
            width: '20%',
        },
        {
            name: 'Valor a Pagar',
            selector: 'valorapagar',
            sortable: true,
            center: true,
            width: '15%',
        },
    ];

    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-adiantamento-os" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Adiantamento de OS</strong>
                                <small id="txtSmall"> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="ordemServicoId">Ordem de Serviço</Label>
                                        <Input type="select" required name="select" id="cboOrdemServicoId" multiple={false}
                                            name="ordemservicoid"
                                            value={ordemservicoid}
                                            onChange={e => setOrdemservicoid(e.target.value)}>
                                            <option value="" defaultValue>Selecione...</option>
                                            {ordemservicos.map(ordemservico => (
                                                <option value={ordemservico.id}>{ordemservico.numeroos}</option>
                                                ))}
                                                </Input>
                                                </Col>
                                    <Col md="6">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTecnicoId" multiple={false}
                                            name="tecnicoid"
                                            value={tecnicoid}
                                            readOnly={action === "edit" ? true : false}
                                            onChange={handleInputChange}>
                                            <option value="" defaultValue>Selecione...</option>
                                            {tecnicosid.map(tecnico => (
                                                <option key={`tecnicoid${tecnico.id}`} value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="statusAtendimentoId">Status do Adiantamento</Label>
                                        <Input type="select" required name="select" id="cboStatusAdiantamentoId" multiple={false}
                                            name="statusadiantamentoid"
                                            value={statusadiantamentoid}
                                            onChange={e => setStatusadiantamentoid(e.target.value)}>
                                            <option value="" defaultValue>Selecione...</option>
                                            {statusAdiantamentosid.map(statusAdiantamento => (
                                                <option key={`statusAdiantamento${statusAdiantamento.id}`} value={statusAdiantamento.id}>{statusAdiantamento.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorAdiantamento">Valor do Adiantamento</Label>
                                        <InputGroup>
                                        <NumberFormat
                                            id={'txtValorAdiantamento'}
                                            name={'txtValorAdiantamento'}
                                            className={'form-control'}
                                            decimalScale={2}
                                            fixedDecimalScale={true}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            prefix={'R$ '}
                                            placeholder={'R$ 0,00'}
                                            readOnly={true}
                                            value={valoradiantamentoFormatado}
                                            onValueChange={(values) => {
                                                const {formattedValue, value} = values;
                                                setValoradiantamento(values.value);
                                                setValoradiantamentoFormatado(values.formattedValue);
                                            }}
                                        />
                                            {/* <Input type="text" required id="txtValorAdiantamento" placeholder="00,00"
                                                value={valoradiantamento}
                                                readOnly={true}
                                                name="valoradiantamento"
                                                onChange={e => setValoradiantamento(reaisMask(e.target.value))} /> */}
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-money"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="dataAdiantamento">Data do Adiantamento</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataAdiantamento"
                                                name="dataadiantamento"
                                                value={dataadiantamento}
                                                onChange={e => setDataadiantamento(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-calendar"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="dataquitacao">Data da quitação</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataquitacao"
                                                name="dataquitacao"
                                                value={dataquitacao}
                                                onChange={e => setDataquitacao(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-calendar"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardHeader>
                                <strong>Ordens de Serviço</strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="12">
                                        <DataTableGenerica
                                            data={tableData}
                                            columns={columns}
                                            title="Ordem de Serviço"
                                            selectableRows={action !== "edit" ? true : false}
                                            onSelectedRowsChange={handleTableSelect}
                                            clearSelectedRows={toggledClearRows}
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
