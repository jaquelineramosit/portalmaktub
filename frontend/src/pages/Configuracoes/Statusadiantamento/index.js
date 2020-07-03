import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Statusadiantamento = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var statusadiantamentoIdParam = props.match.params.id;


    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        status: '',
        descstatus: '',
        ativo: '1'
    });



    useEffect(() => {
        if (action === 'edit' && statusadiantamentoIdParam !== '') {

            api.get(`/status-adiantamento/${statusadiantamentoIdParam}`).then(response => {
                document.getElementById('txtStatus').value = response.data.status;
                document.getElementById('txtDescstatus').value = response.data.descstatus;

                setFormData({
                    ...formData,
                    status: response.data.status,
                    descstatus: response.data.descstatus,

                })

            });
        } else {
            return;
        }

    }, [statusadiantamentoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };


    async function handleStatusAdiantamento(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/status-adiantamento/${statusadiantamentoIdParam}`, data, {
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
                    const response = await api.post('status-adiantamento', data, {
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
            <Form onSubmit={handleStatusAdiantamento}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Status de Adiantamento</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="status">Status de Adiantamento</Label>
                                        <Input type="text" required id="txtStatus" placeholder="Inisira o Status"
                                            name="status"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" placeholder="Descreva o Status inserido" id="txtDescstatus"
                                            name="descstatus"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>
                                <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        onChange={handleSwitch}
                                        />                                    
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
};
export default Statusadiantamento;