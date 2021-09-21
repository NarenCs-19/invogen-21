import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import axios from 'axios';

function AddProducts() {
    const [productName, setProductName] = useState("");
    const [rate, setRate] = useState(0);
    const [brate, setBRate] = useState(0);

    //event when the add button is clicked 
    const addHandler = async(event)=>{
        event.preventDefault();
        let dataToBeAdded = {
                prod : productName,
                price : rate,
                brate: brate
        };  
        console.log(dataToBeAdded);
        await axios.post("/addProducts/add",dataToBeAdded)
        .then((res)=>{
            console.log(res);
            setProductName("");
            setRate(0);
            setBRate(0);
        })
        .catch((err)=>console.log(err));
         
    }

    //controlling product input 
    const productHandler = (event) => {
        setProductName(event.target.value);
    };

    //controlling rate or price input 
    const priceHandler = (event) => {
        setRate(event.target.value);
    };  

    const bRateHandler = (event) => {
        setBRate(event.target.value);
    }; 

    return (
        <div className="addProductForm my-3">
            <Form>
                <Form.Group className="mb-3" controlId="productName">
                    <Form.Label>PRODUCT</Form.Label>
                    <Form.Control type="text" name="productName" placeholder="Enter Product name" value={productName} onChange={productHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>SALE RATE</Form.Label>
                    <Form.Control type="number"  name="rate" placeholder="Enter Sale Price"  value={rate} onChange={priceHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productBPrice">
                    <Form.Label>PURHCASE RATE</Form.Label>
                    <Form.Control type="number"  name="brate" placeholder="Enter Purchase Rate"  value={brate} onChange={bRateHandler}/>
                </Form.Group>
            </Form>
            <Container className="buttons text-center">
                <Button variant="primary" className="mx-3" onClick={addHandler}> ADD </Button>
                <Button href="/#/products" className="mx-3" variant="secondary"> BACK </Button>
            </Container>
        </div>
    )
}

export default AddProducts;
