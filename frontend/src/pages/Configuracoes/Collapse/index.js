import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Fade,
  Row,
} from 'reactstrap';

const Collapses = () => {

  const [collapse, setCollapse] = useState(true)

  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  return (
    <Row>
      <Col xl="6">
        <Card>
          <CardHeader>
            Collapse
            <div className="card-header-actions">
              <Link className="card-header-action" onClick={toggle}>
                <small className="text-muted">docs</small>
              </Link>
            </div>
          </CardHeader>
          <Collapse isOpen={collapse}>
            <CardBody>
              <p>
                Anim pariatur cliche reprehenderit,
                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                anim keffiyeh helvetica, craft beer labore wes anderson cred
                nesciunt sapiente ea proident.
              </p>
              <p>
                Donec molestie odio id nisi malesuada, mattis tincidunt velit egestas. Sed non pulvinar risus. Aenean
                elementum eleifend nunc, pellentesque dapibus arcu hendrerit fringilla. Aliquam in nibh massa. Cras
                ultricies lorem non enim volutpat, a eleifend urna placerat. Fusce id luctus urna. In sed leo tellus.
                Mauris tristique leo a nisl feugiat, eget vehicula leo venenatis. Quisque magna metus, luctus quis
                sollicitudin vel, vehicula nec ipsum. Donec rutrum commodo lacus ut condimentum. Integer vel turpis
                purus. Etiam vehicula, nulla non fringilla blandit, massa purus faucibus tellus, a luctus enim orci non
                augue. Aenean ullamcorper nisl urna, non feugiat tortor volutpat in. Vivamus lobortis massa dolor, eget
                faucibus ipsum varius eget. Pellentesque imperdiet, turpis sed sagittis lobortis, leo elit laoreet arcu,
                vehicula sagittis elit leo id nisi.
              </p>
            </CardBody>
          </Collapse>
          <CardFooter>
            
          </CardFooter>
        </Card>
      </Col>
    </Row>
  )
}

export default Collapses
