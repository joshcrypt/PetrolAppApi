//import required essentials
const express = require('express');
//create new router
const router = express.Router();

//create JSON petrol array
let petroldata = [{"Id":1,"Mileage":360053,"Date":"","Capacity":"","Amount":"","Price":"","PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":"Service"},{"Id":2,"Mileage":360934,"Date":"26-10-2018","Capacity":115.7,"Amount":3000,"Price":25.93,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":3,"Mileage":361163,"Date":"02-11-2018","Capacity":115.7,"Amount":3500,"Price":30.25,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":4,"Mileage":361429,"Date":"06-11-2018","Capacity":115.7,"Amount":4367,"Price":37.75,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":5,"Mileage":361804,"Date":"18-11-2018","Capacity":118.1,"Amount":5000,"Price":42.34,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":6,"Mileage":362104,"Date":"28-11-2018","Capacity":118.1,"Amount":4803,"Price":40.6,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":7,"Mileage":362435,"Date":"14-11-2018","Capacity":118.1,"Amount":3000,"Price":25.4,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":8,"Mileage":362625,"Date":"21-11-2018","Capacity":113.9,"Amount":4400,"Price":38.77,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":9,"Mileage":363084,"Date":"23-12-2018","Capacity":113.5,"Amount":4500,"Price":39.65,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":10,"Mileage":363458,"Date":"08-01-2019","Capacity":113.5,"Amount":4958,"Price":43.69,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":11,"Mileage":363695,"Date":"19-01-2019","Capacity":104.2,"Amount":2894,"Price":27.78,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":12,"Mileage":364114,"Date":"02-02-2019","Capacity":104.2,"Amount":4761,"Price":45.7,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":13,"Mileage":364317,"Date":"08-02-2019","Capacity":104,"Amount":1500,"Price":14.35,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":14,"Mileage":364680,"Date":"14-02-2019","Capacity":104.2,"Amount":4625,"Price":44.39,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":15,"Mileage":365026,"Date":"19-02-2019","Capacity":"","Amount":"","Price":"","PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":"Service"},{"Id":16,"Mileage":365044,"Date":"21-02-2019","Capacity":100,"Amount":4101,"Price":41.01,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":17,"Mileage":365410,"Date":"01-03-2019","Capacity":100.09,"Amount":2000,"Price":19.99,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":18,"Mileage":365651,"Date":"03-03-2019","Capacity":100,"Amount":4100,"Price":41,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":19,"Mileage":365879,"Date":"07-03-2019","Capacity":100,"Amount":2085,"Price":20.85,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":20,"Mileage":366222,"Date":"24-03-2019","Capacity":101.3,"Amount":3932.5,"Price":38.82,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":21,"Mileage":366608,"Date":"05-04-2019","Capacity":101.3,"Amount":4082,"Price":40.3,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":22,"Mileage":367020,"Date":"16-04-2019","Capacity":106.6,"Amount":4367.4,"Price":40.97,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":23,"Mileage":367410,"Date":"29-04-2019","Capacity":106.6,"Amount":4618,"Price":43.32,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":24,"Mileage":367780,"Date":"14-05-2019","Capacity":106.6,"Amount":4475,"Price":41.98,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":25,"Mileage":368151,"Date":"02-06-2019","Capacity":112,"Amount":4610,"Price":41.16,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":26,"Mileage":368583,"Date":"14-06-2019","Capacity":112,"Amount":5042,"Price":45.02,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":27,"Mileage":368986,"Date":"30-06-2019","Capacity":115.1,"Amount":5040,"Price":43.79,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":28,"Mileage":369408,"Date":"09-07-2019","Capacity":115.1,"Amount":4845,"Price":42.1,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":29,"Mileage":369863,"Date":"21-07-2019","Capacity":115.3,"Amount":4525,"Price":39.24,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":30,"Mileage":370281,"Date":"07-08-2019","Capacity":115.3,"Amount":5272.7,"Price":45.73,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":31,"Mileage":370521,"Date":"14-08-2019","Capacity":"","Amount":"","Price":"","PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":"Service"},{"Id":32,"Mileage":370741,"Date":"22-08-2019","Capacity":112.9,"Amount":5500,"Price":48.89,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":33,"Mileage":371206,"Date":"29-08-2019","Capacity":112.9,"Amount":4991,"Price":44.37,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":34,"Mileage":371717,"Date":"03-09-2019","Capacity":112.9,"Amount":4622,"Price":41.09,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":35,"Mileage":372170,"Date":"10-09-2019","Capacity":112.9,"Amount":5352,"Price":47.57,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":36,"Mileage":372627,"Date":"18-09-2019","Capacity":112.8,"Amount":4872,"Price":43.19,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":37,"Mileage":373024,"Date":"29-09-2019","Capacity":112.8,"Amount":4911,"Price":43.53,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":"Oil"},{"Id":38,"Mileage":373437,"Date":"09-10-2019","Capacity":112.8,"Amount":4820,"Price":42.73,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":39,"Mileage":373876,"Date":"25-10-2019","Capacity":108,"Amount":5001.5,"Price":46.31,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":40,"Mileage":373435,"Date":"09-11-2019","Capacity":108,"Amount":4948,"Price":45.82,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":41,"Mileage":374755,"Date":"27-11-2019","Capacity":110.5,"Amount":1000,"Price":9.04,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":42,"Mileage":374944,"Date":"02-12-2019","Capacity":110.5,"Amount":5444.3,"Price":49.27,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":43,"Mileage":375335,"Date":"19-12-2019","Capacity":109.9,"Amount":4576,"Price":41.79,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":44,"Mileage":375704,"Date":"25-12-2019","Capacity":109.9,"Amount":4030,"Price":36.87,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":45,"Mileage":375877,"Date":"10-01-2020","Capacity":"","Amount":"","Price":"","PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":"Service"},{"Id":46,"Mileage":376143,"Date":"17-01-2020","Capacity":110.2,"Amount":5248,"Price":47.62,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":47,"Mileage":376508,"Date":"24-01-2020","Capacity":110.2,"Amount":4090,"Price":37.12,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":48,"Mileage":376927,"Date":"30-01-2020","Capacity":110.2,"Amount":1500,"Price":13.61,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":49,"Mileage":377071,"Date":"01-02-2020","Capacity":110.2,"Amount":4851,"Price":44.02,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":50,"Mileage":377665,"Date":"12-02-2020","Capacity":110.2,"Amount":5035,"Price":45.69,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":51,"Mileage":378096,"Date":"24-02-2020","Capacity":112.8,"Amount":5124.5,"Price":45.43,"PetrolStation":"Shell","CarMake":"Galant","AdditionalInfo":""},{"Id":52,"Mileage":378489,"Date":"09-03-2020","Capacity":112.8,"Amount":5200,"Price":46.1,"PetrolStation":"Shell","CarMake":"Galant","AdditionalInfo":""},{"Id":53,"Mileage":378865,"Date":"22-03-2020","Capacity":110.8,"Amount":1000,"Price":9.02,"PetrolStation":"Shell","CarMake":"Galant","AdditionalInfo":""},{"Id":54,"Mileage":378955,"Date":"06-04-2020","Capacity":110.8,"Amount":4858,"Price":43.89,"PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":""},{"Id":55,"Mileage":379408,"Date":"03-05-2020","Capacity":92.8,"Amount":4126,"Price":44.46,"PetrolStation":"Shell","CarMake":"Galant","AdditionalInfo":""},{"Id":56,"Mileage":380298,"Date":"08-06-2020","Capacity":"","Amount":"","Price":"","PetrolStation":"Total","CarMake":"Galant","AdditionalInfo":"Service no Oil FIlter"},{"Id":57,"Mileage":380946,"Date":"21-06-2020","Capacity":89.12,"Amount":2000,"Price":22.44,"PetrolStation":"Shell","CarMake":"Galant","AdditionalInfo":""},{"Id":58,"Mileage":383297,"Date":"20-07-2020","Capacity":100.4,"Amount":1000,"Price":9.96,"PetrolStation":"Shell","CarMake":"Galant","AdditionalInfo":""}];
//READ
//this endpoint of an API returns JSON data array
router.get('/',function(req,res){
    res.status(200).json(petroldata);
});
router.get('/:Id',function (req,res){
    //find an object from petroldata array and match by id
    let found = petroldata.find(function (item){
        return item.Id === parseInt(req.params.Id);
    });
    //if object found return an object else return 404 not found
    if (found){
        res.status(200).json(found);        
    }else{
        res.sendStatus(404);
    }
});
//CREATE
/* This API endpoint creates a new object on the petroldata list array*/
router.post('/',function(req,res){
    //get Is from array
    let petrolId = petroldata.map(item => item.Id);
    let newpetrolId = Id.length > 0 ? Math.max.apply(Math, petrolId) + 1 : 1;
    let newPetrolData = {
        Id: newpetrolId,
        Mileage: req.body.Mileage,
        Date: new Date(),
        Capacity: req.body.Capacity,
        Amount: req.body.Amount,
        Price: req.body.Price,
        PetrolStation: req.body.PetrolStation,
        CarMake: req.body.CarMake,
        AdditionalInfo: req.body.AdditionalInfo
    };
    petroldata.push(newPetrolData);
    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created.
    res.status(201).json(newPetrolData);
});
//UPDATE
router.put('/:Id',function(req,res){
    //get item object match by id
    let found = petroldata.find(function (item){
        return item.Id === parseInt(req.params.Id)
    });
});

module.exports = router;