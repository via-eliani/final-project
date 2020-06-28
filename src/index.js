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
//called from searchCity function
//obtains current temperature in C degrees
//changes display of temperature
//calls displayDate function
function changeDisplay(response) {
  let cityName = response.data.name;
  let cityHeader = document.querySelector("#the-city");
  cityHeader.innerHTML = `${cityName}`;
  let currentTemp = Math.round(response.data.main.temp);
  let theTemp = document.querySelector("#default-temp");
  theTemp.innerHTML = `${currentTemp}`;
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
}

//***END: defined functions***

//***START: calls to functions***

// W O R K  I N  P R O G R E S S
//calls function getPosition if user clicks current location button

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", getPosition());

//calls displayDate function
displayDate();
//calls searchCity function
submitCity();
