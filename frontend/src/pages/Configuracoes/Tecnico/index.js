import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { cpfMask, rgMask, telMask, celMask, cepMask, numMask } from '../../../mask'
import api from '../../../../src/services/api';

const Tecnico = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var tecnicoIdParam = props.match.params.id;

    const [telefoneFixo, setTelefonefixo] = useState();
    const [telefoneCelular, setTelefonecelular] = useState();
    const [cep, setCep] = useState();
    const [num, setNum] = useState();
    const [rg, setRg] = useState();
    const [cpf, setCpf] = useState();
    const [tipoTecnicos, setTipoTecnicos] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        tipotecnicoid: 0,
        nometecnico: '',
        rg: '',
        cpf: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        telefonefixo: '',
        telefonecelular: '',
        ativo: '1'
    });


    useEffect(() => {
        api.get('tipo-tecnico').then(response => {
            setTipoTecnicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && tecnicoIdParam !== '') {
            api.get(`tecnico/${tecnicoIdParam}`).then(response => {
                document.getElementById('txtNomeTecnico').value = response.data.nometecnico;
                document.getElementById('txtRg').value = response.data.rg;
                document.getElementById('txtCpf').value = response.data.cpf;
                document.getElementById('txtLogradouro').value = response.data.logradouro;
                document.getElementById('txtBairro').value = response.data.bairro;
                document.getElementById('txtCep').value = response.data.cep;
                document.getElementById('txtNumero').value = response.data.numero;
                document.getElementById('txtComplemento').value = response.data.complemento;
                document.getElementById('txtCidade').value = response.data.cidade;
                document.getElementById('cboEstado').value = response.data.estado;
                document.getElementById('txtTelefoneFixo').value = response.data.telefonefixo;
                document.getElementById('txtTelefoneCelular').value = response.data.telefonecelular;
                document.getElementById('cboTipoTecnicoId').value = response.data.tipotecnicoid;

                setFormData({
                    ...formData,
                    nometecnico: response.data.nometecnico,
                    rg: response.data.rg,
                    cpf: response.data.cpf,
                    logradouro: response.data.logradouro,
                    bairro: response.data.bairro,
                    cep: response.data.cep,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    cidade: response.data.cidade,
                    estado: response.data.estado,
                    telefonefixo: response.data.telefonefixo,
                    telefonecelular: response.data.telefonecelular,
                    tipotecnicoid: response.data.tipotecnicoid,
                })
            });
        } else {
            return;
        }
    }, [tecnicoIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'cpf':
                setCpf(cpfMask(event.target.value));
                break;
            case 'rg':
                setRg(rgMask(event.target.value));
                break;
            case 'cep':
                setCep(cepMask(event.target.value));
                break;
            case 'numero':
                setNum(numMask(event.target.value));
                break;
            case 'telefonefixo':
                setTelefonefixo(telMask(event.target.value));
                break;
            case 'telefonecelular':
                setTelefonecelular(celMask(event.target.value));
                break;
        };
        setFormData({ ...formData, [name]: value });

    }
    console.log(formData)

    async function handleTecnico(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/tecnico/${tecnicoIdParam}`, data, {
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
                    const response = await api.post('tecnico', data, {
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
            <Form onSubmit={handleTecnico}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeTecnico">Nome Técnico</Label>
                                        <Input type="text" required id="txtNomeTecnico" placeholder="Digite o nome do Técnico"
                                            name="nometecnico"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="rg">RG</Label>
                                        <Input type="text" required id="txtRg" placeholder="Digite o RG do Técnico"
                                            value={rg}
                                            name="rg"
                                            onChange={handleInputChange}

                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input type="text" required id="txtCpf" placeholder="Digite o CPF do Técnico"
                                            name="cpf"
                                            value={cpf}
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="logradouro">Endereço</Label>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o Endereço"
                                            name="logradouro"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                name="cep"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={num}
                                            name="numero"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado" multiple={false}
                                            name="estado"
                                            onChange={handleInputChange}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">São Paulo</option>
                                            <option value="2">Rio de Janeiro</option>
                                            <option value="3">Minas Gerais</option>
                                            <option value="4">Paraná</option>
                                            <option value="5">Santa Catarina</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefoneFixo}
                                                name="telefonefixo"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneCelular" placeholder="(11) 9999-9999"
                                                value={telefoneCelular}
                                                name="telefonecelular"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tipoTecnicoId">Tipo do Técnico</Label>
                                        <Input type="select" required name="select" id="cboTipoTecnicoId"
                                            name="tipotecnicoid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tipoTecnicos.map(tipoTecnico => (
                                                <option value={tipoTecnico.id}>{tipoTecnico.nometipotecnico}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup row>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch} />
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
export default Tecnico;
