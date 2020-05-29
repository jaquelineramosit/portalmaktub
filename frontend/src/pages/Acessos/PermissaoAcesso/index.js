import React, { useState, useEffect} from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function PermissaAcesso() {
    const [perfilacessoid, setPerfilAcessoId] = useState('');
    const [perfilacessos, setPerfilAcessos] = useState([]);
    const [moduloid, setModuloId] = useState('');
    const [modulos, setModulos] = useState([]);
    const [paginaid, setPaginaId] = useState('');
    const [paginas, setPaginas] = useState([]);
    const [subpaginaid, setSubPaginaId] = useState('');
    const [subpaginas, setSubPaginas] = useState([]);
    const [funcaoid, setFuncaoId] = useState('');    
    const [funcaos, setFuncaos] = useState([]);
    const [ativo, setAtivo] = useState(1);
    const usuarioId = localStorage.getItem('userId');    

    function handleSwitch(e) {
        if (ativo === 1) {
            setAtivo(0);
        }
        else {
            setAtivo(1);
        }
    }

    useEffect(() => {
        api.get('perfis-acesso').then(response => {            
            setPerfilAcessos(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('modulos').then(response => {            
            setModulos(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('paginas').then(response => {            
            setPaginas(response.data);
        })
    }, [usuarioId]); 
    useEffect(() => {
        api.get('sub-paginas').then(response => {            
            setSubPaginas(response.data);
        })
    }, [usuarioId]);
    useEffect(() => {
        api.get('funcao').then(response => {            
            setFuncaos(response.data);
        })
    }, [usuarioId]);


    async function handlePermissaoAcesso(e) {
        e.preventDefault();
        
        const data = {
            perfilacessoid,
            moduloid,
            paginaid,
            subpaginaid,
            funcaoid,
            ativo,      
        };
        

        try {
            const response = await api.post('/permissao-acesso', data, {
                headers: {
                    Authorization: 1,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    
    }
    return (        
        <div className="animated fadeIn">
            <Form onSubmit={handlePermissaoAcesso}>
                <Row>                              
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Permissão de Acesso</strong>
                                <small> nova</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                            <Label htmlFor="perfilAcessoId">Qual o Perfil de Acesso?</Label>
                                            <Input type="select" required id="cboPerfilAcesso"
                                            value={perfilacessoid}
                                            onChange={ e => setPerfilAcessoId(e.target.value)} >
                                             <option value={undefined} defaultValue>Selecione...</option>
                                            {perfilacessos.map(perfilacesso => (                                                
                                                <option value={perfilacesso.id}>{perfilacesso.nomeperfil}</option>
                                            ))}                                            
                                            </Input>                                     
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="moduloId">Qual o Módulo?</Label>
                                            <Input type="select" required id="cboModuloId"
                                            value={moduloid}
                                            onChange={ e => setModuloId(e.target.value)} >

                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {modulos.map(modulo => (                                                
                                                <option value={modulo.id}>{modulo.nomemodulo}</option>
                                            ))}                                            
                                            </Input>                                      
                                        </Col>
                                     </FormGroup>   
                                     <FormGroup row>   
                                            <Col md="4">
                                                <Label htmlFor="paginaId">Qual a Página?</Label>
                                                <Input type="select" required id="cboPaginaId"
                                                value={paginaid}
                                                onChange={ e => setPaginaId(e.target.value)} >

                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {paginas.map(pagina => (                                                
                                                        <option value={pagina.id}>{pagina.nomepagina}</option>
                                                    ))}                                            
                                                </Input>                                     
                                            </Col>
                                            <Col md="4">
                                                <Label htmlFor="subPaginaId">Qual a Sub Página?</Label>
                                                <Input type="select" required id="cboSubPaginaId"
                                                value={subpaginaid}
                                                onChange={ e => setSubPaginaId(e.target.value)} >

                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {subpaginas.map(subpagina => (                                                
                                                        <option value={subpagina.id}>{subpagina.nomesubpagina}</option>
                                                    ))}                                            
                                                </Input>                                    
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="4">
                                                <Label htmlFor="funcaoId">Qual a Função?</Label>
                                                <Input type="select" required id="cboFuncaoId"
                                                value={funcaoid}
                                                onChange={ e => setFuncaoId(e.target.value)} >

                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {funcaos.map(funcao => (                                                
                                                        <option value={funcao.id}>{funcao.nomefuncao}</option>
                                                    ))}                                            
                                                </Input>                                      
                                            </Col>
                                        </FormGroup>
                                <FormGroup row>                                     
                                <Col md="2">
                                        <Label htmlFor="ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} 
                                            defaultChecked 
                                            onChange={handleSwitch}
                                            size={'sm'} />
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