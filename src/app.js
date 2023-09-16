let now = new Date();

let currentTime = document.querySelector("#dayTime");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )} </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )} </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let cityElement = document.querySelector("#city");
  searchCity(searchInput.value);
}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", displayCity);

function searchCity(city) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

//let cityInput = document.querySelector("#inputCity");

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let temp = document.querySelector("#temp");
  temp.innerHTML = temperature;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  console.log(response.data);
  let humidity = response.data.main.humidity;
  let hum = document.querySelector("#hum");
  hum.innerHTML = humidity;
  let weather = response.data.weather[0].description;
  let weatherStatus = document.querySelector("#type");
  weatherStatus.innerHTML = weather;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#speed");
  windSpeed.innerHTML = wind;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function showMyWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `1fd8093fa5ff12d796d7de756cc9d6b9`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#current-location-btn");
button.addEventListener("click", showMyWeather);

function convert(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convert);

function convertBack(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertBack);
let celsiusTemperature = null;

searchCity("Vienna");
