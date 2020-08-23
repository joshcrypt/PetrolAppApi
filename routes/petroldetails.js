//This deployment is working fine
//import required essentials
const express = require('express');

//create new router
const router = express.Router();
const fs = require('fs');
var AWS = require('aws-sdk');
var cors = require('cors');
//const cred = AWS.config.loadFromPath('.env');
const S3_BUCKET = process.env.S3_BUCKET;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var isPreflight = function(req){
    var isHttpOptions = req.method === 'OPTIONS';
    var hasOriginHeader = req.headers['origin'];
    var hasRequestMethod = req.headers['access-control-request-method'];
    return isHttpOptions && hasOriginHeader && hasRequestMethod;
};
var handleCors = function(req,res,next){
    var allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500', 'https://techjamaa.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.set('Access-Control-Allow-Origin', origin);
    }
    if(isPreflight(req)){
        res.set('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
        res.set('Access-Control-Max-Age', '120');
        res.set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
        console.log('Received a preflight request!');
        res.status(204).end();
        return;
    }
    next();
}
router.use(handleCors);
//Handle Options request
router.options('*',function(req,res){});
//Hanle Cors errors
//Read File from File System
router.get('/', function(req, res, next){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: S3_BUCKET,
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        Bucket:  S3_BUCKET
    });
    //give feedback to get request
    s3.getObject(options, function(err,data){
        if(err){
            return err;
        }
        petroldata = res.send(data.Body);
        res.status(200).petroldata;
    });
});
//create JSON petrol array
//READ
//this endpoint of an API returns JSON data array
router.get('/:Id', function (req, res, next){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: S3_BUCKET,
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        Bucket:  S3_BUCKET
    });
    //give feedback to get request
    const stream = s3.getObject(options,function(err,data){
        if(err){
            return err;
        }
        res.attachment(file);
        //Convert to string first
        let petroldata = data.Body.toString('utf-8');
        //Parse to JSON data
        let newpetroldata = JSON.parse(petroldata);
        let found = newpetroldata.find(function (item){
            return item.Id === parseInt(req.params.Id);
        });
        //if object found return an object else return 404 not found
        if (found){
            res.status(200).json(found);        
        }else{
            res.sendStatus(404);
        }
    });
});
//CREATE This API endpoint creates a new object on the petroldata list array*/
router.post('/', function(req, res, next){
    //console.log(req.headers);
    //get Ids from array
    //Open petroldetails json
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: S3_BUCKET,
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
    //give feedback to get request
    const stream = s3.getObject(options,function(err,data){
        if(err){
            console.log(err);
        }
        //Convert to string first
        let petroldata = data.Body.toString('utf-8');
        //console.log(petroldata);
        //Parse to JSON data
        petroldata = JSON.parse(petroldata);
        let petrolId = petroldata.map(item => item.Id);
        let newpetrolId = petrolId.length > 0 ? Math.max.apply(Math, petrolId) + 1 : 1;
        let newPetrolData = {
            Id: newpetrolId,
            Mileage: req.body.Mileage,
            Date: new Date(),
            PpL: req.body.PpL,
            Amount: req.body.Amount,
            Capacity: req.body.Capacity,
            PetrolStation: req.body.PetrolStation,
            LicensePlate: req.body.LicensePlate,
            AdditionalInfo: req.body.AdditionalInfo
        };
        petroldata.push(newPetrolData);
        petroldata = JSON.stringify(petroldata, null, 2);
        var putoptions = {
            Bucket: S3_BUCKET,
            Key: file,
            Body: petroldata
        };
        //console.log(petroldata);
        s3.putObject(putoptions,function(err,petroldata){
            if(err){
                console.log('ERROR', err);
            }else{
                res.status(200).json(newPetrolData);
                //console.log(petroldata);
            }
        });
    });
});
//UPDATE
router.put('/:Id',function(req, res, next){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: S3_BUCKET,
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
    //give feedback to get request
    const stream = s3.getObject(options,function(err,data){
        if(err){
            console.log(err);
        }
        //Convert to string first
        let petroldata = data.Body.toString('utf-8');
        //Parse to JSON data
        petroldata = JSON.parse(petroldata);
        let found = petroldata.find(function (item){
            return item.Id === parseInt(req.params.Id);
        });
        if(found){
            let petroldataupdated = {
                Id: found.Id,
                Mileage: req.body.Mileage,
                Date: req.body.Date,
                PpL: req.body.PpL,
                Amount: req.body.Amount,
                Capacity: req.body.Capacity,
                PetrolStation: req.body.PetrolStation,
                LicensePlate: req.body.LicensePlate,
                AdditionalInfo: req.body.AdditionalInfo
            };
            //find the index of array from the Id
            let targetIndex = petroldata.indexOf(found);
            //replace object from data list with updated object
            petroldata.splice(targetIndex,1,petroldataupdated);
            petroldata = JSON.stringify(petroldata, null, 2);
            var putoptions = {
                Bucket: S3_BUCKET,
                Key: file,
                Body: petroldata
            };
            //console.log(petroldata);
            s3.putObject(putoptions,function(err,petroldata){
                if(err){
                    console.log('ERROR', err);
                }else{
                    res.sendStatus(200);
                    console.log(petroldata);
                }
            });
        }else{
            res.sendStatus(404);
        }
    });
});
//DELETE
//this api endpoint deletes an existing item by matching the returned Id
router.delete('/:Id', function (req,  res, next){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: S3_BUCKET,
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
    //give feedback to get request
    const stream = s3.getObject(options,function(err,data){
        if(err){
            console.log(err);
        }
        //Convert to string first
        let petroldata = data.Body.toString('utf-8');
        //Parse to JSON data
        petroldata = JSON.parse(petroldata);
        let found = petroldata.find(function (item){
            return item.Id === parseInt(req.params.Id);
        });
        if(found){
            //if item found then find index at which the item is stored and delete
            let targetIndex = petroldata.indexOf(found);
            //splice means delete item from data array using index
            petroldata.splice(targetIndex,1);
            petroldata = JSON.stringify(petroldata, null, 2);
            var putoptions = {
                Bucket: S3_BUCKET,
                Key: file,
                Body: petroldata
            };
            //console.log(petroldata);
            s3.putObject(putoptions,function(err,petroldata){
                if(err){
                    console.log('ERROR', err);
                }else{
                    console.log(petroldata);
                    res.sendStatus(204);
                }
            });
        }else{
            res.sendStatus(404);
        }
    });
});
module.exports = router;