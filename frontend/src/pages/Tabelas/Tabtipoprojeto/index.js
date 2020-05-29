import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Badge } from 'reactstrap';
import api from '../../../services/api';
var currentPage;
var previousPage;
var nextPage;
var idPag = '';

export default function ListaTipoprojeto() {
    const [tipoprojeto, setTipoprojeto] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('tipoprojetoCount', {
            headers: {
                Authorization: 1,
            },

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
        api.get('tipo-projeto', {
            headers: {
                Authorization: 1,
            },
            params: {
                page: currentPage
            }
        }).then(response => {
            setTipoprojeto(response.data);
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

        api.get('tipo-projeto', {
            headers: {
                Authorization: 1,
            },
            params: {
                page: currentPage
            }
        }).then(response => {
            setTipoprojeto(response.data);
        });
    }
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i> Tipo de Projeto

                        <Link to={`tipo-projeto`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>

                        </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Tipo de Projeto</th>
                                        <th>Receita</th>
                                        <th>Despesa</th>
                                        <th>Horas</th>
                                        <th>Valor por Hora</th>
                                        <th>Valor por Hora/Técnico</th>
                                        <th>Ativo</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tipoprojeto.map(tipoprojeto => (
                                        <tr>
                                            <td>{tipoprojeto.nometipoprojeto}</td>
                                            <td>{tipoprojeto.receita}</td>
                                            <td>{tipoprojeto.despesa}</td>
                                            <td>{tipoprojeto.horas}</td>
                                            <td>{tipoprojeto.valorhoracobrado}</td>
                                            <td>{tipoprojeto.valorhoratecnico}</td>
                                            <td><Badge color="success">Ativo</Badge></td>
                                            <td style={{ textAlign: 'right' }}>
                                                <Link to={`tipo-projeto/${tipoprojeto.id}`} className="btn-sm btn-primary">
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