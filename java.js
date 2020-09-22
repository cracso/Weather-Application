$(document).ready(function () {

  var cityArray = [];

  // oneday
  function oneDay(city) {

    //var movie = $(this).attr("data-name");
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=97de0a78d9f9021f82b145118fb67e24";
    console.log(queryURL);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {


      console.log(response.coord.lat)
      console.log(response.coord.lon);

      var lon = (response.coord.lon);
      var lat = (response.coord.lat);

      var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=97de0a78d9f9021f82b145118fb67e24&lat=" + lat + "&lon=" + lon + "";
      console.log(uvUrl);
      $.ajax({
        url: uvUrl,
        method: "GET"
      }).then(function (uvObj) {
        console.log(uvObj.value);
      });


    });

  }

  function fiveday(city) {
    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
    var fivedayurl = "http://api.openweathermap.org/data/2.5/forecast?q" + city + "&appid=97de0a78d9f9021f82b145118fb67e24";
    console.log(fivedayurl);
    $.ajax({
      url: fivedayurl,
      method: "GET"
    }).then(function (fivedayurl) {
      for (var i = 0; i < 5; i++) {
        console.log(fivedayurl.list[i * 8].main.temp);
        console.log(moment(fivedayurl.list[i * 8].dt_txt).format('l'));
        console.log(fivedayurl.list[i * 8].main.humidity);
        console.log(fivedayurl.list[i * 8].weather[0].icon);
      }
    });
  }
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < cityArray.length; i++) {
      var a = $("<button>");
      a.addClass("weather-btn");
      a.attr("data-name", cityArray[i]);
      a.text(cityArray[i]);
      $("#buttons-view").append(a);
    }
  }

  $(".Search").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var city = $("#weather-input").val().trim();
   
    fiveday(city);
    oneDay(city);
    cityArray.push(cityArray);
    
    // // Calling renderButtons which handles the processing of our movie array
    renderButtons();   
     console.log(cityArray);
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  //   $(document).on("click", ".movie-btn", displayMovieInfo);
});
  // Calling the renderButtons function to display the initial buttons
  // renderButtons();
  // oneDay();
  // fiveday();
