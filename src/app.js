function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-week-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
                <div class="col-2">
                  <div class="weather-week-date">${day}</div>
  
                  <img src="" alt="" width="45" />
  
                  <div class="weather-week-temperature">
                    <span class="weather-day-max">18ºC</span>
                    <span class="weather-day-min">12ºC</span>
                  </div>
                </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);

  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  let clarity = document.querySelector("#clarity");
  clarity.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function Search(city) {
  let apiKey = "6905ff0b38fa30ab82c89c7372272fbd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  console.log(cityinput.value);
  Search(cityinput.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;

  celsiusLiink.classList.remove("active");
  fahrenheitLiink.classList.add("active");
  let tempertureElement = document.querySelector("#temperature");
  tempertureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();

  celsiusLiink.classList.add("active");
  fahrenheitLiink.classList.remove("active");
  let tempertureElement = document.querySelector("#temperature");
  tempertureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let fahrenheitLiink = document.querySelector("#fahrenheit-link");
fahrenheitLiink.addEventListener("click", showFahrenheitTemp);

let celsiusLiink = document.querySelector("#celsius-link");
celsiusLiink.addEventListener("click", showCelsiusTemp);

Search("London");

displayForecast();
