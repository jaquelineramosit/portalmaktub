import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {Badge, ButtonDropdown, CardBody, CardHeader, CardTitle, DropdownMenu, DropdownItem, DropdownToggle, Progress,} from 'reactstrap';
import {        
    ButtonGroup,
    ButtonToolbar,
    Card,    
    CardFooter,    
    Col,
    Dropdown,    
    Row,
    Table,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
        {
            label: 'Ordens de Serviços',
            backgroundColor: brandInfo,
            borderColor: 'rgba(255,255,255,.55)',
            data: [65, 59, 84, 84, 51, 55],
        },
    ],
};

const cardChartOpts1 = {
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
                min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
                max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
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
const cardChartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: brandSuccess,
            borderColor: 'rgba(255,255,255,.55)',
            data: [1, 18, 9, 17, 34, 22, 11],
        },
    ],
};

const cardChartOpts2 = {
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
                min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
                max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
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
const cardChartData3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            data: [78, 81, 80, 45, 34, 12, 40],
        },
    ],
};

const cardChartOpts3 = {
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
const cardChartData4 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,255,255,.3)',
            borderColor: 'transparent',
            data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
        },
    ],
};

const cardChartOpts4 = {
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

function renderTooltip(props) {
    return (
      <Tooltip id="os-tooltip" {...props}>
        Ordem de Serviço
      </Tooltip>
    );
  }

class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    
        this.state = {
            dropdownOpen: false,
            radioSelected: 2,
        };
    }

    //ordem-servico-lista
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    onRadioBtnClick(radioSelected) {
        this.setState({
            radioSelected: radioSelected,
        });
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    render() {

        return (        
            
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0 pt-2">                                
                                <div className="text-value">123</div>
                                <div>Novas OS's</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-success">
                            <CardBody className="pb-0 pt-2">
                                <ButtonGroup className="float-right">
                                <Dropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                                    <DropdownToggle className="p-0" color="transparent">
                                    <i className="icon-location-pin"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                    <DropdownItem>Action</DropdownItem>
                                    <DropdownItem>Another action</DropdownItem>
                                    <DropdownItem>Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                </ButtonGroup>
                                <div className="text-value">53%</div>
                                <div>OS's Concluídas</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                                <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-warning">
                            <CardBody className="pb-0 pt-2">
                                <ButtonGroup className="float-right">
                                <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                                    <DropdownToggle caret className="p-0" color="transparent">
                                    <i className="icon-settings"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                    <DropdownItem>Action</DropdownItem>
                                    <DropdownItem>Another action</DropdownItem>
                                    <DropdownItem>Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                </ButtonGroup>
                                <div className="text-value">287</div>
                                <div>OS's em Andamento</div>
                            </CardBody>
                            <div className="chart-wrapper" style={{ height: '70px' }}>
                                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
                            </div>
                        </Card>
                    </Col>

                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-danger">
                            <CardBody className="pb-0 pt-2">
                                <ButtonGroup className="float-right">
                                <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                                    <DropdownToggle caret className="p-0" color="transparent">
                                        <i className="icon-settings"></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Action</DropdownItem>
                                        <DropdownItem>Another action</DropdownItem>
                                        <DropdownItem>Something else here</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                </ButtonGroup>
                                <div className="text-value">15</div>
                                <div>OS's Canceladas</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                                <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Últimas OS's</CardHeader>
                            <CardBody className="p-1">                                
                                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                                    <thead className="thead-light">
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
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${1}?action=edit`}>1</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 1
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Penha
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="success">Concluída</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento:</strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro:</strong>01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${2}?action=edit`}>2</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 2
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Fortaleza
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="info" className="text-white">Nova</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento:</strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro:</strong>01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${3}?action=edit`}>3</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 3
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Penha
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="warning">Em Andamento</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento:</strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro:</strong>01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${4}?action=edit`}>4</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 4
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Penha
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="warning">Em Andamento</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento:</strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro:</strong>01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${5}?action=edit`}>5</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 1
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Penha
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="success">Concluída</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento:</strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro:</strong>01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${6}?action=edit`}>6</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 1
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Penha
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="danger">Cancelada</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento:</strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro:</strong>01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${7}?action=edit`}>7</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 7
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Penha
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="info" className="text-white">Nova</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento:</strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro:</strong>01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <Link to={`/ordem-servico/${1}?action=edit`}>1</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    <i className="fa fa-handshake-o mr-2" title="Clientes"></i>
                                                    Cliente 1
                                                </div>
                                                <div className="small text-muted">
                                                    <i className="fa fa-building mr-1" title="Clientes"></i>
                                                    Casas Bahia Penha
                                                </div>
                                            </td>
                                            <td>
                                                João Paulo
                                            </td>
                                            <td>
                                                <div className="text-center">
                                                    <Badge color="info" className="text-white">Nova</Badge>
                                                </div>                                                
                                            </td>
                                            <td>
                                                Instalação de SSD
                                            </td>
                                            <td>
                                                <div className="small text-muted">                                              
                                                    <strong>Atendimento: </strong> 01/08/2020
                                                </div>
                                                <div className="small text-muted">
                                                <strong>Cadastro: </strong> 01/03/2020
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    </Row>
            </div>     
        );    
    }
}
export default Dashboard;