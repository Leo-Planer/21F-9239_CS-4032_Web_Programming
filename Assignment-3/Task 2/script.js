$(document).ready(function () {
  $("#search-btn").click(function () {
    var city = $("#city-input").val();
    var apiKey = "API https://openweathermap.org/api/";
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric";

    $.ajax({
      url: apiUrl,
      method: "GET",
      success: function (data) {
        displayWeather(data);
      },
      error: function (xhr, status, error) {
        console.log("Error:", error);
      },
    });
  });

  function displayWeather(data) {
    var weatherInfo = $("#weather-info");
    weatherInfo.empty();

    var cityName = $("<h2>").text(data.name);
    var currentTemp = $("<p>").text(
      "Current Temperature: " + data.main.temp + "°C"
    );
    var weatherDesc = $("<p>").text("Weather: " + data.weather[0].description);

    weatherInfo.append(cityName, currentTemp, weatherDesc);
  }
});
