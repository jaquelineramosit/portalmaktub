import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';



export default function RelTicketAtendido() {
   
    const data = [
        {
            name: 'Solicitação1', uv: 4000, amt: 2400,
        },
        {
            name: 'Solicitação2', uv: 3000, amt: 2210,
        },
        {
            name: 'Solicitação3', uv: 2000, amt: 2290,
        },
        {
            name: 'Solicitação4', uv: 2780, amt: 2000,
        },
        {
            name: 'Solicitação15', uv: 1890, amt: 2181,
        },
        {
            name: 'Solicitação6', uv: 2390, amt: 2500,
        },
        {
            name: 'Solicitação7', uv: 3490, amt: 2100,
        },
    ];




    return (
        <div className="animated-fadeIn">
               <div class="col-sm-6">
                    <h2 class="m-0 text-dark">Tipo de Projeto x Solicitações </h2>
                </div>
                <div class="card-group mt-2">
                    <div class="card col-lg-8" >
                        <div className="cardgrafico mt-3">
                        <BarChart
                                width={900}
                                height={400}
                                data={data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </div>

                    </div>

                    <div className="card col-lg-4">
                        <div className="filtros">



                            <form>
                                <Form.Row>
                                    <Form.Group className=" mt-3" as={Col} controlId="formGriCliente">
                                        <Form.Label>Tipo de Projeto</Form.Label>
                                        <Form.Control
                                            as="select"

                                        >
                                            <option>Selecione</option>
                                            <option>Top Five</option>
                                            <option value="1">Tipo de Projeto1</option>
                                            <option value="2">Tipo de Projeto2</option>
                                            <option value="3">Tipo de Projeto3</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group className="col-md-6" as={Col} controlId="formGridDataInicio">
                                        <Form.Label>Data Início</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                    <Form.Group className="col-md-6" as={Col} controlId="formGridDataFinal">
                                        <Form.Label>Data Final</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </Form.Row>
                            </form>

                        </div>
                    </div>

                </div>
                <div className="cardtable">
                    <div class="card col-lg-12">

                        <div className="card-table">

                            <Table celled >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Tipo de Projeto</Table.HeaderCell>                          
                                        <Table.HeaderCell>Data Inicio</Table.HeaderCell>
                                        <Table.HeaderCell>Data Final</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>                        
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>

                                </Table.Body>


                            </Table>
                        </div>
                    </div>
                </div>
        </div>
    );
}