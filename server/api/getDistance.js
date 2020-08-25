const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// importing zipCode data file
let zipCodes = require('../helper/allZipCodesFilesWithCityNames').allZipCodesFilesWithCityNames;

// importing calculate distance functions
const calculateDistance = require('../helper/calculateDistance').calculateDistance;
const getAllCityDistances = require('../helper/getAllCityDistances').getAllCityDistances;


//get distance by city name
router.get('/city', getAllCityDistances, (req, res) => {
    console.log('success getting distances')
    res.send({
        message: 'completed your request',
        results: req.locals
    })


});

// get distance by zipcode
router.get('/zipcode', (req, res) => {
    console.log('zipcode test')
    console.log(req.query)
    console.log(zipCodes[req.query.zipcode1]);
    if (req.query && req.query.zipcode1 && req.query.zipcode2 && req.query.unit && zipCodes[req.query.zipcode1] && zipCodes[req.query.zipcode2]) {
        res.send({
            message: 'completed your request',
            zipcode1: zipCodes[req.query.zipcode1],
            zipcode2: zipCodes[req.query.zipcode2],
            distance: calculateDistance(zipCodes[req.query.zipcode1].location, zipCodes[req.query.zipcode2].location, req.query.unit)
        })
    } else {
        res.send({ error: 'not valid query or zip code not found' })
    }

});

module.exports = router;