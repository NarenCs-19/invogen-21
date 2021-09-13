import dotenv from 'dotenv';
dotenv.config();
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';

// var CorsOptions = {
//     origin:"http://localhost:3000/"
// }
const app = express();
const router = Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication");
    next();
});
app.options('*', cors())
app.use(cors());

//app.use(cors(CorsOptions));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI,{auth:{username:"NarenCs-19",password:"Alrsn@63679602"},authSource:"admin",useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

var productSchema = new mongoose.Schema({
    productName: String,
    rate: Number,
    brate: Number
}); 

var products = new mongoose.model('products',productSchema);

app.get('/products',async(req,res)=>{
    await products.find({}).sort({productName:'asc'}).exec((err,result)=>{
        if(!err){
            //console.log("sent");
            res.send(result);
        }
        else 
            console.log("error");
    });
});  

app.post('/addProducts/add',async(req,res)=>{
    const {prod,price,brate} = req.body;
    //console.log(req.body);
    try{
        const item = new products({
            productName:prod,
            rate:price,
            brate:brate
        });
        await item.save();
        res.send("Successfully inserted");
    }
    catch(err){
        console.log(err.message);
    }
}); 

app.post('/updateRate/update',async(req,res)=>{
    const {prod,price,brate} = req.body;
    await products.updateOne({productName:prod},{rate:price,brate:brate})
    .then(()=>{
        console.log("updated succesfully");
    })
    .catch((err)=>{
        console.log(err);
    })
}); 

app.get('/search',async(req,res)=>{
    const q = req.query.searchValue;
    console.log(q);
    await products.find({productName:{$regex:"^"+q,$options:"i"}})
    .then((result)=>{
        res.send(result);
    }) 
    .catch((err)=>{
        console.log(err);
    })
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
  
