# frozen_string_literal: true

FactoryBot.define do
  factory :charger do
    lat { 52.511309 }
    lng { 13.396763 }
    country { 'DE' }
    connections_count { 2 }
    is_operational { true }
  end
end
