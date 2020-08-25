const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// importing zipCode data file
let zipCodes = require('../helper/allZipCodesFilesWithCityNames').allZipCodesFilesWithCityNames;
zipCodes = JSON.parse(zipCodes);

// importing zipCode data file
let cities = require('../helper/allCityData').allCityData;
cities = JSON.parse(cities);

// importing calculate distance function
const calculateDistance = require('../helper/calculateDistance').calculateDistance;

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

router.get('/city', (req, res) => {
    console.log('city')
    console.log(req.query)
    console.log(cities[req.query.city1]);
    if (req.query && req.query.city1 && req.query.city2 && req.query.unit && cities[req.query.city1] && cities[req.query.city2]) {
        res.send({
            message: 'completed your request',
            city1: cities[req.query.city1],
            city2: cities[req.query.city2],
            //distance: calculateDistance(cities[req.query.city1].location, cities[req.query.city2].location, req.query.unit)
        })
    } else {
        res.send({ error: 'not valid query or city not found' })
    }

});

module.exports = router;