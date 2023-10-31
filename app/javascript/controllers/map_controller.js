import { Controller } from "@hotwired/stimulus"
import L from "leaflet"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = [ "mapContainer" ]
  static lat = 52.52000;
  static lng = 13.404954;

  connect() {
    this.initMap();
    this.fetchChargers();
  }

  get map() {
    if (this.mapObject) return this.mapObject;

    this.mapObject = L.map(this.mapContainerTarget).setView([this.constructor.lat, this.constructor.lng], 13);
    return this.map;
  }

  initMap() {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  fetchChargers() {
    fetch("/charger.json")
      .then(response => response.json())
      .then((data) => {
        data.forEach((charger) => {
          L.marker([charger.lat, charger.lng], { riseOnHover: true }).addTo(this.map)
            .bindPopup(`<b>Connections Available:</b> ${charger.connections_count}<br><b>Is Operational:</b> ${charger.is_operational}`);
        });
      });
  }
}
