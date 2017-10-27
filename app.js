
$(document).ready(function() {
    //function to display items from array as buttons in panel heading

    var searchGifs = {
        listAnimals: ["cat", "dog", "bear", "moose", "otter"],
        createButtons: function() {
            for (var i = 0; i < searchGifs.listAnimals.length; i++) {
                var newBttn = $('<button>');
                newBttn.attr("data-animal", searchGifs.listAnimals[i]);
                newBttn.addClass("btn");
                newBttn.addClass("searchButtons");
                newBttn.text(searchGifs.listAnimals[i]);
                $('.panel-heading').append(newBttn);
            }
        },


//function to add items from search bar to array
    addSearchTerms: function(e){
        e.preventDefault();
        var userTerm = $(".form-control").val();

            if (searchGifs.listAnimals.indexOf(userTerm) < 0 && userTerm.length > 0) {
                searchGifs.listAnimals.push(userTerm);
                var newBttn = $('<button>');
                newBttn.attr("data-animal", userTerm);
                newBttn.addClass("btn");
                newBttn.addClass("searchButtons");
                newBttn.text(userTerm);
                $('.panel-heading').append(newBttn);
            }
    },

    displayResults: function(e){
        $(".panel-body").empty();
        e.preventDefault();

            var userQuery = $(this).data('animal');
            var key = "&api_key=dc6zaTOxFJmzC";
            var limit = "&limit=10"
            var reqUrl = "https://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;

            $.ajax({
                url: reqUrl,
                method: "GET"
            }).done(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var gifContain = $('<div>');
                    gifContain.addClass('gifContainer');
                    var animateLink = response.data[i].images["fixed_height"].url;
                    var stillLink = response.data[i].images["fixed_height_still"].url;
                    var rating = response.data[i].rating;
                    console.log(rating);
                    var ratingSpan = $('<p>');
                    ratingSpan.addClass('gifRating');
                    ratingSpan.text("Rating: " + rating);
                    var newImg = $('<img>');
                    newImg.attr('src', stillLink);
                    newImg.attr('data-animate', animateLink);
                    newImg.attr('data-still', stillLink);
                    newImg.attr('data-state', "still")
                    newImg.addClass('gif');
                    gifContain.prepend(ratingSpan);
                    gifContain.prepend(newImg);

                    $('.panel-body').prepend(gifContain);
                }

                $('.gif').on("click touch", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr('src', $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr('src', $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
        },

       } 

    searchGifs.createButtons();


    $('#search').on('click touch', searchGifs.addSearchTerms);
    $(document).on('click touch', '.searchButtons', searchGifs.displayResults);

 });   