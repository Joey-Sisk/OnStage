function updatePage() {
  const keyword = $("#searchBar").val().trim();

  const artistQueryURL = `https://rest.bandsintown.com/artists/${keyword}?app_id=5e819cfc0dc5827e31d44c0ea761bf34`;

  console.log(
    "---------------\nArtist URL: " + artistQueryURL + "\n---------------"
  );

  let eventAmount;

  $.ajax({
    url: artistQueryURL,
    method: "GET",
  }).then(function (artistData) {
    console.log("Artist: " + artistData.name);
    console.log("Thumbnail: " + artistData.thumb_url);
    console.log("Facebook: " + artistData.facebook_page_url);
    console.log("Number of events: " + artistData.upcoming_event_count);

    eventAmount = artistData.upcoming_event_count;
  });

  const eventQueryURL = `https://rest.bandsintown.com/artists/${keyword}/events?app_id=5e819cfc0dc5827e31d44c0ea761bf34&date=upcoming`;

  console.log(
    "---------------\nEvent URL: " + eventQueryURL + "\n---------------"
  );

  $.ajax({
    url: eventQueryURL,
    method: "GET",
  }).then(function (eventData) {
    for (let i = 0; i < 5; i++) {
      console.log("-------------------------------");
      console.log("Event Name: " + eventData[i].title);
      console.log("Event Date: " + eventData[i].datetime);
      console.log("Venure Name: " + eventData[i].venue.name);
      console.log("Offer Type: " + eventData[i].offers[0].type);
      console.log("Event Location: " + eventData[i].venue.location);
      console.log("Longitude: " + eventData[i].venue.longitude);
      console.log("Latitude: " + eventData[i].venue.latitude);
      console.log("-------------------------------");
    }

    const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const chartBarText = "22%2C2%2C3%2C9%2C15%2C2%2C7%2C3%2C13%2C14%2C4";
    const chartBarSize = "22%7C2%7C3%7C9%7C15%7C2%7C7%7C3%7C13%7C14%7C4";

    const chartQueryURL = `https://image-charts.com/chart?chbr=8&chd=t:${chartBarText}&chl=${chartBarSize}&chma=0%2C0%2C10%2C10&chs=700x450&cht=bvs&chtt=Shows%20per%20month&chxl=0%3A%7CJan%7CFeb%7CMar%7CApr%7CMay%7CJun%7CJul%7CAug%7CSep%7CNov%7CDec&chxt=x%2Cy`;

    console.log(
      "---------------\nChart URL: " + chartQueryURL + "\n---------------"
    );

    $.ajax({
      url: chartQueryURL,
      method: "GET",
    }).then(function () {
      for (let i = 0; i < eventAmount; i++) {
        const eventMonth = eventData[i].datetime.slice(5, 7);
        console.log("Every Event Month: " + eventMonth);

        let correctedMonth = eventMonth - 1;

        console.log(
          "---------------\nEvent Month: " +
            eventMonth +
            "Corrected Motnh: " +
            correctedMonth +
            "\n---------------"
        );

        let whatMonth = months[correctedMonth];

        months.splice(correctedMonth, whatMonth, whatMonth++);
      }
      console.log(
        "---------------\nAdded Months: " + months + "\n---------------"
      );
    });
  });
}

$("#runSearch").on("click", function (event) {
  event.preventDefault();

  updatePage();
});

$("#searchBer").submit(function (event) {
  event.preventDefault();
});

// 5e819cfc0dc5827e31d44c0ea761bf34

// -----------------------

//Save button for searching

$('#buttonSubmit').submit(function (event) {
    event.preventDefault();
})
$('button').click(function (event) {
	event.preventDefault();

	function save() {
		var newData = venue;
		if (localStorage.getItem('search') === null) {
			localStorage.setItem('search', '[]');
		}
		var oldData = JSON.parse(localStorage.getItem('search'));
		oldData.push(newData);
		localStorage.setItem('search', JSON.stringify(oldData));
	}

	function view() {
		if (localStorage.getItem('search') != null) {
			const searches = JSON.parse(localStorage.getItem('search'));
			for (var i = 0; i < searches.length; i++) {
				// console.log(searches[i]);
                let searchText = searches[i];
              $('#savedHistory').append($('<li>'+searchText))
                console.log(searchText);
                
				// create new element with text as searches[i]
				// append that new element to #savedHistory
			}
		}
    }
});
