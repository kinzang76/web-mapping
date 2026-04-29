// TASK 1: Paste map creation code here
const map = L.map("map").setView([27.5, 90.4], 8);

// TASK 2: Paste basemap code here
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);
L.control.scale().addTo(map);

const miniMap = new L.Control.MiniMap(osm, {
  toggleDisplay: true
}).addTo(map);

// TASK 3: Paste layer group code here
const dzongkhagLayer = L.layerGroup().addTo(map);
const educationLayer = L.layerGroup().addTo(map);
const healthLayer = L.layerGroup().addTo(map);


// TASK 4: Paste zoom function here
function zoomToBhutan() {
  map.setView([27.5, 90.4], 8);
}



// TASK 5: Paste GeoJSON layer loading code here
fetch("../Data/bhutan_dzong_web.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "black",
        weight: 1,
        fillColor: "orange",
        fillOpacity: 0.3
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Dzongkhag Boundary");
      }
    }).addTo(dzongkhagLayer);
  });

fetch("../Data/bhutan_education_center.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.8
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Education Center");
      }
    }).addTo(educationLayer);
  });

fetch("../Data/bhutan_health_center.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 5,
          color: "red",
          fillColor: "red",
          fillOpacity: 0.8
        });
      },
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Health Center");
      }
    }).addTo(healthLayer);
  });



// TASK 6: Paste layer control code here
const satellite = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  { attribution: "© OpenTopoMap contributors" }
);

const baseMaps = {
  "OpenStreetMap": osm,
  "Topographic": satellite
};

const overlayMaps = {
  "Dzongkhag Boundary": dzongkhagLayer,
  "Education Centers": educationLayer,
  "Health Centers": healthLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

map.on("click", function(e) {
  const coordPopup = L.popup()
    .setLatLng(e.latlng)
    .setContent(
      "Lat: " + e.latlng.lat.toFixed(4) +
      "<br>Lng: " + e.latlng.lng.toFixed(4)
    )
    .openOn(map);
});

