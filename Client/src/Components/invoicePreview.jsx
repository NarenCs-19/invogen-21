import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import PreviewComponent from "./PreviewComponent";

const InvoicePreview = React.forwardRef((props,ref)=>{
    const items = props.items;
    const total = items.map((item) => item.amount).reduce((a, b) => a + b);

    return (
      <div className="Preview my-3" ref={ref}>
        <Container>
          <Row className="text-center fw-bold border-bottom border-dark">
            <Col>ESTIMATE</Col>
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
            <Col xs={2}>{total.toFixed(2)}</Col>
          </Row>
        </Container>
      </div>
    );
});

export default InvoicePreview;
