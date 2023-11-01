import L from 'leaflet'
import { RED_ICON_URL, ORANGE_ICON_URL, GREEN_ICON_URL } from 'constants/assets'

export const redIcon = L.icon({
  iconUrl: RED_ICON_URL,
  iconSize: [30, 40]
})

export const orangeIcon = L.icon({
  iconUrl: ORANGE_ICON_URL,
  iconSize: [30, 40]
})

export const greenIcon = L.icon({
  iconUrl: GREEN_ICON_URL,
  iconSize: [30, 40]
})
