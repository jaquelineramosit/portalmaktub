import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { BarChart, Cell, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';



export default function RelTicketAtendido() {
   
    const colors = scaleOrdinal(schemeCategory10).range();

    const data = [
        {
            name: 'Cliente A', uv: 4000, female: 2400, male: 2400,
        },
        {
            name: 'Cliente B', uv: 3000, female: 1398, male: 2210,
        },
        {
            name: 'Cliente C', uv: 2000, female: 9800, male: 2290,
        },
        {
            name: 'Cliente D', uv: 2780, female: 3908, male: 2000,
        },
        {
            name: 'Cliente E', uv: 1890, female: 4800, male: 2181,
        },
        {
            name: 'Cliente F', uv: 2390, female: 3800, male: 2500,
        },
        {
            name: 'Cliente G', uv: 3490, female: 4300, male: 2100,
        },
    ];
    const getPath = (x, y, width, height) => `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
    Z`;

    const TriangleBar = (props) => {
        const {
            fill, x, y, width, height,
        } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    TriangleBar.propTypes = {
        fill: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
    };


    return (
        <div className="animated-fadeIn">
               <div class="col-sm-6">
                    <h2 class="m-0 text-dark">Cliente x Faturado </h2>
                </div>
                <div class="card-group mt-2">
                    <div class="card col-lg-8" >
                        <div className="cardgrafico mt-3">
                        <BarChart
                                width={900}
                                height={400}
                                data={data}
                                margin={{
                                    top: 20, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>

                        </div>

                    </div>

                    <div className="card col-lg-4">
                        <div className="filtros">



                            <form>
                                <Form.Row>
                                    <Form.Group className=" mt-3" as={Col} controlId="formGriCliente">
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
                                        <Table.HeaderCell>Cliente</Table.HeaderCell>                                                                
                                        <Table.HeaderCell>Data Inicio</Table.HeaderCell>
                                        <Table.HeaderCell>Data Final</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Cliente</Table.Cell>                                     
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Cliente</Table.Cell>                                                          
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Cliente</Table.Cell>                                  
                                        <Table.Cell>Data Início</Table.Cell>
                                        <Table.Cell>Data Final</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
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