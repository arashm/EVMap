# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin 'leaflet', to: 'https://ga.jspm.io/npm:leaflet@1.9.4/dist/leaflet-src.js'
pin '@rails/ujs', to: 'https://ga.jspm.io/npm:@rails/ujs@7.1.1/app/assets/javascripts/rails-ujs.esm.js'
pin_all_from 'app/javascript/constants', under: 'constants'
pin 'leaflet.offline', to: 'https://ga.jspm.io/npm:leaflet.offline@3.0.1/dist/bundle.js'
pin 'idb', to: 'https://ga.jspm.io/npm:idb@7.1.1/build/index.js'
