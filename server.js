const http = require('http');
const express = require('express');
var cors = require('cors');
//import petrol details from 'router' folder
const petroldataRouter = require('./routes/petroldetails');
//create new app
const app = express();
app.use(express.json());
//use it before all route definitions allowing the URL below to access thes APIs endpoints
//you can replace this URL from where you are calling these APIs
app.use(cors({origin: 'http://127.0.0.1:5500'}));
/*this '/petroldata' URL will have multiple endpoints
-> localhost:3000/petroldata/ (this returns array of object)  
*/
app.use('/petroldetails', petroldataRouter);
//the default path to the URL API
app.use('/',function(req,res){
    res.send('petrolappapi works :-)');
});
//updated to enable this app to run in aws lambda
module.exports = app;