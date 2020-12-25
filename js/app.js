$(document).ready(function () {
  var userdestbscode = "waiting for user input...";
  var queryResult = [];
  var gmllat = 1.3544;
  var gmllong = 103.82;
  var mapzoom = 11;
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
      // console.log(response);
      // console.log(response.value);
      // console.log(response.value[0].RoadName);
      // console.log(response.value.length);
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

  // for generating map using mapbox api
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ltcGx5ZWR3aW4iLCJhIjoiY2tpcmUycDI1MDZzczJ3cnh3cGx4NHZoYyJ9.h4T1J2-6QQW7-bRJZuwJrg";
  var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [gmllong, gmllat], // starting position [lng, lat]
    zoom: mapzoom, // starting zoom
  });
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  // $("#txtQuery").on("focus", ()=>{
  //   $("#searchbox").attr('class','input-group mb-3 w-75');
  // });

  // $("#txtQuery").on("blur", ()=>{
  //   $("#searchbox").attr('class','input-group mb-3 w-50');
  // });
});
