import React, {useState} from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';

const lorem = () => {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
}

const TabPaneContent = () => {
    return (
    <>
        <TabPane tabId="1">
        {`1. ${lorem}`}
        </TabPane>
        <TabPane tabId="2">
        {`2. ${lorem}`}
        </TabPane>
        <TabPane tabId="3">
        {`3. ${lorem}`}
        </TabPane>
    </>
    );
}


const Tabs = () => {

    const [activeTab, setCctiveTab] = useState([]);

    return (
        <div className="animated fadeIn">
            <Row>
            <Col xs="12" md="12" className="mb-4">
                <Nav tabs>
                <NavItem>
                    <NavLink
                    // active={this.state.activeTab[3] === '1'}
                    // onClick={() => { this.toggle(3, '1'); }}
                    >
                    <i className="icon-calculator"></i>
                    <span className={'d-none'}> Calc</span>
                    {'\u00A0'}<Badge color="success">New</Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    // active={this.state.activeTab[3] === '2'}
                    // onClick={() => { this.toggle(3, '2'); }}
                    >
                    <i className="icon-basket-loaded"></i>
                    <span className={'d-none'}> Cart</span>
                    {'\u00A0'}<Badge pill color="danger">29</Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    // active={this.state.activeTab[3] === '3'}
                    // onClick={() => { this.toggle(3, '3'); }} 
                    >
                        <i className="icon-pie-chart"></i>
                        <span className={'d-none'}> Charts</span>
                    </NavLink>
                </NavItem>
                </Nav>
                <TabContent activeTab={true}>
                    <TabPaneContent></TabPaneContent>
                </TabContent>
            </Col>
            </Row>
        </div>
    );
}

export default Tabs;
