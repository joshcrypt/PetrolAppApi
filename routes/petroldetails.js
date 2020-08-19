//This deployment is working fine
//import required essentials
const express = require('express');
//create new router
const router = express.Router();
const fs = require('fs');
var AWS = require('aws-sdk');
const { resolve } = require('path');
const { rejects } = require('assert');
const cred = AWS.config.loadFromPath('./config.json');
//Read File from File System
router.get('/',function(req,res){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: 'petrolappapi',
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: cred.accessKeyId,
        secretAccessKey: cred.secretAccessKey,
        Bucket:  'petrolappapi'
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
router.get('/:Id',function (req,res){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: 'petrolappapi',
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: cred.accessKeyId,
        secretAccessKey: cred.secretAccessKey,
        Bucket:  'petrolappapi'
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
//CREATE
/* This API endpoint creates a new object on the petroldata list array*/
router.post('/',function(req,res){
    //get Ids from array
    //Open petroldetails json
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: 'petrolappapi',
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: cred.accessKeyId,
        secretAccessKey: cred.secretAccessKey
    });
    //give feedback to get request
    const stream = s3.getObject(options,function(err,data){
        if(err){
            console.log(err);
        }
        //Convert to string first
        let petroldata = data.Body.toString('utf-8');
        console.log(petroldata);
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
            Bucket: 'petrolappapi',
            Key: file,
            Body: petroldata
        };
        console.log(petroldata);
        s3.putObject(putoptions,function(err,petroldata){
            if(err){
                console.log('ERROR', err);
            }else{
                res.status(201).json(newPetrolData);
                console.log(petroldata);
            }
        });
    });
});
//UPDATE
router.put('/:Id',function(req,res){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: 'petrolappapi',
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: cred.accessKeyId,
        secretAccessKey: cred.secretAccessKey
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
                Bucket: 'petrolappapi',
                Key: file,
                Body: petroldata
            };
            //console.log(petroldata);
            s3.putObject(putoptions,function(err,petroldata){
                if(err){
                    console.log('ERROR', err);
                }else{
                    res.sendStatus(204);
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
router.delete('/:Id',function (req, res){
    //get file
    var file = "petroldetails.json"
    //login parameters
    var options = {
        Bucket: 'petrolappapi',
        Key: file,
    }
    //initiate S3 session
    const s3 = new AWS.S3({
        accessKeyId: cred.accessKeyId,
        secretAccessKey: cred.secretAccessKey
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
                Bucket: 'petrolappapi',
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