import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Col } from 'react-bootstrap';
import {X} from 'react-bootstrap-icons';

function AddedItems(props) {
    const [count, setCount] = useState(1);
    const [GST, setGST] = useState(0);
    const [rate, setRate] = useState(props.rate);
    
    const quantityHandler = (e)=>{
        setCount(e.target.value)
    };

    const rateHandler = (e)=>{
        setRate(e.target.value)
    };

    useEffect(()=>{
        props.updateHandler(count,rate,GST,props.productName);
    },[count,rate,GST]);

    return (
        <Container className="Item">
            <Row className="my-3 d-flex align-items-center">
                <Col lg={6} className="d-flex align-items-center">
                    {props.productName}
                </Col>
                <Col lg={1} className="d-flex align-items-center">
                    <input value={rate} onChange={rateHandler}/>
                </Col>
                <Col lg={1} >
                    <input value={count} onChange={quantityHandler}/>
                </Col>
                <Col lg={1}>
                    <Button variant="outline-light" className="gstBtn" onClick={()=>setGST(0.12)}>12</Button>
                </Col>
                <Col lg={1}>
                    <Button variant="outline-light" className="gstBtn" onClick={()=>setGST(0.18)}>18</Button>
                </Col>
                <Col lg={1}>
                    <Button variant="outline-light" className="gstBtn" onClick={()=>setGST(0.28)}>28</Button>
                </Col>
                <Col lg={1}>
                    <Button variant="danger" onClick={()=>props.removeHandler(props.productName)}><X/></Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AddedItems;
