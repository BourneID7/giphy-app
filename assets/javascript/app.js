// global variables
var animals = ["tiger", "elephant", "moose", "bear", "lion", "giraffe", "penguin", "camel"]
var api_key = "QwTVLqLjS5PVmJJm44zBVjGkHEWWw0ev"

$(document).ready(function(){


    // function to add buttons from array
    function makeButton() {
        // prevent duplicate buttons
        $("#buttons").empty();

        // loop through array
        for (var i = 0; i < animals.length; i++) {
            var button = $('<button class="btn btn-secondary animal">');
            button.attr("data-name", animals[i]);
            button.text(animals[i]);
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
        }).then(function(response){
            console.log(queryUrl);
            console.log(response);
        })

    })
        
})

