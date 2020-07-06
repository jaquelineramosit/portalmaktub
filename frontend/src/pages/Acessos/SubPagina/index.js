import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';


const Subpagina = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var subpaginaIdParam = props.match.params.id;

    const [paginas, setPaginas] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        paginaid: 1,
        nomesubpagina: '',
        descricao: '',
        ativo: 1
    });

    useEffect(() => {
        api.get('paginas').then(response => {
            setPaginas(response.data);
        })
    }, [usuarioId]);

    
    useEffect(() => {
        if (action === 'edit' && subpaginaIdParam !== '') {
            api.get(`sub-paginas/${subpaginaIdParam}`).then(response => {
                document.getElementById('cboPagina').value = response.data.paginaid;
                document.getElementById('txtNomeSubPagina').value = response.data.nomesubpagina;
                document.getElementById('txtDescricao').value = response.data.descricao;

                setFormData({
                    ...formData,
                    paginaid: response.data.paginaid,
                    nomesubpagina: response.data.nomesubpagina,
                    descricao: response.data.descricao,

                })
            });
        } else {
            return;
        }
    }, [subpaginaIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    };

    async function handleSubPagina(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/sub-paginas/${subpaginaIdParam}`, data, {
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
                    const response = await api.post('sub-paginas', data, {
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
            <Form onSubmit={handleSubPagina}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Sub Página</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="pagina">Qual a Página?</Label>
                                        <Input type="select" required name="select" id="cboPagina"
                                            name="paginaid"
                                            onChange={handleInputChange} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {paginas.map(pagina => (
                                                <option value={pagina.id}>{pagina.nomepagina}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nomeSubPagina">Nome da Su Página</Label>
                                        <Input type="text" id="txtNomeSubPagina" multiple placeholder="Digite o nome da Sub Página"
                                            name="nomesubpagina"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="10">
                                        <Label htmlFor="descricao">Descrião</Label>
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
export default Subpagina;