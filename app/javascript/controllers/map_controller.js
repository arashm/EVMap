import { Controller } from '@hotwired/stimulus'
import L from 'leaflet'
import { getStorageLength, getBlobByKey, downloadTile, saveTile } from 'leaflet.offline'
import Rails from '@rails/ujs'
import { RED_ICON_URL } from 'constants/assets'

const MAP_BASE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

// Connects to data-controller="map"
export default class extends Controller {
  static targets = ['mapContainer', 'searchInput']
  static initial_lat = 52.52000
  static initial_lng = 13.404954

  connect () {
    this.initMap()
    this.fetchChargers()
    this.layerGroup = new L.layerGroup()
    getStorageLength().then(i => console.log(i + ' tiles in storage'))
  }

  search (event) {
    event.preventDefault()

    if (this.searchInputTarget.length) return

    fetch(`/charger/search.json?q=${this.searchInputTarget.value}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': Rails.csrfToken()
      }
    }).then(response => response.json())
      .then((data) => {
        const icon = L.icon({
          iconUrl: RED_ICON_URL,
          iconSize: [40, 40]
        })
        this.addMarkers([data.address_location], true, icon, '<b>Your Location</b>')
        this.addMarkers(data.nearest_stations, false)
        this.mapObject.setView([data.address_location.lat, data.address_location.lng], 13)
      })
  }

  favourite (event) {
    event.preventDefault()
    console.log('Favourite', event.target)
  }

  clearMarkers () {
    this.layerGroup.clearLayers()
  }

  get map () {
    if (this.mapObject) return this.mapObject

    this.mapObject = L.map(this.mapContainerTarget).setView([this.constructor.initial_lat, this.constructor.initial_lng], 13)
    return this.map
  }

  initMap () {
    const baseLayer = L.tileLayer(MAP_BASE_URL, { minZoom: 13 })

    baseLayer.on('tileloadstart', (event) => {
      const { tile } = event
      const url = tile.src
      // reset tile.src, to not start download yet
      tile.src = ''
      getBlobByKey(url).then((blob) => {
        if (blob) {
          tile.src = URL.createObjectURL(blob)
          console.debug(`Loaded ${url} from idb`)
          return
        }
        tile.src = url
        // create helper function for it?
        const { x, y, z } = event.coords
        const { _url: urlTemplate } = event.target
        const tileInfo = {
          key: url,
          url,
          x,
          y,
          z,
          urlTemplate,
          createdAt: Date.now()
        }
        console.log(tileInfo)
        downloadTile(url)
          .then((dl) => saveTile(tileInfo, dl))
          .then(() => console.debug(`Saved ${url} in idb`))
      })
    })
    baseLayer.addTo(this.map)
  }

  fetchChargers () {
    fetch('/charger.json')
      .then(response => response.json())
      .then((data) => {
        this.addMarkers(data)
      })
  }

  addMarkers (chargers, clearMarkers = true, icon = null, popup = null) {
    if (clearMarkers) this.clearMarkers()

    const params = { riseOnHover: true }
    if (icon) params.icon = icon

    chargers.forEach((charger) => {
      const marker = L.marker([charger.lat, charger.lng], params)
        .bindPopup(popup || this.defaultPopupContent(charger))
      this.layerGroup.addLayer(marker)
    })
    this.layerGroup.addTo(this.map)
  }

  defaultPopupContent (charger) {
    return `
      <b>Connections Available:</b> ${charger.connections_count}<br>
      <b>Is Operational:</b> ${charger.is_operational}<br><br>
      <button class="text-amber-600 font-medium hover:text-amber-700 hover:font-semibold" data-action="click->map#favourite" data-id=${charger.id}>Favourite</a>
    `
  }
}
