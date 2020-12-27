$(document).ready(function () {
  var userdestbscode = "waiting for user input...";
  var queryResult = [];
  let clat = 1.3544; // default latitude setting when the map is first loaded
  let clong = 103.82; // default longtitude setting when the map is first loaded
  var mapzoom = 11; // default zoom setting when the map is first loaded
  var mapstart = 0; // to load the map at default page which will show the entire of Singapore land mass 
  
  getmap(mapstart, mapzoom, clong, clat);

  // this array is declared due to pagination of the api, which will only publish the first 500 apis by default
  var busstopnoapicalls = [
    0,
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
  ];

  // to get the next 500 api calls using loop
  busstopnoapicalls.forEach(function (apicalls) {
    var settings = {
      url:
        "http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=" +
        apicalls,
      method: "GET",
      timeout: 0,
      headers: {
        AccountKey: "T+n6csk3Rd6vj7in0YOctw==",
        Accept: "application/json",
      },
    };

    $.ajax(settings).done(function (response) {
      var roadname;
      var landmark;
      var busstopcode;
      for (var i = 0; i < response.value.length; i++) {
        roadname = response.value[i].RoadName;
        landmark = response.value[i].Description;
        busstopcode = response.value[i].BusStopCode;
        queryResult.push(
          `${landmark} near ${roadname} (Bus Stop Code: ${busstopcode})`
        );
      }
    });
  });

  // to provide autocomplete of address when user starts to type more than 1 character
  $("#txtQuery").autocomplete({
    source: queryResult,
    minLength: 1,
    select: function (event, ui) {
      console.log(ui.item.value);
      var res = ui.item.value.split("Bus Stop Code: ");
      ui.item.value;
      userdestbscode = res[1].slice(0, -1);
      console.log(userdestbscode);
    },
  });

  console.log(userdestbscode);

  // to retrieve user location using geolocation when clicked onto the form query and update onto the map
  $("#txtQuery").click(function () {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (navigator.geolocation) {
      //check geolocation available
      //try to get user current location using getCurrentPosition() method
      navigator.geolocation.getCurrentPosition(
        function (position) {
          gculat = position.coords.latitude;
          gculong = position.coords.longitude;
          mapzoom = 16;
          // let gcupulsingDot = new pulsingDot(100, 103, 128, 159, 1);
          getmap(1, mapzoom, gculong, gculat);

          // mapinteraction(mapgcu, gcupulsingDot);
          console.log(`gculat: ${gculat} gculong: ${gculong}`);
        },
        error,
        options
      );
    } else {
      console.log("Browser doesn't support geolocation!");
    }
  });

  // function to generating map using mapbox api
  function getmap(maptype, mapzoom, gculong, gculat) {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2ltcGx5ZWR3aW4iLCJhIjoiY2tpcmUycDI1MDZzczJ3cnh3cGx4NHZoYyJ9.h4T1J2-6QQW7-bRJZuwJrg";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [gculong, gculat], // starting position [lng, lat]
      zoom: mapzoom, // starting zoom
    });

    let gcupulsingDot = new pulsingDot(map, 100, 103, 128, 159, 1);

    // to run the below condition only when user clicked onto the textquery
    if (maptype == 1) {
      map.on("load", function () {
        map.addImage("pulsing-dot", gcupulsingDot, { pixelRatio: 2 });

        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [gculong, gculat],
                },
              },
            ],
          },
        });
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "pulsing-dot",
          },
        });
      });
    }
    // to retrieve user location using mapbox build in feature
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }

  // to create a pulsingDot object on the map
  function pulsingDot(map, size, r, g, b, a) {
    // this.map = map;
    this.width = size;
    this.height = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.data = new Uint8Array(size * size * 4);

    this.onAdd = function () {
      var canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext("2d");
    };

    this.render = function () {
      var duration = 1000;
      var t = (performance.now() % duration) / duration;

      var radius = (size / 2) * 0.3;
      var outerRadius = (size / 2) * 0.7 * t + radius;
      var context = this.context;

      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      a = 1 - t;
      context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")"; //"rgba(255, 200, 200," + (1 - t) + ")";
      //context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
      context.fill();

      // draw inner circle
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle =
        "rgba(" + r + "," + (g - g / 2) + "," + (b - b / 2) + ",1)"; //"rgba(255, 100, 100, 1)";
      //context.fillStyle = "rgba(255, 100, 100, 1)";
      context.strokeStyle = "white";
      context.lineWidth = 2 + 4 * a;
      context.fill();
      context.stroke();

      // update this image's data with data from the canvas
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // continuously repaint the map, resulting in the smooth animation of the dot
      map.triggerRepaint();

      // return `true` to let the map know that the image was updated
      return true;
    };
  }
});
