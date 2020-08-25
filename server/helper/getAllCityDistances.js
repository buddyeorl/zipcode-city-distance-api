// importing zipCode data file
let zipCodes = require('./allZipCodesFilesWithCityNames').allZipCodesFilesWithCityNames;

// importing zipCode data file
let cities = require('./allCityData').allCityData;

// importing calculate distance functions
const calculateDistance = require('./calculateDistance').calculateDistance;

//get distances between cities
module.exports.getAllCityDistances = (req, res, next) => {
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