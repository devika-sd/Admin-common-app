const express=require('express');
const app= express();
const cors=require('cors');
require('colors');
const errorHandler=require('./Admin-part1/middleware/errorhandler');
const databaseConnection=require('./db');
const userRoute = require('./Admin-part1/routes/users');
const orderRoute = require('./Admin-part1/routes/orders');
require('dotenv').config();


app.use(cors());

app.use(express.json());

//for User app (running frontend and backend in same port) use: http://localhost:8080/user
// app.use("/", express.static('public/User'));
// app.use('/user', express.static('public/User'))


//for Admin app (running frontend and backend in same port) use: http://localhost:8080/admin
app.use("/", express.static('public/Admin'));
app.use('/admin', express.static('public/Admin/'))


databaseConnection();

app.use("/api/v1/users",userRoute);
app.use("/api/v1/orders",orderRoute);


app.use(errorHandler);

app.listen(8080,()=>{
    console.log("listening to the port 8080");
})