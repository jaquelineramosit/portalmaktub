import React, { Fragment, useEffect, useState} from 'react';
import api from '../../../../src/services/api';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {Badge, CardLink, CardBody, CardHeader, } from 'reactstrap';
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
import DataTableGenerica from '../../../components/DataTableGenerica';
import DateDiv from '../../../components/DateDiv'
import BadgeStatus from '../../../components/BadgeStatus'

const dateFormat = require('dateformat');
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

    // useEffect(() => {
    //     api.get('/dashboard-card-totalMensal/1').then(response => {
    //         setTotalCard1(response.data);           
    //     })
    // }, []);

    // useEffect(() => {
    //     api.get('/dashboard-card-totalMensal/5').then(response => {
    //         setTotalCard2(response.data);           
    //     })
    // }, []);

    // useEffect(() => {
    //     api.get('/dashboard-card-totalMensal/3').then(response => {
    //         setTotalCard3(response.data);           
    //     })
    // }, []);

    // useEffect(() => {
    //     api.get('/dashboard-card-totalMensal/6').then(response => {
    //         setTotalCard4(response.data);           
    //     })
    // }, []);

    useEffect(() => {
        api.get('/dashboard-card-total/1').then(response => {
            setTotalCard1(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-total/5').then(response => {
            setTotalCard2(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-total/3').then(response => {
            setTotalCard3(response.data);           
        })
    }, []);

    useEffect(() => {
        api.get('/dashboard-card-total/6').then(response => {
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

    function atualizaListaOS(status, periodo) {                
        
        api.get(`/ordem-servico-lista/10/${status}/${periodo}`).then(response => {
            setListaOrdemServico(response.data);                       
        })    
    }

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
    
    const Cards = () => {  
        return (
            <Fragment>
                {/* card - Novas */}
                <Col xs="12" sm="6" lg="3">
                    <CardLink className="text-white bg-info card cursor-pointer" onClick={() => atualizaListaOS('NOVO', null)}>
                        <CardBody className="pb-0 pt-2" >                                                                
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
                    </CardLink>
                </Col>
                
                {/* card - Concluidas */}
                <Col xs="12" sm="6" lg="3">
                    <CardLink className="text-white bg-success card cursor-pointer" onClick={() => atualizaListaOS('CONCL', null)}>                    
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
                    </CardLink>
                </Col>
                
                {/* card - Em Execucao */}
                <Col xs="12" sm="6" lg="3">                    
                    <CardLink className="text-white bg-warning card cursor-pointer" onClick={() => atualizaListaOS('EMAND', null)}>
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
                    </CardLink>
                </Col>
                
                {/* card - Canceladas */}
                <Col xs="12" sm="6" lg="3">
                    <CardLink className="text-white bg-danger card cursor-pointer" onClick={() => atualizaListaOS('CANC', null)}>                    
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
                    </CardLink>
                </Col>    
            </Fragment>    
        )
    }    

    const DivData = (props) => {
        return (
            <div>
                <DateDiv data={props.dataatendimento} controleId={props.id}></DateDiv>
            </div>
        )
    }

    const data = listaOrdemServico;

    const columns = [
        {
            name: 'OS',
            selector: 'numeroos',
            sortable: true,
            width: '8%',
        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            width: '14%',            
        },
        {
            name: 'Cliente Final',
            selector: 'nomeclientefinal',            
            sortable: true,
            width: '14%',            
        },
        {
            name: 'Técnico',
            selector: 'nometecnico',
            sortable: true,
            center: false,
            width: '14%',
        },
        {
            name: 'Data Atendimeto',
            sortable: true,
            selector: 'dataatendimento',
            width: '12%',
            center:true,
            cell: row => <DivData key={`divData${row.id}`} dataatendimento={row.dataatendimento} ordemservicoId={row.id}></DivData>,           
        },
        {
            name: 'Projeto',
            selector: 'nometipoprojeto',
            sortable: true,
            center: true,
            width: '14%',
        },
        {
            name: 'Status Atendimento',
            selector: 'status',
            sortable: true,
            center: true,
            width: '14%',
            cell: row => <BadgeStatus key={`badge${row.id}`} status={row.status}></BadgeStatus>
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '10%',
            cell: row => <Link to={`ordem-servico/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
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
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </Link>
                        </CardHeader>                       
                        <CardBody  >
                            <DataTableGenerica
                                data={data}
                                columns={columns}
                                title="Ordem de Serviço"
                            />
                        </CardBody>                                                                                
                    </Card>
                </Col>
            </Row>
        </div>     
    );    
}