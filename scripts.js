// Tutorial url: https://nordicapis.com/how-to-build-an-api-driven-weather-app/
// OpenWeatherMap API
const api = "1e5664d4684fd1be5667d4ec7583c068";

// Accessing DOM elements
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

// Using an event listener to run a function every time the page is loaded
window.addEventListener('load', () => {
    let long;
    let lat;
    // Accesing Geolocation of User
    if (navigator.geolocation) { // Checking if browser supports Geolocation Web API
        navigator.geolocation.getCurrentPosition((position) => {
            // Storing Longitude and Latitude in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

            // Using Fetch Web API to get data
            // Current Weather Data API doc: https://openweathermap.org/current
            fetch(base)
                .then((response) => {
                    return response.json(); // Translating the response into a JSON object
                })
                .then((data) => {
                    const { temp } = data.main; // Storing temperature data by matching data field "temp" from data.main
                    const place = data.name;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;
                    // Getting URL for the weather icon based in icon id "icon"
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32; // Calculating fah from celcius

                    // Converting Epoch(Unix) time to GMT
                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(2)} °C`;
                    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                    iconImg.src = iconUrl;
                });
        });
    }
});
