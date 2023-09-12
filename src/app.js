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

function convert(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convert);

function convertBack(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "21";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertBack);

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
  let temperature = Math.round(response.data.main.temp);
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
