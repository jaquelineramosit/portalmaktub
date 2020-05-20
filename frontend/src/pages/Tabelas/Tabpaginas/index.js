import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input, FormGroup} from 'reactstrap';
import './style.css';
import api from '../../../services/api';

export default function ListaPaginas() {
    const [paginas, setPaginas] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('paginas').then(response => {            
            setPaginas(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
        <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader className="links">
                       
                        <i className="fa fa-align-justify"></i>Páginas  
                                                   
                        <Link to={`paginas`} className="paginas btn btn-secondary">
                                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>                                                                                             
                                                                                                                 
                    </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Módulo</th>
                                        <th>Nome da Página</th>
                                        <th>Descrição</th>                                                                         
                                        <th style={{ textAlign : 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginas.map(paginas => (
                                        <tr>
                                            <td>{paginas.moduloid}</td>
                                            <td>{paginas.nomepagina}</td>   
                                            <td>{paginas.descricao}</td>          
                                            <td style={{ textAlign : 'right' }}>
                                                <Link to={`paginas/${paginas.id}`} className="btn-sm btn-primary">
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