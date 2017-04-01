var states = ["North Carolina", "Utah", "Maine", "Texas", "Oregon"];

//displayGif();

function displayGif() {

	var state = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + state + "&limit=10&api_key=dc6zaTOxFJmzC";

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

			console.log(response);

		for (var i = 0; i < response.data.length; i++) {

			var gifURL = response.data[i].images.fixed_height_still.url;

			var gifDiv = $("<div></div>");
			
			var gifImg = $("<img class='gifs'></img>");

				gifImg.attr("src", gifURL);

				gifImg.attr("data-still", gifURL);

				gifImg.attr("data-animate", response.data[i].images.fixed_height.url);

				gifImg.attr("data-state", "still");

			var rating = response.data[i].rating;

			var ratingLine = $("<p>").text("Rating: " + rating);

				gifDiv.prepend(gifImg);

				gifDiv.prepend(ratingLine);

			$("#gifView").prepend(gifDiv);

    }

    $(".gifs").on("click", function() {
    	var currentState = $(this).attr("data-state");

    	if (currentState === "still") {
    		$(this).attr("src", $(this).attr("data-animate"));
    		$(this).attr("data-state", "animate");
    	} else {
    		$(this).attr("src", $(this).attr("data-still"));
    		$(this).attr("data-state", "still");
    	}
		});
	});
}

function makeButtons() {
	$("#buttonsNav").empty();

	for (var i = 0; i < states.length; i++) {
		var b = $("<button>");
		b.addClass("state btn btn-primary");
		b.attr("data-name", states[i]);
		b.text(states[i]);
		$("#buttonsNav").append(b);
	}
}

$("#add").on("click", function(event) {
	event.preventDefault();

	var state = $("#userInput").val().trim();

	// for (var i = 0; i < states.length; i++) {

	// 	if ($("#userInput") === states[i]) {
	// 		alert("You already added that state!");
	// 	} else if ($("#userInput") !=== states[i]) {
	// 		states.push(state);
	// 	}
	// }

	states.push(state);
	
	console.log(states);

	makeButtons();

	$("#userInput").reset();

});

$(document).on("click", ".state", displayGif);

makeButtons();