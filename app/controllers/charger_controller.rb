# frozen_string_literal: true

class ChargerController < ApplicationController
  def index
    render json: Charger.all
  end

  def search
    de_bounds = Geokit::Geocoders::OsmGeocoder.geocode('Germany').suggested_bounds
    @location = Geokit::Geocoders::OsmGeocoder.geocode(search_params[:q], bias: de_bounds)
    @chargers = Charger.by_distance(origin: [@location.lat, @location.lng]).limit(3)

    Rails.logger.info("Location info: lat: #{@location.lat} lng: #{@location.lng}")

    if @location.present?
      render :search
    else
      render json: { error: 'No results found' }, status: :not_found
    end
  end

  def search_params
    params.permit(:q)
  end
end
