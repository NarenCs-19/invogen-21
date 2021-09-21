import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router";
import PreviewComponent from "./PreviewComponent";

const InvoicePreview = React.forwardRef((props, ref) => {
  const location = useLocation();
  const items = location.state.items;
  const isEstimate = location.state.isEstimate;
  var netAmount = items
    .map((item) => item.amount)
    .reduce((a, b) => a + b)
    .toFixed(2);
  var SGST = (
    items.map((item) => item.GST).reduce((a, b) => a + b) / 2
  ).toFixed(2);
  const totalAmount = parseFloat(netAmount) + parseFloat(SGST) * 2;
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`; 
  return (
    <div className="Preview my-3" ref={ref}>
      <Container>
        <Row className="fw-bold">
          <Col>SRI VIVEKANANDHA TRADERS(Electricals and pipes)</Col>
        </Row>
        <Row>
          <Col>
            Collector office backside, E.S. garden opposite Rajarajan Nagar,
            Villpupuram-605062
          </Col>
        </Row>
        <Row className="text-center fw-bold border-bottom border-dark">
          <Col>Ph no.: 9791958591</Col>
          {isEstimate?<Col>ESTIMATE</Col>:<Col>INVOICE</Col>}
          <Col>{date}</Col>
        </Row>
        <Row className="fw-bold border-bottom border-dark">
          <Col xs={1} className="border-end border-dark">
            S.NO
          </Col>
          <Col xs={7} className="border-end border-dark">
            PRODUCT NAME
          </Col>
          <Col xs={1} className="border-end border-dark">
            RATE
          </Col>
          <Col xs={1} className="border-end border-dark">
            QTY
          </Col>
          <Col xs={2}>AMOUNT</Col>
        </Row>
        {items.map((item, idx) => (
          <PreviewComponent
            key={idx}
            id={idx + 1}
            productName={item.productName}
            rate={item.rate}
            quantity={item.quantity}
            amount={item.amount}
          />
        ))}
        <Row className="fw-bold text-uppercase border-top border-dark">
          <Col xs={3} className="ms-auto">
            Net amount(in Rs)
          </Col>
          <Col xs={2}>{netAmount}</Col>
        </Row>
        {!isEstimate && (
          <>
            <Row className="fw-bold text-uppercase">
              <Col xs={3} className="ms-auto">
                CGST
              </Col>
              <Col xs={2}>{SGST}</Col>
            </Row>
            <Row className="fw-bold text-uppercase">
              <Col xs={3} className="ms-auto">
                SGST
              </Col>
              <Col xs={2}>{SGST}</Col>
            </Row>
            <Row className="fw-bold text-uppercase">
              <Col xs={3} className="ms-auto">
                Total amount
              </Col>
              <Col xs={2}>{totalAmount}</Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
});

export default InvoicePreview;
