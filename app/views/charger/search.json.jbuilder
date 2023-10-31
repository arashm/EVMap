# frozen_string_literal: true

json.address_location do
  json.lat @location.lat
  json.lng @location.lng
end

json.nearest_stations do
  json.array! @chargers do |charger|
    json.id charger.id
    json.lat charger.lat
    json.lng charger.lng
    json.connections_count charger.connections_count
    json.is_operational charger.is_operational
    json.distance charger.distance_to(@location)
  end
end
