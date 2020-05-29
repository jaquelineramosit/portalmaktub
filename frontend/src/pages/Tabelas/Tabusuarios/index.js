import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Label, Input, FormGroup } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import api from '../../../services/api';
import Usuario from '../../Acessos/Usuario';
var currentPage;
var previousPage;
var nextPage;
var idPag = '';

export default function ListaUsuários() {
    const [usuarios, setUsuarios] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');


    //logica para pegar o total
    useEffect(() => {
        api.get('usuariosCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);
    //Logica para mostrar os numeros de pagina
    const pageNumbers = [];
    for (let i = 1; i <= (total / 20); i++) {
        pageNumbers.push(i);
    }

    if (total % 20 > 0) {
        pageNumbers.push(pageNumbers.length + 1);
    }


    useEffect(() => {
        api.get('usuarios', {
            headers: {
                Authorization: 1,
            },
            params: {
                page: currentPage
            }
        }).then(response => {
            setUsuarios(response.data);
        })
    }, [usuarioId]);
    //Paginação
    async function handlePage(e) {
        e.preventDefault();

        idPag = e.currentTarget.name;

        if (idPag == 'btnPrevious') {
            currentPage = previousPage;
            previousPage = currentPage - 1;
            nextPage = currentPage + 1;
        } else if (idPag == 'btnNext') {
            // se existe, quer dizer que foi apertado após qualquer numero
            if (currentPage) {
                currentPage = nextPage;
                previousPage = currentPage - 1;
                nextPage = currentPage + 1;
            } else { // next apertado antes de qlqr numero (1º load + next em vez d pag 2)
                currentPage = 2;
                nextPage = 3;
                previousPage = 1;
            };
        } else {
            currentPage = parseInt(e.currentTarget.id);
            previousPage = currentPage - 1;
            nextPage = currentPage + 1;
        };

        api.get('usuarios', {
            headers: {
                Authorization: 1,
            },
            params: {
                page: currentPage
            }
        }).then(response => {
            setUsuarios(response.data);
        });
    }

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Usuários

                        <Link to={`usuarios`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>

                        </CardHeader>                    
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Nome</th>                                      
                                        <th>Estado</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Ativo</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>                              
                                <tbody>
                                    
                                    {usuarios.map(usuarios => (
                                        <tr>
                                            <td>{usuarios.nome}</td>
                                            <td>{usuarios.estado}</td>
                                            <td>{usuarios.telefone}</td>                                          
                                            <td>{usuarios.email}</td>
                                            <td> <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}                                               
                                            /></td>
                                            <td style={{ textAlign: 'right' }}>
                                                <Link to={`usuarios/${usuarios.id}`} className="btn-sm btn-primary">
                                                    <i className="fa fa-pencil fa-lg mr-1"></i>
                                                    Editar
                                                </Link>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination>
                                <PaginationItem>
                                    <PaginationLink previous id="btnPrevious" name="btnPrevious" onClick={e => handlePage(e)} tag="button">
                                        <i className="fa fa-angle-double-left"></i>
                                    </PaginationLink>
                                </PaginationItem>
                                {pageNumbers.map(number => (
                                    <PaginationItem key={'pgItem' + number} >
                                        <PaginationLink id={number} name={number} onClick={e => handlePage(e)} tag="button">{number}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink next id="btnNext" name="btnNext" onClick={e => handlePage(e)} next tag="button">
                                        <i className="fa fa-angle-double-right"></i>
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}