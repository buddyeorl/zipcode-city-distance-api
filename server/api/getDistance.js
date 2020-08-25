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

//get distances between cities
const getAllCityDistances = (req, res, next) => {
    let results = [];
    //city1 and city2 will be standarized before being used
    let city1;
    let city2;
    let state1;
    let state2;
    if (req.query && req.query.city1 && req.query.city2) {
        //city to lower case
        city1 = req.query.city1.toLowerCase();
        //capitalize each word of city name
        city1 = city1.replace(/\b\w/g, l => l.toUpperCase()).trim();

        //city to lower case
        city2 = req.query.city2.toLowerCase();
        //capitalize each word of city name
        city2 = city2.replace(/\b\w/g, l => l.toUpperCase()).trim();
    }

    if (req.query.state1 && req.query.state2) {
        state1 = req.query.state1.toUpperCase();
        state2 = req.query.state2.toUpperCase();
    }

    if (req.query && req.query.city1 && req.query.city2 && req.query.unit && cities[city1] && cities[city2]) {
        let cityAData = cities[city1];
        let cityBData = cities[city2];
        //if state1 and state2 was received in the queries, then only results containing this parameters will be shown

        if (state1 && state2) {
            for (cityA of cityAData) {
                if (state1 === cityA.state.short) {
                    for (cityB of cityBData) {
                        if (state2 === cityB.state.short) {
                            results.push({
                                place1: {
                                    city: city1,
                                    state: cityA.state.short,
                                    zipcode: cityA.zipCode
                                },
                                place2: {
                                    city: city2,
                                    state: cityB.state.short,
                                    zipcode: cityB.zipCode
                                },
                                distance: calculateDistance(
                                    zipCodes[cityA.zipCode].location,
                                    zipCodes[cityB.zipCode].location
                                )
                            })
                        }
                    }

                }
            }
        } else {
            for (cityA of cityAData) {
                for (cityB of cityBData) {
                    results.push({
                        place1: {
                            city: city1,
                            state: cityA.state.short,
                            zipcode: cityA.zipCode
                        },
                        place2: {
                            city: city2,
                            state: cityB.state.short,
                            zipcode: cityB.zipCode
                        },
                        distance: calculateDistance(
                            zipCodes[cityA.zipCode].location,
                            zipCodes[cityB.zipCode].location
                        )
                    })
                }
            }
        }
    } else {
        res.send({ error: 'not valid query or city not found' });
        return
    }
    req.locals = results;
    next();
    return;
}

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