// global variables
var topics = ["tiger", "elephant", "moose", "bear", "lion", "giraffe", "penguin", "camel"]
var api_key = "QwTVLqLjS5PVmJJm44zBVjGkHEWWw0ev"

$(document).ready(function(){


    // function to add buttons from array
    function makeButton() {
        // prevent duplicate buttons
        $("#buttons").empty();

        // loop through array
        for (var i = 0; i < topics.length; i++) {
            var button = $('<button class="btn btn-secondary animal">');
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#buttons").append(button);
        }
    }
    makeButton();

    //
    $(".animal").on("click", function() {
        // Grabbing and storing the data-name property value from the button
        var animal = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + api_key + "&limit=10";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(queryUrl);
            console.log(response);

            // loop over each item in response data array
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                // Creating a div for the gif
                var gifDiv = $("<div>").addClass(".gifs");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rated " + rating.toUpperCase());

                // Creating an image tag
                var animalImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("alt", animal);

                // Appending the paragraph and animalImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(animalImage);

                // make div to hold gifs
                $("#gifs").prepend(gifDiv);

            }

            // // add gif rating to columns div
            // $('#gifs').prepend('<p>').text(response.data.rating);
            // // add gifs to column div
            // $('#gifs').prepend('<img src="' + response.data.images.fixed_height_still.url + ' "alt=" ' + animal + ' " /> ')
        })

    })
        
})

