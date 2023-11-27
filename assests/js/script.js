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
    var apiURl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

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
};

var displayWeather = function(weatherData, cityName) {
    var currentHeader = document.createElement('div');
    currentHeader.classList.add("current-header");

    var cityEntered = document.createElement ('h2');
    cityEntered.textContent = cityName;
    currentHeader.appendChild(cityEntered);

    var todaysDate = document.createElement('h4');
    todaysDate.textContent = "(" + new Date().toDateString() + ")";
    currentHeader.appendChild(todaysDate);

    currentWeatherEl.appendChild(currentHeader);

    var forecast = weatherData.list[0];

    var todaysTemp = document.createElement('p');
    todaysTemp.textContent = "Temp: " + forecast.main.temp + "°F";
    currentWeatherEl.appendChild(todaysTemp);

    var todaysWind = document.createElement('p');
    todaysWind.textContent = "Wind: " + forecast.wind.speed + " MPH";
    currentWeatherEl.appendChild(todaysWind);

    var todaysHumid = document.createElement('p');
    todaysHumid.textContent = "Humidity: " + forecast.main.humidity + "%";
    currentWeatherEl.appendChild(todaysHumid);

    currentWeatherEl.style.display = "block";

    for (var i = 0; i < weatherData.list.length; i += 8) {
        var forecast = weatherData.list[i];
        
        var forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        var dateForecast = document.createElement('h4');
        dateForecast.textContent = new Date(forecast.dt_txt).toLocaleDateString();
        forecastCard.appendChild(dateForecast);

        var tempForecast = document.createElement('p');
        tempForecast.textContent = "Temp: " + forecast.main.temp + "°F";
        forecastCard.appendChild(tempForecast);

        var windForecast = document.createElement('p');
        windForecast.textContent = "Wind: " + forecast.wind.speed + "MPH'";
        forecastCard.appendChild(windForecast);

        var humidForecast = document.createElement('p');
        humidForecast.textContent = "Humidity: " + forecast.main.humidity + "%";
        forecastCard.appendChild(humidForecast);

        forecastCardsEl.appendChild(forecastCard);
    }

}

cityFormEl.addEventListener('submit', citySubmitHandler);
