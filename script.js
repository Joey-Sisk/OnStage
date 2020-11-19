function buildQueryURL() {

  const keyword = $("#searchBar").val().trim();

  const queryURL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&source=universe&countryCode=US&apikey=LEUwCGTcHM9FHCOKSOYvPObtTKbpoEax`;
 
  console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL;
}

function updatePage(eventData) {
  console.log(eventData);
  console.log("------------------------------------");

  $("#place1").text();

  $("#place2").text();

  $("#place3").text();

  $("#place4").text();

}

$("#searchButton").on("click", function(event) {
  event.preventDefault();

  var queryURL = buildQueryURL();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});