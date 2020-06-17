import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTable from 'react-data-table-component';
import '../../../global.css'
export default function ListaAdiantamentoos() {
    const [adiantamentoos, setAdiantamentoos] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('adiantamentoCount', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('adiantamento-os', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setAdiantamentoos(response.data);
        })
    }, [usuarioId]);

    const data = adiantamentoos;

    const columns = [
        {
            name: 'Ordem de Serviço',
            selector: 'numeroos',
            sortable: true,


        },
        {
            name: 'Valor de Adiantamento',
            selector: 'valoradiantamento',
            sortable: true,
            center: true,

        },
        {
            name: 'Data de Adiantamento',
            selector: 'dataadiantamento',
            sortable: true,
            center: true,

        },
        {
            name: 'Data de Quitação',
            selector: 'dataquitacao',
            sortable: true,
            center: true,

        },
        {
            name: 'Status de Adiantamento',
            selector: 'status',
            sortable: true,
            center: true,
        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`adiantamento-os/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];


    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i> Adiantamento de OS

                        <Link to={`adiantamento-os`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                Novo
                                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className=" mt-n3"
                                title="Adiantamento de OS"
                                columns={columns}
                                theme="solarized"
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