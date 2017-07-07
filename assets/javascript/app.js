// Initial array of characters
var characters = ["Bart", "Homer", "Lisa", "Maggie", "Marge"];

// Function for displaying character data
function renderButtons() {

        // Deletes the character buttons prior to adding new ones
        // (this is necessary otherwise you will have repeat buttons)
        $(".buttons").empty();
        // Loops through the array of movies
        for (var i = 0; i < characters.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("character gifBtn btn btn-primary");
          // Added a data-attribute
          a.attr("data-name", characters[i]);
          // Provided the initial button text
          a.text(characters[i]);
          // Added the button to the buttons-view div
          $(".buttons").append(a);
      }
  }

// This function handles events where the add movie button is clicked
$("#add-character").on("click", function(event) {
	event.preventDefault();
	// This line of code will grab the input from the textbox
	var character = $("#character-input").val().trim();

	// The movie from the textbox is then added to our array
	characters.push(character);

	// Calling renderButtons which handles the processing of our movie array
	renderButtons();

	// Empty add field
	$("#character-input").val("");
});

function gifClicked() {

	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
	var state = $(this).attr("data-state");
	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}

}    

// displaySimpsonGifs function re-renders the HTML to display the appropriate content
function displaySimpsonGifs() {

	var character = $(this).attr("data-name");
	character = character.split(' ').join('+');
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=e792d63653784d42a552c8b39f9f4dbe&q=simpsons+"
	 + character + "&limit=10&offset=0&rating=G&lang=en";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {


    	$(".gifs").empty();
    	for(i=0;i<10;i++){
          // Creates a div to hold the gif
          var newDiv = $("<div>");
/*          newDiv.attr('width', response.data[i].images.downsized.width+'px');
          newDiv.attr('height', response.data[i].images.downsized.height+'px');
          newDiv.attr('position', 'relative');
*/
          // Creates an element to hold the image
          var newImageDiv = $("<img>");
          newImageDiv.addClass('gif img-responsive');

 /*         //Creates an element to display the rating
          var p = $("<p>");
          p.text("Rating: " + response.data[i].rating);
          p.attr('float', 'left');
          p.attr('position', 'absolute');
          p.attr('left', '0px');
          p.attr('top', '0px');
*/

          // Appends the image
          newImageDiv.attr('src', response.data[i].images.downsized_still.url);
          newImageDiv.attr('data-still', response.data[i].images.downsized_still.url);
          newImageDiv.attr('data-animate', response.data[i].images.downsized.url);
          newImageDiv.attr('data-state', 'still');

 //         newDiv.append(p);
          newDiv.append(newImageDiv);


          //Add current gif to beginning of gifs div         
          $(".gifs").prepend(newDiv);        		
      }


  });
}

// Adding click event listeners to all elements with a class of "character" and class of "gif"
$(document).on("click", ".character", displaySimpsonGifs);
$(document).on("click", ".gif", gifClicked);

renderButtons();
