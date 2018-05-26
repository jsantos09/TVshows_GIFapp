$(document).ready(function () {

  // initial show array
  var shows = ["Rick and Morty", "Dragon Ball Super", "Mythbusters", "That 70s show", "Game of Thrones", "El Chavo del 8"]

  // function to display buttons on the page
  function renderButtons() {
    $("#gif-buttons").empty();
    shows.forEach(function (show) {
      var myBtn = $("<button>");
      myBtn.addClass("show");
      myBtn.attr("data-name", show);
      myBtn.text(show);
      $("#gif-buttons").append(myBtn);
    });
  };

  // when the user clicks "search"
  $("#add-show").on('click', function (newBtn) {
    newBtn.preventDefault();
    var userShow = $("#show-input").val().trim();
    shows.push(userShow);
    renderButtons();
  });

  // function to display images
  function displayGifs() {

    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show
      + "&api_key=cOSkgcLNojXHVtbPvFlIn1Kw4KxqmaW5&limit=10";

    axios({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var gifData = response.data.data;
        console.log(gifData);
        var gifDiv = $("#gif-results");
        gifDiv.empty();


        for (var i = 0; i < 11; i++) {
          // create image and rating tags
          var gifImg = $("<img>");
          var ratingP = $("<p>").text("Rating " + gifData[i].rating)
          // add attr and class to img
          gifImg.attr("data-still", gifData[i].images.fixed_height_still.url);
          gifImg.attr("data-animate", gifData[i].images.fixed_height.url)
          gifImg.attr("data-state", "still");
          gifImg.addClass("gif");

          gifImg.attr("src", $(gifImg).attr("data-still"));
          //display gif + rating on page
          gifDiv.prepend(ratingP);
          gifDiv.prepend(gifImg);
        }

      });
  };

  // function to animate gifs
  var animateGifs = function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    };
  };

  renderButtons();
  $(document).on("click", ".show", displayGifs);
  $(document).on("click", ".gif", animateGifs);

});