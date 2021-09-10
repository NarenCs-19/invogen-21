import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col } from 'react-bootstrap';
import {Plus, Dash, X, ArrowClockwise} from 'react-bootstrap-icons';

function AddedItems(props) {
    const [count, setCount] = useState(1);

    useEffect(()=>{
        //console.log(count);
        props.updateHandler(count,props.productName);
    },[count]);

    return (
        <Container className="Item">
            <Row className="my-3">
                <Col lg={5} className="d-flex align-items-center">
                    {props.productName}
                </Col>
                <Col lg={2} className="d-flex align-items-center">
                    {props.rate}
                </Col>
                <Col lg={1} >
                    <Button variant="success">{count}</Button>
                </Col>
                <Col lg={1}>
                    <Button variant="success" onClick={()=>setCount(prevCount=>prevCount+1)}><Plus/></Button>
                </Col>
                <Col lg={1}>
                    <Button variant="primary" disabled={count<1} onClick={()=>setCount(prevCount=>prevCount-1)}><Dash/></Button>
                </Col>
                <Col lg={1}>
                    <Button variant="warning" onClick={()=>setCount(1)}><ArrowClockwise/></Button>
                </Col>
                <Col lg={1}>
                    <Button variant="danger" onClick={()=>props.removeHandler(props.productName)}><X/></Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AddedItems;
