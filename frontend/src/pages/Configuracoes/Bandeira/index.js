import React, { useState,useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../services/api';

const Bandeira = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var bandeiraIdParam = props.match.params.id;

    const usuarioId = localStorage.getItem('userId');
    const localId = localStorage.getItem('localId');
    const [formData, setFormData] = useState({
        nomebandeira: '',
        localId: localId,
    });

    useEffect(() => {
        if (action === 'edit' && bandeiraIdParam !== '') {
            api.get(`bandeira/${bandeiraIdParam}`).then(response => {
                document.getElementById('txtNomeBandeira').value = response.data.nomebandeira;

                setFormData({
                    ...formData,
                    status: response.data.status,
                    nomebandeira: response.data.nomebandeira,
                })
            });
        } else {
            return;
        }
    }, [bandeiraIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleTicket(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/bandeira/${bandeiraIdParam}`, data, {
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
                    const response = await api.post('bandeira', data, {
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
                                <strong>Bandeira</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeBandeira">Nome da Bandeira</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeBandeira" placeholder="Digite o nome da Bandeira"
                                               name="nomebandeira"
                                               onChange={handleInputChange} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-flag"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>              
                                    </Col>
                                </FormGroup>
                               {/*} <FormGroup>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                         onChange={handleSwitch} />                                  
                                    </Col>     
                                </FormGroup>*/ }                               
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
export default Bandeira;