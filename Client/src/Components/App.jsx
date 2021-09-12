import React from 'react';
import {BrowserRouter,Route,Switch,HashRouter} from 'react-router-dom';
import '../css/App.css';
import '../assets/bootstrap/bootstrap.min.css';
import Products from './Products';
import AddProducts from './addProducts';
import HomePage from './homePage';
import UpdateRate from './updateRate';
import PrintInvoice from './printInvoice';

const App = ()=>{
    return(
        <div>
            <HashRouter>
                <Route path="/" exact>
                    <HomePage/>
                </Route>
                <Route path="/products" component={Products} exact>
                
                </Route>
    
                <Route path="/addProducts"  exact>
                <AddProducts/>
                </Route>
                
                <Route path="/updateRate"  exact>
                <UpdateRate/>
                </Route>
        
                <Route path="/preview"  exact>
                    <PrintInvoice/>
                </Route>
            </HashRouter>
        </div>
    );
}

export default App;