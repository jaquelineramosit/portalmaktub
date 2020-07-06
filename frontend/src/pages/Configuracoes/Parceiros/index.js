import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroupAddon, CardFooter, Form, InputGroup } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Parceiros = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var parceirosIdParam = props.match.params.id;

    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        nomeparceiro: '',
        descricao: '',
        ativo: '1'
    });

    useEffect(() => {
        if (action === 'edit' && parceirosIdParam !== '') {
            api.get(`parceiro/${parceirosIdParam}`).then(response => {
                document.getElementById('txtNomeParceiro').value = response.data.nomeparceiro;
                document.getElementById('txtDescricao').value = response.data.descricao;

                setFormData({
                    ...formData,
                    nomeparceiro: response.data.nomeparceiro,
                    descricao: response.data.descricao,
                })
            });
        } else {
            return;
        }
    }, [parceirosIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleTicket(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/parceiro/${parceirosIdParam}`, data, {
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
                    const response = await api.post('parceiro', data, {
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
            <Form onSubmit={handleTicket}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Parceiro</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeParceiro">Nome do Parceiro</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeParceiro" placeholder="Digite o nome do Parceiro"
                                                name="nomeparceiro"
                                                onChange={handleInputChange} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-handshake-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" required id="txtDescricao" rows="5" placeholder="Descreva o parceiro inserido"
                                            name="descricao"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
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
export default Parceiros;