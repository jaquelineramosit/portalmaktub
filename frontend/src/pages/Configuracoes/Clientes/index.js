import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { telMask, cepMask, numMask, cnpjMask, celMask } from '../../../mask'
import api from '../../../../src/services/api';

const Cliente = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var clienteIdParam = props.match.params.id;

    const [telefoneresponsavel, setTelefoneresponsavel] = useState();
    const [telefonefixo, setTelefonefixo] = useState();
    const [telefonecelular, setTelefonecelular] = useState();
    const [cep, setCep] = useState();
    const [num, setNum] = useState();
    const [cnpj, setCnpj] = useState();
    const [parceiros, setParceiros] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({

        nomecliente: '',
        cnpj: '',
        razaosocial: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        telefonefixo: '',
        telefonecelular: '',
        nomeresponsavel: '',
        telefoneresponsavel: '',
        parceiroid: 0,
        ativo: '1'
    });

    useEffect(() => {
        api.get('parceiro').then(response => {
            setParceiros(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && clienteIdParam !== '') {
            api.get(`clientes/${clienteIdParam}`).then(response => {
                document.getElementById('cboParceiroId').value = response.data.parceiroid;
                document.getElementById('txtNomeCliente').value = response.data.nomecliente;
                document.getElementById('txtCnpj').value = response.data.cnpj;
                document.getElementById('txtRazaoSocial').value = response.data.razaosocial;
                document.getElementById('txtLogradouro').value = response.data.logradouro;
                document.getElementById('txtNumero').value = response.data.numero;
                document.getElementById('txtComplemento').value = response.data.complemento;
                document.getElementById('txtBairro').value = response.data.bairro;
                document.getElementById('txtCidade').value = response.data.cidade;
                document.getElementById('cboEstado').value = response.data.estado;
                document.getElementById('txtCep').value = response.data.cep;
                document.getElementById('txtTelefoneFixo').value = response.data.telefonefixo;
                document.getElementById('txtTelefoneCelular').value = response.data.telefonecelular;
                document.getElementById('txtNomeResponsavel').value = response.data.nomeresponsavel;
                document.getElementById('txtTelefoneResponsavel').value = response.data.telefoneresponsavel;

                setFormData({
                    ...formData,
                    parceiroid: response.data.parceiroid,
                    nomecliente: response.data.nomecliente,
                    cnpj: response.data.cnpj,
                    razaosocial: response.data.razaosocial,
                    logradouro: response.data.logradouro,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    bairro: response.data.bairro,
                    cidade: response.data.cidade,
                    estado: response.data.estado,
                    telefonefixo: response.data.telefonefixo,
                    telefonecelular: response.data.telefonecelular,
                    nomeresponsavel: response.data.nomeresponsavel,
                    telefoneresponsavel: response.data.telefoneresponsavel

                })
            });
        } else {
            return;
        }
    }, [clienteIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case 'cnpj':
                setCnpj(cnpjMask(event.target.value));
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
            case 'telefoneresponsavel':
                setTelefoneresponsavel(telMask(event.target.value));
                break;
            case 'telefonecelular':
                setTelefonecelular(celMask(event.target.value));
                break;
        };

        setFormData({ ...formData, [name]: value });
    };

    async function handleTicket(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/clientes/${clienteIdParam}`, data, {
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
                    const response = await api.post('clientes', data, {
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
                                <strong>Cliente</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="nomeCliente">Nome Cliente</Label>
                                        <Input type="text" required id="txtNomeCliente" placeholder="Digite o nome do Cliente"
                                            name="nomecliente"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o Nome do responsável"
                                            name="nomeresponsavel"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="parceiroId">Parceiro</Label>
                                        <Input required type="select" name="select" id="cboParceiroId"
                                            name="parceiroid"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {parceiros.map(parceiro => (
                                                <option value={parceiro.id}>{parceiro.nomeparceiro}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="razaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite o nome do Cliente"
                                            name="razaosocial"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                value={cnpj}
                                                name="cnpj"
                                                onChange={handleInputChange} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="logradouro">Logradouro</Label>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o Logradouro"
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
                                        <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                            value={cep}
                                            name="cep"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite Apenas Números"
                                            value={num}
                                            name="numero"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado"
                                            name="estado"
                                            onChange={handleInputChange} >
                                            <option value={undefined}>Selecione...</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PR">Paraná</option>
                                            <option value="AC">Acre</option>
                                            <option value="Al">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BH">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="GO">Goiás</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MG">Mato Grosso</option>
                                            <option value="MT">Mato Grosso do Sul</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piau</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RR">Rondônia</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="estado"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="telefonefixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
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
                                            <Input type="text" id="txtTelefoneCelular" placeholder="(11) 9999-9999" cnpjMask="true"
                                                value={telefonecelular}
                                                name="telefonecelular"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneResponsavel" placeholder="(11) 9999-9999"
                                                value={telefoneresponsavel}
                                                name="telefoneresponsavel"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>    
                                <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
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
export default Cliente;
