const msg = document.getElementById("msg");
const cityInput = document.getElementById("cityInput");
const getWeather = document.getElementById("getWeather");
const weatherResult = document.getElementById("weatherResult");

getWeather.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherResult.innerText = "⚠️ Please enter a city name!";
        return;
    }

    const apiKey = "ae4b4df44a0f234842e83126d5bca9c8"; // 🔑 replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temp = data.main.temp;
                const weather = data.weather[0].description;
                const icon = data.weather[0].icon;
                weatherResult.innerHTML = `
          🌡️ Temp: ${temp}°C <br>
          ☁️ Condition: ${weather} <br>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
        `;
            } else {
                weatherResult.innerText = "❌ City not found!";
            }
        })
        .catch(error => {
            weatherResult.innerText = "⚠️ Error fetching weather.";
            console.error(error);
        });
});