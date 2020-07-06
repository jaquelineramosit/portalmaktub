import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Movimentacaoos = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var movimentacaoosIdParam = props.match.params.id;

    const [ordemservicos, setOrdemServicos] = useState([]);
    const [statusatendimentos, setStatusAtendimentos] = useState([]);
    const [statuspagamentos, setStatusPagamentos] = useState([]);
    const [statuscobrancas, setStatusCobrancas] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        ordemservicoid: 1,
        statusatendimentoid: 1,
        statuspagamentoid: 1,
        statuscobrancaid: 1,
        observacao: '',
        ativo: 1
    });
    useEffect(() => {
        api.get('ordem-servico').then(response => {
            setOrdemServicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-atendimento').then(response => {
            setStatusAtendimentos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-cobranca').then(response => {
            setStatusCobrancas(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('status-pagamento').then(response => {
            setStatusPagamentos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && movimentacaoosIdParam !== '') {
            api.get(`movimentacao-os/${movimentacaoosIdParam}`).then(response => {
                document.getElementById('cboOrdemServicoId').value = response.data.ordemservicoid;
                document.getElementById('cboStatusAtendimentoId').value = response.data.statusatendimentoid;
                document.getElementById('cboStatusCobrancaId').value = response.data.statuscobrancaid;
                document.getElementById('cboStatuspPagamentoId').value = response.data.statuspagamentoid;
                document.getElementById('txtObservacao').value = response.data.observacao;

                setFormData({
                    ...formData,
                    ordemservicoid: response.data.ordemservicoid,
                    statusatendimentoid: response.data.statusatendimentoid,
                    statuscobrancaid: response.data.statuscobrancaid,
                    statuspagamentoid: response.data.statuspagamentoid,
                    observacao: response.data.observacao,

                })
            });
        } else {
            return;
        }
    }, [movimentacaoosIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };
    console.log(formData)

    async function handleMovimentacaoos(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/movimentacao-os/${movimentacaoosIdParam}`, data, {
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
                    const response = await api.post('movimentacao-os', data, {
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
            <Form onSubmit={handleMovimentacaoos}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Movimentação de OS</strong>
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
                                                <option key={ordemservico.id} value={ordemservico.id}>{ordemservico.numeroos}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusAtendimentoId">Status Atendimento</Label>
                                        <Input type="select" required name="select" id="cboStatusAtendimentoId" multiple={false}
                                            name="statusatendimentoid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statusatendimentos.map(statusatendimento => (
                                                <option key={statusatendimento.id} value={statusatendimento.id}>{statusatendimento.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="statusCobrancaId">Status Cobrança</Label>
                                        <Input type="select" required name="select" id="cboStatusCobrancaId" multiple={false}
                                            name="statuscobrancaid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statuscobrancas.map(statuscobranca => (
                                                <option key={statuscobranca.id} value={statuscobranca.id}>{statuscobranca.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusPagamentoId">Status Pagamento</Label>
                                        <Input type="select" required name="select" id="cboStatuspPagamentoId" multiple={false}
                                            name="statuspagamentoid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {statuspagamentos.map(statuspagamento => (
                                                <option key={statuspagamento.id} value={statuspagamento.id}>{statuspagamento.status}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md="8">
                                        <Label>Observação</Label>
                                        <Input type="textarea" rows="5" placeholder="Digite a obsevação" required id="txtObservacao"
                                            name="observacao"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
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
export default Movimentacaoos;