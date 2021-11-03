function displayTemperature(response) {
  console.log(response);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  let clarity = document.querySelector("#clarity");
  clarity.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "6905ff0b38fa30ab82c89c7372272fbd";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
