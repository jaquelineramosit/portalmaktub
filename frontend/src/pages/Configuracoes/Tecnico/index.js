import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import './styles.css';
import { Redirect } from "react-router-dom";
import { cpfMask, rgMask, telMask, celMask, cepMask, numMask } from '../../../mask'
import api from '../../../../src/services/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function Tecnico(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var IdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');
 //Projeto Técnico
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
//Disponibilidade de Técnico
    const [checkeds, setCheckeds] = React.useState([]);
    const [lefts, setLefts] = React.useState([]);
    const [rights, setRights] = React.useState([]);
    const leftCheckeds = intersection(checkeds, lefts);
    const rightCheckeds = intersection(checkeds, rights);

    const [tipotecnicoid, setTipotecnicoid] = useState('');
    const [nometecnico, setNometecnico] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cities, setCities] = useState([]);
    const [estado, setEstado] = useState('0');
    const [estados, setEstados] = useState([]);
    const [telefonefixo, setTelefonefixo] = useState('');
    const [telefonecelular, setTelefonecelular] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [nomecontatoemergencial, setNomecontatoemergencial] = useState('');
    const [telefonecttoemergencial, setTelefonecttoemergencial] = useState('');
    const [tipoTecnicosid, setTipoTecnicosid] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        if (action === 'edit' && IdParam !== '') {
            api.get(`projeto-tecnico-id/${IdParam}`).then(response => {
                setRight(response.data)
            });

            api.get(`projeto-tecnico-disponiveis/${IdParam}`).then(response => {
                setLeft(response.data)
            });
            api.get(`disponibilidade-tecnico-id/${IdParam}`).then(response => {
                setRights(response.data)
            });

            api.get(`disponibilidade-tecnico-disponiveis/${IdParam}`).then(response => {
                setLefts(response.data)
            });

        } else {
            api.get(`tipo-projeto`).then(response => {
                setLeft(response.data)
            });
            api.get(`disponibilidade`).then(response => {
                setLefts(response.data)
            });
        }
    }, [IdParam]);

    useEffect(() => {
        api.get('tipo-tecnico').then(response => {
            setTipoTecnicosid(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setEstados(ufInitials);
        });

    }, []);

    useEffect(() => {
        if (estado === '0') {
            return;
        }
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });

    }, [estado]);

    useEffect(() => {
        if (action === 'edit' && IdParam !== '') {
            api.get(`tecnico/${IdParam}`).then(response => {
                setTipotecnicoid(response.data.tipotecnicoid);
                setNometecnico(response.data.nometecnico);
                setLogradouro(response.data.logradouro);
                setComplemento(response.data.complemento);
                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setTelefonefixo(response.data.telefonefixo);
                setTelefonecelular(response.data.telefonecelular);
                setCep(response.data.cep);
                setNumero(response.data.numero);
                setRg(response.data.rg);
                setCpf(response.data.cpf);
                setNomecontatoemergencial(response.data.nomecontatoemergencial);
                setTelefonecttoemergencial(response.data.telefonecttoemergencial);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [IdParam]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];



        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        console.log(newChecked);
    };

    const handleAllRight = () => {
        console.log("Right")
        console.log(right)
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        console.log("left")
        console.log(left)
        setLeft(left.concat(right));
        setRight([]);
    };
    const customList = (items, index) => (
        <div className="paper" key={`div-${index}`}>
            <List dense component="div" role="list" key={`list-${index}`} className="list-border">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value['id']}-label`;
                    console.log(labelId)
                    return (
                        <ListItem key={value['id']} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value['nometipoprojeto']}`} />
                        </ListItem>

                    );
                })}
                <ListItem />
            </List>
        </div>

    );


    const handleToggles = (value) => () => {
        const currentIndex = checkeds.indexOf(value);
        const newChecked = [...checkeds];



        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckeds(newChecked);
        console.log(newChecked);
    };

    const handleAllRights = () => {
        console.log("Right")
        console.log(rights)
        setRights(rights.concat(lefts));
        setLefts([]);
    };

    const handleCheckedRights = () => {
        setRights(rights.concat(leftCheckeds));
        setLefts(not(lefts, leftCheckeds));
        setCheckeds(not(checkeds, leftCheckeds));
    };

    const handleCheckedLefts = () => {
        setLefts(lefts.concat(rightCheckeds));
        setRights(not(rights, rightCheckeds));
        setCheckeds(not(checkeds, rightCheckeds));
    };

    const handleAllLefts = () => {
        console.log("left")
        console.log(lefts)
        setLefts(lefts.concat(rights));
        setRights([]);
    };
    const customLists = (items, index) => (
        <div className="paper" key={`div-${index}`}>
            <List dense component="div" role="list" key={`list-${index}`} className="list-border">
                {items.map((value) => {
                    const labelsId = `transfer-list-item-${value['id']}-label`;
                    console.log(labelsId)
                    return (
                        <ListItem key={value['id']} role="listitem" button onClick={handleToggles(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkeds.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelsId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelsId} primary={`${value['nomedisponibilidade']}`} />
                        </ListItem>

                    );
                })}
                <ListItem />
            </List>
        </div>

    );


    function handleSelectUf(event) {
        const uf = event.target.value;

        setEstado(uf);

    }

    function handleInputChange(event) {
        var { name } = event.target;

        if (name === 'ativo') {
            if (ativo === 1) {
                setAtivo(0);
            } else {
                setAtivo(1);
            }
        }
    };

    function handleReset() {
        setRedirect(true);
    };

    async function handleStatus(e) {
        e.preventDefault();

        const data = {
            tipotecnicoid,
            nometecnico,
            rg,
            cpf,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            estado,
            telefonefixo,
            telefonecelular,
            nomecontatoemergencial,
            telefonecttoemergencial,
            right,
            rights,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/tecnico/${IdParam}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                alert(`Cadastro atualizado com sucesso.`);
                setRedirect(true);
            } catch (err) {
                alert('Erro na atualização, tente novamente.');
            }
        } else {
            if (action === 'novo') {
                try {
                    const response = await api.post('tecnico', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert('Cadastro realizado com sucesso.');
                    setRedirect(true);
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }

    return (
        <div className="animated fadeIn">
            {redirect && <Redirect to="/lista-tecnicos" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>

                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-user-circle-o"></i>
                                <strong>Técnico</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeTecnico">Nome Técnico</Label>
                                        <Input type="text" required id="txtNomeTecnico" placeholder="Digite o nome do Técnico"
                                            name="nometecnico"
                                            value={nometecnico}
                                            onChange={e => setNometecnico(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="rg">RG</Label>
                                        <Input type="text" required id="txtRg" placeholder="Digite o RG do Técnico"
                                            value={rg}
                                            name="rg"
                                            onChange={e => setRg(rgMask(e.target.value))} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cpf">CPF</Label>
                                        <Input type="text" required id="txtCpf" placeholder="Digite o CPF do Técnico"
                                            name="cpf"
                                            value={cpf}
                                            onChange={e => setCpf(cpfMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="tipoTecnicoId">Tipo do Técnico</Label>
                                        <Input type="select" required name="select" id="cboTipoTecnicoId"
                                            name="tipotecnicoid"
                                            value={tipotecnicoid}
                                            onChange={e => setTipotecnicoid(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tipoTecnicosid.map(tipoTecnico => (
                                                <option value={tipoTecnico.id}>{tipoTecnico.nometipotecnico}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                name="telefonefixo"
                                                onChange={e => setTelefonefixo(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled icon-phone"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneCelular" placeholder="(11) 9999-9999"
                                                value={telefonecelular}
                                                name="telefonecelular"
                                                onChange={e => setTelefonecelular(celMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled icon-phone"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="Nome">Nome Contato Emergencial</Label>
                                        <Input type="text" required id="txtNome" placeholder="Digite o Nome"
                                            name="nomecontatoemergencial"
                                            value={nomecontatoemergencial}
                                            onChange={e => setNomecontatoemergencial(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="TelefoneFixo">Telefone Emergencial</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonecttoemergencial}
                                                name="telefonecttoemergencial"
                                                onChange={e => setTelefonecttoemergencial(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled icon-phone"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardHeader>
                                <strong>Tipo de Projeto</strong>
                            </CardHeader>
                            <CardBody className="">
                                <Row className="classeDiv">
                                    <Col md="4">
                                        <strong>Tipo de Projeto</strong>
                                        {customList(left)}
                                    </Col>
                                    <Col md="2" className="classeButton">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleAllRight}
                                            disabled={left.length === 0}
                                            aria-label="move all right"
                                        >
                                            ≫
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleCheckedRight}
                                            disabled={leftChecked.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleCheckedLeft}
                                            disabled={rightChecked.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleAllLeft}
                                            disabled={right.length === 0}
                                            aria-label="move all left"
                                        >
                                            ≪
                                        </Button>
                                    </Col>
                                    <Col md="4">
                                        <strong>Tipo de Projeto Selecionados</strong>
                                        {customList(right)}
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardHeader>
                                <strong>Disponibilidade de Técnico</strong>
                            </CardHeader>
                            <CardBody className="">
                                <Row className="classeDiv">
                                    <Col md="4">
                                        <strong>Disponibilidade</strong>
                                        {customLists(lefts)}
                                    </Col>
                                    <Col md="2" className="classeButton">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleAllRights}
                                            disabled={lefts.length === 0}
                                            aria-label="move all right"
                                        >
                                            ≫
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleCheckedRights}
                                            disabled={leftCheckeds.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleCheckedLefts}
                                            disabled={rightCheckeds.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="button"
                                            onClick={handleAllLefts}
                                            disabled={rights.length === 0}
                                            aria-label="move all left"
                                        >
                                            ≪
                                        </Button>
                                    </Col>
                                    <Col md="4">
                                        <strong>Disponibilidade Selecionados</strong>
                                        {customLists(rights)}
                                    </Col>
                                </Row>
                            </CardBody>


                            <CardHeader>
                                <i className="fa fa-map-marker"></i>
                                <strong>Endereço</strong>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="cep">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCep" size="16" required type="text" placeholder="00000-000"
                                                value={cep}
                                                name="cep"
                                                onChange={e => setCep(cepMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <spam class="btn btn-secondary disabled fa fa-truck"></spam>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="logradouro">Endereço</Label>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o Endereço"
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={e => setLogradouro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            value={numero}
                                            name="numero"
                                            onChange={e => setNumero(numMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="estado">UF</Label>
                                        <Input type="select" required name="select" id="cboEstado"
                                            name="estado"
                                            value={estado}
                                            onChange={handleSelectUf} >
                                            <option value="0">Selecione</option>
                                            {estados.map(uf => (
                                                <option key={uf} value={uf}>{uf}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input type="select" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)}>
                                            <option value="0">Selecione</option>
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
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
