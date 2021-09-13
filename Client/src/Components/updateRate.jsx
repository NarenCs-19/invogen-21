import React, {useState} from 'react'
import {Button, Container, Form} from "react-bootstrap";
import axios from 'axios';

function UpdateRate() {
    const [prod, setProd] = useState("");
    const [rate, setRate] = useState(0);
    const [brate, setBRate] = useState(0);

    //event when the add button is clicked 
    const updateHandler = async(event)=>{
        event.preventDefault();
        let dataToBeUpdated = {
                prod : prod,
                price : rate,
                brate : brate
        };  
        //console.log(dataToBeUpdated);
        await axios.post("/updateRate/update",dataToBeUpdated)
        .then(()=>{
            setProd(""); 
            setRate(0);
            setBRate(0);
        })
        .catch((err)=>console.log(err));
        
    }

    //controlling product input 
    const prodHandler = (event) => {
        setProd(event.target.value);
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
                    <Form.Label>PRODUCT NAME</Form.Label>
                    <Form.Control type="text" name="productName" placeholder="Enter Product name" value={prod} onChange={prodHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productPrice">
                    <Form.Label>RATE</Form.Label>
                    <Form.Control type="number"  name="rate" placeholder="Enter Price"  value={rate} onChange={priceHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="productBPrice">
                    <Form.Label>BRATE</Form.Label>
                    <Form.Control type="number"  name="brate" placeholder="Enter BRate"  value={brate} onChange={bRateHandler}/>
                </Form.Group>
            </Form>
            <Container className="buttons text-center">
                <Button variant="primary" className="mx-3" onClick={updateHandler}> UPDATE </Button>
                <Button href="/#/products" className="mx-3" variant="secondary"> BACK </Button>
            </Container>
        </div>
    )
}

export default UpdateRate;
