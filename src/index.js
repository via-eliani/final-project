//***START: defined functions***

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
  let date = now.getDate();
  let month = months[now.getMonth()];
  //display of time
  let time = document.querySelector("#current-time");
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${hour}:${minutes}`;
  //diplay of day
  let today = document.querySelector("#the-day");
  today.innerHTML = `${day}`;
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
//changes display of temperature
//changes display of humidity
//changes display of wind
//calls displayDate function
function changeDisplay(response) {
  let cityName = response.data.name;
  let cityHeader = document.querySelector("#the-city");
  cityHeader.innerHTML = `${cityName}`;
  let currentTemp = Math.round(response.data.main.temp);
  let theTemp = document.querySelector("#default-temp");
  theTemp.innerHTML = `${currentTemp}`;
  let humidity = response.data.main.humidity;
  let theHumidity = document.querySelector("#the-humidity");
  theHumidity.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let theWindSpeed = document.querySelector("#wind-speed");
  theWindSpeed.innerHTML = `${wind}`;
  displayDate();
}
//called by addEventListener
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
//***END: defined functions***

//***START: calls to functions***

//calls getPosition function
getPosition();
//calls displayDate function
displayDate();
//calls searchCity function
submitCity();
//initializes currentLocation to the button in HTML
let currentLocation = document.querySelector("#location");
//calls function getPosition if user clicks current location button
currentLocation.addEventListener("click", getPosition);
