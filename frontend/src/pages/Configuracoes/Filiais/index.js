import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Filiais() {
    const [bandeiraid, setBandeiraId] = useState('');
    const [clienteid, setClienteId] = useState('');
    const [ced, setCed] = useState('');
    const [nomefilial, setNomeFilial] = useState('');
    const [nomeresponsavel, setNomeResponsavel] = useState('');
    const [razaosocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [telefonefixo, setTelefoneFixo] = useState('');
    const [telefoneresponsavel, setTelefoneResponsavel] = useState('');
    const [horarioiniciosemana, setHorarioInicioSemana] = useState('');
    const [horariofimsemana, setHorarioFimSemana] = useState('');
    const [horarioiniciosabado, setHorarioInicioSabado] = useState('');
    const [horariofimsabado, setHorarioFimSabado] = useState('');
    const [horarioiniciodomingo, setHorarioInicioDomingo] = useState('');
    const [horariofimdomingo, setHorarioFimDomingo] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');



    async function handleFiliais(e) {
        e.preventDefault();

        const data = {
            bandeiraid,
            clienteid,
            ced,
            nomefilial,
            razaosocial,
            cnpj,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
            telefonefixo,
            telefoneresponsavel,
            nomeresponsavel,
            horarioiniciosemana,
            horariofimsemana,
            horarioiniciosabado,
            horariofimsabado,
            horarioiniciodomingo,
            horariofimdomingo,
            ativo
        };

        try {
            const response = await api.post('filiais', data, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
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
                                            value={clienteid}
                                            onChange={e => setClienteId(e.target.value)} >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Cliente1</option>
                                            <option value={2}>Cliente2</option>
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeFilial">Nome Filial</Label>
                                        <Input type="text" required id="txtNomeFilial" placeholder="Digite o nome da filial"
                                            value={nomefilial}
                                            onChange={e => setNomeFilial(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o nome do responsável"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeResponsavel(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>    
                                    <Col md="3">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite a razão social"
                                            value={razaosocial}
                                            onChange={e => setRazaoSocial(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                value={cnpj}
                                                onChange={e => setCnpj(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="bandeiraId">Bandeira</Label>
                                        <Input required type="select" name="select" id="cboBandeiraId" multiple={false}
                                            value={bandeiraid}
                                            onChange={e => setBandeiraId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Bandeira1</option>
                                            <option value={2}>Bandeira2</option>
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="ced">CED</Label>
                                        <Input type="text" required id="txtCed"
                                            value={ced}
                                            onChange={e => setCed(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="number" placeholder="00000-000"
                                                value={cep}
                                                onChange={e => setCep(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="logradouro">Logradouro</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtLogradouro"
                                                placeholder="Digite o Logradouro"
                                                value={logradouro}
                                                onChange={e => setLogradouro(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="number" required id="txtNumero" placeholder="Digite o Números"
                                            value={numero}
                                            onChange={e => setNumero(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado" multiple={false}
                                            value={estado}
                                            onChange={e => setEstado(e.target.value)}>
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
                                                value={telefonefixo}
                                                onChange={e => setTelefoneFixo(e.target.value)} />
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
                                                onChange={e => setTelefoneResponsavel(e.target.value)} />
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
                                                value={horarioiniciosemana}
                                                onChange={e => setHorarioInicioSemana(e.target.value)} />
                                            
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>         
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioDomingo">Horario Início do Domingo</Label>
                                       <InputGroup> 
                                            <Input type="time" required id="horarioInicioDomingo"
                                                value={horarioiniciodomingo}
                                                onChange={e => setHorarioInicioDomingo(e.target.value)} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>    
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioInicioSabado">Horario Início do Sábado</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioInicioSabado"
                                                value={horarioiniciosabado}
                                                onChange={e => setHorarioInicioSabado(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                        <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>         
                                    </Col>
                                 </FormGroup>
                                 <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimSemana">Horario Fim da semana</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimSemana"
                                                value={horariofimsemana}
                                                onChange={e => setHorarioFimSemana(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>         
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimDomingo">Horario Fim do Domingo</Label>
                                        <InputGroup>
                                            <Input type="time" required id="txtHorarioFimDomgingo"
                                                value={horariofimdomingo}
                                                onChange={e => setHorarioFimDomingo(e.target.value)} />
                                                <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon>
                                        </InputGroup>    
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="horarioFimSabado">Horario Fim do Sábado</Label>
                                        <InputGroup>    
                                            <Input type="time" required id="txtHorarioFimSabado"
                                                value={horariofimsabado}
                                                onChange={e => setHorarioFimSabado(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                    <Button type="button" color= "secondary fa fa-clock-o"></Button>
                                                </InputGroupAddon> 
                                        </InputGroup>       
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md="3">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={e => setAtivo(e.target.value)} />
                                    </Col>
                                </FormGroup>
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