import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, } from 'reactstrap';
import '../../../global.css';
import './styles.css';
import { Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({

}));


function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function DisponibilidaDeTecnico(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var dispotecIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');


    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const [disponibilidadeId, setDisponibilidade] = useState('');
    const [disponibilidadesId, setDisponibilidades] = useState([]);
    const [tecnicoId, setTecnico] = useState('');
    const [tecnicosId, setTecnicos] = useState([]);
    const [ativo, setAtivo] = useState(1);
    useEffect(() => {
        if (action === 'edit' && dispotecIdParam !== '') {
            api.get(`dias-disponiveis-id/${dispotecIdParam}`).then(response => {
                setRight(response.data)                              
            });

            api.get(`dias-disponiveis-disponiveis/${dispotecIdParam}`).then(response => {
                setLeft(response.data)                
            });

        } else {
            api.get(`disponibilidade`).then(response => {
                setLeft(response.data)                               
            });
        }
    }, [dispotecIdParam]);


    useEffect(() => {
        api.get('tecnico').then(response => {
            setTecnicos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && dispotecIdParam !== '') {
            api.get(`disponibilidade-tecnico/${dispotecIdParam}`).then(response => {
                setDisponibilidade(response.data.disponibilidadeId);
                setTecnico(response.data.tecnicoId);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [dispotecIdParam]);
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
                  <ListItemText id={labelId} primary={`${value['nomedisponibilidade']}`} />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        </div>
    );

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
            disponibilidadeId,
            tecnicoId,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/disponibilidade-tecnico/${dispotecIdParam}`, data, {
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
                    const response = await api.post('disponibilidade-tecnico', data, {
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
            {redirect && <Redirect to="/lista-disponibilidade-tecnico" />}
            <Form onSubmit={handleStatus} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Disponibilidade do Técnico</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    {/*<Col md="4">
                                        <Label htmlFor="disponibilidadeId">Disponibilidade</Label>
                                        <Input type="select" required name="select" id="cboDisponibilidadeId" multiple={false}
                                            name="disponibilidadeId"
                                            value={disponibilidadeId}
                                            onChange={e => setDisponibilidade(e.target.value)} >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {disponibilidadesId.map(disponibilidade => (
                                                <option value={disponibilidade.id}>{disponibilidade.nomedisponibilidade}</option>
                                            ))}
                                        </Input>
                                            </Col>*/}
                                    <Col md="8">
                                        <Label htmlFor="tecnicoId">Técnico</Label>
                                        <Input type="select" required name="select" id="cboTecnicoId" multiple={false}
                                            name="tecnicoId"
                                            value={tecnicoId}
                                            onChange={e => setTecnico(e.target.value)} >
                                            <option value="" defaultValue>Selecione...</option>
                                            {tecnicosId.map(tecnico => (
                                                <option value={tecnico.id}>{tecnico.nometecnico}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>    
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                       onChange={handleSwitch} 
                                        />                                    
                                    </Col>                                
                                 </FormGroup> */}
                            </CardBody>
                            <CardHeader>
                                <strong>Disponibilidade de Técnico</strong>                                
                            </CardHeader>
                            <CardBody className="">
                                <Row className="classeDiv">
                                    <Col md="4">
                                        <strong>Dias Disponíveis</strong>
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
                                    <strong>Dias Selecionados</strong>                                       
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
