import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import { Redirect } from "react-router-dom";
import { messagePorStatus, message } from '../../../utils/messages';
import api from '../../../services/api';

export default function Bandeira(props) {

    //Estado que controla o redirecionamento da página
    const [redirect, setRedirect] = useState(false);
    //Fim

    //Parametros vindos do formulário
    //#region 
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var BandeiraIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');
    //#endregion

    //Estados que controlam as propriedades do formulário
    //#region 
    const [nomebandeira, setNomeBandeira] = useState('');
    const [descricao, setDescricao] = useState('');
    const [grupoempresarialid, setGrupoEmpresarialId] = useState('');
    const [nomecliente, setNomeCliente] = useState('');
    const [ativo, setAtivo] = useState(1);
    //#endregion

    //Estado que controla o combo do grupo empresarial
    const [grupoempresarialsid, setGrupoEmpresariaisId] = useState([]);
    //Fim

    //UseEffect responsável por popular o combo GrupoEmpresarial
    //#region 
    useEffect(() => {
        api.get('grupo-empresarial').then(response => {
            setGrupoEmpresariaisId(response.data);
        })
    }, [usuarioId]);
    //#endregion

    //UseEffect responsável por popular os campos do formulário quando o action for EDITAR
    //#region 
    useEffect(() => {
        if (action === 'edit' && BandeiraIdParam !== '') {
            api.get(`bandeira/${BandeiraIdParam}`).then(response => {
                setNomeBandeira(response.data.nomebandeira);
                setDescricao(response.data.descricao);
                setGrupoEmpresarialId(response.data.grupoempresarialid);
                setNomeCliente(response.data.nomecliente);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [usuarioId]);
    //#endregion


    //Função responsável por atualizar o estado da propriedade de redirecionamento da página
    function handleReset() {
        setRedirect(true);
    };
    //FIM

    //Função responsável por atualizar os dados do formulário após o algum campo ter o seu valor alterado onChange() ser selecionado
    //#region 
    function handleInputChange(event) {
        event.preventDefault();

        const { name, value } = event.target;
        switch (name) {
            case 'grupoempresarialid':
                if (value != "") {
                    api.get(`/grupo-empresarial/${value}`).then(response => {
                        console.log(response.data)
                        setNomeCliente(response.data.nomecliente);
                        setGrupoEmpresarialId(value);
                    });
                } else {
                    setNomeCliente('');
                    setGrupoEmpresarialId('');
                }
                break;
        }
    };
    //#endregion

    //Função responsável por atualizar os dados do formulário
    //#region 
    async function handleStatus(e) {
        e.preventDefault();

        const data = {
            nomebandeira,
            descricao,
            grupoempresarialid,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/bandeira/${BandeiraIdParam}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                setRedirect(messagePorStatus(response.status));
            } catch (err) {
                message('error', "Ocorreu um erro. Favor contatar o administrador do sistema.");
            }
        } else {
            if (action === 'novo') {
                try {
                    const response = await api.post('bandeira', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    setRedirect(messagePorStatus(response.status));
                } catch (err) {
                    message('error', "Ocorreu um erro. Favor contatar o administrador do sistema.");
                }
            }
        }
    }
    //#endregion
    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-bandeira" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Bandeira</strong>
                                {action === 'novo' ? <small> nova</small> : <small> editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeBandeira">Nome da Bandeira</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeBandeira" placeholder="Digite o nome da Bandeira"
                                                name="nomebandeira"
                                                value={nomebandeira}
                                                onChange={e => setNomeBandeira(e.target.value)} >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-flag"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="grupoempresarialId">Grupo Empresarial</Label>
                                        <Input required type="select" name="select" id="cboGrupoEmpresarialId"
                                            name="grupoempresarialid"
                                            value={grupoempresarialid}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" defaultValue>Selecione...</option>
                                            {grupoempresarialsid.map(grupoempresarial => (
                                                <option key={grupoempresarial.id} value={grupoempresarial.id}>{grupoempresarial.nomegrupoempresarial}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nomecliente">Cliente</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNomeCliente" placeholder="" readOnly
                                                name="nomecliente"
                                                value={nomecliente}
                                            >
                                            </Input>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="12">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" placeholder="Descrição da Bandeira" id="txtDescrição"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)}
                                        />
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
