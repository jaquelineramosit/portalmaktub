import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';



export default function RelTicketAtendido() {
   
    const data = [
        {
            subject: 'Troca de Servidor', A: 120, B: 110, fullMark: 150,
        },
        {
            subject: 'Manutenção de Switch', A: 98, B: 130, fullMark: 150,
        },
        {
            subject: 'Configuração de Servidor', A: 86, B: 130, fullMark: 150,
        },
        {
            subject: 'Configuração de Switch', A: 99, B: 100, fullMark: 150,
        },
        {
            subject: 'Manutenção de Infre', A: 85, B: 90, fullMark: 150,
        },
        {
            subject: 'Suporte de TI', A: 65, B: 85, fullMark: 150,
        },

    ];
    return (
        <div className="animated-fadeIn">
               <div class="col-sm-6">
                    <h2 class="m-0 text-dark">Tipo de Projeto x Cliente </h2>
                </div>
                <div class="card-group mt-2">
                    <div class="card col-lg-8" >
                        <div className="cardgrafico mt-3">
                        <RadarChart width={750} height={500} data={data}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis />
                                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>

                        </div>

                    </div>

                    <div className="card col-lg-4">
                        <div className="filtros">



                            <form>
                                <Form.Row>
                                    <Form.Group className=" mt-3 col-12" as={Col} controlId="formGriCliente">
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
                                    <Form.Group className="" as={Col} controlId="formGriCliente">
                                        <Form.Label>Cliente</Form.Label>
                                        <Form.Control
                                            as="select"

                                        >
                                            <option>Selecione</option>
                                            <option>Top Five</option>
                                            <option value="1">Cliente1</option>
                                            <option value="2">Cliente2</option>
                                            <option value="3">Cliente3</option>
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
                                        <Table.HeaderCell>Cliente</Table.HeaderCell>                       
                                        <Table.HeaderCell>Data Inicio</Table.HeaderCell>
                                        <Table.HeaderCell>Data Final</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>
                                        <Table.Cell>Cliente</Table.Cell>  
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>     
                                        <Table.Cell>Cliente</Table.Cell>                     
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>
                                        <Table.Cell>Cliente</Table.Cell>  
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Tipo de Projeto</Table.Cell>
                                        <Table.Cell>Cliente</Table.Cell>  
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