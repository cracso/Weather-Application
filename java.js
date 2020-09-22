$(document).ready(function () {


  let appID = "97de0a78d9f9021f82b145118fb67e24";
  let weather = "";
  let cityArray = "";
  let current_date = moment().format("L");


  let searchHistory = JSON.parse(localStorage.getItem("cities")) === null ? [] : JSON.parse(localStorage.getItem("cities"));

  showSearchHistory();
  function currentWeather() {
    if ($(this).attr("id") === "submit-city") {
      cityArray = $("#city").val();
    } else {
      cityArray = $(this).text();
    }
    weather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityArray + "&APPID=" + appID;
    if (searchHistory.indexOf(cityArray) === -1) {
      searchHistory.push(cityArray);
    }
    localStorage.setItem("cities", JSON.stringify(searchHistory));
    $.getJSON(weather, function (json) {
      let temp = (json.main.temp - 273.15) * (9 / 5) + 32;
      let windspeed = json.wind.speed * 2.237;
      $("#current-city").text(json.name + " " + current_date);
      $("#weather-img").attr("src", "https://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
      $("#temperature").text(temp.toFixed(2) + "°F");
      $("#humidity").text(json.main.humidity + "%");
      $("#windspeed").text(windspeed.toFixed(2) + " " + "mph");
    });
  }

  function fiveDayforecast() {
    let fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityArray + ",us&APPID=" + appID;
    let dayCount = 1;
    $.ajax({
      url: fiveDay,
      method: "GET"
    }).then(function (response) {
      for (let i = 0; i < response.list.length; i++) {
        let dateAndTime = response.list[i].dt_txt;
        let date = dateAndTime.split(" ")[0];
        let time = dateAndTime.split(" ")[1];
        if (time === "15:00:00") {
          let year = date.split("-")[0];
          let month = date.split("-")[1];
          let day = date.split("-")[2];
          $("#day-" + dayCount).children(".card-date").text(month + "/" + day + "/" + year);
          $("#day-" + dayCount).children(".weather-icon").attr("src", "https://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
          $("#day-" + dayCount).children(".weather-temp").text("Temp: " + ((response.list[i].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "°F");
          $("#day-" + dayCount).children(".weather-humidity").text("Humidity: " + response.list[i].main.humidity + "%");
          dayCount++;
        }
      }
    });
  }

  function showSearchHistory() {
    $("#search-history").empty();
    searchHistory.forEach(function (city) {
      let history_item = $("<li>");
      history_item.addClass("list-group-item btn btn-light");
      history_item.text(city);
      $("#search-history").prepend(history_item);
    });
    $(".btn").click(currentWeather);
    $(".btn").click(fiveDayforecast);
  }

  function clearHistory() {
    $("#search-history").empty();
    searchHistory = [];
    localStorage.setItem("cities", JSON.stringify(searchHistory));
  }
  $("#clear-history").click(clearHistory);
  $("#submit-city").click(showSearchHistory);
});
