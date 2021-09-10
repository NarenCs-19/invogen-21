import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import '../css/App.css';
import '../assets/bootstrap/bootstrap.min.css';
import Products from './Products';
import AddProducts from './addProducts';
import homePage from './homePage';
import PrintInvoice from "./printInvoice";
import UpdateRate from './updateRate';

const App = ()=>{
    return(
    <BrowserRouter>
            <Route path="/" component={homePage} exact></Route>
            <Route path="/products" component={Products} exact></Route>
            <Route path="/addProducts" component={AddProducts} exact></Route>
            <Route path="/updateRate" component={UpdateRate} exact></Route>
            <Route path="/preview" component={PrintInvoice} exact></Route>
    </BrowserRouter>
    );
}

export default App;