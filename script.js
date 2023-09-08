document.addEventListener("DOMContentLoaded", function () {
    const fetchWeatherButton = document.getElementById("fetchWeather");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");

    fetchWeatherButton.addEventListener("click", function () {
        const city = cityInput.value.trim();
        if (city === "") {
            alert("Bitte geben Sie eine Stadt ein.");
            return;
        }

        const apiKey = "42b19c1d6fed73681bf8367c3c53d42c";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    displayWeather(data);
                } else {
                    const errorText = `Fehler: ${xhr.status} - ${xhr.statusText}`;
                    const responseText = JSON.parse(xhr.responseText);
                    displayError(errorText, responseText.message);
                }
            }
        };

        xhr.send();
    });

    function displayError(statusText, errorMessage) {
        const errorHtml = `
            <p>${statusText}</p>
            <p>Fehlermeldung: ${errorMessage}</p>
        `;

        weatherInfo.innerHTML = errorHtml;
    }
    function displayWeather(data) {
        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const feelsLike = data.main.feels_like;
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const country = data.sys.country;
        const sunriseTimestamp = data.sys.sunrise * 1000; // Convert to milliseconds
        const sunsetTimestamp = data.sys.sunset * 1000; // Convert to milliseconds
    
        const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
        const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();
    
        const weatherHtml = `
            <h2>Wetter in ${cityName}, ${country}</h2>
            <img src="${iconUrl}" alt="Wetter Icon">
            <p>Temperatur: ${temperature}°C</p>
            <p>Min. Temperatur: ${tempMin}°C</p>
            <p>Max. Temperatur: ${tempMax}°C</p>
            <p>Gefühlte Temperatur: ${feelsLike}°C</p>
            <p>Beschreibung: ${weatherDescription}</p>
            <p>Luftdruck: ${pressure} hPa</p>
            <p>Luftfeuchtigkeit: ${humidity}%</p>
            <p>Windgeschwindigkeit: ${windSpeed} m/s</p>
            <p>Sonnenaufgang: ${sunriseTime}</p>
            <p>Sonnenuntergang: ${sunsetTime}</p>
        `;
    
        weatherInfo.innerHTML = weatherHtml;
    }
});
