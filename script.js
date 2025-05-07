document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message"); // fixed typo

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";

  // Trigger fetch on button click
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  // Trigger fetch on Enter key press
  cityInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      getWeatherBtn.click();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not found");
    }
    return await response.json();
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
  const themeBtn = document.querySelector(".theme-btn");

  // Load saved theme or default to dark
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
  }

  // Toggle theme on button click
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const currentTheme = document.body.classList.contains("light")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
  });
});
