import express, { Router } from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';

const app = express();
const router = Router();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'test'
});

connection.connect((err)=>{
    if(!err)
    console.log('connected');
});

app.get('/products',function(req,res){
    connection.query("SELECT * FROM PRODUCTS ORDER BY PRODUCT ASC",(err,result)=>{
        if(!err){
            //console.log("sent");
            res.send(result);
        }
        else 
            console.log("error");
    });
}); 

app.post('/addProducts/add',function(req,res){
    const {prod,price} = req.body;
    connection.query("INSERT INTO PRODUCTS(PRODUCT,RATE) VALUES ('"+prod+"','"+price+"')",(err,result)=>{
        if(err){
            console.log(err);
        }
        else 
            res.send(req.body);
    });
});

app.post('/updateRate/update',function(req,res){
    const {id,price} = req.body;
    connection.query("UPDATE PRODUCTS SET RATE = ? WHERE ID = ?",[price,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else 
            res.send(req.body);
    });
}); 

app.get('/search',function(req,res){
    const q = req.query.searchValue;
    //console.log(q);
    connection.query("SELECT * FROM PRODUCTS WHERE PRODUCT LIKE '"+ q+"%'",(err,result)=>{
        if(err)
            console.log(err);
        else
            res.send(result);
    }); 
}); 

 
app.use("/",router);
app.listen(5000);
 
