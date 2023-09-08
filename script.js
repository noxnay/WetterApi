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

    function displayWeather(data) {
        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const weatherHtml = `
            <h2>Wetter in ${cityName}</h2>
            <p>Temperatur: ${temperature}°C</p>
            <p>Beschreibung: ${weatherDescription}</p>
            <img src="${iconUrl}" alt="Wetter Icon">
        `;

        weatherInfo.innerHTML = weatherHtml;
    }

    function displayError(statusText, errorMessage) {
        const errorHtml = `
            <p>${statusText}</p>
            <p>Fehlermeldung: ${errorMessage}</p>
        `;

        weatherInfo.innerHTML = errorHtml;
    }
});