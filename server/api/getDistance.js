const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// importing zipCode data file
let zipCodes = require('../helper/allZipCodesFilesWithCityNames').allZipCodesFilesWithCityNames;
zipCodes = JSON.parse(zipCodes);

// importing calculate distance function
const calculateDistance = require('../helper/calculateDistance').calculateDistance;

//returns all equipments in the db
router.get('/', (req, res) => {
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
        res.send({ error: 'not valid query or zip code found' })
    }

});

module.exports = router;