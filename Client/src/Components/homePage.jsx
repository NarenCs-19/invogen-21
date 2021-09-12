import React from "react";
import { Button, Container, Row, Col} from "react-bootstrap";
import InvoiceGenerator from "./invoiceGenerator";

function homePage() {
  return (
    <div className="home main-container d-flex align-items-center">
      <Container fluid>
        <Row>
          <Col>
          <InvoiceGenerator />
          </Col>
        </Row>
        <Row>
          <Col lg="3" className="m-auto text-center">
          <Button href="/#/products" className="m-3" >See Products</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default homePage;
