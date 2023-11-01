# frozen_string_literal: true

module GeoSearch
  class AddressSearch
    attr_reader :errors

    def initialize(address)
      @address = address
      @errors = []
    end

    def self.call(address)
      new(address).call
    end

    def call
      @errors << 'No results found' unless valid_location?

      self
    end

    def location
      @location ||= Geokit::Geocoders::OsmGeocoder.geocode(@address, coutnrycodes: :de)
    end

    def chargers
      return unless location

      @chargers ||= Charger.by_distance(origin: [@location.lat, @location.lng]).limit(3)
    end

    def valid?
      @errors.empty?
    end

    private

    def valid_location?
      location.present? && location.country_code == 'DE' && location.city == 'Berlin'
    end
  end
end
