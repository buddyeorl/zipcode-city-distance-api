//file path related imports
const path = require('path');
const fs = require('fs');
const util = require('util');

//read file
const readline = require('readline');
const { allCityData } = require('./allCityData');

// //import prefill allzipcodes file generic
let zipCodeGeneric = require('./allZipCodes').zipCodes;

// //import existing file
let zipCodeFiles = require('./allZipCodes2010with2019cities').allZipCodes2010with2019cities;

//import file with city names 
let cityFiles = require('./allZipCodesFilesWithCityNames').allZipCodesFilesWithCityNames;

let zipCodes = {}
let zipCodeWithCityNames = {}
let allCities = {}

//census file to js object to file
async function rawToZipCodewithCityCodes() {
    const fileStream = fs.createReadStream('./raw_zcta_cities_geoid_to_zipcodes.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
        str = line.trim().split(',')

        console.log(`Line from file: ${str}`);
        zipCodes[str[0]] = {
            state: { code: str[1] },
            place: (zipCodes[str[0]] && zipCodes[str[0]].place) ? [...zipCodes[str[0]].place, str[2]] : [str[2]],
            geoID: (zipCodes[str[0]] && zipCodes[str[0]].geoID) ? [...zipCodes[str[0]].geoID, str[4]] : [str[4]],
        }

    }
    console.log(zipCodes);

    fs.writeFileSync('./allZipCodes2010with2019cities.js', 'module.exports.allZipCodes2010with2019cities = ' + util.inspect(JSON.stringify(zipCodes)), 'utf-8')
}

//census file to js object to file
async function rawToZipCodeWithCityNames() {
    const fileStream = fs.createReadStream('./raw_2019_Gaz_us_cities.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        //console.log(`Line from file: ${line}`);
        str = line.trim().split('\t')
        //str = line.trim().split(',')
        //str = str.replace(/  +/g, ' ');
        //console.log(str.trim().split('\t'))
        console.log(`Line from file: ${str}`);
        // zipCodes[str[0]] = {
        //     stateCode: str[1],
        //     place: str[2],
        //     classFP: str[3],
        //     geoID: str[4],
        // }


        for (zipCodeData in zipCodeFiles) {
            //console.log(zipCodeFiles[zipCodeData])
            //check if place geoID exists in zipcodefiles to add its city name
            if (zipCodeFiles[zipCodeData].geoID.includes(str[1])) {
                console.log('found geoId')
                zipCodeFiles[zipCodeData].state = {
                    ...zipCodeFiles[zipCodeData].state,
                    short: str[0]
                }
                //if it exist, append new result
                if (zipCodeFiles[zipCodeData].placeName) {
                    zipCodeFiles[zipCodeData].placeName[str[3]] = {

                        placeCode: str[1],
                        location: {
                            lat: parseFloat(str[10]),
                            lon: parseFloat(str[11])
                        }
                    }
                }
            }
            //console.log(zipCodeFiles[zipCodeData])
            //break;

            if (zipCodeFiles[zipCodeData].geoID.includes(str[1])) {
                console.log('found geoID');
                console.log(zipCodeData)
                if (zipCodeWithCityNames[zipCodeData]) {
                    zipCodeWithCityNames[zipCodeData].places[str[3]] = {
                        placeCode: str[1],
                        location: {
                            lat: parseFloat(str[10]),
                            lon: parseFloat(str[11])
                        }
                    }

                } else if (zipCodeData !== 'ZCTA5') {
                    zipCodeWithCityNames[zipCodeData] = {
                        state: {
                            code: zipCodeFiles[zipCodeData].state.code,
                            short: str[0]
                        },
                        location: {
                            lat: zipCodeGeneric[zipCodeData].lat,
                            lon: zipCodeGeneric[zipCodeData].lon,
                            aLand: zipCodeGeneric[zipCodeData].aLand,
                            aWater: zipCodeGeneric[zipCodeData].aWater,
                            aLandSQMI: zipCodeGeneric[zipCodeData].aLandSQMI,
                            aWaterSQMI: zipCodeGeneric[zipCodeData].aWaterSQMI,
                        },
                        places: {}
                    };
                    zipCodeWithCityNames[zipCodeData].places[str[3]] = {
                        placeCode: str[1],
                        location: {
                            lat: parseFloat(str[10]),
                            lon: parseFloat(str[11])
                        }
                    }
                }
                //console.log(zipCodeWithCityNames)
            }
        }
    }
    console.log('done')
    console.log(zipCodeWithCityNames);
    fs.writeFileSync('./allZipCodesFilesWithCityNames.js', 'module.exports.allZipCodesFilesWithCityNames = ' + util.inspect(JSON.stringify(zipCodeWithCityNames)), 'utf-8')
}


//census file to js object to file
async function makeCityDataFile() {




    for (zipCode in cityFiles) {
        //console.log(cityFiles[zipCodeData])
        //console.log(cityFiles[zipCode])
        // some zipcodes have city codes assigned but no city/town name in the us census raw data therefore we are skipping them as they are not relevant for the city information
        if (cityFiles[zipCode].places) {
            for (city in cityFiles[zipCode].places) {
                //console.log(city)
                if (allCities[city]) {
                    allCities[city] = [
                        ...allCities[city],
                        {
                            ...cityFiles[zipCode].places[city].location,
                            state: cityFiles[zipCode].state,
                            zipCode: zipCode
                        }
                    ]
                } else {
                    allCities[city] = [
                        {
                            ...cityFiles[zipCode].places[city].location,
                            state: cityFiles[zipCode].state,
                            zipCode: zipCode
                        }
                    ]
                }

            }
        }


    }
    console.log(allCities);
    fs.writeFileSync('./allCityData.js', 'module.exports.allCityData = ' + util.inspect(JSON.stringify(allCities)), 'utf-8')
}


//rawToZipCodewithCityCodes();
//rawToZipCodeWithCityNames();
//makeCityDataFile();


