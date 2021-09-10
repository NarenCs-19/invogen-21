import React, {useState} from 'react'
import {Button, Container, Form} from "react-bootstrap";
import axios from 'axios';

function UpdateRate() {
    const [productId, setId] = useState(0);
    const [rate, setRate] = useState(0);

    //event when the add button is clicked 
    const updateHandler = async(event)=>{
        event.preventDefault();
        let dataToBeUpdated = {
                id : productId,
                price : rate
        };  
        await axios.post("/updateRate/update",dataToBeUpdated)
        .then(()=>{
            setId(0); 
            setRate(0);
        })
        .catch((err)=>console.log(err));
        
    }

    //controlling product input 
    const idHandler = (event) => {
        setId(event.target.value);
    };

    //controlling rate or price input 
    const priceHandler = (event) => {
        setRate(event.target.value);
    };  

    return (
        <div className="addProductForm my-3">
            <Form>
                <Form.Group className="mb-3" controlId="productName">
                    <Form.Label>PRODUCT ID</Form.Label>
                    <Form.Control type="number" name="productName" placeholder="Enter Product Id" value={productId} onChange={idHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>RATE</Form.Label>
                    <Form.Control type="number"  name="rate" placeholder="Enter Price"  value={rate} onChange={priceHandler}/>
                </Form.Group>
            </Form>
            <Container className="buttons text-center">
                <Button variant="primary" className="mx-3" onClick={updateHandler}> UPDATE </Button>
                <Button href="/products" className="mx-3" variant="secondary"> BACK </Button>
            </Container>
        </div>
    )
}

export default UpdateRate;
