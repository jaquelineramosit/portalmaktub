import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input, FormGroup} from 'reactstrap';
import '../../../global.css';

import api from '../../../services/api';

export default function ListaTecnicos() {
    const [tecnico, setTecnico] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('tecnico').then(response => {            
            setTecnico(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
        <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader className="links">
                       
                        <i className="fa fa-align-justify"></i>Técnicos                                      
                        <Link to={`tecnico`} className="btn btn-secondary float-right">
                                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>   
                                            </CardHeader>                   
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Nome Técnico</th>
                                        <th>Celular</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Projeto</th>
                                        <th style={{ textAlign : 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tecnico.map(tecnico => (
                                        <tr>
                                            <td>{tecnico.nometecnico}</td>
                                            <td>{tecnico.telefonecelular}</td>
                                            <td>{tecnico.cidade}</td>   
                                            <td>{tecnico.estado}</td>   
                                            <td>{tecnico.tipotecnicoid}</td>                                                  
                                            <td style={{ textAlign : 'right' }}>
                                                <Link to={`tecnico/${tecnico.id}`} className="btn-sm btn-primary">
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