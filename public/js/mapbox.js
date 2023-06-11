/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVvbWkyMDAxIiwiYSI6ImNsaXBpbW4zNTBndHgzY3BnbjZzZGpyc2QifQ.j8EGzKsDYJ-N5RXgo23-zA';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/luomi2001/cliqkjnz801ok01p6735ogv36', // style URL
  scrollZoom: false
  //   center: [-118, 34],
  //   zoom: 10,
  //   interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';
  //Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
