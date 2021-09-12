 import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function ItemComponent(props) {

    return (
        <Container className="item" onClick={()=>props.addHandler(props)}>
            <Row>
                <Col>
                    {props.productName}
                </Col>
                <Col>
                    {props.rate}
                </Col>
            </Row>
        </Container>
    )
}

export default ItemComponent;
