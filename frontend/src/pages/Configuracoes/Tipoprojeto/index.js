import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, CardFooter, Form, InputGroupAddon } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { reaisMask } from '../../../mask';
import { Redirect } from "react-router-dom";
import '../../../global.css';
import './styles.css';
import api from '../../../services/api';
import { NativeSelect } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({

  }));


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }


export default function Tipoprojeto(props) {

    const classes = useStyles();
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var tipoprojetoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nometipoprojeto, setNometipoprojeto] = useState('');
    const [receita, setReceita] = useState('');
    const [despesa, setDespesa] = useState('');
    const [horas, setHoras] = useState('');
    const [valorhoraextra, setValorhoraextra] = useState('');
    const [valorhoratecnico, setValorhoratecnico] = useState('');
    const [horadecimal, setHoradecimal] = useState('');
    const [escopoprojeto, setEscopoprojeto] = useState('');
    const [ativo, setAtivo] = useState(1);

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);


    //REGRA: CASO
    useEffect(() => {
        if (action === 'edit' && tipoprojetoIdParam !== '') {
            api.get(`tipo-projeto-ferramenta-id/${tipoprojetoIdParam}`).then(response => {
                setRight(response.data)                              
            });

            api.get(`tipo-projeto-ferramenta-disponiveis/${tipoprojetoIdParam}`).then(response => {
                setLeft(response.data)                
            });

        } else {
            api.get(`ferramentas`).then(response => {
                setLeft(response.data)                               
            });
        }
    }, [tipoprojetoIdParam]);


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
                  <ListItemText id={labelId} primary={`${value['codferramenta']}`} />
                </ListItem>
              );
            })}
            <ListItem/>
          </List>
        </div>
    );
    useEffect(() => {
        if (action === 'edit' && tipoprojetoIdParam !== '') {
            api.get(`tipo-projeto/${tipoprojetoIdParam}`).then(response => {
                setNometipoprojeto(response.data.nometipoprojeto);
                setReceita(response.data.receita);
                setDespesa(response.data.despesa);
                setHoras(response.data.horas);
                setValorhoraextra(response.data.valorhoraextra);
                setValorhoratecnico(response.data.valorhoratecnico);
                setHoradecimal(response.data.horadecimal);
                setEscopoprojeto(response.data.escopoprojeto);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [tipoprojetoIdParam]);

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
            nometipoprojeto,
            receita,
            despesa,
            horas,
            valorhoraextra,
            valorhoratecnico,
            horadecimal,
            escopoprojeto,
            ativo,
            right
        };

        //const ferramentas = 

        if (action === 'edit') {
            try {

                const response = await api.put(`/tipo-projeto/${tipoprojetoIdParam}`, data, {
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
                    const response = await api.post('tipo-projeto', data, {
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
            {redirect && <Redirect to="/lista-tipo-projeto" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipo de Projeto</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="nomeTipoProjeto">Nome do Projeto</Label>
                                        <Input type="text" required id="txtNomeTipoProjeto" placeholder="Digite o nome do projeto"
                                            name="nometipoprojeto"
                                            value={nometipoprojeto}
                                            onChange={e => setNometipoprojeto(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="despesa">Despesa</Label>
                                        <Input type="text" required id="txtDespesa" placeholder="R$00,00"
                                            value={despesa}
                                            name="despesa"
                                            onChange={e => setDespesa(reaisMask(e.target.value))} />

                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="receita">Receita</Label>
                                        <Input type="text" required id="txtReceita" placeholder="R$00,00"
                                            value={receita}
                                            name="receita"
                                            onChange={e => setReceita(reaisMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horas">Carga Horária do Projeto</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtHoras" required id="txtHorastotal"
                                                name="horas"
                                                value={horas}
                                                onChange={e => setHoras((e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-clock-o"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraExtra">Valor Hora Extra</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtValorHoraCobrado" placeholder="R$00,00" required id="txtValorhora"
                                                value={valorhoraextra}
                                                name="valorhoracobrado"
                                                onChange={e => setValorhoraextra(reaisMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-money"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="valorHoraTecnico">Valor hora Técnico</Label>
                                        <InputGroup>
                                            <Input id="txtValorHoraTecnico" required type="text" placeholder="R$00,00" required id="txtValorhoraTecnico"
                                                value={valorhoratecnico}
                                                name="valorhoratecnico"
                                                onChange={e => setValorhoratecnico(reaisMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-money"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="horadecimal">Hora Decimal</Label>
                                        <InputGroup>
                                            <Input id="txtHoradecimal" type="text" placeholder="R$00,00" id="txtHoradecimal"
                                                value={horadecimal}
                                                name="horadecimal"
                                                onChange={e => setHoradecimal(reaisMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <span className="btn btn-secondary disabled fa fa-money"></span>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="9">
                                        <Label>Escopo do Projeto</Label>
                                        <Input type="textarea" rows="5" placeholder="Descreva o Escopo do Projeto" id="txtDescStatus"
                                            name="escopoprojeto"
                                            value={escopoprojeto}
                                            onChange={e => setEscopoprojeto(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            onChange={handleSwitch}
                                        />
                                    </Col>
                                </FormGroup> */}
                            </CardBody>
                            <CardHeader>
                                <strong>Ferramentas Necessárias</strong>                                
                            </CardHeader>
                            <CardBody className="">
                                <Row className="classeDiv">
                                    <Col md="4">
                                        <strong>Ferramentas disponíveis</strong>
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
                                    <strong>Ferramentas Necessárias no Projeto</strong>                                       
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
