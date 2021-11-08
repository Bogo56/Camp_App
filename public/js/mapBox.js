
// This is a client-side script, that is imported in the 'destination.ejs' file
// The variables are being transported trough the ejs engine. Check 'destination.ejs' bottom

mapboxgl.accessToken = map_key

const map = new mapboxgl.Map({
    container: 'destinationMAP',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: destination.geometry.coordinates,
    zoom: 6
    });

const marker1 = new mapboxgl.Marker()
.setLngLat(destination.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<h3>${destination.location}<h3>`))
.addTo(map);
