

function updatePage() {
  const keyword = $("#searchBar").val().trim();

  const artistQueryURL = `https://rest.bandsintown.com/artists/${keyword}?app_id=5e819cfc0dc5827e31d44c0ea761bf34`;

  console.log("---------------\nArtist URL: " + artistQueryURL + "\n---------------");

  $.ajax({
    url: artistQueryURL,
    method: "GET"
  }).then(function (artistData) {

    console.log("Artist: " + artistData.name);
    console.log("Thumbnail: " + artistData.thumb_url);
    console.log("Facebook: " + artistData.facebook_page_url);
    console.log("Number of events: " + artistData.upcoming_event_count);
  });

  const eventQueryURL = `https://rest.bandsintown.com/artists/${keyword}/events?app_id=5e819cfc0dc5827e31d44c0ea761bf34&date=upcoming`;

  console.log("---------------\nEvent URL: " + eventQueryURL + "\n---------------");

  $.ajax({
    url: eventQueryURL,
    method: "GET"
  }).then(function (eventData) {

    for (let i = 0; i < 5; i++) {
      console.log("Event Name: " + eventData[i].title);
      console.log("Venure Name: " + eventData[i].venue.name);
      console.log("Offer Type: " + eventData[i].offers[0].type);
      console.log("Event Location: " + eventData[i].venue.location);
    }
  });

}

$("#runSearch").on("click", function (event) { // when user enters city in textbox
  event.preventDefault();

  updatePage();

});

// 5e819cfc0dc5827e31d44c0ea761bf34






// function buildQueryURL() {

//   const keyword = $("#searchBar").val().trim();

//   const queryURL = `https://rest.bandsintown.com/artists/${keyword}/events?app_id=5e819cfc0dc5827e31d44c0ea761bf34`;

//   console.log("---------------\nURL: " + queryURL + "\n---------------");

//   return queryURL;
// }

// function updatePage(eventData) {
//   console.log(eventData);
//   console.log("------------------------------------");

//   $("#place1").text();

//   $("#place2").text();

//   $("#place3").text();

//   $("#place4").text();

// }

// $("#searchBar").on("click", function (event) {
//   event.preventDefault();

//   var queryURL = buildQueryURL();

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(updatePage);
// });

// 5e819cfc0dc5827e31d44c0ea761bf34