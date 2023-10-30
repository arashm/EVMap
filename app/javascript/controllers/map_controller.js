import { Controller } from "@hotwired/stimulus"
import L from "leaflet"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = [ "mapContainer" ]
  static lat = 52.52000;
  static lng = 13.404954;

  connect() {
    this.initMap();
  }

  initMap() {
    var map = L.map(this.mapContainerTarget).setView([this.constructor.lat, this.constructor.lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
  }
}
