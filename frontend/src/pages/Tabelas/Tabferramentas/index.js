import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input, FormGroup} from 'reactstrap';
import './style.css';
import api from '../../../services/api';

export default function ListaFerramenta() {
    const [ferramentas, setFerramentas] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('ferramentas').then(response => {            
            setFerramentas(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
        <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader className="links">
                       
                        <i className="fa fa-align-justify"></i>Ferramentas  
                                                   
                        <Link to={`ferramentas`} className="ferramenta btn btn-secondary">
                                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>                                                                                             
                                                                                                                 
                    </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Ferramenta</th>
                                        <th>Descrição</th>
                                        <th style={{ textAlign : 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ferramentas.map(ferramentas => (
                                        <tr>
                                            <td>{ferramentas.codferramenta}</td>
                                            <td>{ferramentas.descferramenta}</td>
                                            <td style={{ textAlign : 'right' }}>
                                                <Link to={`ferramentas/${ferramentas.id}`} className="btn-sm btn-primary">
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