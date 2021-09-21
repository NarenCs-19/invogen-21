import React, { useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import MaterialTable from "material-table";
import axios from "axios";

function Products() {
  const [data, setUserData] = useState([]);
  const columns = [
  {
    title: "PRODUCT",
    field: "productName",
  },
  {
    title: "PURCHASE RATE",
    field: "brate",
  },
  {
    title: "SALE RATE",
    field: "rate",
  }];

  useEffect(() => {
    getProducts();
    console.log("product component");
  }, []);

  const getProducts = async () => {
    const {data} = await axios.get("/products");
    console.log(data);
    setUserData(data);
  };


  return (
    <>
    <MaterialTable title="Products" data={data} columns={columns}/>
    <Button href="/#/addProducts" className="m-3" variant="primary">Add Products</Button>
    <Button href="/#/updateRate" className="m-3" variant="primary">Update Rate</Button>
    <Button href="/#/" className="m-3" variant="secondary"> Back </Button>
    </>
  );
}

export default Products;
