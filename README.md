# US Zip Codes / Cities

Simple,Free, Opensource API for all US Zip Codes and Cities, get the distance between Zip Codes or Cities, get relevant information such as coordinates, cities within Zip Codes, Zip Codes covered by cities, states etc, get all the Zip Codes within certain radius and more.

### Zip Code to Zip Code Distance: 

```

/api/getDistance/zipcode&zipcode1={zipcode}&zipcode2={zipcode}&unit={M}

queries:
zipcode1: type str
zipcode2: type str
unit: type char

```

** valid units are M for miles, K for kilometer, N for nautical, if unit doesn't match any of the options it will calculate distance in miles as default

example:
[https://zipcodedistance.herokuapp.com/api/getDistance/zipcode?zipcode1=98006&zipcode2=33014&unit=M](https://zipcodedistance.herokuapp.com/api/getDistance/zipcode?zipcode1=98006&zipcode2=33014&unit=M)


```javascript
//result
{
    "message": "completed your request",
    "zipcode1": {
        "state": {
            "code": "53",
            "short": "WA"
        },
        "location": {
            "lat": 47.557627,
            "lon": -122.151005,
            "aLand": 27737341,
            "aWater": 1886298,
            "aLandSQMI": 10.709,
            "aWaterSQMI": 0.728
        },
        "places": {
            "Bellevue": {
                "placeCode": "5305210",
                "placeCode2": "02409821",
                "location": {
                    "lat": 47.597837,
                    "lon": -122.15648
                }
            },
            "Newcastle": {
                "placeCode": "5348645",
                "placeCode2": "02411243",
                "location": {
                    "lat": 47.531664,
                    "lon": -122.165566
                }
            }
        }
    },
    "zipcode2": {
        "state": {
            "code": "12",
            "short": "FL"
        },
        "location": {
            "lat": 25.903098,
            "lon": -80.302673,
            "aLand": 15983675,
            "aWater": 2690856,
            "aLandSQMI": 6.171,
            "aWaterSQMI": 1.039
        },
        "places": {
            "Country Club": {
                "placeCode": "1214895",
                "placeCode2": "02402799",
                "location": {
                    "lat": 25.939522,
                    "lon": -80.309225
                }
            },
            "Hialeah": {
                "placeCode": "1230000",
                "placeCode2": "02404689",
                "location": {
                    "lat": 25.869941,
                    "lon": -80.302865
                }
            },
            "Miami Gardens": {
                "placeCode": "1245060",
                "placeCode2": "02404249",
                "location": {
                    "lat": 25.948892,
                    "lon": -80.243585
                }
            },
            "Miami Lakes": {
                "placeCode": "1245100",
                "placeCode2": "02406152",
                "location": {
                    "lat": 25.912739,
                    "lon": -80.320422
                }
            },
            "Opa-locka": {
                "placeCode": "1251650",
                "placeCode2": "02404434",
                "location": {
                    "lat": 25.899998,
                    "lon": -80.255219
                }
            }
        }
    },
    "distance": 2710.6371929140273
}
```
### City to City distance: 

```

/api/getDistance/city&city1={city1 name}&city2={city2 name}&unit={M}

queries:
city1: type str
city2: type str
state1: type str - optional (at the moment only states no case sensitive abbreviations are accepted, e.g: CA,Ca,ca, FL, fl, Fl,pr, PR etc, )
state2: type str - optional (at the moment only states no case sensitive abbreviations are accepted, e.g: CA,Ca,ca, FL, fl, Fl,pr, PR etc, )
unit: type char

```
** valid units are M for miles, K for kilometer, N for nautical, if unit doesn't match any of the options it will calculate distance in miles as default
** if no state is provided, an array of results will be returned showing all distances between the zipcodes the given cities cover, including state information.

example without state query:
[https://zipcodedistance.herokuapp.com/api/getDistance/city?city1=miami&city2=bellevue&unit=M](https://zipcodedistance.herokuapp.com/api/getDistance/city?city1=miami&city2=bellevue&unit=M)

example with state query:
[https://zipcodedistance.herokuapp.com/api/getDistance/city?city1=miami&state1=fl&city2=bellevue&state2=WA&unit=M](https://zipcodedistance.herokuapp.com/api/getDistance/city?city1=miami&state1=fl&city2=bellevue&state2=WA&unit=M)

Result will be an Array of objects,remember cities cover several zipcodes and the api will calculate the distance between each zipcode in the city and return an array of objects with the distances calculated.


### Zip Code Info: 

```
/api/getInfo?zipcode={zipcode}

queries:
zipcode: type str

```

example:
[https://zipcodedistance.herokuapp.com/api/getInfo?zipcode=98006](https://zipcodedistance.herokuapp.com/api/getInfo?zipcode=98006)


```javascript
//result
{
    "message": "completed your request",
        "data": {
        "state": {
            "code": "53",
            "short": "WA"
        },
        "location": {
            "lat": 47.557627,
            "lon": -122.151005,
            "aLand": 27737341,
            "aWater": 1886298,
            "aLandSQMI": 10.709,
            "aWaterSQMI": 0.728
        },
        "places": {
            "Bellevue": {
                "placeCode": "5305210",
                "placeCode2": "02409821",
                "location": {
                    "lat": 47.597837,
                    "lon": -122.15648
                }
            },
            "Newcastle": {
                "placeCode": "5348645",
                "placeCode2": "02411243",
                "location": {
                    "lat": 47.531664,
                    "lon": -122.165566
                }
            }
        }
    }
}
```
# 

## City Info: 

```
/api/getInfo?city={city name}

queries:
city: type str

```

example:
[https://zipcodedistance.herokuapp.com/api/getInfo?city=lakemont](https://zipcodedistance.herokuapp.com/api/getInfo?city=lakemont)


```javascript
//result
{
    "message": "completed your request",
        "data": [
            {
                "lat": 40.465434,
                "lon": -78.391752,
                "state": {
                    "code": "42",
                    "short": "PA"
                },
                "zipCode": "16602"
            },
            {
                "lat": 40.465434,
                "lon": -78.391752,
                "state": {
                    "code": "42",
                    "short": "PA"
                },
                "zipCode": "16648"
            }
        ]
}
```

## Zip Code Radius: 
Get all zipcodes within a radius of this zipcode in ascending order.

```
/api/getRadius?zipcode={zipcode}&limit={limit radius}&unit={limit unit}

queries:
zipcode:str - zipcode
limit:float - maximum distance between given zipcodes and results
unit:char - 'M' for miles, 'K' for kilometers and 'N' for nautic miles

```

```javascript
//result
{
    "message": "completed your request",
    "data": [
        {
            "zipcode": "98056",
            "distance": 3.613853931442833
        },
        {
            "zipcode": "98040",
            "distance": 3.765403793043263
        },
        {
            "zipcode": "98007",
            "distance": 3.89502983948142
        },
        {
            "zipcode": "98005",
            "distance": 4.018115501775772
        },
        {
            "zipcode": "98008",
            "distance": 4.099796739847524
        },
        {
            "zipcode": "98059",
            "distance": 4.449603369443228
        },
        {
            "zipcode": "98004",
            "distance": 4.899415818312604
        }
        ]
}
```


### todo:
* get the distance between two cities by lat and lon and not by their zipcode.
* add radius functionality for cities
* add international functionality
* add a bug tracker
* add UI


Don't like the API?, want to run this locally? check the npm zipcode-city-distance package here:

[https://github.com/buddyeorl/zipcode-city-distance-pkg](https://github.com/buddyeorl/zipcode-city-distance-pkg)