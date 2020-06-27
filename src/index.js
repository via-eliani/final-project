//***START: defined functions***

//defines day, hour, minutes, and time
//changes HTML to display day and time
function displayDate() {
  let now = new Date();
  //array of days of the week
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //array of months of the year
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //current date and times
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  //changing display of day
  let today = document.querySelector("#current-day");
  today.innerHTML = `${day}`;
  //changing display of time
  let time = document.querySelector("#current-time");
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  time.innerHTML = `${hour}:${minutes}`;
  //changing display of date
  let date = now.getDate();
  let theDate = document.querySelector("#the-date");
  theDate.innerHTML = `${date}`;
  //changing display of month
  let month = months[now.getMonth()];
  let theMonth = document.querySelector("#the-month");
  theMonth.innerHTML = `${month}`;
  //changing display of year
  let year = now.getFullYear();
  let theYear = document.querySelector("#the-year");
  theYear.innerHTML = `${year}`;
}
//obtains user input
//calls changeCity function
function searchCity() {
  let search = document.querySelector("#search-city");
  search.addEventListener("submit", changeCity);
}
//called from addEventListener
//calls upperCaseCity function
//changes display of city when user enters input
//connects to Weather API
//calls displayTemp function
function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let capitalizedCity = upperCaseCity(inputCity.value);
  let cityHeader = document.querySelector("#the-city");
  cityHeader.innerHTML = `${capitalizedCity}`;
  let apiKey = `f655251e7aa74c3031f8eb126912bec6`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}
//called from changeCity function
//inputCity.value is passed as parameter
//capitalizes the first letter of the city
function upperCaseCity(lowerCity) {
  let upperCity = lowerCity[0].toUpperCase() + lowerCity.slice(1);
  //console.log(upperCity);
  return upperCity;
}

//called from changeCity function
//obtains current temperature in C degrees
//changes display of temperature
function displayTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let theTemp = document.querySelector("#temperature");
  theTemp.innerHTML = `${currentTemp}`;
}
//called by addEventListener
//obtains position of user
//calls getCoordinates function
/*function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}
//called by getPosition function
//obtains latitude and longitude of user
function getCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat); //tests if working
  console.log(lon); //tests if working
}*/

//***END: defined functions***

//***START: calls to functions***

// W O R K  I N  P R O G R E S S
//calls function getPosition if user clicks current location button
//let button = document.querySelector("button");
//button.addEventListener("click", getPosition);

//calls displayDate function
displayDate();
//calls searchCity function
searchCity();
