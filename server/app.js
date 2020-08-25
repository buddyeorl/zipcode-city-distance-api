//express server import
const express = require('express');

// CORS
//const cors = require('cors');

//body parser
const bodyParser = require('body-parser');

//file path related imports
const path = require('path');
const fs = require('fs');
const util = require('util');

//initialize express server app
const app = express();

//set port for server
app.set('port', (process.env.PORT || 3002));

//use CORS
//app.use(cors())

//read file
const readline = require('readline');


//Routes
const distance = require('./api/getDistance');
const info = require('./api/getInfo');

app.use('/api/getInfo', info);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
})

//const zipCodes = {}

// //census file to js object to file
// async function processLineByLine() {
//     const fileStream = fs.createReadStream('./zipData/2019_Gaz_zcta_national.txt');

//     const rl = readline.createInterface({
//         input: fileStream,
//         crlfDelay: Infinity
//     });
//     // Note: we use the crlfDelay option to recognize all instances of CR LF
//     // ('\r\n') in input.txt as a single line break.

//     for await (const line of rl) {
//         // Each line in input.txt will be successively available here as `line`.
//         console.log(`Line from file: ${line}`);
//         str = line.trim().split('\t')
//         //str = str.replace(/  +/g, ' ');
//         //console.log(str.trim().split('\t'))
//         console.log(`Line from file: ${str}`);
//         zipCodes[str[0]] = {
//             geoId: parseInt(str[0]),
//             aLand: parseFloat(str[1]),
//             aWater: parseFloat(str[2]),
//             aLandSQMI: parseFloat(str[3]),
//             aWaterSQMI: parseFloat(str[4]),
//             lat: parseFloat(str[5]),
//             lon: parseFloat(str[6])
//         }
//     }
//     console.log(zipCodes);
//     fs.writeFileSync('./allZipCodes.js', 'module.exports.zipCodes = ' + util.inspect(JSON.stringify(zipCodes)), 'utf-8')
// }


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const getDistance = (a, b, unit = 'M') => {
    let lat1 = a.lat;
    let lon1 = a.lon;
    let lat2 = b.lat;
    let lon2 = b.lon

    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        let radlat1 = Math.PI * lat1 / 180;
        let radlat2 = Math.PI * lat2 / 180;
        let theta = lon1 - lon2;
        let radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

// process initial zipcode data to json object
//processLineByLine();


//get distance between two points

//console.log('distance in miles = ', getDistance(zipCodes[98006], zipCodes[90210]))

