import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row,Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';

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
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`tipo-projeto/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
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
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>

                        </CardHeader>
                        <CardBody>
                        <DataTable className="mt-n3"
                                title="Tipo de Projeto"
                                columns={columns}
                                data={data}
                                striped={true}
                                highlightOnHover={true}
                                responsive={true}
                                pagination={true}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
