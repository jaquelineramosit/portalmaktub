import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';



export default function RelTicketAtendido() {

    const data = [
        {
            name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Page C', uv: -1000, pv: 9800, amt: 2290,
        },
        {
            name: 'Page D', uv: 500, pv: 3908, amt: 2000,
        },
        {
            name: 'Page E', uv: -2000, pv: 4800, amt: 2181,
        },
        {
            name: 'Page F', uv: -250, pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];

    const gradientOffset = () => {
        const dataMax = Math.max(...data.map(i => i.uv));
        const dataMin = Math.min(...data.map(i => i.uv));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <div className="animated-fadeIn">
            <div class="col-sm-6">
                <h2 class="m-0 text-dark">Técnico x Faturado </h2>
            </div>
            <div class="card-group mt-2">
                <div class="card col-lg-8" >
                    <div className="cardgrafico mt-3">
                        <AreaChart
                            width={950}
                            height={300}
                            data={data}
                            margin={{
                                top: 10, right: 30, left: 0, bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <defs>
                                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset={off} stopColor="green" stopOpacity={1} />
                                    <stop offset={off} stopColor="red" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" />
                        </AreaChart>

                    </div>

                </div>

                <div className="card col-lg-4">
                    <div className="filtros">



                        <form>
                            <Form.Row>
                                <Form.Group className=" mt-3" as={Col} controlId="formGriCliente">
                                    <Form.Label>Técnico</Form.Label>
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


                            </Table.Body>


                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}