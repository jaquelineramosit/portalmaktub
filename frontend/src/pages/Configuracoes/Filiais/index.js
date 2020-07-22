import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { telMask,cepMask, numMask, cnpjMask } from '../../../mask'
import api from '../../../../src/services/api';

const Filiais = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var filiaisIdParam = props.match.params.id;

    const [telefoneresponsavel, setTelefoneresponsavel] = useState();
    const [telefonefixo, setTelefonefixo] = useState();
    const [cep, setCep] = useState();
    const [num, setNum] = useState();
    const [cnpj, setCnpj] = useState();
    const [bandeiras, setBandeiras] = useState([]);
    const [clientes, setClientes] = useState([]);
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        bandeiraid: 1,
        clienteid: 1,
        ced: '',
        nomefilial: '',
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
        nomeresponsavel: '',
        telefoneresponsavel: '',
        horarioiniciosemana: '',
        horariofimsemana: '',
        horarioiniciosabado: '',
        horariofimsabado: '',
        horarioiniciodomingo: '',
        horariofimdomingo: '',
        ativo: '1'
    });

    useEffect(() => {
        api.get('clientes').then(response => {
            setClientes(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('bandeira').then(response => {
            setBandeiras(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && filiaisIdParam !== '') {
            api.get(`filiais/${filiaisIdParam}`).then(response => {
                document.getElementById('cboClienteid').value = response.data.clienteid;
                document.getElementById('txtNomeFilial').value = response.data.nomefilial;
                document.getElementById('txtNomeResponsavel').value = response.data.nomeresponsavel;
                document.getElementById('txtRazaoSocial').value = response.data.razaosocial;
                document.getElementById('txtCnpj').value = response.data.cnpj;
                document.getElementById('cboBandeiraId').value = response.data.bandeiraid;
                document.getElementById('txtCed').value = response.data.ced;
                document.getElementById('txtCep').value = response.data.cep;
                document.getElementById('txtLogradouro').value = response.data.logradouro;
                document.getElementById('txtBairro').value = response.data.bairro;
                document.getElementById('txtCidade').value = response.data.cidade;
                document.getElementById('txtNumero').value = response.data.numero;
                document.getElementById('txtComplemento').value = response.data.complemento;
                document.getElementById('cboEstado').value = response.data.estado;
                document.getElementById('txtTelefoneFixo').value = response.data.telefonefixo;
                document.getElementById('txtTelefoneResponsavel').value = response.data.telefoneresponsavel;
                document.getElementById('txtHorarioInicioSemana').value = response.data.horarioiniciosemana;
                document.getElementById('horarioInicioDomingo').value = response.data.horarioiniciodomingo;
                document.getElementById('txtHorarioInicioSabado').value = response.data.horarioiniciosabado;
                document.getElementById('txtHorarioFimSemana').value = response.data.horariofimsemana;
                document.getElementById('txtHorarioFimDomgingo').value = response.data.horariofimdomingo;
                document.getElementById('txtHorarioFimSabado').value = response.data.horariofimsabado;

                setFormData({
                    ...formData,
                    clienteid: response.data.clienteid,
                    nomefilial: response.data.nomefilial,
                    nomeresponsavel: response.data.nomeresponsavel,
                    razaosocial: response.data.razaosocial,
                    nomeparceiro: response.data.nomeparceiro,
                    bandeiraid: response.data.bandeiraid,
                    nomeparceiro: response.data.nomeparceiro,
                    cep: response.data.cep,
                    ced: response.data.ced,
                    cnpj: response.data.cnpj,
                    logradouro: response.data.logradouro,
                    bairro: response.data.bairro,
                    cidade: response.data.cidade,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    estado: response.data.estado,
                    telefonefixo: response.data.telefonefixo,
                    telefoneresponsavel: response.data.telefoneresponsavel,
                    horarioiniciosemana: response.data.horarioiniciosemana,
                    horarioiniciodomingo: response.data.horarioiniciodomingo,
                    horarioiniciosabado: response.data.horarioiniciosabado,
                    horariofimsemana: response.data.horariofimsemana,
                    horariofimdomingo: response.data.horariofimdomingo,
                    horariofimsabado: response.data.horariofimsabado,
                })
            });
        } else {
            return;
        }
    }, [filiaisIdParam])

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
        };
        setFormData({ ...formData, [name]: value });


    };
    console.log(formData)

    async function handleFiliais(e) {
        e.preventDefault();

        const data = formData;

        if (action === 'edit') {

            try {
                const response = await api.put(`/filiais/${filiaisIdParam}`, data, {
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
                    const response = await api.post('filiais', data, {
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
            <Form onSubmit={handleFiliais}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Filial</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input required type="select" name="select" id="cboClienteid" multiple={false}
                                            name="clienteid"
                                            onChange={handleInputChange}  >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {clientes.map(cliente => (
                                                <option value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeFilial">Nome Filial</Label>
                                        <Input type="text" required id="txtNomeFilial" placeholder="Digite o nome da filial"
                                            name="nomefilial"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o nome do responsável"
                                            name="nomeresponsavel"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite a razão social"
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
                                        <Label htmlFor="bandeiraId">Bandeira</Label>
                                        <Input required type="select" name="select" id="cboBandeiraId" multiple={false}
                                            name="bandeiraid"
                                            onChange={handleInputChange} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {bandeiras.map(bandeira => (
                                                <option value={bandeira.id}>{bandeira.nomebandeira}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="ced">CED</Label>
                                        <Input type="text" required id="txtCed"
                                            name="ced"
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
                                        <Label htmlFor="logradouro">Endereço</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtLogradouro"
                                                placeholder="Digite o Endereço"
                                                name="logradouro"
                                                onChange={handleInputChange} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite o Números"
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
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado" multiple={false}
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
                                            <option value="São Paulo">São Paulo</option>
                                            <option value="Rio de Janeiro">Rio de Janeiro</option>
                                            <option value=">Minas Gerais">Minas Gerais</option>
                                            <option value="Paraná">Paraná</option>
                                            <option value="Santa Catarina">Santa Catarina</option>
                                        </Input>
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
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
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioSemana">Horario Início da semana</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioInicioSemana"
                                                name="horarioiniciosemana"
                                                onChange={handleInputChange} />

                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioDomingo">Horario Início do Domingo</Label>
                                        <InputGroup>
                                            <Input type="time" required id="horarioInicioDomingo"
                                                name="horarioiniciodomingo"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioSabado">Horario Início do Sábado</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioInicioSabado"
                                                name="horarioiniciosabado"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimSemana">Horario Fim da semana</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimSemana"
                                                name="horariofimsemana"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimDomingo">Horario Fim do Domingo</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimDomgingo"
                                                name="horariofimdomingo"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimSabado">Horario Fim do Sábado</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimSabado"
                                                name="horariofimsabado"
                                                onChange={handleInputChange} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>
                                    <Col md="3">
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
export default Filiais;
