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
app.use(cors({origin: 'http://localhost:8100'}));

/*this '/petroldata' URL will have multiple endpoints
-> localhost:3000/petroldata/ (this returns array of object)  
*/
app.use('/petroldetails', petroldataRouter);

//the default path to the URL API
app.use('/',function(req,res){
    res.send('petrolappapi works :-)');
});
const server = http.createServer(app);
const port = 3000;
server.listen(port);
//console debug output
console.debug('Server listening on port ' + port);