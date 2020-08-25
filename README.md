# zip code distance
A simple free no restrictions nodejs app to calculate the distance between zip codes

## query: 
/api/getDistance/zipcode&zipcode1={zipcode}&zipcode2={zipcode}&unit={M}

queries:
* zipcode1: type int 
* zipcode2: type int
* unit: type char

** valid units are M for miles, K for kilometer, N for nautical, if unit doesn't match any of the options it will calculate distance in miles as default

# 

example:
[https://zipcodedistance.herokuapp.com/api/getDistance/zipcode?zipcode1=98006&zipcode2=33014&unit=M](https://zipcodedistance.herokuapp.com/api/getDistance/zipcode?zipcode1=98006&zipcode2=33014&unit=M)


you will get a JSON object:
```javascript
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
# 

# todo:
* add city names for zipcodes in response
* get distance from city names
* add international functionality
* add not found zipcodes
* add a bug tracker
* add UI

