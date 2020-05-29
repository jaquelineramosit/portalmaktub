import React, { useState, useEffect} from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form,  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Movimentacaoos() {   
    const [ordemservicoid, setOrdemServicoId] = useState('');
    const [ordemservicos, setOrdemServicos] = useState([]);
    const [statusatendimentoid, setStatusAtendimentoId] = useState('');
    const [statusatendimentos, setStatusAtendimentos] = useState([]);
    const [statuspagamentoid, setStatusPagamentoId] = useState('');
    const [statuspagamentos, setStatusPagamentos] = useState([]);
    const [statuscobrancaid, setStatusCobrancaId] = useState('');
    const [statuscobrancas, setStatusCobrancas] = useState([]);
    const [observacao, setObservacao] = useState('');
    const [ativo, setAtivo] = useState('true');
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


    async function handleMovimentacaoos(e) {
        e.preventDefault();

        const data = {
            ordemservicoid,
            statusatendimentoid,
            statuspagamentoid,
            statuscobrancaid,
            observacao,
            ativo,
        }
        try {
            const response = await api.post('movimentacao-os', data, {
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
                                        <Input type="select" required name="select" id="cboOrdemServicoId" multiple = {false}
                                            value={ordemservicoid}
                                            onChange={e => setOrdemServicoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {ordemservicos.map(ordemservico => (                                                
                                                <option key={ordemservico.id} value={ordemservico.id}>{ordemservico.numeroos}</option>
                                            ))}                                           
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusAtendimentoId">Status Atendimento</Label>
                                        <Input type="select" required name="select" id="cboStatusAtendimentoId" multiple = {false}
                                            value={statusatendimentoid}
                                            onChange={e => setStatusAtendimentoId(e.target.value)}>
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
                                        <Input type="select" required name="select" id="cboStatusCobrancaId" multiple = {false}
                                            value={statuscobrancaid}
                                            onChange={e => setStatusCobrancaId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {statuscobrancas.map(statuscobranca => (                                                
                                                <option key={statuscobranca.id}value={statuscobranca.id}>{statuscobranca.status}</option>
                                                ))}                                           
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusPagamentoId">Status Pagamento</Label>
                                        <Input type="select" required name="select" id="cboStatuspPagamentoId" multiple = {false}
                                            value={statuspagamentoid}
                                            onChange={e => setStatusPagamentoId(e.target.value)}>
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
                                        <Input type="textarea" rows="5" placeholder="Digite a obsevação"
                                            value={observacao}
                                            onChange={e => setObservacao(e.target.value)} />
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