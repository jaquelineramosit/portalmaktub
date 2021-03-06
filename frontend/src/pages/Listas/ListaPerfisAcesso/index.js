import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from  '../../../components/DataTableGenerica';

export default function ListaPerfisAcesso() {
    const [perfisacesso, setPerfisacesso] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('perfisacessoCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('perfis-acesso', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setPerfisacesso(response.data);
        })
    }, [usuarioId]);
    const data = perfisacesso;

    const columns = [
        {
            name: 'Perfil Acesso',
            selector: 'nomeperfil',
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
            cell: row => <Link to={`perfis-acesso/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Perfil de Acesso

                        <Link to={`perfis-acesso?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Perfis de Acesso"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
