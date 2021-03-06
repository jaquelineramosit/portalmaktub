import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../services/api';
import Usuario from '../../Acessos/Usuario';
import DataTableGenerica from '../../../components/DataTableGenerica';

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');


    //logica para pegar o total
    useEffect(() => {
        api.get('usuariosCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('usuarios', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setUsuarios(response.data);
        })
    }, [usuarioId]);
    const data = usuarios;

    const columns = [
        {
            name: 'Nome',
            selector: 'nome',
            sortable: true,


        },
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
            left: true,

        },
        {
            name: 'Telefone',
            selector: 'telefone',
            sortable: true,
            left: true,

        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            left: true,

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
            cell: row => <Link to={`usuarios/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];


    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Usuários

                        <Link to={`usuarios?action=novo`} className="btn btn-secondary float-right">
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Usuários"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}