import React from "react";
import {Row, Col} from 'react-bootstrap';

function PreviewComponent(props) {
  return (
    <Row>
      <Col xs={1}>{props.id}</Col>
      <Col xs={7}>{props.productName}</Col>
      <Col xs={1}>{props.rate}</Col>
      <Col xs={1}>{props.quantity}</Col>
      <Col xs={2}>{props.amount}</Col>
    </Row>
  );
}

export default PreviewComponent;
