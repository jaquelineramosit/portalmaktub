import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Projetotecnico = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var projtecnicoIdParam = props.match.params.id;

    const [tipoprojetos, setTipoProjetos] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        tecnicoid: 1,
        tipoprojetoid: 1,
        ativo: '1'
    });
    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('tipo-projeto').then(response => {
            setTipoProjetos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && projtecnicoIdParam !== '') {
            api.get(`projeto-tecnico/${projtecnicoIdParam}`).then(response => {
                document.getElementById('cboTécnicoId').value = response.data.tecnicoid;
                document.getElementById('cboTipoProjetoId').value = response.tipoprojetoid;
              


                setFormData({
                    ...formData,
                    tecnicoid: response.data.tecnicoid,
                    tipoprojetoid: response.data.tipoprojetoid,

                })
                

            });
        } else {
            return;
        }
    }, [projtecnicoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };
    console.log(formData)


    async function handleTicket(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/projeto-tecnico/${projtecnicoIdParam}`, data, {
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
                    const response = await api.post('projeto-tecnico', data, {
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
                                <strong>Projeto X Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required id="cboTécnicoId" multiple={false}
                                            name="tecnicoid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tecnicos.map(tecnico => (
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="tipoTrojetoId">Tipo de Projeto</Label>
                                        <Input type="select" required id="cboTipoProjetoId" multiple={false} key
                                            name="tipoprojetoid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tipoprojetos.map(tipoProjeto => (
                                                <option value={tipoProjeto.id}>{tipoProjeto.nometipoprojeto}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup row>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                         onChange={handleSwitch}
                                        />                                    
                                    </Col>                           
                                </FormGroup>   */}
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
export default Projetotecnico;