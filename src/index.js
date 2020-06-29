//***START: defined functions***

/*displayDate function
-- called from "main" function or changeDisplay function
-- defines day, hour, minutes, and time
-- changes HTML to display day and time*/
function displayDate() {
  let now = new Date();
  //array of days of the week
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //local variables
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let time = document.querySelector("#current-time");
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = document.querySelector("#the-day");
  //innerHTML changes
  time.innerHTML = `${hour}:${minutes}`; //changes display of time
  today.innerHTML = `${day}`; //changes display of day
}
/*submitCity function
-- obtains user input
-- calls searchCity within addEventListener*/
function submitCity() {
  //query Selectors
  let search = document.querySelector("#search-city");

  search.addEventListener("submit", searchCity);
}
/*searchCity function
-- called from addEventListener
-- obtains user input
-- connects to Weather API
-- calls changeDisplay function
-- calls retruieveHourly function*/
function searchCity(event) {
  event.preventDefault();
  //query Selectors
  let inputCity = document.querySelector("#input-city");
  //local variables
  let theCity = inputCity.value;
  let apiKey = `f655251e7aa74c3031f8eb126912bec6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${theCity}&appid=${apiKey}&units=metric`;
  //connects to weatherAPI
  axios.get(apiUrl).then(changeDisplay);
}
/*changeDisplay function
-- called from searchCity function or getTemp function
-- obtains current temperature in C degrees
-- calls displayDate function
-- calls retrieveHourly function*/
function changeDisplay(response) {
  fahrenheitLink.classList.remove("active"); //removes active class in HTML
  celsiusLink.classList.add("active"); //adds active class in HTML
  //local variables
  let cityName = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  //global variables
  celsiusTemp = Math.round(response.data.main.temp); //redefines global variable of celsiusTemp
  cityWind = Math.round(response.data.wind.speed); //redefines global variable of cityWind
  //query selectors
  let cityHeader = document.querySelector("#the-city");
  let theTemp = document.querySelector("#the-temperature");
  let theHumidity = document.querySelector("#the-humidity");
  let theWindSpeed = document.querySelector("#wind-speed");
  //innerHTML changes
  cityHeader.innerHTML = `${cityName}`; //changes display of city
  theTemp.innerHTML = `${currentTemp}`; //changes display of temperature
  theHumidity.innerHTML = `${humidity}`; //changes display of humidity
  theWindSpeed.innerHTML = `${wind}`; //changes display of wind speed
  //call to displayDate function
  displayDate();
  //call to retrieveHourly function
  retrieveHourly(response.data.name);
}
/*retrieveHourly function
-- receives a parameter
-- connects to weather API 
-- calls displayHourly function*/
function retrieveHourly(city) {
  let apiKey = `f655251e7aa74c3031f8eb126912bec6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourly);
}
function displayHourly(response) {
  //local variables
  let forecast = null;
  //query selectors
  let hourlyElement = document.querySelector("#hourly");
  //innerHTML changes
  hourlyElement.innerHTML = null;
  //for loop that displays the hourly forecast
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    hourlyElement.innerHTML += `
  <div class="col-2 hours">
      <h4 class="times"> ${formatTime(forecast.dt * 1000)} </h4>
        <img class="hourlyIcon" src= "http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png">
          <br>
      <span class="highLow"><strong>${Math.round(
        forecast.main.temp_max
      )}°</strong>/${Math.round(forecast.main.temp_min)}°</span>
  </div>`;
  }
}
/*formatTime function
-- called from displayHourly function
-- receives timestamp parameter 
-- reformats the time from dt to hours and minutes
-- returns the proper time */
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}
/*getPosition function
-- called from "main" function or by addEventListener
-- obtains position of user
-- calls getCoordinates function*/
function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}
/*getCoordinates function
-- called by getPosition function
-- obtains latitude and longitude of user*/
function getCoordinates(position) {
  //local variables
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  //call to getTemp function
  getTemp(lat, lon);
}
/*getTemp function
-- called by getCoordinated function
-- retrieves two parameters
-- finds user location with latitude and longitude
-- calls changeDisplay function*/
function getTemp(lat, lon) {
  //local variables
  let apiKey = `f655251e7aa74c3031f8eb126912bec6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  //connects to weather API
  axios.get(apiUrl).then(changeDisplay);
}
/*displayImperial function
-- called by addEventListener
-- converts units from metric to imperial
-- changes display of info*/
function displayImperial(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active"); //removes active class in HTML
  fahrenheitLink.classList.add("active"); //adds active class in HTML
  //local variables variables
  let fTemp = (celsiusTemp * 9) / 5 + 32; //unit conversion from celsius to fahrenheit
  //query selectors
  let temperature = document.querySelector("#the-temperature");
  let wind = document.querySelector("#wind-speed");
  let unit = document.querySelector("#wind-unit");
  //innerHTML chagnes
  temperature.innerHTML = Math.round(fTemp); //changes display of temperature
  wind.innerHTML = Math.round(cityWind / 1.609); //changes display of wind speed
  unit.innerHTML = `mph`; //changes display of wind speed units
}
/*displayMetric function
-- called by addEventListener
-- converts units from imperial to metric
-- changes display of info*/
function displayMetric(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active"); //removes active class in HTML
  celsiusLink.classList.add("active"); //adds active class in HTML
  //query selectors
  let temperature = document.querySelector("#the-temperature");
  let wind = document.querySelector("#wind-speed");
  let unit = document.querySelector("#wind-unit");
  //innerHTML changes
  temperature.innerHTML = celsiusTemp; //changes display of temperature
  wind.innerHTML = cityWind; //changes display of wind speed
  unit.innerHTML = `km/h`; //changes display of wind speed units
}
//***END: defined functions***

//global variables
let cityWind = null;
let celsiusTemp = null;
//query selectors
let currentLocation = document.querySelector("#location"); //initializes currentLocation to the button in HTML
let fahrenheitLink = document.querySelector("#fahrenheit-link"); //initializes fahrenheitLink to the link in HTML
let celsiusLink = document.querySelector("#celsius-link"); //initializes celsiusLink to the link in HTML
//addEventListeners
currentLocation.addEventListener("click", getPosition); //calls function getPosition if user clicks current location button
fahrenheitLink.addEventListener("click", displayImperial); //calls displayImperial function if user clicks fahrenheit
celsiusLink.addEventListener("click", displayMetric); //calls displayMetric function if user clicks celsius
//call to getPosition function
getPosition();
//call to displayDate function
displayDate();
//call to searchCity function
submitCity();
