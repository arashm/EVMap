# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Chargers' do
  describe 'GET /index' do
    before { create(:charger) }

    it 'returns http success' do
      get '/charger'
      expect(response).to have_http_status(:success)
      expect(response.parsed_body.size).to eq(1)
    end
  end

  describe 'GET /search' do
    before { create(:charger) }

    it 'returns http success' do
      stub_request(:get, 'https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&polygon=0&q=L%C3%BCtzowufer%2015')
        .to_return(status: 200, body: Rails.root.join('spec/fixtures/osm/valid_response.json').read)

      post '/charger/search.json', params: { q: 'Lützowufer 15' }
      expect(response).to have_http_status(:success)
      expect(response.parsed_body['nearest_stations'].size).to eq(1)
    end

    it 'returns http not found' do
      stub_request(:get, 'https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&polygon=0&q=london')
        .to_return(status: 200, body: Rails.root.join('spec/fixtures/osm/invalid_response.json').read)

      post '/charger/search.json', params: { q: 'london' }
      expect(response).to have_http_status(:not_found)
      expect(response.parsed_body['error']).to eq('No results found')
    end
  end
end
