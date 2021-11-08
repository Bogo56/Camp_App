var MapboxClient = require('mapbox')

const client = new MapboxClient (process.env.MAPBOX_ACESS_TOKEN)

// This function transforms the Location Name to Geo Coordinates using the mapBox API
// Created a custom function to minimize the code used in the routes

const getCoordinates = (destination) => {
    return client.geocodeForward(destination)
    .then((res) => {return res.entity.features[0].geometry})
    .catch((err) => console.log(err))
}


module.exports = getCoordinates
  