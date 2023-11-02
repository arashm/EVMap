# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GeoSearch::AddressSearch, type: :model do
  describe '#call' do
    context 'when the address is valid' do
      subject(:result) { described_class.call('Lützowufer 15') }

      let!(:charger) { create(:charger) }

      before do
        stub_request(:get, 'https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&polygon=0&q=L%C3%BCtzowufer%2015')
          .to_return(status: 200, body: Rails.root.join('spec/fixtures/osm/valid_response.json').read)
      end

      it "returns the location's lng/lat" do
        expect(result.location).to be_present
      end

      it 'returns the charger' do
        expect(result.chargers).to include(charger)
      end

      it 'does not return an error' do
        expect(result).to be_valid
        expect(result.errors).to be_empty
      end
    end

    context 'when the address is invalid' do
      subject(:result) { described_class.call('london') }

      before do
        stub_request(:get, 'https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&polygon=0&q=london')
          .to_return(status: 200, body: Rails.root.join('spec/fixtures/osm/invalid_response.json').read)
        create(:charger)
      end

      it 'returns an error' do
        expect(result).not_to be_valid
        expect(result.errors).to be_present
        expect(result.errors.first).to include('No results found')
      end
    end
  end
end
