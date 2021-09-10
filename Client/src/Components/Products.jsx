import React, { useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import MaterialTable from "material-table";
import axios from "axios";

function Products() {
  const [data, setUserData] = useState([]);
  const columns = [{
    title: "ID",
    field: "ID",
  },
  {
    title: "PRODUCT",
    field: "PRODUCT",
  },
  {
    title: "BRATE",
    field: "BRATE",
  },
  {
    title: "RATE",
    field: "RATE",
  }];

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const {data} = await axios.get("/products");
    setUserData(data);
  };


  return (
    <>
    <MaterialTable title="Products" data={data} columns={columns}/>
    <Button href="/addProducts" className="m-3" variant="primary">Add Products</Button>
    <Button href="/updateRate" className="m-3" variant="primary">Update Rate</Button>
    <Button href="/" className="m-3" variant="secondary"> Back </Button>
    </>
  );
}

export default Products;
