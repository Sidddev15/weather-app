const cityName = document.getElementById("cityName");
const btn = document.getElementById("btn");
const weatherIcon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const weatherTemperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".description");
const colorWeather = document.querySelector(".color-weather");
const loaderOverlay = document.querySelector(".loader-overlay");

btn.addEventListener("click", () => {
  let city = cityName.value;
  showLoader();
  getWeather(city);
  document.querySelector(".icon").style.display = "block";
});

function showLoader() {
  loaderOverlay.style.display = "flex";
}

function hideLoader() {
  loaderOverlay.style.display = "none";
}
function getWeather(city) {
  console.log(city);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d6974cb9e6fb689e32ef41f344398132&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
        hideLoader();
      // Now you can access the weather data and update your UI here
      const icon = data.weather[0].icon;
      const description = data.weather[0].description;
      const temperatureFahrenheit = data.main.temp;

      // Convert temperature from Fahrenheit to Celsius
      const temperatureCelsius = ((temperatureFahrenheit - 32) * 5) / 9;

      // Update the UI with the weather data
      weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
      weatherDescription.textContent = description;
      weatherTemperature.textContent = temperatureCelsius.toFixed(1) + "°C"; // Round to 1 decimal place
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      hideLoader();
    });
}
