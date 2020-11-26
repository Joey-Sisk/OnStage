        
        function getMap(){
        mapboxgl.accessToken =
        "pk.eyJ1Ijoic2VyZ2lvYWxtYXphbiIsImEiOiJja2hzMWlmcmkwOHM4MnBtdGtldnlkM2tiIn0.QFBcMYs8bOjrdpYspS-D-A"
        const keyword = $("#searchBar").val().trim();
        const eventQueryURL = `https://rest.bandsintown.com/artists/${keyword}/events?app_id=5e819cfc0dc5827e31d44c0ea761bf34&date=upcoming`;


        $.ajax({
            url: eventQueryURL,
            method: "GET"
          }).then(function (eventData) {
             
            

        
      
      navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
        enableHighAccuracy: true
      })
      
      function successLocation(position) {
        setupMap([position.coords.longitude, position.coords.latitude])
      }
      
      
      function errorLocation() {
        setupMap([-2.24, 53.48])
      }
      
      function setupMap(center) {
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: center,
          zoom: 5,
          interactive: true
        })

        map.on('style.load', function (e) {
            map.addSource('markers', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [eventData[0].venue.longitude, eventData[0].venue.latitude]
                        },
                        "properties": {
                            "title": [eventData[0].venue.name],
                            "marker-symbol": "default_marker"
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [eventData[1].venue.longitude, eventData[1].venue.latitude]
                        },
                        "properties": {
                            "title": [eventData[1].venue.name],
                            "marker-color": "#ff00ff",
                            "marker-symbol": "secondary_marker"
                        }
                    },{
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [eventData[2].venue.longitude, eventData[2].venue.latitude]
                        },
                        "properties": {
                            "title": [eventData[2].venue.name],
                            "marker-color": "#ff00ff",
                            "marker-symbol": "secondary_marker"
                        }
                    },{
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [eventData[3].venue.longitude, eventData[3].venue.latitude]
                        },
                        "properties": {
                            "title": [eventData[3].venue.name],
                            "marker-color": "#ff00ff",
                            "marker-symbol": "secondary_marker"
                        }
                    },{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [eventData[4].venue.longitude, eventData[4].venue.latitude]
                        },
                        "properties": {
                            "title": [eventData[4].venue.name],
                            "marker-color": "#ff00ff",
                            "marker-symbol": "secondary_marker"
                    }
                    }]
                }
            });
        
            map.addLayer({
                "id": "markers",
                "source": "markers",
                "type": "circle",
                "paint": {
                    "circle-radius": 10,
                    "circle-color": "#007cbf"
                }
            });
            let popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });
            map.on("mouseenter", "markers", e => {
              map.getCanvas().style.cursor = "pointer";
              popup
                  .setLngLat(map.unproject(e.point))
                  .setHTML("<h3>" + e.features[0].properties.title + "</h3>")
                  .addTo(map);
            });
            map.on("mouseleave", "markers", () => {
                map.getCanvas().style.cursor = "";
                popup.remove();
            });
        });

        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav)
      
        var directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken
        })
      
        // map.addControl(directions, "top-left")
      }}
          )}
                  
      