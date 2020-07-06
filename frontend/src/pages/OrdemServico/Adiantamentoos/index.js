import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { reaisMask } from '../../../mask'
import api from '../../../../src/services/api';
const dateFormat = require('dateformat');

const Adiantamentoos = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var adiantamentoosIdParam = props.match.params.id;

    const [valoradiantamento, setValorAdiantamento] = useState();
    const [ordemservicos, setOrdemServicos] = useState([]);
    const [statusAdiantamentos, setStatusAdiantamentos] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        ordemservicoid: 1,
        valoradiantamento: '',
        dataadiantamento: '',
        dataquitacao: '',
        statusadiantamentoid: 1,
        ativo: 1
    });

    useEffect(() => {
        api.get('ordem-servico').then(response => {
            setOrdemServicos(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('status-adiantamento').then(response => {
            setStatusAdiantamentos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && adiantamentoosIdParam !== '') {
            api.get(`adiantamento-os/${adiantamentoosIdParam}`).then(response => {
                document.getElementById('cboOrdemServicoId').value = response.data.ordemservicoid;
                document.getElementById('cboStatusAdiantamentoId').value = response.data.statusadiantamentoid;
                document.getElementById('txtDataAdiantamento').value = dateFormat(response.data.dataadiantamento, "yyyy-mm-dd");
                document.getElementById('txtDataquitacao').value = dateFormat(response.data.dataquitacao, "yyyy-mm-dd");
                document.getElementById('txtValorAdiantamento').value = response.data.valoradiantamento; 

                setFormData({
                    ...formData,
                    ordemservicoid: response.data.ordemservicoid,
                    statusadiantamentoid: response.data.statusadiantamentoid,
                    dataadiantamento: response.data.dataadiantamento,
                    dataquitacao: response.data.dataquitacao,
                    valoradiantamento: response.data.valoradiantamento,

                })
            });
        } else {
            return;
        }
    }, [adiantamentoosIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'valoradiantamento':
                setValorAdiantamento(reaisMask(event.target.value));
                break;
        }

        setFormData({ ...formData, [name]: value });
    };
    console.log(formData)

    async function handleAdiantamentoOs(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/adiantamento-os/${adiantamentoosIdParam}`, data, {
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
                    const response = await api.post('adiantamento-os', data, {
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
            <Form onSubmit={handleAdiantamentoOs}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Adiantamento de OS</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="ordemServicoId">Ordem de Serviço</Label>
                                        <Input type="select" required name="select" id="cboOrdemServicoId" multiple={false}
                                            name="ordemservicoid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {ordemservicos.map(ordemservico => (
                                                <option value={ordemservico.id}>{ordemservico.numeroos}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusAtendimentoId">Status do Adiantamento</Label>
                                        <Input type="select" required name="select" id="cboStatusAdiantamentoId" multiple={false}
                                            name="statusadiantamentoid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statusAdiantamentos.map(statusAdiantamento => (
                                                <option value={statusAdiantamento.id}>{statusAdiantamento.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="dataAdiantamento">Data do Adiantamento</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataAdiantamento"
                                                name="dataadiantamento"
                                                onChange={handleInputChange} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-calendar"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="dataquitacao">Data da quitacao</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataquitacao"
                                                name="dataquitacao"
                                                onChange={handleInputChange}>
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-calendar"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="valorAdiantamento">Valor do Adiantamento</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtValorAdiantamento" placeholder="00,00"
                                                value={valoradiantamento}
                                                name="valoradiantamento"
                                                onChange={handleInputChange} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary  fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    {/*<Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />
                                        </Col>*/}
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
export default Adiantamentoos;