# frozen_string_literal: true

module OpenChargerMap
  BASE_URL = 'https://api.openchargemap.io/v3/'

  class Request
    def self.call(**)
      new(**).call
    end

    def call
      response = HTTPX.get(url)
      response.raise_for_status
      JSON.parse(response.to_s)
    rescue HTTPX::Error
      raise OpenChargerMap::Error
    end

    def url
      BASE_URL + path + params.to_param
    end

    def params
      {
        key: config[:api_key]
      }
    end

    def path
      raise NotImplementedError
    end

    def config
      @config ||= Rails.application.credentials.open_charger_map
    end
  end
end
