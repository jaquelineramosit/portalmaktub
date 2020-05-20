import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Input, FormGroup} from 'reactstrap';
import './style.css';
import api from '../../../services/api';

export default function ListaOrdemservico() {
    const [ordemservico, setOrdemservico] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('ordem-servico').then(response => {            
            setOrdemservico(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
        <Row>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader className="links">
                       
                        <i className="fa fa-align-justify"></i> Ordem de Serviço  
                                                   
                        <Link to={`ordem-servico`} className="ordemservico btn btn-secondary">
                                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>                                                                                             
                                                                                                                 
                    </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Número de OS</th>
                                        <th>Cliente</th>
                                        <th>Data de Solicitação</th>
                                        <th>Data Atendimento</th>
                                        <th>Técnico</th>
                                        <th>Tipo de Serviço</th>
                                        <th style={{ textAlign : 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordemservico.map(ordemservico => (
                                        <tr>
                                            <td>{ordemservico.numeroos}</td>
                                            <td>{ordemservico.clientefilialid}</td>
                                            <td>{ordemservico.datasolicitacao}</td>
                                            <td>{ordemservico.dataatendimento}</td>
                                            <td>{ordemservico.tecnicoid}</td>
                                            <td>{ordemservico.tiposervicoid}</td>
                                            <td style={{ textAlign : 'right' }}>
                                                <Link to={`ordem-servico/${ordemservico.id}`} key={ordemservico.id}className="btn-sm btn-primary">
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