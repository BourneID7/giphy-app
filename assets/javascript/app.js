// global variables
var topics = ["tiger", "elephant", "moose", "bear", "lion", "giraffe", "penguin", "camel"]
var api_key = "QwTVLqLjS5PVmJJm44zBVjGkHEWWw0ev"

$(document).ready(function(){


    // function to add buttons from array
    function makeButton() {
        // prevent duplicate buttons
        $("#buttons").empty();

        // loop through array to create buttons & add data-name
        for (var i = 0; i < topics.length; i++) {
            var button = $('<button class="btn btn-secondary animal">');
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#buttons").append(button);

        }
    }
    makeButton();

    // create form to allow user to add their own animal button

    function makeForm() {
        var form = $('<form id="userButton">');
        var formGroup = $('<div class="form-group">');
        var label = $('<label class="user-animal">').text("Want to visit another area of the zoo? Add your own animal here.");
        var input = $('<input type="text" class="input" value="">');
        var submit = $('<button id="submit" type="submit" class="btn btn-secondary">').text("Submit");
        $("#submit").attr("disabled", false);
        form.append(formGroup);
        formGroup.append(label);
        label.append(input);
        form.append(submit);

        $("#add-button").append(form);
    }
    makeForm();

    // on click submit button add user animal from form to topics array

    $("#submit").on("click", function(event) {
        event.preventDefault();
        var userAnimal = $(".input").val().trim();
        topics.push(userAnimal);
        makeButton();
        console.log(userAnimal);
    }) 

    
    // function to get giphy image on button click
    $("body").on("click", ".animal", function() {
        // Grab and store the data-name property value from the button
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
                // Create a div for the gif
                var gifDiv = $("<div>");

                // Store the result item's rating
                var rating = results[i].rating;

                // Create a paragraph tag with the result item's rating
                var p = $('<p class="rating">').text("Rated " + rating.toUpperCase());

                // Create an image tag
                var animalImage = $('<img class="gifs">');


                // Give the image tag an src attribute of a proprrty pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("alt", animal);
                // add attributes for animate states
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still")

                // Append the paragraph and animalImage to the "gifDiv"
                gifDiv.append(p);
                gifDiv.append(animalImage);

                // make div to hold gifs
                $("#gifs").prepend(gifDiv);

                // add click listener for data-state
                $('img').on("click", function(){
                    var state = $(this).attr("data-state");

                if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
            
                })

            }

        })

    })
        
})

