import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaStatusAdiantamento() {
    const [statusadiantamento, setStatusadiantamento] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('statusadiantamentoCount', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);
    //Logica para mostrar os numeros de pagina

    useEffect(() => {
        api.get('status-adiantamento', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setStatusadiantamento(response.data);
        })
    }, [usuarioId]);
    const data = statusadiantamento;

    const columns = [
        {
            name: 'Status',
            selector: 'status',
            sortable: true,


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
            cell: row => <Link to={`status-adiantamento/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Status Adiantamento

                        <Link to={`status-adiantamento?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Status de Adiantamento"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
