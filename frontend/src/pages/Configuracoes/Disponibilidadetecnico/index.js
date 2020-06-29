import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const DisponibilidadeTecnico = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var dispotecnicoIdParam = props.match.params.id;

    const [disponibilidades, setDisponibilidades] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        disponibilidadeId: 0,
        tecnicoId: 0,
        ativo:'1'
    });


    useEffect(() => {
        api.get('disponibilidade').then(response => {
            setDisponibilidades(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && dispotecnicoIdParam !== '') {
            api.get(`disponibilidade-tecnico/${dispotecnicoIdParam}`).then(response => {
                document.getElementById('cboDisponibilidadeId').value = response.data.disponibilidadeId;
                document.getElementById('cboTecnicoId').value = response.data.tecnicoId;

                setFormData({
                    ...formData,
                    disponibilidadeId: response.data.disponibilidadeId,
                    tecnicoId: response.data.tecnicoId,
                })
            });
        } else {
            return;
        }
    }, [dispotecnicoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleTicket(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/disponibilidade-tecnico/${dispotecnicoIdParam}`, data, {
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
                    const response = await api.post('disponibilidade-tecnico', data, {
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
                                <strong>Disponibilidade do Técnico</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="disponibilidadeId">Disponibilidade</Label>
                                        <Input type="select" required name="select" id="cboDisponibilidadeId" multiple={false}
                                            name="disponibilidadeId"
                                            onChange={handleInputChange} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {disponibilidades.map(disponibilidade => (
                                                <option value={disponibilidade.id}>{disponibilidade.nomedisponibilidade}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTecnicoId" multiple={false}
                                            name="tecnicoId"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tecnicos.map(tecnico => (
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}
                                        </Input>
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
export default DisponibilidadeTecnico;