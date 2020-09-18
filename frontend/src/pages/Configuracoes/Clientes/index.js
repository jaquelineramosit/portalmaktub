import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import './styles.css';
import { Redirect } from "react-router-dom";
import { telMask, cepMask, numMask, cnpjMask, celMask, cpfMask } from '../../../mask'
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../../src/services/api';

const useStyles = makeStyles((theme) => ({

}));


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function Cliente(props) {

    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var clienteIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);


    const [nomecliente, setNomecliente] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('0');
    const [estados, setEstados] = useState([]);
    const [nomeresponsavel, setNomeresponsavel] = useState('');
    const [telefoneresponsavel, setTelefoneresponsavel] = useState('');
    const [telefonefixo, setTelefonefixo] = useState('');
    const [telefonecelular, setTelefonecelular] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [parceiroid, setParceiroid] = useState('');
    const [parceirosid, setParceirosid] = useState([]);
    const [cities, setCities] = useState([]);
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        if (action === 'edit' && clienteIdParam !== '') {
            api.get(`cliente-bandeira-id/${clienteIdParam}`).then(response => {
                setRight(response.data)                              
            });

            api.get(`cliente-bandeira-disponiveis/${clienteIdParam}`).then(response => {
                setLeft(response.data)                
            });

        } else {
            api.get(`bandeira`).then(response => {
                setLeft(response.data)                               
            });
        }
    }, [clienteIdParam]);

    useEffect(() => {
        api.get('parceiro').then(response => {
            setParceirosid(response.data);
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
        if (action === 'edit' && clienteIdParam !== '') {
            api.get(`clientes/${clienteIdParam}`).then(response => {
                document.getElementById("txtSmall").innerHTML = " editar";
                setNomecliente(response.data.nomecliente);
                setRazaosocial(response.data.razaosocial);
                setLogradouro(response.data.logradouro);
                setComplemento(response.data.complemento);
                setBairro(response.data.bairro);
                setCidade(response.data.cidade);
                setEstado(response.data.estado);
                setNomeresponsavel(response.data.nomeresponsavel);
                setTelefoneresponsavel(response.data.telefoneresponsavel);
                setTelefonefixo(response.data.telefonefixo);
                setTelefonecelular(response.data.telefonecelular);
                setCep(response.data.cep);
                setNumero(response.data.numero);
                setCnpj(response.data.cnpj);
                setParceiroid(response.data.parceiroid);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [clienteIdParam]);

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
                  <ListItemText id={labelId} primary={`${value['nomebandeira']}`} />
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
            nomecliente,
            razaosocial,
            logradouro,
            complemento,
            bairro,
            cidade,
            estado,
            nomeresponsavel,
            telefoneresponsavel,
            telefonefixo,
            telefonecelular,
            cep,
            cnpj,
            numero,
            parceiroid,
            right,
            ativo
        };
     

        if (action === 'edit') {
            try {
                const response = await api.put(`/clientes/${clienteIdParam}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                alert(`Cadastro atualizado com sucesso.`);
                setRedirect(true)
            } catch (err) {
                alert('Erro na atualização, tente novamente.');
            }
        } else {
            if (action === 'novo') {
                try {
                    const response = await api.post('clientes', data, {
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
            {redirect && <Redirect to="/lista-cliente" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card >
                            <CardHeader>
                                <i className="fa fa-handshake-o"></i>
                                <strong>Cliente</strong>
                                <small id="txtSmall" > novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeCliente">Nome Cliente</Label>
                                        <Input type="text" required id="txtNomeCliente" placeholder="Digite o nome do Cliente"
                                            name="nomecliente"
                                            value={nomecliente}
                                            onChange={e => setNomecliente(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="razaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite o nome do Cliente"
                                            name="razaosocial"
                                            value={razaosocial}
                                            onChange={e => setRazaosocial(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeResponsavel">Nome Responsável</Label>
                                        <Input type="text" required id="txtNomeResponsavel" placeholder="Digite o Nome do responsável"
                                            name="nomeresponsavel"
                                            value={nomeresponsavel}
                                            onChange={e => setNomeresponsavel(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                value={cnpj}
                                                name="cnpj"
                                                onChange={e => setCnpj(cnpjMask(e.target.value))} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="parceiroId">Parceiro</Label>
                                        <Input required type="select" name="select" id="cboParceiroId"
                                            name="parceiroid"
                                            value={parceiroid}
                                            onChange={e => setParceiroid(e.target.value)}>
                                            <option value="" defaultValue>Selecione...</option>
                                            {parceirosid.map(parceiro => (
                                                <option value={parceiro.id}>{parceiro.nomeparceiro}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="telefonefixo">Telefone Fixo</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                                value={telefonefixo}
                                                name="telefonefixo"
                                                onChange={e => setTelefonefixo(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-phone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneCelular" placeholder="(11) 9999-9999" cnpjMask="true"
                                                value={telefonecelular}
                                                name="telefonecelular"
                                                onChange={e => setTelefonecelular(celMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-phone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="telefoneResponsavel">Telefone Responsável</Label>
                                        <InputGroup>
                                            <Input type="text" id="txtTelefoneResponsavel" placeholder="(11) 9999-9999"
                                                value={telefoneresponsavel}
                                                name="telefoneresponsavel"
                                                onChange={e => setTelefoneresponsavel(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled icon-phone"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
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
                                                <span className="btn btn-secondary disabled fa fa-truck"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>

                                    <Col md="6">
                                        <Label htmlFor="logradouro">Endereço</Label>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o endereço"
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={e => setLogradouro(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite Apenas Números"
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
                                            name="estado"
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
                                {/*<FormGroup>
                                <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />
                                    </Col>

                                </FormGroup>*/}
                            </CardBody>
                            <CardHeader>
                                <strong>Bandeiras</strong>                                
                            </CardHeader>
                            <CardBody className="">
                                <Row className="classeDiv">
                                    <Col md="4">
                                        <strong>Bandeiras</strong>
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
                                    <strong>Bandeiras Selecionados</strong>                                       
                                        {customList(right)}
                                    </Col>
                                </Row>                            
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

