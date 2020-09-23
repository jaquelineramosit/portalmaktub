import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaFuncao() {
    const [funcao, setFuncao] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('funcaoCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('funcao', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setFuncao(response.data);
        })
    }, [usuarioId]);
    const data = funcao;
    const columns = [
        {
            name: 'Página',
            selector: 'nomepagina',
            sortable: true,
            width: '23%'
        },
        {
            name: 'Sub Página',
            selector: 'nomesubpagina',
            sortable: true,
            left: true,
            width: '23%'
        },
        {
            name: 'Função',
            selector: 'nomefuncao',
            sortable: true,
            left: true,
            width: '25%'
        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            width: '20%',
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`funcao/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Função
                        <Link to={`funcao?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                columns={columns}
                                data={data}
                                title="Função"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
