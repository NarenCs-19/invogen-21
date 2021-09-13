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
  const history = useHistory();

  const previewClickHandler = () => {
    items.length > 0 &&
      history.push({
        pathname:"/preview",
        state:items
  })};

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const isExist = (name) => {
    //returns index of the element otherwise -1 if not present
    return items.findIndex((item) => item.productName === name);
  };

  const addItemHandler = (item) => {
    const data = {
      productName: item.productName,
      rate: item.rate,
      quantity: 1,
      amount: item.rate,
    };

    if (isExist(item.productName) === -1) setItems([...items, data]);
    else {
      alert("already added");
    }
    //console.log(items);
  };

  //gets triggered whenever the quantity increases
  const updateQuantity = (count, name) => {
    let ind = isExist(name); //returns index of the element
    let data = [...items];
    data[ind].quantity = count;
    data[ind].amount = count * data[ind].rate;
    setItems(data);
    //console.log(items);
  };

  //removing an item
  const removeItem = (name) => {
    //console.log(name);
    let data = items.filter((item) => item.productName !== name);
    setItems(data);
  };

  //fetching search results
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/search?searchValue=" + searchValue)
      .then(({data})=>{
        console.log(data);
        if (searchValue) setResults(data);
        else setResults([]);
      })
      .catch((err)=>{
        console.log(err);
      })
    };
    if(searchValue !== "") fetchData();
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
            {items &&
              items.map((item, idx) => (
                <AddedItems
                  key={idx + 1}
                  productName={item.productName}
                  rate={item.rate}
                  quantity={item.quantity}
                  removeHandler={removeItem}
                  updateHandler={updateQuantity}
                />
              ))}
          </div>
          <Button onClick={previewClickHandler} className="my-3">
            Preview
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default InvoiceGenerator;
