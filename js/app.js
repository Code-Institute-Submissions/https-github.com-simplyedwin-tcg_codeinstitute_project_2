$(document).ready(function () {
  var userdestbscode = "waiting for user input...";
  var queryResult = [];
  let gculat = 1.3544;
  let gculong = 103.82;
  var mapzoom = 11;
  getmap(mapzoom, gculong, gculat);

  // this array is declared due to pagination of the api, which only publish the first 500 apis by default
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
    if ("geolocation" in navigator) {
      //check geolocation available
      //try to get user current location using getCurrentPosition() method
      navigator.geolocation.getCurrentPosition(function (position) {
        gculat = position.coords.latitude;
        gculong = position.coords.longitude;
        mapzoom = 16
        getmap(mapzoom, gculong, gculat);
        // console.log(`gculat: ${gculat} gculong: ${gculong}`);
      });
    } else {
      console.log("Browser doesn't support geolocation!");
    }
  });
  console.log(`gculat: ${gculat} gculong: ${gculong}`);

  // function to generating map using mapbox api
  function getmap(mapzoom, gculong, gculat) {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2ltcGx5ZWR3aW4iLCJhIjoiY2tpcmUycDI1MDZzczJ3cnh3cGx4NHZoYyJ9.h4T1J2-6QQW7-bRJZuwJrg";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [gculong, gculat], // starting position [lng, lat]
      zoom: mapzoom, // starting zoom
    });

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
  // $("#txtQuery").on("focus", ()=>{
  //   $("#searchbox").attr('class','input-group mb-3 w-75');
  // });

  // $("#txtQuery").on("blur", ()=>{
  //   $("#searchbox").attr('class','input-group mb-3 w-50');
  // });
});
