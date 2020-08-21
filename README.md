# zip code distance
A simple free no restrictions nodejs app to calculate the distance between zip codes

# to query the distance between two US zip codes using their latitude and longitud (see calculateDistance.js and 2019 cta nation data in zipData folder), 
/api/getDistance&zipcode1={zipcode}&zipcode2={zipcode}

queries:
zipcode1: type int 
zipcode2: type int

example:
[https://zipcodedistance.herokuapp.com/api/getDistance&zipcode1=98006&zipcode2=33014](https://zipcodedistance.herokuapp.com/api/getDistance&zipcode1=98006&zipcode2=33014 "distance between zipcode 98006 and 33014")

you will get an object response as follows:
```javascript
{
    "message": "completed your request",
    "zipcode1": {
                    "geoId": 98006,
                    "aLand": 27737341,
                    "aWater": 1886298,
                    "aLandSQMI": 10.709,
                    "aWaterSQMI": 0.728,
                    "lat": 47.557627,
                    "lon": -122.151005
    },
    "zipcode2": {
                    "geoId": 33014,
                    "aLand": 15983675,
                    "aWater": 2690856,
                    "aLandSQMI": 6.171,
                    "aWaterSQMI": 1.039,
                    "lat": 25.903098,
                    "lon": -80.302673
    },
    "distance": 2710.6371929140273
}
```


# todo:
add city names for zipcodes in response
get distance from city names
add international functionality
add not found zipcodes
add a bug tracker
add UI

