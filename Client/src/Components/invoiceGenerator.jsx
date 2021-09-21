import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import ItemComponent from "./ItemComponent";
import AddedItems from "./AddedItems";
import axios from "axios";

function InvoiceGenerator() {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [isEstimate, setIsEstimate] = useState(true);
  const history = useHistory();

  const previewClickHandler = () => {
    items.length > 0 &&
      history.push({
        pathname:"/preview",
        state:{items:items,isEstimate:isEstimate}
  })};

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const isExist = (name) => {
    //returns index of the element otherwise -1 if not present
    return items.findIndex((item) => item.productName === name);
  };

  //item gets added when the product is clicked in search results
  const addItemHandler = (item) => {
    const data = {
      productName: item.productName,
      rate: item.rate,
      quantity: 1,
      amount: item.rate,
      GST: 0
    };

    if (isExist(item.productName) === -1) setItems([...items, data]);
    else {
      console.log("already added");
    }
    //console.log(items);
  };

  //gets triggered whenever the quantity and rate changes
  const updateHandler = (count, rate, GST, name) => {
    let ind = isExist(name); //returns index of the element
    let data = [...items];
    data[ind].quantity = count;
    data[ind].rate = rate;
    data[ind].amount = count * rate;
    data[ind].GST = GST* data[ind].amount;
    setItems(data);
  };

  //removing an item
  const removeItem = (name) => {
    let data = items.filter((item) => item.productName !== name);
    setItems(data);
  };

  //fetching search results
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("http://localhost:5000/search?searchValue=" + searchValue)
      .then(({data})=>{
        if (searchValue) setResults(data);
        else setResults([]);
      })
      .catch((err)=>{
        console.log(err);
      })
    };
    if(searchValue !== "") {
      setResults([]);
      fetchData();
    }
  }, [searchValue]);

  return (
    <Container fluid className="generator">
      <Row>
        <Col lg={5} className="searchProducts">
          <Form>
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Search products"
                value={searchValue}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Form>
          <div className="searchResults">
            {searchValue &&
              results.map((result,idx) => {
                return (
                  <ItemComponent
                    key={idx+1}
                    productName={result.productName}
                    rate={result.rate}
                    addHandler={addItemHandler}
                  />
                );
              })}
          </div>
        </Col>
        <Col lg={7} className="addedItems my-3 text-center">
          <div>
            <h3 className="text-center text-uppercase">Added items</h3>
            <div>Total items added: {items.length}</div>
            {items &&
              items.map((item, idx) => (
                <AddedItems
                  key={idx + 1}
                  productName={item.productName}
                  rate={item.rate}
                  quantity={item.quantity}
                  removeHandler={removeItem}
                  updateHandler={updateHandler}
                />
              ))}
          </div>
          <Button onClick={previewClickHandler} className="my-3">
            Preview
          </Button>
          <Row className="invoiceType">
            <Col>
                <Button variant="outline-dark" className="invoiceTypeBtn mx-3" onClick={()=>setIsEstimate(false)}>Invoice</Button>
                <Button variant="outline-dark" className="invoiceTypeBtn mx-3" onClick={()=>setIsEstimate(true)}>Estimate</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default InvoiceGenerator;
