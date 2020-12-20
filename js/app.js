$(document).ready(function () {
  //   function log(message) {
  //     $("<div/>").text(message).prependTo("#log");
  //     $("#log").attr("scrollTop", 0);
  //   }
  $.widget("custom.catcomplete", $.ui.autocomplete, {
    _create: function () {
      this._super();
      this.widget().menu(
        "option",
        "items"
        // "> :not(.ui-autocomplete-category)"
        // "> *"
      );
    },
    _renderMenu: function (ul, items) {
      var that = this,
        currentCategory = "";
      $.each(items, function (index, item) {
        var li;
        if (item.category != currentCategory) {
          ul.append(
            "<li class='ui-autocomplete-category'>" + item.category + "</li>"
          );
          currentCategory = item.category;
        }
        li = that._renderItemData(ul, item);
        if (item.category) {
          li.attr("aria-label", item.category + " : " + item.label);
        }
      });
    },
  });

  var queryResult = [];

  var settings = {
    url: "http://datamall2.mytransport.sg/ltaodataservice/BusStops",
    method: "GET",
    timeout: 0,
    headers: {
      AccountKey: "T+n6csk3Rd6vj7in0YOctw==",
      Accept: "application/json",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.value);
    console.log(response.value[0].RoadName);
    console.log(response.value.length);
    var roadname;
    var landmark;
    for (var i = 0; i < response.value.length; i++) {
      roadname = response.value[i].RoadName;
      landmark = response.value[i].Description;
      queryResult.push(`${landmark} near ${roadname}`);
    }
    console.log(queryResult);


    $("#txtQuery").autocomplete({
      source: queryResult,
      minLength: 0,
      select: function (event, ui) {
        console.log(ui.item.value);  
        // ui.item.value = landmark;
        // log(
        //   ui.item
        //     ? "Selected: " + ui.item.value + ", geonameId: " + ui.item.id
        //     : "Nothing selected, input was " + this.value
        // );
      },
    });
    	
// $( "#txtQuery" ).on( "autocompleteselect", function( event, ui ) {
//     ui.item.value = "testing";  
// } );

    	
// $( "#txtQuery" ).on( "click", function( event, ui ) {
//     console.log(landmark)
//     $("#txtQuery").val(landmark);} );

    // $("#txtQuery").catcomplete({
    //     delay: 0,
    //     source: queryResult
    //     // select: function (event, ui) {
    //     //   log(
    //     //     ui.item
    //     //       ? "Selected: " + ui.item.value + ", geonameId: " + ui.item.id
    //     //       : "Nothing selected, input was " + this.value
    //     //   );
    //     // },
    //   });

  });

  //   $.ajax({
  //     url: "london.xml",
  //     dataType: "xml",
  //     success: function (xmlResponse) {
  //       var data = $("geoname", xmlResponse)
  //         .map(function () {
  //           return {
  //             value:
  //               $("name", this).text() +
  //               ", " +
  //               ($.trim($("countryName", this).text()) || "(unknown country)"),
  //             id: $("geonameId", this).text(),
  //           };
  //         })
  //         .get();
  //       $("#txtQuery").autocomplete({
  //         source: data,
  //         minLength: 0,
  //         select: function (event, ui) {
  //           log(
  //             ui.item
  //               ? "Selected: " + ui.item.value + ", geonameId: " + ui.item.id
  //               : "Nothing selected, input was " + this.value
  //           );
  //         },
  //       });
  //     },
  //   });
});
