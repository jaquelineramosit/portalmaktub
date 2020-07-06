import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, CardFooter, Form, InputGroupAddon } from 'reactstrap';
import { reaisMask } from '../../../mask'
import '../../../global.css';
import api from '../../../../src/services/api';

const Tipoprojeto = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var tipoprojetoIdParam = props.match.params.id;

    const [receita, setReceita] = useState();
    const [despesa, setDespesa] = useState();
    const [valorhoracobrado, setValorhoracobrado] = useState();
    const [valorhoratecnico, setValorhoratecnico] = useState();
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        nometipoprojeto: '',
        receita: '',
        despesa: '',
        horas: '',
        valorhoracobrado: '',
        valorhoratecnico: '',
        ativo: '1'
    });

    useEffect(() => {
        if (action === 'edit' && tipoprojetoIdParam !== '') {
            api.get(`tipo-projeto/${tipoprojetoIdParam}`).then(response => {
                document.getElementById('txtNomeTipoProjeto').value = response.data.nometipoprojeto;
                document.getElementById('txtReceita').value = response.data.receita;
                document.getElementById('txtDespesa').value = response.data.despesa;
                document.getElementById('txtHorastotal').value = response.data.horas;
                document.getElementById('txtValorhora').value = response.data.valorhoracobrado;
                document.getElementById('txtValorhoraTecnico').value = response.data.valorhoratecnico;

                setFormData({
                    ...formData,
                    nometipoprojeto: response.data.nometipoprojeto,
                    receita: response.data.receita,
                    despesa: response.data.despesa,
                    horas: response.data.horas,
                    valorhoracobrado: response.data.valorhoracobrado,
                    valorhoratecnico: response.data.valorhoratecnico,
                })
            });
        } else {
            return;
        }
    }, [tipoprojetoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'receita':
                setReceita(reaisMask(event.target.value));
                break;
            case 'despesa':
                setDespesa(reaisMask(event.target.value));
                break;
            case 'valorhoracobrado':
                setValorhoracobrado(reaisMask(event.target.value));
                break;
            case 'valorhoratecnico':
                setValorhoratecnico(reaisMask(event.target.value));
                break;
        }

        setFormData({ ...formData, [name]: value });
    };

    async function handleTipoProjeto(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/tipo-projeto/${tipoprojetoIdParam}`, data, {
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
                    const response = await api.post('tipo-projeto', data, {
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
            <Form onSubmit={handleTipoProjeto}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipo de Projeto</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="nomeTipoProjeto">Nome do Projeto</Label>
                                        <Input type="text" required id="txtNomeTipoProjeto" placeholder="Digite o nome do projeto"
                                            name="nometipoprojeto"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="despesa">Despesa</Label>
                                        <Input type="text" required id="txtDespesa" placeholder="R$00,00"
                                            value={despesa}
                                            name="despesa"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="receita">Receita</Label>
                                        <Input type="text" required id="txtReceita" placeholder="R$00,00"
                                            value={receita}
                                            name="receita"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horas">Horas Total do projeto</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHoras" required id="txtHorastotal"
                                                name="horas"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraCobrado">Valor hora Cobrado</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtValorHoraCobrado" placeholder="R$00,00" required id="txtValorhora"
                                                value={valorhoracobrado}
                                                name="valorhoracobrado"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraTecnico">Valor hora Técnico</Label>
                                        <InputGroup>
                                            <Input id="txtValorHoraTecnico" required type="text" placeholder="R$00,00" required id="txtValorhoraTecnico"
                                                value={valorhoratecnico}
                                                name="valorhoratecnico"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-money"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup>    
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />
                                    </Col>
                                </FormGroup> */}
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
export default Tipoprojeto;