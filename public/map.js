// Create a new map object and set the initial view to a specific latitude and longitude (51.505, -0.09) with a zoom level of 2.
const map = L.map("map").setView([51.505, -0.09],2);
        const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib }).addTo(map);