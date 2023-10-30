# frozen_string_literal: true

module OpenChargerMap
  class Poi < Request
    MAX_RESULTS = 5_000
    LIMIT_LATITUDE = 52.520008
    LIMIT_LONGITUDE = 13.404954
    LIMIT_DISTANCE = 50
    DISTANCE_UNIT = 'KM'
    COUNTRY_CODE = 'DE'

    def path
      'poi'
    end

    def params
      super.merge(
        maxresults: MAX_RESULTS,
        lattiude: LIMIT_LATITUDE,
        longitude: LIMIT_LONGITUDE,
        distance: LIMIT_DISTANCE,
        distanceunit: DISTANCE_UNIT,
        countrycode: COUNTRY_CODE
      )
    end
  end
end
