import dotenv from 'dotenv';
dotenv.config();
import express, { Router } from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

var corsOptions = {
    origin:"http://localhost:3000"
}
const app = express();
const router = Router();

app.use(cors(corsOptions));
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
    //console.log("hi");
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
    const {prod,price,bRate} = req.body;
    connection.query("INSERT INTO PRODUCTS(PRODUCT,RATE,BRATE) VALUES ('"+prod+"','"+price+"','"+bRate+"')",(err,result)=>{
        if(err){
            console.log(err);
        }
        else 
            res.send(req.body);
    });
});

app.post('/updateRate/update',function(req,res){
    const {id,price,brate} = req.body;
    connection.query("UPDATE PRODUCTS SET RATE = ?, BRATE = ? WHERE ID = ?",[price,brate,id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else 
            res.send(req.body);
    });
}); 

app.get('/search',function(req,res){
    const q = req.query.searchValue;
    console.log(q);
    connection.query("SELECT * FROM PRODUCTS WHERE PRODUCT LIKE '"+ q+"%'",(err,result)=>{
        if(err)
            console.log(err);
        else
            res.send(result);
    }); 
}); 

const __dirname = path.resolve(path.dirname(''));

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,'/Client/build')));
    
    app.get('*',(req,res)=>{
        //console.log(__dirname);
        res.sendFile(path.resolve(__dirname,'Client','build','index.html'));
    });
}

else{
    app.get('/',(req,res)=>{
        console.log("development stage");
        res.send("hello");
    });
}

app.use("/",router);
let port = process.env.PORT;
if(port == null || port == "")
    port = 5000;
app.listen(port,()=>{
    console.log("Listening at the port "+port);
});
  
