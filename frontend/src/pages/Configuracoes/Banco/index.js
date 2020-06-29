import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Banco = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var bancoIdParam = props.match.params.id;


    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        codbanco: '',
        nomebanco: '',
        ativo:'1'
    });

    useEffect(() => {
        if (action === 'edit' && bancoIdParam !== '') {
            api.get(`banco/${bancoIdParam}`).then(response => {
                document.getElementById('txtCodBanco').value = response.data.codbanco;
                document.getElementById('txtNomeBanco').value = response.data.nomebanco;

                setFormData({
                    ...formData,
                    status: response.data.status,
                    nomebanco: response.data.nomebanco,
                })
            });
        } else {
            return;
        }
    }, [bancoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleTicket(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/banco/${bancoIdParam}`, data, {
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
                    const response = await api.post('banco', data, {
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
                                <strong>Banco</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="codBanco">Código do Banco</Label>
                                        <Input type="text" required id="txtCodBanco" placeholder="Digite o Código do banco"
                                            name="codbanco"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="codBanco">Nome do Banco</Label>
                                        <Input type="text" required id="txtNomeBanco" placeholder="Digite o Nome do Banco"
                                              name="nomebanco"
                                              onChange={handleInputChange}  />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
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
export default Banco;