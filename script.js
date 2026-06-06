const weatherIcon = document.getElementById("weatherIcon");
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const apiKey = "6e6b479254dc0fccf419c679c4f6adcd";

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    temperature.textContent = "Loading...";
    description.textContent = "";
    weatherIcon.src = "";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            temperature.textContent = "City not found";
            description.textContent = "Please enter a valid city name";
            return;
        }

        const temp = data.main.temp;
        const weatherDesc = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        temperature.textContent = `${temp}°C`;
        description.textContent =
            weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);

    } catch (error) {
        temperature.textContent = "Error fetching weather";
        description.textContent = "Please try again later";
        weatherIcon.src = "";
        console.error(error);
    }
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});