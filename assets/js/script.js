function onLoad() { // load a band on first viewing to keep layout clean
  $("#searchBar").val("gorrilaz");
  updatePage();
}

function updatePage() { // heavy lifter funcion calls primary and graph api
  const keyword = $("#searchBar").val().trim();

  const artistQueryURL = `https://rest.bandsintown.com/artists/${keyword}?app_id=5e819cfc0dc5827e31d44c0ea761bf34`;

  console.log( // api call which contains general artist info
    "---------------\nArtist URL: " + artistQueryURL + "\n---------------"
  );

  let eventAmount;

  $.ajax({
    url: artistQueryURL,
    method: "GET",
  }).then(function (artistData) { // apply info to dom
    $("#artist").text("Artist: " + artistData.name);
    $("#facebook").text("Facebook: " + artistData.facebook_page_url);
    $("#eventsAmount").text("Number of events: " + artistData.upcoming_event_count);
    $("#thumbnail").attr("src", artistData.thumb_url);

    eventAmount = artistData.upcoming_event_count;
  });

  const eventQueryURL = `https://rest.bandsintown.com/artists/${keyword}/events?app_id=5e819cfc0dc5827e31d44c0ea761bf34&date=upcoming`;

  console.log( // call info for various upcomming events
    "---------------\nEvent URL: " + eventQueryURL + "\n---------------"
  );

  $.ajax({
    url: eventQueryURL,
    method: "GET",
  }).then(function (eventData) {
    for (let i = 0; i < 6; i++) { // apply up to 5 upcoming events to document
      $(`#eventName${i}`).text("Event Name: " + eventData[i].title);
      $(`#eventDate${i}`).text("Event Date: " + eventData[i].datetime);
      $(`#venue${i}`).text("Venue Name: " + eventData[i].venue.name);
      $(`#location${i}`).text("Event Location: " + eventData[i].venue.location);
      $(`#tickets${i}`).text("Offer Type: " + eventData[i].offers[0].type);
      $(`#description${i}`).text("Description: " + eventData[i].description);
    }

    const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // array for months graph

    for (let i = 0; i < eventAmount; i++) {
      const eventMonth = eventData[i].datetime.slice(5, 7); // gets just the month from the event dates

      let arrayMonthLocation = eventMonth - 1; // used to search array

      arrayMonthLocation = parseInt(arrayMonthLocation); 

      months[arrayMonthLocation]++; // add 1 to each month a gig happens
    }

    const chartBarText = `${months[0]}%2C${months[1]}%2C${months[2]}%2C${months[3]}%2C${months[4]}%2C${months[5]}%2C${months[6]}%2C${months[7]}%2C${months[8]}%2C${months[9]}%2C${months[10]}%2C${months[11]}`;
    const chartBarSize = `${months[0]}%7C${months[1]}%7C${months[2]}%7C${months[3]}%7C${months[4]}%7C${months[5]}%7C${months[6]}%7C${months[7]}%7C${months[8]}%7C${months[9]}%7C${months[10]}%7C${months[11]}`;

    const chartQueryURL = `https://image-charts.com/chart?chbr=8&chd=t:${chartBarText}&chf=b0%2Clg%2C90%2CEA469EFF%2C1%2C03A9F47C%2C0.4&chl=${chartBarSize}&chma=0%2C0%2C10%2C10&chs=700x450&cht=bvs&chtt=Shows%20per%20month&chxl=0%3A%7CJan%7CFeb%7CMar%7CApr%7CMay%7CJun%7CJul%7CAug%7CSep%7COct%7CNov%7CDec&chxt=x%2Cy`;

    $("#graph").attr("src", chartQueryURL); // send graph to page

    console.log( // log charts url for debugging
      "---------------\nChart URL: " + chartQueryURL + "\n---------------"
    );
  });
};

$("#runSearch").on("click", function (event) { // search user input
  event.preventDefault();

  updatePage();
});

$("#searchBer").submit(function (event) {
  event.preventDefault();
});

onLoad();

// 5e819cfc0dc5827e31d44c0ea761bf34

// -----------------------

//Save button for searching

$("#buttonSubmit").submit(function (event) {
  event.preventDefault();
});
$("button").click(function (event) {
  event.preventDefault();

  function save() {
    var newData = venue;
    if (localStorage.getItem("search") === null) {
      localStorage.setItem("search", "[]");
    }
    var oldData = JSON.parse(localStorage.getItem("search"));
    oldData.push(newData);
    localStorage.setItem("search", JSON.stringify(oldData));
  }

  function view() {
    if (localStorage.getItem("search") != null) {
      const searches = JSON.parse(localStorage.getItem("search"));
      for (var i = 0; i < searches.length; i++) {
        // console.log(searches[i]);
        let searchText = searches[i];
        $("#savedHistory").append($("<li>" + searchText));
        console.log(searchText);

        // create new element with text as searches[i]
        // append that new element to #savedHistory
      }
    }
  }
  
});
