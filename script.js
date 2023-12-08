// Function to fetch data from the Rest Countries API
const fetchCountriesData = async () => {
    try {
        const response = await fetch('https://restcountries.com/v2/all');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries data:', error);
    }
};

// Function to fetch weather data from OpenWeatherMap API
const fetchWeatherData = async (lat, lon) => {
    try {
        const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Function to create Bootstrap cards for each country
const createCountryCards = (countries) => {
    const cardsContainer = document.getElementById('cards-container');

    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-sm-12 mb-3';

        card.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h5>${country.name}</h5>
                </div>
                <div class="card-body">
                    <img src="${country.flag}" alt="${country.name}" class="img-fluid mb-2">
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>LatLng:</strong> ${country.latlng.join(', ')}</p>
                    <p><strong>Country Code:</strong> ${country.alpha2Code}</p>
                    <button class="btn btn-primary" onclick="getClicWeather('${country.latlng[0]}', '${country.latlng[1]}', '${country.name}')">Click for Weather</button>
                    <p id="${country.name}-weather"></p>
                </div>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
};

// Function to get and display weather data on button click
const getClicWeather = async (lat, lon, countryName) => {
    const weatherData = await fetchWeatherData(lat, lon);
    const weatherElement = document.getElementById(`${countryName}-weather`);

    if (weatherData) {
        weatherElement.innerHTML = `<strong>Weather:</strong> ${weatherData.weather[0].description}, <strong>Temperature:</strong> ${weatherData.main.temp}°C`;
    } else {
        weatherElement.innerHTML = 'Failed to fetch weather data.';
    }
};

// Fetch countries data and create cards on page load
window.onload = async () => {
    const countriesData = await fetchCountriesData();
    if (countriesData) {
        createCountryCards(countriesData);
    }
};
