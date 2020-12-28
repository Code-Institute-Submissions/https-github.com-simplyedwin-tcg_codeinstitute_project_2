$(document).ready(function () {
  var userdestbscode = "waiting for user input...";
  var usercoord;
  var queryResult = [];
  var querydata = [];
  let clat = 1.3544; // default latitude setting when the map is first loaded
  let clong = 103.82; // default longtitude setting when the map is first loaded
  var mapzoom = 11; // default zoom setting when the map is first loaded
  var mapstart = 0; // to load the map at default page which will show the entire of Singapore land mass
  var gculat;
  var gculong;

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
        //"https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=" +
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
      var lat;
      var long;
      for (var i = 0; i < response.value.length; i++) {
        roadname = response.value[i].RoadName;
        landmark = response.value[i].Description;
        busstopcode = response.value[i].BusStopCode;
        lat = response.value[i].Latitude;
        long = response.value[i].Longitude;
        queryResult.push(
          // `${landmark} near ${roadname} (Bus Stop Code: ${busstopcode}) - [${lat},${long}])`
          `${landmark} near ${roadname} (Bus Stop Code: ${busstopcode})`
        );
        querydata.push(response.value[i]);
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
      userdestbscode = res[1].slice(0, -1);
      console.log(userdestbscode);
    },
  });

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

  $("#searchbutton").on("click", (e) => {
    console.log(querydata.length);
    console.log(`gculat: ${gculat} gculong: ${gculong}`);
    var markercoords = [];
    var jobj = new Object();
    for (var i = 0; i < querydata.length; i++) {
      // to handle empty value passed back to userdestcide 
      if (userdestbscode == NaN) {
        e.preventDefault();
      } else if (querydata[i].BusStopCode == userdestbscode) {
        jobj.long = querydata[i].Longitude;
        jobj.lat = querydata[i].Latitude;
        jobj.type = "dest";
        var userdestcoord = JSON.parse(JSON.stringify(jobj));
        markercoords.push(userdestcoord);
        console.log(markercoords);
      }
      // if this location is within 0.1KM of the user, add it to the list
      if (
        distance(
          gculat,
          gculong,
          querydata[i].Latitude,
          querydata[i].Longitude,
          "K"
        ) <= 0.12
      ) {
        console.log(
          `The nearest bus stop to your current location is ${querydata[i].Description} near ${querydata[i].RoadName} (${querydata[i].BusStopCode})`
        );
        jobj.long = querydata[i].Longitude;
        jobj.lat = querydata[i].Latitude;
        jobj.type = "curr";
        var usercurcoord = JSON.parse(JSON.stringify(jobj));
        markercoords.push(usercurcoord);
      }
    }
    getmap(1, mapzoom, gculong, gculat, markercoords);
  });

  // function to generating map using mapbox api
  function getmap(maptype, mapzoom, gculong, gculat, markercoordJsarr = 0) {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2ltcGx5ZWR3aW4iLCJhIjoiY2tpcmUycDI1MDZzczJ3cnh3cGx4NHZoYyJ9.h4T1J2-6QQW7-bRJZuwJrg";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [gculong, gculat], // starting position [lng, lat]
      zoom: mapzoom, // starting zoom
    });

    let gcupulsingDot = new pulsingDot(map, 75, 75, 255, 255, 1);

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
    for (var i = 0; i < markercoordJsarr.length; i++) {
      // var markercoord = JSON.parse(markercoordJsarr[i]);
      //console.log(`markercoordJsarr[i].long: ${markercoordJsarr[i].long} markercoordJsarr[i].lat: ${markercoordJsarr[i]}`);
      var col = "#00FFF7";
      if (markercoordJsarr[i].type == "dest") {
        col = "#0023FF";
      }
      var marker = new mapboxgl.Marker({ color: col })
        .setLngLat([markercoordJsarr[i].long, markercoordJsarr[i].lat])
        .addTo(map);
    }
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

  // to compute the distance between 2 coordiates
  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
});
