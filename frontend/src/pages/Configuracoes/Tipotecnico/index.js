import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Tipotecnico = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var tipotecnicoIdParam = props.match.params.id;

    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        nometipotecnico: '',
        desctipotecnico: '',
        ativo: '1'
    });

    useEffect(() => {
        if (action === 'edit' && tipotecnicoIdParam !== '') {
            api.get(`tipo-tecnico/${tipotecnicoIdParam}`).then(response => {
                document.getElementById('txtNomeTipoTecnico').value = response.data.nometipotecnico;
                document.getElementById('txtDescricao').value = response.data.desctipotecnico;

                setFormData({
                    ...formData,
                    nometipotecnico: response.data.nometipotecnico,
                    desctipotecnico: response.data.desctipotecnico,
                })
            });
        } else {
            return;
        }
    }, [tipotecnicoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleTipoTecnico(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/tipo-tecnico/${tipotecnicoIdParam}`, data, {
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
                    const response = await api.post('tipo-tecnico', data, {
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
            <Form onSubmit={handleTipoTecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipo de Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeTipoTecnico">Nome do Tipo de Técnico</Label>
                                        <Input type="text" required id="txtNomeTipoTecnico" placeholder="Digite o Tipo de Técnico"
                                            name="nometipotecnico"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" placeholder="Descreva o Tipo de Técnico inserido" required id="txtDescricao"
                                            name="desctipotecnico"
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
export default Tipotecnico;