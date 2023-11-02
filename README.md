EVMap is a simple PWA that shows EV charger locations in Berlin, in a map. The app leverages service workers to provide
some of the functionality offline. As you load the map and move around it, the app will cache the map tiles you have
loaded to be used when offline. Search functionality is not available when offline.

Users can enter a simple address in Berlin (like `Lützowufer 15`) and get up to 3 closest charging stations around the location.

# Setting up

The app requires Ruby `3.2.2`. To setup the app after running `bundle install` to install the required gems, run:

```shell
bundle exec rails db:setup
```

Then run the app using `./bin/dev`.

# Services and libraries used

* Open charge map is used for getting the EV charger locations in Berlin. This is ran once when seeding the DB.

* Geokit gem is used for converting addresses to longitude and latitudes to be able to locate it on the map and showing
  the closest charging stations. The gem uses OpenStreetMap.

* leafletjs for map (using OpenStreetMap)

* IndexedDB for caching requests and map tiles for offline use and storing users' favorite charging stations

* Google's workbox to help with caching using service workers

* Tailwind for css

* Stimulus for JS related codes
