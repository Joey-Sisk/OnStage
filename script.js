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
}



    