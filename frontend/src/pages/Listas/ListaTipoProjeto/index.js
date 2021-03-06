import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';
import BadgeAtivo from '../../../components/BadgeAtivo'

export default function ListaTipoProjeto() {
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

    useEffect(() => {
        api.get('tipo-projeto', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTipoprojeto(response.data);
        })
    }, [usuarioId]);
    const data = tipoprojeto;

    const columns = [
        {
            name: 'Tipo de Projeto',
            selector: 'nometipoprojeto',
            sortable: true,


        },
        {
            name: 'Custo Tec',
            selector: 'despesa',
            sortable: true,
            left: true,

        },
        {
            name: 'Valor Cobrado',
            selector: 'receita',
            sortable: true,
            left: true,

        },
        {
            name: 'Horas',
            selector: 'horas',
            sortable: true,
            left: true,

        },
        {
            name: 'Valor cobrado hora extra',
            selector: 'valorhoraextra',
            sortable: true,
            left: true,

        },
        {
            name: 'Valor hora Técnico',
            selector: 'valorhoratecnico',
            sortable: true,
            left: true,

        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => <BadgeAtivo key={`badge${row.ativo}`} ativo={row.ativo}></BadgeAtivo>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`tipo-projeto/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i> Tipo de Projeto

                        <Link to={`tipo-projeto?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Tipo de Projeto"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
