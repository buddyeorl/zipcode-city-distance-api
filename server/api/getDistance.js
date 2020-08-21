const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//importing zipCode data file
let zipCodes = require('../allZipCodes').zipCodes;
zipCodes = JSON.parse(zipCodes);

//importing calculate distance function
const calculateDistance = require('../helper/calculateDistance').calculateDistance;

//returns all equipments in the db
router.get('/', (req, res) => {
    console.log('zipcode test')
    console.log(req.query)
    if (req.query && req.query.zipcode1 && req.query.zipcode2 && zipCodes[req.query.zipcode1] && zipCodes[req.query.zipcode2]) {
        res.send({
            message: 'completed your request',
            zipcode1: zipCodes[req.query.zipcode1],
            zipcode2: zipCodes[req.query.zipcode2],
            distance: calculateDistance(zipCodes[req.query.zipcode1], zipCodes[req.query.zipcode2])
        })
    } else {
        res.send('not valid query')
    }

});

module.exports = router;