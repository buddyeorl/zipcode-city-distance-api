const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// importing zipCode data file
const zipCodes = require('../helper/allZipCodesFilesWithCityNames').allZipCodesFilesWithCityNames;

// importing calculate distance functions
const calculateDistance = require('../helper/calculateDistance').calculateDistance;

const getRadius = (req, res, next) => {
    console.log(req.query);
    if (!req.query.zipcode || !req.query.limit) {
        res.send({ error: `Invalid or incomplete query, mandatory queries for getRadius are zipcode, limit and unit` });
        return
    }

    let zipCode = req.query.zipcode;
    let limit = parseInt(req.query.limit);
    let unit = req.query.unit ? req.query.unit : 'M';

    let results = [];

    //check if received Zip Code is valid
    if (!zipCodes[zipCode]) {
        res.send({ error: `Zip Code: ${zipCode} not found` });
        return
    }

    //iterate through zipcodes to calculate distance in no smart order
    for (data in zipCodes) {
        //skip if same as received zicode
        if (data === zipCode) {
            continue;
        }
        let distance = calculateDistance(zipCodes[zipCode].location, zipCodes[data].location, unit);
        if (distance <= limit) {
            results.push({
                zipcode: data,
                distance: distance
            });
        }
    }

    //ascending sort
    if (results.length > 0) {
        results.sort((a, b) => a.distance - b.distance);
    }

    if (results.length === 0) {
        res.send({ error: `No Zip Code found in the ${limit} radius` });
    }

    req.locals = results;
    next();
    return
}


//get the zipcode or city info
router.get('/', getRadius, (req, res) => {
    console.log('getRadius completed');
    res.send({
        message: 'completed your request',
        data: req.locals,
    })

});

module.exports = router;






