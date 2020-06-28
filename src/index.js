//***START: defined functions***

//called from "main" function or changeDisplay function
//defines day, hour, minutes, and time
//changes HTML to display day and time
function displayDate() {
  let now = new Date();
  //array of days of the week
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //array of months of the year
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //current date, hour + minutes, and month
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let time = document.querySelector("#current-time");
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = document.querySelector("#the-day");
  time.innerHTML = `${hour}:${minutes}`; //changes display of time
  today.innerHTML = `${day}`; //changes display of day
}
//obtains user input
//calls searchCity within addEventListener
function submitCity() {
  let search = document.querySelector("#search-city");
  search.addEventListener("submit", searchCity);
}
//called from addEventListener
//obtains user input
//connects to Weather API
//calls changeDisplay function
function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let apiKey = `f655251e7aa74c3031f8eb126912bec6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeDisplay);
}
//called from searchCity function or getTemp function
//obtains current temperature in C degrees
//calls displayDate function
function changeDisplay(response) {
  let cityName = response.data.name;
  let cityHeader = document.querySelector("#the-city");
  let currentTemp = Math.round(response.data.main.temp);
  let theTemp = document.querySelector("#the-temperature");
  let humidity = response.data.main.humidity;
  let theHumidity = document.querySelector("#the-humidity");
  let wind = Math.round(response.data.wind.speed);
  let theWindSpeed = document.querySelector("#wind-speed");

  celsiusTemp = Math.round(response.data.main.temp);

  cityHeader.innerHTML = `${cityName}`; //changes display of city
  theTemp.innerHTML = `${currentTemp}`; //changes display of temperature
  theHumidity.innerHTML = `${humidity}`; //changes display of humidity
  theWindSpeed.innerHTML = `${wind}`; //changes display of wind speed

  displayDate();
}
//called from "main" function or by addEventListener
//obtains position of user
//calls getCoordinates function
function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}
//called by getPosition function
//obtains latitude and longitude of user
function getCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  getTemp(lat, lon);
}
//called by getCoordinated function
//retrieves two parameters
//finds user location with latitude and longitude
//calls changeDisplay function
function getTemp(lat, lon) {
  let apiKey = `f655251e7aa74c3031f8eb126912bec6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeDisplay);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fTemp = (celsiusTemp * 9) / 5 + 32;
  let temperature = document.querySelector("#the-temperature");

  temperature.innerHTML = Math.round(fTemp);
}
//***END: defined functions***

//***START: calls to functions***

let celsiusTemp = null;
//initializes currentLocation to the button in HTML
let currentLocation = document.querySelector("#location");
//calls function getPosition if user clicks current location button
currentLocation.addEventListener("click", getPosition);
//initializes fahrenheitLink to the link in HTML
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
//calls getPosition function
getPosition();
//calls displayDate function
displayDate();
//calls searchCity function
submitCity();
