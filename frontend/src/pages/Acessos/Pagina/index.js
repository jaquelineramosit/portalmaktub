import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button,  CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Paginas = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var paginasIdParam = props.match.params.id;

    const [modulos, setModulos] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        moduloId: 1,
        nomePagina: '',
        descricao: '',
        ativo: 1
    });
    

    useEffect(() => {
        api.get('modulos').then(response => {
            setModulos(response.data);
        })
    }, [usuarioId]);


    useEffect(() => {
        if (action === 'edit' && paginasIdParam !== '') {
            api.get(`paginas/${paginasIdParam}`).then(response => {
                document.getElementById('cboModuloId').value = response.data.moduloid;
                document.getElementById('txtNomePagina').value = response.data.nomepagina;
                document.getElementById('txtDescricao').value = response.data.descricao;

                setFormData({
                    ...formData,
                    moduloid: response.data.moduloid,
                    nomepagina: response.data.nomepagina,
                    descricao: response.data.descricao,
                    
                })
                console.log(formData)
            });
        } else {
            return;
        }
    }, [paginasIdParam])


    

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

console.log(formData)
    async function handlePagina(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/paginas/${paginasIdParam}`, data, {
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
                    const response = await api.post('paginas', data, {
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
            <Form onSubmit={handlePagina}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Página</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="moduloId">Qual o Módulo</Label>
                                        <Input type="select" required id="cboModuloId"
                                            name="moduloId"
                                           onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {modulos.map(modulo => (
                                                <option value={modulo.id}>{modulo.nomemodulo}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nomePagina">Nome da Página</Label>
                                        <Input type="text" id="txtNomePagina" multiple placeholder="Digite o nome da Página"
                                            name="nomePagina"
                                            onChange={handleInputChange} 
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="10">
                                        <Label htmlFor="descricao">Descrição</Label>
                                        <Input type="textarea" id="txtDescricao" multiple placeholder="Digite a Descrição"
                                            name="descricao"
                                            onChange={handleInputChange} 
                                        />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>                                     
                                    <Col md="2">
                                        <Label htmlFor="Ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} 
                                            defaultChecked 
                                            onChange={handleSwitch}
                                            size={'sm'} />
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
export default Paginas;