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
    var apiKey = "fad8ad47e93c490afb3a455a487c8ce0"
    var apiURl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

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
    var cityEntered = document.createElement ('h2');
    cityEntered.textContent = cityName;
    currentWeatherEl.appendChild(cityEntered);

    var todaysDate = document.createElement('h2');
    todaysDate.textContent = "(" + new Date().toDateString() + ")";
    currentWeatherEl.appendChild(todaysDate);

    var forecast = weatherData.list[0];

    var todaysTemp = document.createElement('h3');
    var todaysTempF = (forecast.main.temp - 273.15) * 9/5 + 32;
    todaysTemp.textContent = "Temp: " + todaysTempF.toFixed(2) + "°F";
    currentWeatherEl.appendChild(todaysTemp);

    var todaysWind = document.createElement('h3');
    todaysWind.textContent = "Wind: " + forecast.wind.speed + " MPH";
    currentWeatherEl.appendChild(todaysWind);

    var todaysHumid = document.createElement('h3');
    todaysHumid.textContent = "Humidity: " + forecast.main.humidity + "%";
    currentWeatherEl.appendChild(todaysHumid);

}

cityFormEl.addEventListener('submit', citySubmitHandler);
