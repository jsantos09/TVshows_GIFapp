$(document).ready(function () {

  // initial show array and variables
  var shows = ["Rick and Morty", "Dragon Ball Super", "Mythbusters", "That 70s show", "Game of Thrones", "Sharkweek"];
  var myBtn;

  // function to display buttons on the page
  function renderButtons() {
    $("#gif-buttons").empty();
    // for each function
    shows.forEach(function (show) {

      // add attr and class to each button
      myBtn = $("<button>");
      myBtn.addClass("show");
      myBtn.attr("data-name", show);
      myBtn.attr("state", "not clicked");
      myBtn.text(show);
      $("#gif-buttons").append(myBtn);
    });
  };

  // function to change button state
    var changeBtnState = function() {
      var btnState = $(".show").attr("state");
      if (btnState === "not clicked") {
        btnState = "clicked";

      }
      else {
        btnState = "not clicked"
      }
    };
  // when the user clicks "search"
  $("#add-show").on('click', function (newBtn) {
    newBtn.preventDefault();
    var userShow = $("#show-input").val().trim();
    shows.push(userShow);
    renderButtons();
  });

  //  AXIOS request
  var axiosReq = function () {

    changeBtnState();

    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show
      + "&api_key=cOSkgcLNojXHVtbPvFlIn1Kw4KxqmaW5&limit=10";

    axios({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {

        var resultsDiv = $("#gif-results");
        resultsDiv.empty();
        var result = response.data.data;

        // for loop to manipulate and display data
        for (var i = 0; i < 10; i++) {

          // html tags variables
          var gifDiv = $("<div>");
          var gifImg = $("<img>");
          var ratingText = $("<p>");

          // data variables
          var rating = result[i].rating;
          var imgStillURL = result[i].images.fixed_height_still.url;
          var imgAnimateURL = result[i].images.fixed_height.url;

          // add attr, class and src to img
          gifImg.attr("data-still", imgStillURL);
          gifImg.attr("data-animate", imgAnimateURL);
          gifImg.attr("data-state", "still");
          gifImg.addClass("gif");

          gifImg.attr("src", $(gifImg).attr("data-still"));

          // set text and display rating + img
          ratingText.text("Rating " + rating);
          gifDiv.prepend(ratingText);
          gifDiv.prepend(gifImg);

          $(resultsDiv).prepend(gifDiv);
        }

      });
  };


  // function to animate gifs
  var animateGifs = function () {

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
  $(document).on("click", ".show", axiosReq);
  $(document).on("click", ".gif", animateGifs);

});