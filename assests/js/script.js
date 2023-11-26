var cityFormEl = document.querySelector("#user-city");
var currentWeatherEl = document.querySelector("#currentweather");
var forecastCardsEl = document.querySelector("#forecastcards");

var citySubmitHandler = function (event) {
    event.preventDefault();
    var cityName = document.querySelector("#city").value.trim();

    if (cityName) {
        getWeatherData(cityName);
        currentWeatherEl.textContent = "";
        forecastCardsEl.textContent = "";
    }
};

var getWeatherData  = function (cityName) {
    var apiURl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=fad8ad47e93c490afb3a455a487c8ce0";

    fetch(apiURl)
     .then(function(response){
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeather(data, cityName);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
     });
}

var displayWeather = function(weatherData, cityName) {
    var cityHeader = document.createElement ('h2');
    cityHeader.textContent = cityName;
    currentWeatherEl.appendChild(cityHeader);
}

cityFormEl.addEventListener('submit', citySubmitHandler);
