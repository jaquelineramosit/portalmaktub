import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input, FormGroup} from 'reactstrap';
import './style.css';
import api from '../../../services/api';

export default function ListaPermissaoacesso() {
    const [permissaoacesso, setPermissaoacesso] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('permissao-acesso').then(response => {            
            setPermissaoacesso(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
        <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader className="links">
                       
                        <i className="fa fa-align-justify"></i>Permissão Acesso  
                                                   
                        <Link to={`permissao-acesso/${permissaoacesso.id}`} className="permissaoacesso btn btn-secondary">
                                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>                                                                                             
                                                                                                                 
                    </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Perfil Acesso</th>
                                        <th>Módulo</th>
                                        <th>Página</th>
                                        <th>Sub Página</th>
                                        <th>Função</th>                                   
                                        <th style={{ textAlign : 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissaoacesso.map(permissaoacesso => (
                                        <tr>
                                            <td>{permissaoacesso.perfilacessoid}</td>
                                            <td>{permissaoacesso.nomemodulo}</td>
                                            <td>{permissaoacesso.paginaid}</td>
                                            <td>{permissaoacesso.subpaginaid}</td>
                                            <td>{permissaoacesso.funcaoid}</td>                                        
                                            
                                            <td style={{ textAlign : 'right' }}>
                                                <Link to={`permissao-acesso/${permissaoacesso.id}`} className="btn-sm btn-primary">
                                                    <i className="fa fa-pencil fa-lg mr-1"></i>
                                                    Editar
                                                </Link>                                              
                                               
                                            </td>
                                        </tr>
                                    ))}                                                                      
                                </tbody>
                            </Table>
                            <Pagination>
                                <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                <PaginationItem active>
                                    <PaginationLink tag="button">1</PaginationLink>                            
                                </PaginationItem>
                                <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>                
            </Row>
        </div>
    );    
}