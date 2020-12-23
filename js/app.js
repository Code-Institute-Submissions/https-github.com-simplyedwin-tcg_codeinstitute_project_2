$(document).ready(function () {
  //   function log(message) {
  //     $("<div/>").text(message).prependTo("#log");
  //     $("#log").attr("scrollTop", 0);
  //   }
  // $.widget("custom.catcomplete", $.ui.autocomplete, {
  //   _create: function () {
  //     this._super();
  //     this.widget().menu(
  //       "option",
  //       "items"
  //       // "> :not(.ui-autocomplete-category)"
  //       // "> *"
  //     );
  //   },
  //   _renderMenu: function (ul, items) {
  //     var that = this,
  //       currentCategory = "";
  //     $.each(items, function (index, item) {
  //       var li;
  //       if (item.category != currentCategory) {
  //         ul.append(
  //           "<li class='ui-autocomplete-category'>" + item.category + "</li>"
  //         );
  //         currentCategory = item.category;
  //       }
  //       li = that._renderItemData(ul, item);
  //       if (item.category) {
  //         li.attr("aria-label", item.category + " : " + item.label);
  //       }
  //     });
  //   },
  // });

  var queryResult = [];
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
      url: "http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip="+apicalls,
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
      for (var i = 0; i < response.value.length; i++) {
        roadname = response.value[i].RoadName;
        landmark = response.value[i].Description;
        queryResult.push(`${landmark} near ${roadname}`);
      }
      console.log(queryResult);
      // console.log(queryResult.length);
    });
  });
  console.log(queryResult.length);

    $("#txtQuery").autocomplete({
      source: queryResult,
      minLength: 0,
      select: function (event, ui) {
        console.log(ui.item.value);
        var res = ui.item.value.split("near");
        console.log(res[0]);
        ui.item.value = res[0];
      },
    });
  
});
