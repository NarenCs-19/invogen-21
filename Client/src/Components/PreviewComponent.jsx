import React from "react";
import {Row, Col} from 'react-bootstrap';

function PreviewComponent(props) {
  return (
    ((props.id>16) && (props.id-16)%20 === 0) || (props.id<=16 && props.id%16) === 0?<><br></br><Row>
    <Col xs={1}>{props.id}</Col>
    <Col className="d-flex justify-content-start" xs={7}>{props.productName}</Col>
    <Col xs={1}>{props.rate}</Col>
    <Col xs={1}>{props.quantity}</Col>
    <Col xs={2}>{props.amount.toFixed(2)}</Col>
  </Row></>:
    <Row>
      <Col xs={1}>{props.id}</Col>
      <Col className="d-flex justify-content-start" xs={7}>{props.productName}</Col>
      <Col xs={1}>{props.rate}</Col>
      <Col xs={1}>{props.quantity}</Col>
      <Col xs={2}>{props.amount.toFixed(2)}</Col>
    </Row>
  );
}

export default PreviewComponent;
