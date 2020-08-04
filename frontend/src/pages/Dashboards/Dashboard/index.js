import React, {Component, Fragment, useEffect, useState} from 'react';
import api from '../../../../src/services/api';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {Badge, CardBody, CardHeader, } from 'reactstrap';
import { FaChartLine} from 'react-icons/fa'
import {        
    Card,    
    Col,
    Dropdown,    
    Row,
    Table,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap';

export default function DashBoard() {

    const usuarioId = localStorage.getItem('userId');

    const meses = [
    
        "",
        "Janeiro",
        "Fevereiro",
        "Marco",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]

    const brandInfo = getStyle('--info')
    const brandSuccess = getStyle('--success')

    function renderTooltip(props) {
        return (
          <Tooltip id="os-tooltip" {...props}>
            Ordem de Serviço
          </Tooltip>
        );
    }

    ////INICIO - Resultado Graficos
    const [resultadoCard1, setResultadoCard1] = useState([]);
    const [resultadoCard2, setResultadoCard2] = useState([]);
    const [resultadoCard3, setResultadoCard3] = useState([]);
    const [resultadoCard4, setResultadoCard4] = useState([]);
    
    useEffect(() => {
        api.get('/dashboard-card-mensal/1').then(response => {
            setResultadoCard1(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-mensal/5').then(response => {
            setResultadoCard2(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-mensal/3').then(response => {
            setResultadoCard3(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-mensal/6').then(response => {
            setResultadoCard4(response.data);           
        })
    }, []);

    ////FIM - Resultado Graficos

    ////INICIO - Total Geral
    const [totalCard1, setTotalCard1] = useState([]);
    const [totalCard2, setTotalCard2] = useState([]);
    const [totalCard3, setTotalCard3] = useState([]);
    const [totalCard4, setTotalCard4] = useState([]);

    useEffect(() => {
        api.get('/dashboard-card-totalMensal/1').then(response => {
            setTotalCard1(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-totalMensal/5').then(response => {
            setTotalCard2(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-totalMensal/3').then(response => {
            setTotalCard3(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-totalMensal/6').then(response => {
            setTotalCard4(response.data);           
        })
    }, []);

    ////FIM Total Geral

    ////INICIO - Lista OS's
    const [listaOrdemServico, setListaOrdemServico] = useState([]);

    useEffect(() => {
        api.get('/ordem-servico-lista/10').then(response => {
            setListaOrdemServico(response.data);           
        })
    }, []);


    ////FIM - Lista OS's
    const dadosCard1 =
    {
        labels: resultadoCard1.map(total => `${meses[total.mes]} - ${total.ano}`),
        datasets: 
        [
            {
                label: "OS's Novas",
                backgroundColor: brandInfo,
                borderColor: 'rgba(255,255,255,.55)',
                data: resultadoCard1.map(total => total.totalMensal),               
            }
        ] 
    }

    const dadosCardOpt1 = {
    
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },
    
            }],
            yAxes: [
                {
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, dadosCard1.datasets[0].data) - 5,
                    max: Math.max.apply(Math, dadosCard1.datasets[0].data) + 5,
                },
            }],
        },
        elements: {
            line: {
                borderWidth: 1,
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        }
    }
    // Card Chart 2
    const dadosCard2 = {
        labels: resultadoCard2.map(total => `${meses[total.mes]} - ${total.ano}`),
        datasets: [
            {
                label: "OS's Concluídas",
                backgroundColor: brandSuccess,
                borderColor: 'rgba(255,255,255,.55)',
                data: resultadoCard2.map(total => total.totalMensal), 
            },
        ],
    };
    const dadosCardOpt2 = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                gridLines: {
                    color: 'transparent',
                    zeroLineColor: 'transparent',
                },
                ticks: {
                    fontSize: 2,
                    fontColor: 'transparent',
                },

            }],
        yAxes: [
            {
                display: false,
                ticks: {
                    display: false,
                    min: Math.min.apply(Math, dadosCard2.datasets[0].data) - 5,
                    max: Math.max.apply(Math, dadosCard2.datasets[0].data) + 5,
                },
            }],
        },
        elements: {
            line: {
                tension: 0.00001,
                borderWidth: 1,
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
    };
    // Card Chart 3
    const dadosCard3 = {
        labels: resultadoCard3.map(total => `${meses[total.mes]} - ${total.ano}`),
            datasets: [
            {
                label: "OS's em Andamento",
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
                data: resultadoCard3.map(total => total.totalMensal), 
            },
        ],
    };
    const dadosCardOpt3 = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                display: false,
            }],
        yAxes: [
            {
                display: false,
            }],
        },
        elements: {
            line: {
                borderWidth: 2,
            },
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
            },
        },
    };
    // Card Chart 4
    const dadosCard4 = {
        labels: resultadoCard4.map(total => `${meses[total.mes]} - ${total.ano}`),
            datasets: [
            {
                label: "OS's Canceladas",
                backgroundColor: 'rgba(255,255,255,.3)',
                borderColor: 'transparent',
                data: resultadoCard4.map(total => total.totalMensal), 
            },
        ],
    };
    const dadosCardOpt4 = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        scales: {
            xAxes: [
                {
                display: false,
                barPercentage: 0.6,
            }],
            yAxes: [
                {
                display: false,
            }],
        },
    };
    const [color, setColor]  = useState('');
    const BadgeStatus = (props) => {
        const status = props.status;        
        var color = "";
        var textColor = "";
        
        switch (status) {
            case "Novo":
                color = "info";
                textColor = "text-white";
                break
            case "Concluído":
                color = "success"
                break
            case "Em Andamento":
                color = "warning"
                break
            case "Cancelado":
                color = "danger"
                break
            case "Agendado":
                color = "light"
                break     
            case "Improdutivo":
                color = "dark"
                break   
            }
        return (
            <Fragment>
                <Badge className={textColor} color={color}>{status}</Badge>
            </Fragment>
        )
    } 

    const Cards = () => {  
        return (
            <Fragment>
                {/* card - Novas */}
                <Col xs="12" sm="6" lg="3">
                    <Card className="text-white bg-info">
                        <CardBody className="pb-0 pt-2">                                                                
                            {/* <ButtonGroup className="float-right">
                                <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                                    <DropdownToggle caret className="p-0" color="transparent">
                                        <i className="icon-settings"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Semanal</DropdownItem>
                                        <DropdownItem>Quinzenal</DropdownItem>
                                        <DropdownItem>Mensal</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup> */}
                            <div className="text-value">{totalCard1.map(total => total.total)}</div>
                            <div>Novas OS's</div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            <Line data={dadosCard1} options={dadosCardOpt1} height={70} />
                        </div>
                    </Card>
                </Col>
                
                {/* card - Concluidas */}
                <Col xs="12" sm="6" lg="3">
                    <Card className="text-white bg-success">
                        <CardBody className="pb-0 pt-2">
                            {/* <ButtonGroup className="float-right">
                                <ButtonDropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                                    <DropdownToggle caret className="p-0" color="transparent">
                                        <i className="icon-settings"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Semanal</DropdownItem>
                                        <DropdownItem>Quinzenal</DropdownItem>
                                        <DropdownItem>Mensal</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup> */}
                            <div className="text-value">{totalCard2.map(total => total.total)}</div>
                            <div>OS's Concluídas</div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            <Line data={dadosCard2} options={dadosCardOpt2} height={70} />
                        </div>
                    </Card>
                </Col>
                
                {/* card - Em Execucao */}
                <Col xs="12" sm="6" lg="3">
                    <Card className="text-white bg-warning">
                        <CardBody className="pb-0 pt-2">
                            {/* <ButtonGroup className="float-right">
                                <ButtonDropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                                    <DropdownToggle caret className="p-0" color="transparent">
                                        <i className="icon-settings"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Semanal</DropdownItem>
                                        <DropdownItem>Quinzenal</DropdownItem>
                                        <DropdownItem>Mensal</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup> */}
                            <div className="text-value">{totalCard3.map(total => total.total)}</div>
                            <div>OS's em Andamento</div>
                        </CardBody>
                        <div className="chart-wrapper" style={{ height: '70px' }}>
                            <Line data={dadosCard3} options={dadosCardOpt3} height={70} />
                        </div>
                    </Card>
                </Col>
                
                {/* card - Canceladas */}
                <Col xs="12" sm="6" lg="3">
                    <Card className="text-white bg-danger">
                        <CardBody className="pb-0 pt-2">
                            {/* <ButtonGroup className="float-right">
                                <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                                    <DropdownToggle caret className="p-0" color="transparent">
                                        <i className="icon-settings"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Semanal</DropdownItem>
                                        <DropdownItem>Quinzenal</DropdownItem>
                                        <DropdownItem>Mensal</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup> */}
                            <div className="text-value">{totalCard4.map(total => total.total)}</div>
                            <div>OS's Canceladas</div>
                        </CardBody>
                        <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            <Bar data={dadosCard4} options={dadosCardOpt4} height={70} />
                        </div>
                    </Card>
                </Col>
    
            </Fragment>
    
        )
    }
    return (        
        <div className="animated fadeIn">
            {/* cards */}
            <Row>
                <Cards></Cards>
            </Row>
            {/* Lista OS's */}
            <Row>
                <Col>
                    <Card>
                        <CardHeader className="links">
                            <FaChartLine /> Últimas OS's
                            <Link to={`ordem-servico?action=novo`} className="btn-sm btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                            </Link>
                        </CardHeader>                       
                        <CardBody className="p-1">                                
                            <Table key={`table`} hover responsive className="table-outline mb-0 d-none d-sm-table">
                                <thead key={`tableheader`} className="thead-light">
                                    <tr>
                                        <th className="text-center">
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 100, hide: 400 }}
                                                overlay={renderTooltip}
                                            >
                                                <i className="icon-wrench"></i>
                                            </OverlayTrigger>                                                
                                        </th>
                                        <th className="">Cliente / Filial</th>                                        
                                        <th>Técnico</th>
                                        <th className="text-center">Status</th>
                                        <th>Projeto</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody key={`tablebody`}>
                                    {listaOrdemServico.map((ordemServico, index) => 
                                    <tr key={`tr${ordemServico.id}_${index}`}>
                                        <td className="text-center">
                                            <Link key={`link${ordemServico.id}`} to={`/ordem-servico/${ordemServico.id}?action=edit`}>{ordemServico.id}</Link>
                                        </td>
                                        <td>
                                            <div key={`cliente${ordemServico.id}`}>
                                                <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                {ordemServico.nomecliente}
                                            </div>
                                            <div key={`filial${ordemServico.id}`} className="small text-muted">
                                                <i className="fa fa-building mr-1" title="Clientes"></i>
                                                {ordemServico.nomefilial}
                                            </div>
                                        </td>
                                        <td>
                                            {ordemServico.nometecnico}
                                        </td>
                                        <td>
                                            <div key={`status${ordemServico.id}`} className="text-center">
                                                <BadgeStatus key={`badge${ordemServico.id}`} status={ordemServico.status}></BadgeStatus>
                                            </div>                                                
                                        </td>
                                        <td>
                                            Instalação de SSD
                                        </td>
                                        <td>
                                            <div key={`dtAtendimento${ordemServico.id}`} className="small text-muted">                                              
                                                <strong>Atendimento:</strong> 01/08/2020
                                            </div>
                                            <div key={`dtCadastro${ordemServico.id}`} className="small text-muted">
                                            <strong>Cadastro:</strong>01/03/2020
                                            </div>
                                        </td>
                                    </tr>
                                    )}                                    
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>     
    );    
}