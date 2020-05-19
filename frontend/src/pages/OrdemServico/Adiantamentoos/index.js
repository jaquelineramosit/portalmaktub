import React, { useState, useEffect} from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup , InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Adiantamentoos() {
    const [ordemservicoid, setOrdemServicoId] = useState('');
    const [ordemservicos, setOrdemServicos] = useState([]);
    const [valoradiantamento, setValorAdiantamento] = useState('');
    const [dataadiantamento, setDataAdiantamento] = useState('');
    const [dataquitacao, setDataQuitacao] = useState('');  
    const [statusadiantamentoid, setStatusAdiantamentoId] = useState('');
    const [statusAdiantamentos, setStatusAdiantamentos] = useState([]);
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');

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

    async function handleAdiantamentoOs(e) {
        e.preventDefault();

        const data = {
            ordemservicoid,
            valoradiantamento,
            dataadiantamento,
            dataquitacao,
            statusadiantamentoid,
            ativo,
        };

        try {
            const response = await api.post('adiantamento-os', data, {
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
                                        <Input type="select" required name="select" id="cboOrdemServicoId" multiple = {false}
                                            value={ordemservicoid}
                                            onChange={e => setOrdemServicoId(e.target.value)}>
                                               <option value={undefined} defaultValue>Selecione...</option>
                                                 {ordemservicos.map(ordemservico => (                                                
                                                <option value={ordemservico.id}>{ordemservico.numeroos}</option>
                                                ))}                                            
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="statusAtendimentoId">Status do Adiantamento</Label>
                                        <Input type="select" required name="select" id="cboStatusAdiantamentoId" multiple = {false}
                                         value={statusadiantamentoid}
                                        onChange={e => setStatusAdiantamentoId(e.target.value)}>>
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
                                                value={dataadiantamento}
                                                onChange={e => setDataAdiantamento(e.target.value)} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary  fa fa-calendar"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="dataquitacao">Data da quitacao</Label>
                                        <InputGroup>
                                            <Input type="date" required id="txtDataquitacao"                                             
                                                value={dataquitacao}
                                                onChange={e => setDataQuitacao(e.target.value)}>
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary  fa fa-calendar"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="valorAdiantamento">Valor do Adiantamento</Label>
                                        <InputGroup>
                                            <Input type="number" required id="txtValorAdiantamento"  placeholder ="00,00"
                                                value={valoradiantamento}
                                                onChange={e => setValorAdiantamento(e.target.value)} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary  fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>            
                                    </Col>                              
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={ativo}
                                            onChange={e => setAtivo(e.target.value)}
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