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


//get the zipcode or city info
router.get('/', (req, res) => {
    console.log('getinfo test')
    console.log(req.query)
    if (req.query && req.query.city) {
        //city to lower case
        city = req.query.city.toLowerCase();
        //capitalize each word of city name
        city = city.replace(/\b\w/g, l => l.toUpperCase());
        console.log(city)
    }
    if (req.query && (req.query.zipcode || req.query.city) && (zipCodes[req.query.zipcode] || cities[city])) {
        res.send({
            message: 'completed your request',
            data: req.query.zipcode ? zipCodes[req.query.zipcode] : cities[city],
        })
    } else {
        res.send({ error: 'not valid query or zip code not found' })
    }

});

module.exports = router;