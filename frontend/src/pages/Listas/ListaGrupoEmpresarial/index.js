import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaGrupoEmpresarial() {
    const [grupoempresarial, setGrupoEmpresarial] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('grupo-empresarial-Count', {
            headers: {
                Authorization: 1,
            },

        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('grupo-empresarial', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setGrupoEmpresarial(response.data);
        })
    }, [usuarioId]);
    const data = grupoempresarial;

    const columns = [
        {
            name: 'Grupo Empresarial',
            selector: 'nomegrupoempresarial',
            sortable: true,
            width: '35%',   


        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            width: '32%',  

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
            cell: row => <Link to={`grupo-empresarial/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Grupo Empresarial
                        <Link to={`grupo-empresarial?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Parceiros"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
